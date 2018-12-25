import React from "react";
import ReactHighcharts from "react-highcharts";
import highchartsConfig from "./HighchartsConfig";
import HighchartsTheme  from "./HighchartsTheme";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default () => (
  <AppContext.Consumer>
        {({ historical}) => (
      <Tile>
                {historical ?   <ReactHighcharts config={highchartsConfig(historical)} /> : <div>Loading...</div>}
      </Tile>
    )}
  </AppContext.Consumer>
);
