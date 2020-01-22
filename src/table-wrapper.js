import React, { Component } from 'react';
import D3Table from './table-d3';
import Paper from '@material-ui/core/Paper';

class TableWrapper extends Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    // Create an instance of the table if one doesn't exist
    if (this.chart === null) {
      this.chart = new D3Table(this.refs.tableWrapper, this.props.chartData);
    }
  }

  render() {
    return (
      <div className="table">
        <Paper elevation={4}>
          <div ref="tableWrapper" />
        </Paper>
      </div>
    );
  }
}

export default TableWrapper;
