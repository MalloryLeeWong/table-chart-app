import React from 'react';
import './App.css';
import ChartWrapper from './chart-wrapper';
import TableWrapper from './table-wrapper';

function App() {
  // Data inputs for each chart is loaded here to demo the front-end but it could come from a server or seed file instead

  // original data sample

  let data = [
    { a: 1, b: 3, c: 10 },
    { a: 3, b: 20, c: 12 },
    { a: -1, b: -5, c: -4 },
  ];

  // data sample 2 longer
  // let data = [
  //   { a: 1, b: 3, c: 10 },
  //   { a: 3, b: 20, c: 12 },
  //   { a: -1, b: -5, c: -4 },
  //   { a: -10, b: -15, c: -14 },
  //   { a: 10, b: 82, c: 100 },
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
