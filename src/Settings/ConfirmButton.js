import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: green;
  cursor: pointer;
`;

export const CentreDiv = styled.div`
  display: grid;
  justify-content: center;
`;

const ConfirmButton = () => (
  <AppContext.Consumer>
    {({ confirmFavorites }) => (
      <CentreDiv>
        <ConfirmButtonStyled onClick={confirmFavorites}>
          Confirm Favorites
        </ConfirmButtonStyled>
      </CentreDiv>
    )}
  </AppContext.Consumer>
);

export default ConfirmButton;
