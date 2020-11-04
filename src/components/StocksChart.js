import React, { Component, createRef } from "react";
import _ from "underscore";
import Chart from "react-apexcharts";

class StocksChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1100,
      height: 400,
    };

    this.container = createRef();
  }

  options = {
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
  };

  componentDidMount() {
    this.setState({
      width: this.container.current.offsetWidth - 50,
    });
    window.addEventListener("resize", this.updateChartSizeThrottled);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateChartSizeThrottled);
  }

  updateChartSize = () => {
    if (this.container?.current) {
      this.setState({
        width: this.container.current.offsetWidth - 50,
      });
    }
  };

  updateChartSizeThrottled = _.throttle(this.updateChartSize, 200);

  render() {
    return (
      <div className="store-charts card" ref={this.container}>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.options}
                series={this.props.series}
                type="area"
                width={this.state.width}
                height={this.state.height}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StocksChart;
