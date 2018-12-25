import React from "react";
import styled, { css } from "styled-components";

import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      text-shadow: 0 0 60px #03ff03;
    `};

    ${props =>
        props.hidden &&
        css`
            display: none;
        `}
`;

const toProperCase = lower => lower.charAt(0).toUpperCase() + lower.substr(1);

const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ page, setPage, firstVisit }) => (
        <ControlButtonElem
          active={page === name}
          onClick={() => setPage(name)}
          hidden={firstVisit && page === "dashboard"}
        >
          {toProperCase(name)}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
};

const AppBar = () => (
  <Bar>
    <Logo>CryptoDash</Logo>
    <div />
    <ControlButton name="dashboard" active />
    <ControlButton name="settings" />
  </Bar>
);
export default AppBar;
