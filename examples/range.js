/* eslint react/no-multi-comp: 0 */
require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {width: 400, margin: 50};

function log(value) {
  console.log(value);
}

const CustomizedRange = React.createClass({
  getInitialState: function() {
    return {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  },
  onLowerBoundChange: function(e) {
    this.setState({ lowerBound: +e.target.value });
  },
  onUpperBoundChange: function(e) {
    this.setState({ upperBound: +e.target.value });
  },
  onSliderChange: function(value) {
    log(value);
    this.setState({
      value: value,
    });
  },
  handleApply: function() {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound]});
  },
  render: function() {
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
        <Slider range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
      </div>
    );
  },
});

const DynamicBounds = React.createClass({
  getInitialState() {
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
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br /><br />
        <Slider range defaultValue={[20, 50]} min={this.state.min} max={this.state.max} onChange={this.onSliderChange} />
      </div>
    );
  },
});

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Range，`allowCross=false`</p>
      <Slider range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Slider range step={20} defaultValue={[20, 20]} onBeforeChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20, dots` </p>
      <Slider range dots step={20} defaultValue={[20, 40]} onAfterChange={log} />
    </div>
    <div style={style}>
      <p>Controlled Range</p>
      <Slider range value={[20, 40]} />
    </div>
    <div style={style}>
      <p>Multi Range</p>
      <Slider range={3} value={[20, 40, 60, 80]} />
    </div>
    <div style={style}>
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
    <div style={style}>
      <p>Range with dynamic `max` `min`</p>
      <DynamicBounds />
    </div>
  </div>
  , document.getElementById('__react-content'));
