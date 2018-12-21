import React from "react";
import styled from "styled-components";

import { AppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

const getCoinsToDisplay = (coinList, topSection) =>
    Object.keys(coinList).slice(0, topSection? 10: 100);

const CoinGrid = ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>
          {getCoinsToDisplay(coinList, topSection).map(coin => (
            <CoinTile coinKey={coin} key={coin} topSection={topSection}/>
          ))}
        </CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
};

export default CoinGrid;
