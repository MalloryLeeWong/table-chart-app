import * as d3 from 'd3';

// Define margin, width, and height of d3 chart canvas
// const MARGIN = { TOP: 10, BOTTOM: 10, LEFT: 10, RIGHT: 10 };
// const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
// const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Table {
  constructor(element, chartData) {

    let columns = Object.keys(chartData[0])

    let rowsData = []
    for(let i = 0; i < chartData.length; i++){
      let obj = chartData[i]
      let vals = Object.values(obj)
      let row = [...vals]
      rowsData.push(row)
    }

    // Append the table onto the element
    let table = d3.select(element).append('table')
    let header = table.append('header')
    let body = table.append('body')

    // Append header row with column names
    header.append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
        .text(function(column){return column})

    // Create a row for each object in the data array
    let rows = body.selectAll('tr')
      .data(chartData)
      .enter()
      .append('tr')

    // create cells in each row for each column
    // let cells =
    rows.selectAll('td')
      .data(function(row){
        return columns.map(function(column){
          return {column: column, value: row[column]}
        })
      })
      .enter()
      .append('td')
        .text(function(d){return d.value})

  }

}
