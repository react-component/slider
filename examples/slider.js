'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');

var style = {width: 400, margin: 50};
var log = console.log.bind(console);


function percentFormatter(v) {
  return v + ' %';
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Slider</p>
      <Slider tipTransitionName='rc-slider-tooltip-zoom-down' onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20`</p>
      <Slider step={20} defaultValue={50} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20, dots`</p>
      <Slider dots step={20} defaultValue={100} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider with `tipFormatter`</p>
      <Slider tipFormatter={percentFormatter} tipTransitionName='rc-slider-tooltip-zoom-down' onChange={log} />
    </div>
    <div style={style}>
      <p>Controlled Slider</p>
      <Slider value={50} />
    </div>
  </div>
  , document.getElementById('__react-content'));
