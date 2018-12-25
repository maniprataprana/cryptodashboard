import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
const cc = require("cryptocompare");

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInterval: "months",
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setFilteredCoins: this.setFilteredCoins,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      changeChartSelect: this.changeChartSelect
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistoricalData();
  };

  changeChartSelect = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistoricalData
    );
  };

  fetchHistoricalData = async () => {
    if (this.state.firstVisit) {
      return;
    }
    let results = await this.getHistoricalData();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({
              [this.state.timeInterval]: TIME_UNITS - index
            })
            .valueOf(),
          ticker.USD
        ])
      }
    ];

    this.setState({ historical });
  };

  getHistoricalData = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({
              [this.state.timeInterval]: units
            })
            .toDate()
        )
      );
    }

    return Promise.all(promises);
  };
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  };

  setPage = page => this.setState({ page });

  savedSettings = () => {
    let data = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!data) {
      return {
        page: "settings",
        firstVisit: true
      };
    }

    let { favorites, currentFavorite } = data;
    return {
      favorites,
      currentFavorite
    };
  };

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistoricalData();
      }
    );

    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setFilteredCoins = fileteredCoins => this.setState({ fileteredCoins });

  fetchPrices = async () => {
    let prices = await this.getPrices();
    this.setState({ prices });
  };

  getPrices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (error) {
        console.error(error);
      }
    }
    return returnData;
  };

  setCurrentFavorite = symbol => {
    this.setState({ currentFavorite: symbol, historical: null }, () => {
      this.fetchHistoricalData();
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorite: symbol
      })
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
