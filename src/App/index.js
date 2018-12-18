import React, { Component } from "react";
import WelcomeMessage from "./WelcomeMessage";
import "./App.css";
import styled, { css } from "styled-components";

const MyButton = styled.div`
  color: green;

  ${props =>
    props.primary &&
    css`
      color: palevioletred;
    `};
`;

class App extends Component {
  render() {
    return (
      <div>
        <WelcomeMessage />
      </div>
    );
  }
}

export default App;
