import React, { Component } from 'react';
import D3Chart from './chart-d3';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    // Create an instance of the chart if one doesn't exist
    if (this.chart === null) {
      this.chart = new D3Chart(this.refs.chartWrapper, this.props.chartData);
    }
  }

  render() {
    // Create title that lists all y axis variable names and updates dynamically
    let maxKeys = 0;
    let idxMaxKeys = 0;
    for (let i = 0; i < this.props.chartData; i++) {
      let obj = this.props.chartData[i];
      if (Object.keys(obj).length > maxKeys) {
        maxKeys = Object.keys(obj).length;
        idxMaxKeys = i;
      }
    }
    let lineNames = Object.keys(this.props.chartData[idxMaxKeys]).slice(1);

    let titleArr = [];
    lineNames.forEach(function(name) {
      titleArr.push(name);
    });
    let titleStrFront = titleArr.slice(0, -1).join(', ');
    let titleStrEnd = titleArr.slice(-1);
    // let titleStr = titleStrFront + ', and ' + titleStrEnd;
    let titleStr = lineNames.length > 2 ? titleStrFront + ', and ' + titleStrEnd : titleArr[0] + ' and ' + titleArr[1]

    return (
      <div>
        <Paper className="chart" elevation={4}>
          <div className="title">
            <Typography variant="h5">{`${titleStr}`}</Typography>
          </div>
          <div className="info-con">
            <Tooltip title="Hover over line points for details">
              <InfoIcon color="disabled" />
            </Tooltip>
          </div>
          <div ref="chartWrapper" />
        </Paper>
      </div>
    );
  }
}

export default ChartWrapper;
