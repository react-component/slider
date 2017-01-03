/* eslint react/no-multi-comp: 0 */
require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = { float: 'left', width: 200, height: 400, marginBottom: 160, marginLeft: 50 };
const parentStyle = { overflow: 'hidden' };

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`;
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
  render() {
    return <Slider vertical value={this.state.value} onChange={this.onSliderChange} />;
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
      <div style={style}>
        <p>Slider with dynamic `min` `max`</p>
        <Slider vertical defaultValue={50} min={this.state.min} max={this.state.max}
          onChange={this.onSliderChange}
        />
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
      </div>
    );
  },
});

ReactDOM.render(
  <div style={parentStyle}>
    <div style={style}>
      <p>Basic Slider</p>
      <Slider vertical tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20`</p>
      <Slider vertical step={20} defaultValue={50} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider，`step=20, dots`</p>
      <Slider vertical dots step={20} defaultValue={100} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Slider with `tipFormatter`</p>
      <Slider vertical tipFormatter={percentFormatter}
        tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log}
      />
    </div>
    <div style={style}>
      <p>Basic Slider without tooltip</p>
      <Slider vertical tipFormatter={null} onChange={log} />
    </div>
    <div style={style}>
      <p>Controlled Slider</p>
      <Slider vertical value={50} />
    </div>
    <div style={style}>
      <p>Customized Slider</p>
      <CustomizedSlider />
    </div>
    <div>
      <DynamicBounds />
    </div>
  </div>
  , document.getElementById('__react-content'));
