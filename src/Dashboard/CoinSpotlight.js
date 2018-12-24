import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { Tile } from "../Shared/Tile";
import CoinImage from "../Shared/CoinImage";

const SpotlightName = styled.h2`
  text-align: center;
`;

const CoinSpotlight = () => (
  <AppContext.Consumer>
    {({ currentFavorite, coinList }) => (
      <Tile>
        <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
        <CoinImage coin={coinList[currentFavorite]} spotlight />
      </Tile>
    )}
  </AppContext.Consumer>
);

export default CoinSpotlight;
