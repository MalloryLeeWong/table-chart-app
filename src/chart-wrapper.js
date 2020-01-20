import React, {Component} from 'react'
import D3Chart from './chart-d3'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

let data = [
  { 'a': 1, 'b': 3, 'c': 10 },
  { 'a': 3, 'b': 20, 'c': 12 },
  { 'a': -1, 'b': -5, 'c': -4 }
]

class ChartWrapper extends Component {
  constructor() {
    super()
    this.state = {}
    this.chart = null
  }

  componentDidMount() {
      if (this.chart === null) {
        this.chart = new D3Chart(this.refs.speechWPM, data)
      }
  }

  render() {
    return (
      <div className="dashboard-item">
        <Paper elevation={4} className="">
          <Typography variant="h5">Chart Title</Typography>
        </Paper>
      </div>
    )
  }
}

export default ChartWrapper
