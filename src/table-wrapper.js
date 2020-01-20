import React, { Component } from 'react';
import D3Table from './table-d3';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class TableWrapper extends Component {
  constructor(props) {
    super(props);
    // this.state = {}
    this.chart = null;
  }

  componentDidMount() {
    if (this.chart === null) {
      this.chart = new D3Table(this.refs.tableWrapper, this.props.chartData);
    }
  }

  render() {
    return (
      <div>
        <Paper className="" elevation={4}>
          <div ref="tableWrapper" />
        </Paper>
          <Paper elevation={4} className="">
            <Typography variant="h5">Table Title</Typography>
          </Paper>
      </div>
    );
  }
}

export default TableWrapper;
