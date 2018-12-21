import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = props => {
  return (
    <AppContext.Consumer>
      {({ coinList }) =>
        !coinList ? <div>Loading Coins...</div> : <div>{props.children}</div>
      }
    </AppContext.Consumer>
  );
};

export default Content;
