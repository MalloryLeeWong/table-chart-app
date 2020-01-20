import * as d3 from 'd3';

// Define margin, width, and height of d3 chart canvas
const MARGIN = { TOP: 10, BOTTOM: 10, LEFT: 10, RIGHT: 10 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
  constructor(element, chartData) {
    const vis = this;

    // Create the visualization svg canvas instance with d3 which defines what 'this' context is
    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      // Append svg group element onto svg canvas
      .append('g')
      // Add margin on left and top
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    // Add x-axis label
    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 45)
      .attr('text-anchor', 'middle')
      .text('a');

    // Add y-axis label (WAS COMMENTED OUT)
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('b, c')
      .attr('transform', 'rotate(-90)');

    // Define x and y axis together
    vis.xAxisGroup = vis.svg
      // Append empty group for axis gen to be called on so that both axes show up together
      .append('g')
      // Use transform attr and translate attr to put x axis on bottom instead of top where d3 will initially put it
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');

    vis.data = chartData;

    // need a values only for x axis
    let xVals = []
    for(let i = 0; i < chartData.length; i++){
      xVals.push(chartData.a)
    }

    // Find max b line
    const maxB = d3.max(vis.data, d => d.b)
    const minB = d3.min(vis.data, d => d.b)

    // Find max c line
    const maxC = d3.max(vis.data, d => d.c)
    const minC = d3.min(vis.data, d => d.c)

    const maxY = Math.max(maxB, maxC)
    const minY = Math.min(minB, minC)

    // Scale y axis
    const y = d3
      .scaleLinear()
      // Domain takes an array with 2 elements, min and max input units
      .domain([minY * 0.95, maxY])
      // Range takes an array of 2 elements, min and max outputs in pixels
      .range([HEIGHT, 0]);
    // Put height as min to get y axis to start at bottom left

    // Find max of a data for x axis
    const maxX = d3.max(vis.data, d => d.a)
    const minX = d3.min(vis.data, d => d.a)

    // Scale x axis
    const x = d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, WIDTH]);

    // Update x axis, passing in scale for the x axis
    let tickFormat = d3.format('d');
    const xAxisCall = d3
      .axisBottom(x)
      .tickValues(xVals)
      .tickFormat(d => tickFormat(d));
    // Use call method to call or recalculate axis dynamically
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);

    // updates y axis (WAS COMMENTED OUT)
    const yAxisCall = d3.axisLeft(y).ticks(0);
    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);

    // Create tool tips to display details about each data point
    vis.Tooltip = d3
      .select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('color', '#5298D5') // blue
      .style('border', 'solid')
      .style('border-color', '#5298D5') // blue
      .style('border-width', '3px')
      .style('border-radius', '3px')
      .style('width', 'fit-content')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('font-size', '60%')
      .style('position', 'absolute');

      // Populate canvas and lines
      vis.svg
      .append('path')
      .datum(vis.data)
      .attr('fill', 'none')
      .attr('stroke', '#11C3D0')
      .attr('stroke-width', 2)
      .attr(
        'd',
        d3
          .line()
          .x(function(d) {
            return x(d.a)
          })
          .y(function(d) {
            return y(d.b)
          })
          .y(function(d) {
            return y(d.c)
          })
      )


    // update the format
    // let format = d3.

    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1);
      d3.select(this)
        .attr('r', 7)
        .style('stroke', '#4652B1')
        .style('opacity', 1);
    };
    // let mousemove = function(d) {
      // vis.Tooltip.html(
      //   // Pass chart data in that will be highlighted on mouse move
      //   `
      //   ${format(d3.isoParse(d.createdAt))}<br>${chartData}`
      // )
      //   .style('left', event.pageX + 10 + 'px')
      //   .style('top', event.pageY + 'px')
    // };

    let mouseleave = function(d) {
      vis.Tooltip.style('opacity', 0);
      d3.select(this)
        .attr('r', 5)
        .style('stroke', 'none')
        .style('opacity', 0.7);
    };

    // Add the points or circles to each piece of data
    vis.svg
      .append('g')
      .selectAll('dot')
      .data(vis.data) // does vis.data need to be in an array
      .enter()
      .append('circle')
      .attr('cx', function(d) {
        return x(d.a);
      })
      .attr('cy', function(d) {
        return y(d.b);
      })
      .attr('r', 5)
      .attr('fill', '#52D5CC') // seafoam green
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      // .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  }
}
