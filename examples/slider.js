/* eslint react/no-multi-comp: 0 */
require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value);
}


function percentFormatter(v) {
  return v + ' %';
}

const CustomizedSlider = React.createClass({
  getInitialState() {
    return {
      value: 50,
    };
  },
  onSliderChange(value) {
    log(value);
    this.setState({
      value,
    });
  },
  onAfterChange(value) {
    console.log(value);
  },
  render() {
    return <Slider value={this.state.value} onChange={this.onSliderChange} onAfterChange={this.onAfterChange} />;
  },
});

const DynamicBounds = React.createClass({
  getInitialState() {
    return {
      min: 0,
      max: 100,
    };
  },
  onSliderChange(value) {
    log(value);
  },
  onMinChange(e) {
    this.setState({
      min: +e.target.value || 0,
    });
  },
  onMaxChange(e) {
    this.setState({
      max: +e.target.value || 100,
    });
  },
  render() {
    return (
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br /><br />
        <Slider defaultValue={50} min={this.state.min} max={this.state.max} onChange={this.onSliderChange} />
      </div>
    );
  },
});

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Slider</p>
      <Slider tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} />
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
      <Slider tipFormatter={percentFormatter} tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider without tooltip</p>
      <Slider tipFormatter={null} onChange={log} />
    </div>
    <div style={style}>
      <p>Controlled Slider</p>
      <Slider value={50} />
    </div>
    <div style={style}>
      <p>Customized Slider</p>
      <CustomizedSlider />
    </div>
    <div style={style}>
      <p>Slider with dynamic `min` `max`</p>
      <DynamicBounds />
    </div>
  </div>
  , document.getElementById('__react-content'));
