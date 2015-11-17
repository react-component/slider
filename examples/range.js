'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');

var style = {width: 400, margin: 50};
var log = console.log.bind(console);

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Range</p>
      <Slider range defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Slider range step={20} defaultValue={[20, 40]} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20, dots` </p>
      <Slider range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Controlled Range，`step=20, dots` </p>
      <Slider range value={[20, 40]} />
    </div>
  </div>
  , document.getElementById('__react-content'));
