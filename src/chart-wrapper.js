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
    // Create title that lists all y axis variable names and updates dynamically
    let maxKeys = 0
    let idxMaxKeys = 0
    for(let i = 0; i < this.props.chartData; i++){
      let obj = this.props.chartData[i]
      if(Object.keys(obj).length > maxKeys){
        maxKeys = Object.keys(obj).length
        idxMaxKeys = i
      }
    }
    let lineNames = Object.keys(this.props.chartData[idxMaxKeys]).slice(1)

    let titleArr = []
    lineNames.forEach(function(name){
      titleArr.push(name)
    })
    let titleStrFront = titleArr.slice(0, -1).join(', ')
    let titleStrEnd = titleArr.slice(-1)
    let titleStr = titleStrFront + ', and ' + titleStrEnd

    return (
      <div>
        <Paper className="chart" elevation={4}>
          <div className="title">
          <Typography variant="h5">{`${titleStr}`}</Typography>
          </div>
          <div ref="chartWrapper" />
        </Paper>
      </div>
    );
  }
}

export default ChartWrapper;
