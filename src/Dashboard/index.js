import React from "react";
import styled from "styled-components";

import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";
import Page from "../Shared/Page";

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 15px;
  margin-top: 20px;
`;

export default () => (
  <Page name="dashboard">
    <PriceGrid />
    <ChartGrid>
      <CoinSpotlight />
      <div>hello lllll</div>
    </ChartGrid>
  </Page>
);
