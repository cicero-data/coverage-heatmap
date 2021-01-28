import React from 'react';
//import logo from './logo.svg';
import { ReactComponent as Logo } from './cicero_white_tagline.svg';
import HeatMap from "react-heatmap-grid";
import coverageData from './output-data-pub.js';
import './App.css';
import * as d3 from 'd3';

function App() {

  var piyg = d3.scaleSequential(d3.interpolateViridis);
  const myxLabels = ['Phone','Email','Webform','Facebook','Twitter','LinkedIn','Instagram'];
  let coverageDataSort = coverageData.sort(function (a, b) {
    return (a[1] < b[1]) ? -1 : (a[1] > b[1]) ? 1 : 
          (a[0] < b[0]) ? -1 : (a[0] > b[0]) ? 1 : 0
  });
  const covData = coverageDataSort.map(x=>x.slice(5).map(y=> Math.round(y *100 ) )  ) 
  const myyLabels = coverageData.map(x => x[0].concat( x[1]? ' (' + x[1] + ')' : ''));

  return (
    <div>
    <div className="App-header">
          <div className="App-left-header">
            <Logo />
          </div>
          <div className="App-main-header">
            Percent coverage of contact information by chamber
            
            <div className="App-sub-header">
            Published January 2021
            </div>
            <div className="App-sub-container">
              <a href='https://medium.com/cicero-data/' style={{'text-decoration': 'none', 'rightMargin':'20px'}} >
                <div className="App-sub-item App-link">
                  Return to the Cicero Blog
                </div>
              </a>
              <a href='https://www.cicerodata.com/' style={{'text-decoration': 'none'}}>
                <div className="App-sub-item App-link">
                  Visit cicerodata.com
                </div>
              </a>
            </div>
          </div>
          
        </div> 
    <div style={{ fontSize: "13px" }}>
      <HeatMap
        xLabels={myxLabels}
        yLabels={myyLabels}
        xLabelsLocation={"top"}
        xLabelWidth={20}
        yLabelWidth={300}
        data={covData}
        squares={false}
        height={24}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `${piyg(1 - (100 - value) / 100)}`,
          fontSize: "11.5px",
          'font-weight': 'bold',
          color: "#000"
        })}
        cellRender={value => value && <div>{value}</div>}
      />
    </div>
    </div>
  );
}

export default App;
