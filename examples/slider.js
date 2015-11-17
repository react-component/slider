'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');

var style = {width: 400, margin: 50};
var log = function(value) {
  console.log(value);
};


function percentFormatter(v) {
  return v + ' %';
}

var CustomizedSlider = React.createClass({
  getInitialState: function() {
    return {
      value: 50
    }
  },
  onChange: function(value) {
    log(value);
    this.setState({
      value: value
    });
  },
  render: function() {
    return <Slider value={this.state.value} onChange={this.onChange} />;
  }
});

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
    <div style={style}>
      <p>Customized Slider</p>
      <CustomizedSlider />
    </div>
  </div>
  , document.getElementById('__react-content'));
