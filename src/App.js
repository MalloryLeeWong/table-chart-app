import React from 'react';
import './App.css';
import ChartWrapper from './chart-wrapper';
import TableWrapper from './table-wrapper';

function App() {
  // Data inputs for the table and chart are passed to the table and chart components below to demo the front-end without a server.

  // In each data object, the 'a' key represents the x-axis value, and the remaining keys correspond to y-axis values for each line.

  // Data sample 1 (Original data including two lines):

  const data = [
    { a: 1, b: 3, c: 10 },
    { a: 3, b: 20, c: 12 },
    { a: -1, b: -5, c: -4 },
  ];

  // Data sample 2 (Uncomment to demo more and longer lines):

  // const data = [
  //   { a: 1, b: 3, c: 10, d: 17, e: 40, f: 45 },
  //   { a: 3, b: 20, c: 12, d: 28, e: 50, f: 57 },
  //   { a: -1, b: -5, c: -4, d: -18, e: -25, f: -30 },
  //   { a: -10, b: -19, c: -23, d: -30, e: -35, f: -38 },
  //   { a: 10, b: 82, c: 100, d: 121, e: 130, f: 134 },
  // ];

  return (
    <div className="App">
      <div className="App-header">
        <div className="table-main">
          <TableWrapper chartData={data} />
        </div>
        <div className="chart-main">
          <ChartWrapper chartData={data} />
        </div>
      </div>
    </div>
  );
}

export default App;
