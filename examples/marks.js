'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');

var style = {width: 400, margin: 50};
var marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C'
};

var log = function(value) {
  console.log(value);
};

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Slider with marks, `included=true`</p>
      <Slider marks={marks} onChange={log} defaultValue={20} />
    </div>
    <div style={style}>
      <p>Slider with marks and steps, `included=true`</p>
      <Slider marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>

    <div style={style}>
      <p>Slider with marks, `included=false`</p>
      <Slider marks={marks} included={false} defaultValue={20} />
    </div>
    <div style={style}>
      <p>Slider with marks and steps, `included=false`</p>
      <Slider marks={marks} step={10} included={false} defaultValue={20} />
    </div>

    <div style={style}>
      <p>Range with marks</p>
    <Slider range marks={marks} onChange={log} defaultValue={[20, 40]} />
    </div>
    <div style={style}>
      <p>Range with marks and steps</p>
      <Slider range marks={marks} step={10} onChange={log} defaultValue={[20, 40]} />
    </div>
  </div>
  , document.getElementById('__react-content'));
