/* eslint react/no-multi-comp: 0 */
import 'rc-slider/assets/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`;
}

class CustomizedSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
    };
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }
  render() {
    return (
      <Slider value={this.state.value}
        onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
      />
    );
  }
}

class DynamicBounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
    };
  }
  onSliderChange = (value) => {
    log(value);
  }
  onMinChange = (e) => {
    this.setState({
      min: +e.target.value || 0,
    });
  }
  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || 100,
    });
  }
  render() {
    return (
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br /><br />
        <Slider defaultValue={50} min={this.state.min} max={this.state.max}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

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
      <Slider tipFormatter={percentFormatter}
        tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log}
      />
    </div>
    <div style={style}>
      <p>Basic Slider without tooltip</p>
      <Slider tipFormatter={null} onChange={log} />
    </div>
    <div style={style}>
      <p>Slider with custom handle and track style</p>
      <Slider
        defaultValue={30}
        maximumTrackStyle={{ backgroundColor: 'red', height: 10 }}
        minimumTrackStyle={{ backgroundColor: 'blue', height: 10 }}
        handleStyle={{
          borderColor: 'blue',
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -9,
          backgroundColor: 'blue',
        }}
      />
    </div>
    <div style={style}>
      <p>Basic Slider, disabled</p>
      <Slider tipTransitionName="rc-slider-tooltip-zoom-down" onChange={log} disabled />
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
