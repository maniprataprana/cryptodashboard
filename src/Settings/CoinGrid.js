import React from "react";
import styled, { css } from "styled-components";

import { AppContext } from "../App/AppProvider";

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const CoinGrid = ({ firstVisit }) => {
  return (
    <AppContext.Consumer>
      {({ coinList }) =>
        <CoinGridStyled>
            {
                Object.keys(coinList).map(coin => <div> {coin}</div>)
            }
        </CoinGridStyled>
      }
    </AppContext.Consumer>
  );
};

export default CoinGrid;
