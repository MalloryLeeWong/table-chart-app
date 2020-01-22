import * as d3 from 'd3';

export default class D3Table {
  constructor(element, chartData) {

    // Get columns and rows data
    let columns = Object.keys(chartData[0])

    let rowsData = []
    for(let i = 0; i < chartData.length; i++){
      let obj = chartData[i]
      let vals = Object.values(obj)
      let row = [...vals]
      rowsData.push(row)
    }

    // Append the table onto the element
    let table = d3.select(element)
      .append('table')
      .attr('class', 'header')

    // Create header and body
    let header = table.append('header')
    let body = table.append('body')

    // Append header row with column names
    header.append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
        .text(function(column){return column})
      .style('padding', '5px')

    // Create a row for each object in the data array
    let rows = body.selectAll('tr')
      .data(chartData)
      .enter()
      .append('tr')

    // Create cells in each row for each column
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
