import React, { Component } from 'react';
import D3Chart from './chart-d3';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    // this.state = {}
    this.chart = null;
  }

  componentDidMount() {
    if (this.chart === null) {
      this.chart = new D3Chart(this.refs.chartWrapper, this.props.chartData);
    }
  }

  render() {
    return (
      <div>
        <Paper className="chart" elevation={4}>
          <div className="title">
          <Typography variant="h5">B and C</Typography>
          </div>
          <div ref="chartWrapper" />
        </Paper>
      </div>
    );
  }
}

export default ChartWrapper;
