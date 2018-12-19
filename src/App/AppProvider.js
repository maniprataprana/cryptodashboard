import React, { Component } from "react";

export const AppContext = React.createContext();

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }

  setPage = page => this.setState({ page });

  savedSettings = () => {
    let data = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!data) {
      return {
        page: "settings",
        firstVisit: true
      };
    }
    return {
      page: data.page,
      firstVisit: false
    };
  };

  confirmFavorites = () => {
    this.setState({
        firstVisit: false,
        page: "dashboard"
    });

      localStorage.setItem("cryptoDash", JSON.stringify({
          test: "hello"
      }));
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
