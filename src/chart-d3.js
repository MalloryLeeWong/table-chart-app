/* eslint-disable no-restricted-globals */
import * as d3 from 'd3';

// Define margin, width, and height of d3 chart canvas
const MARGIN = { TOP: 20, BOTTOM: 70, LEFT: 90, RIGHT: 180 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
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

    // Sort input data
    vis.data = chartData.sort(function(a, b) {
      return a.a - b.a;
    });

    // Add x-axis label
    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .text('a')
      .attr('class', 'axis-label');

    // Find data object with largest number of keys to get y axis labels
    let maxKeys = 0
    let idxMaxKeys = 0
    for(let i = 0; i < vis.data; i++){
      let obj = vis.data[i]
      if(Object.keys(obj).length > maxKeys){
        maxKeys = Object.keys(obj).length
        idxMaxKeys = i
      }
    }

    let yAxisVars = Object.keys(vis.data[idxMaxKeys]).slice(1).join(', ')

    // Add y-axis label
    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text(`${yAxisVars}`)
      .attr('transform', 'rotate(-90)')
      .attr('class', 'axis-label');

    // Define x and y axis together
    vis.xAxisGroup = vis.svg
      // Append empty group for axis gen to be called on so that both axes show up together
      .append('g')
      // Use transform attr and translate attr to put x axis on bottom instead of top where d3 will initially put it
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');

    // Find max and min values for y axis for all lines
    let maxY = 0
    for(let i = 0; i < vis.data.length; i++){
      let obj = vis.data[i]
      for(let key in obj){
        if(yAxisVars.includes(key)){
          if(obj[key] > maxY){
            maxY = obj[key]
          }
        }
      }
    }

    let minY = 0
    for(let i = 0; i < vis.data.length; i++){
      let obj = vis.data[i]
      for(let key in obj){
        if(yAxisVars.includes(key)){
          if(obj[key] < minY){
            minY = obj[key]
          }
        }
      }
    }

    // // Find max of a data for x axis, assuming 'a' values are x values
    const maxX = d3.max(vis.data, d => d.a);
    const minX = d3.min(vis.data, d => d.a);

    // Get y axis tick values
    let incremY = (Math.abs(maxY) + Math.abs(minY)) / 10;
    let yVals = [];
    for (let i = minY; i <= maxY; i += incremY) {
      yVals.push(i);
    }

    // Get x axis tick values
    let incremX = (Math.abs(maxX) + Math.abs(minX)) / 10;
    let xVals = [];
    for (let i = minX; i <= maxX; i += incremX) {
      // xVals.push(vis.data[i].a);
      xVals.push(i);
    }

    // Scale y axis
    const y = d3
      .scaleLinear()
      // Domain takes an array with 2 elements, min and max input units
      .domain([minY, maxY])
      // Range takes an array of 2 elements, min and max outputs in pixels
      .range([HEIGHT, 0]);
      // Put height as min to get y axis to start at bottom left

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
      .call(xAxisCall)
      .attr('class', 'axis');

    // Update y axis
    const yAxisCall = d3
      .axisLeft(y)
      .tickValues(yVals)
      .tickFormat(d => tickFormat(d));

    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall)
      .attr('class', 'axis');


    // Create and populate each line

    let lineNames = Object.keys(vis.data[idxMaxKeys]).slice(1)

    lineNames.forEach(function(name){
      vis.svg
      .append('path')
      .data([vis.data])
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#004d80') // dark blue
      .attr('stroke-width', 3)
      .attr('d',
        d3
        .line()
        .x(function(d) {
          return x(d.a);
        })
        .y(function(d) {
          return y(d[name]);
        })
      )
      .attr('data-legend', function(d) {
        return d.a;
      });
    })

    // Create legend circle
    vis.svg
      .append('circle')
      .attr('cx', 600)
      .attr('cy', (HEIGHT / 2) * 1.1)
      .attr('r', 6)
      .style('fill', '#004d80'); // dark blue

    vis.svg
      .append('circle')
      .attr('cx', 600)
      .attr('cy', HEIGHT / 2)
      .attr('r', 6)
      .style('fill', '#b3b3cc'); // grey

    // Create legend text
    vis.svg
      .append('text')
      .attr('x', 625)
      .attr('y', (HEIGHT / 2) * 1.1)
      .text('c')
      .style('font-size', '60%')
      .attr('alignment-baseline', 'middle')
      .attr('class', 'legend-text');

    vis.svg
      .append('text')
      .attr('x', 625)
      .attr('y', HEIGHT / 2)
      .text('b') // b is grey
      .style('font-size', '60%')
      .attr('alignment-baseline', 'middle')
      .style('padding-right', '3%')
      .attr('class', 'legend-text');

    // Create Tooltips for lines
    vis.Tooltip = d3
      .select(element)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('color', '#004d80') // dark blue
      .style('border', 'solid')
      .style('border-color', '#004d80') // dark blue
      .style('border-width', '3px')
      .style('border-radius', '3px')
      .style('width', 'fit-content')
      .style('text-align', 'center')
      .style('padding', '5px')
      .style('font-size', '60%')
      .style('position', 'absolute');

    let mouseover = function(d) {
      vis.Tooltip.style('opacity', 1);
      d3.select(this)
        .attr('r', 7)
        .style('stroke', '#4652B1')
        .style('opacity', 1);
    };

    let mousemove = function(d) {
      vis.Tooltip.html(`a: ${d.a}, b: ${d.b}, c: ${d.c}`)
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY + 'px');
    };

    let mouseleave = function(d) {
      vis.Tooltip.style('opacity', 0);
      d3.select(this)
        .attr('r', 5)
        .style('stroke', 'none')
        .style('opacity', 0.7);
    };

    // Apply tool tips and circle points to line B
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
      .attr('r', 4)
      .attr('fill', '#004d80') // dark blue
      .style('stroke-width', 3)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    // Apply tool tips and circle points to line C
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
        return y(d.c);
      })
      .attr('r', 4)
      .attr('fill', '#004d80') // dark blue
      .style('stroke-width', 3)
      .style('stroke', 'none')
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);
  }
}
