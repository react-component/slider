'use strict';

require('rc-slider/assets/index.css');

var Slider = require('rc-slider');
var React = require('react');
// React.render(<Slider marks={["一","二","三","四","五"]} index={3}/>, document.getElementById('__react-content'));
// React.render(<Slider className='rc-slider' step={20}/>, document.getElementById('__react-content'));
React.render(<Slider />, document.getElementById('__react-content'));
