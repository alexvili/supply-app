import React, { PureComponent } from "react";
import Chart from "react-apexcharts";

class StocksChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      series: this.props.series,
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2020-11-01T00:00:00.000Z",
            "2020-11-01T01:00:00.000Z",
            "2020-11-01T02:00:00.000Z",
            "2020-11-01T03:00:00.000Z",
            "2020-11-01T04:00:00.000Z",
            "2020-11-01T05:00:00.000Z",
            "2020-11-01T06:00:00.000Z",
            "2020-11-01T07:00:00.000Z",
            "2020-11-01T08:00:00.000Z",
            "2020-11-01T09:00:00.000Z",
            "2020-11-01T10:00:00.000Z",
            "2020-11-01T11:00:00.000Z",
            "2020-11-01T12:00:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  componentDidUpdate() {
    this.setState((prevState) => ({ ...prevState, series: this.props.series }));
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              width="1100"
              height="400"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default StocksChart;
