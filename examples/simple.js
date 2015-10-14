'use strict';

require('rc-slider/assets/index.less');

var Slider = require('rc-slider');
var React = require('react');

function onChange(v){
  console.log(v);
}

// React.render(<div style={{width:400,margin:100}}><Slider marks={["一","二","三","四","五"]} defaultIndex={2} /></div>, document.getElementById('__react-content'));
// React.render(<div style={{width:400,margin:100}}><Slider className='rc-slider' step={20}/></div>, document.getElementById('__react-content'));
React.render(<div style={{width:400,margin:100}}><Slider onChange={onChange}  tipTransitionName='rc-slider-tooltip-zoom-down'/></div>, document.getElementById('__react-content'));
