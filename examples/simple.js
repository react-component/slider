'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var Slider = require('rc-slider');

function onChange(v) {
  console.log(v);
}

React.render(
  <div>
    <div style={{width:400,margin:100}}>
      <Slider onChange={onChange} tipTransitionName='rc-slider-tooltip-zoom-down'/>
    </div>
    <div style={{width:400,margin:100}}>
      <Slider marks={["一","二","三","四","五"]} defaultIndex={2}/>
    </div>
    <div style={{width:400,margin:100}}>
      <Slider withDots step={20}/>
    </div>
    <div style={{width:400,margin:100}}>
      <Slider step={20}/>
    </div>
  </div>
  , document.getElementById('__react-content'));
