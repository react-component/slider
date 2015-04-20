/** @jsx React.DOM */
// use jsx to render html, do not modify simple.html
require('rc-slider/assets/index.css');
var Slider = require('rc-slider');
var React = require('react');
// React.render(<Sliders marks={["一","二","三","四","五"]} index={3}/>, document.getElementById('__react-content'));
// React.render(<Slider className='rc-slider' step={20}/>, document.getElementById('__react-content'));
React.render(<Slider />, document.getElementById('__react-content'));
