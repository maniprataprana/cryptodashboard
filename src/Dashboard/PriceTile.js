import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";

const numberFormat = number => +(number + "").slice(0, 7);

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `};
`;

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
        display: grid;
        grid-gap: 5px;
        ${fontSize3};
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
    `};
`;

const ChangePercent = ({ data }) => (
  <JustifyRight>
    <ChangePct red={data.CHANGEPCT24HOUR < 0}>
      {numberFormat(data.CHANGEPCT24HOUR)}
    </ChangePct>
  </JustifyRight>
);

const PriceTile = ({ symbol, data }) => (
  <PriceTileStyled>
    <CoinHeaderGridStyled>
      <div>{symbol}</div>
      <ChangePercent data={data} />
    </CoinHeaderGridStyled>
    <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
  </PriceTileStyled>
);

const PriceTileCompact = ({ symbol, data, compact }) => (
  <PriceTileStyled compact>
      <JustifyLeft>{symbol}</JustifyLeft>
      <ChangePercent data={data} />
    <div>${numberFormat(data.PRICE)}</div>
  </PriceTileStyled>
);

export default ({ price, index }) => {
  let symbol = Object.keys(price)[0];
  let data = price[symbol]["USD"];
  console.log(data);
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <TileClass symbol={symbol} data={data} compact={index >= 5}>
      {symbol}
      {data.PRICE}
    </TileClass>
  );
};
