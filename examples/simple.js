'use strict';

require('rc-slider/assets/index.less');

var Slider = require('rc-slider');
var React = require('react');

function onChange(v){
  console.log(v);
}

// React.render(<Slider marks={["一","二","三","四","五"]} index={3}/>, document.getElementById('__react-content'));
// React.render(<Slider className='rc-slider' step={20}/>, document.getElementById('__react-content'));
React.render(<div style={{width:400,margin:100}}><Slider onChange={onChange}/></div>, document.getElementById('__react-content'));
