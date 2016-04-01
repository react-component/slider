/* eslint react/no-multi-comp: 0 */
require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {height: 400, marginBottom: 50, marginLeft: 50};

function log(value) {
  console.log(value);
}


function percentFormatter(v) {
  return v + ' %';
}

const CustomizedSlider = React.createClass({
  getInitialState: function() {
    return {
      value: 50,
    };
  },
  onSliderChange: function(value) {
    log(value);
    this.setState({
      value: value,
    });
  },
  render: function() {
    return <Slider vertical value={this.state.value} onChange={this.onSliderChange} />;
  },
});

const DynamicBounds = React.createClass({
  getInitialState: function() {
    return {
      min: 0,
      max: 100,
    };
  },
  onSliderChange: function(value) {
    log(value);
  },
  onMinChange: function(e) {
    this.setState({
      min: +e.target.value || 0,
    });
  },
  onMaxChange: function(e) {
    this.setState({
      max: +e.target.value || 100,
    });
  },
  render: function() {
    return (
      <div style={style}>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br /><br />
        <Slider vertical defaultValue={50} min={this.state.min} max={this.state.max} onChange={this.onSliderChange} />
      </div>
    );
  },
});

ReactDOM.render(
  <div>
    <p>Basic Slider</p>
    <div style={style}>
      <Slider vertical tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} />
    </div>
    <p>Basic Slider，`step=20`</p>
    <div style={style}>
      <Slider vertical step={20} defaultValue={50} onBeforeChange={log} />
    </div>
    <p>Basic Slider，`step=20, dots`</p>
    <div style={style}>
      <Slider vertical dots step={20} defaultValue={100} onAfterChange={log} />
    </div>
    <p>Basic Slider with `tipFormatter`</p>
    <div style={style}>
      <Slider vertical tipFormatter={percentFormatter} tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} />
    </div>
    <p>Basic Slider without tooltip</p>
    <div style={style}>
      <Slider vertical tipFormatter={null} onChange={log} />
    </div>
    <p>Controlled Slider</p>
    <div style={style}>
      <Slider vertical value={50} />
    </div>
    <p>Customized Slider</p>
    <div style={style}>
      <CustomizedSlider />
    </div>
    <p>Slider with dynamic `min` `max`</p>
    <div>
      <DynamicBounds />
    </div>
  </div>
  , document.getElementById('__react-content'));
