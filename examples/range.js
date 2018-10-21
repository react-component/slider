/* eslint react/no-multi-comp: 0, no-console: 0 */
import 'rc-slider/assets/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  }
  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  }
  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  }
  onSliderChange = (value) => {
    log(value);
    this.setState({
      value,
    });
  }
  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  }
  render() {
    return (
      <div>
        <label>LowerBound: </label>
        <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
        <br />
        <label>UpperBound: </label>
        <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
        <br />
        <button onClick={this.handleApply}>Apply</button>
        <br /><br />
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
      </div>
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
        <Range defaultValue={[20, 50]} min={this.state.min} max={this.state.max}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

class ControlledRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <Range value={this.state.value} onChange={this.handleChange} />
    );
  }
}

class ControlledRangeDisableAcross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }
  handleChange = (value) => {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <Range
        value={this.state.value}
        onChange={this.handleChange}
        allowCross={false}
        {...this.props}
      />
    );
  }
}

// https://github.com/react-component/slider/issues/226
class PureRenderRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: false,
    };
  }
  handleChange = (value) => {
    console.log(value);
    this.setState({
      foo: !this.state.foo,
    });
  }
  render() {
    return (
      <Range defaultValue={[20, 40, 60, 80]} onChange={this.handleChange} allowCross={false} />
    );
  }
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Range，`allowCross=false`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic reverse Range`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} reverse />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20, dots` </p>
      <Range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，disabled</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} disabled />
    </div>
    <div style={style}>
      <p>Controlled Range</p>
      <ControlledRange />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across</p>
      <ControlledRangeDisableAcross />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across, pushable=5</p>
      <ControlledRangeDisableAcross pushable={5} />
    </div>
    <div style={style}>
      <p>Multi Range</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
    </div>
    <div style={style}>
      <p>Multi Range with custom track and handle style</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable
        trackStyle={[{ backgroundColor: 'red' }, { backgroundColor: 'green' }]}
        handleStyle={[{ backgroundColor: 'yellow' }, { backgroundColor: 'gray' }]}
        railStyle={{ backgroundColor: 'black' }}
      />
    </div>
    <div style={style}>
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
    <div style={style}>
      <p>Range with dynamic `max` `min`</p>
      <DynamicBounds />
    </div>
    <div style={style}>
      <p>Range as child component</p>
      <PureRenderRange />
    </div>
  </div>
  , document.getElementById('__react-content'));
