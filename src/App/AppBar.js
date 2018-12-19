import React from "react";

import styled, { css } from "styled-components";

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
`;

const toProperCase = lower => lower.charAt(0).toUpperCase() + lower.substr(1);

const ControlButton = ({ name, active }) => {
  return (
    <ControlButtonElem active={active}>{toProperCase(name)}</ControlButtonElem>
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
