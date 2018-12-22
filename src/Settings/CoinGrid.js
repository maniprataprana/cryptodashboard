import React from "react";
import styled from "styled-components";

import { AppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

const getLowerSectionCoins = (coinList, fileteredCoins) =>
  (fileteredCoins && Object.keys(fileteredCoins)) ||
  Object.keys(coinList).slice(0, 100);

const getCoinsToDisplay = (coinList, topSection, favorites, fileteredCoins) =>
  topSection ? favorites : getLowerSectionCoins(coinList, fileteredCoins);

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, fileteredCoins }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(
            coinList,
            topSection,
            favorites,
            fileteredCoins
          ).map(coin => (
            <CoinTile coinKey={coin} key={coin} topSection={topSection} />
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
