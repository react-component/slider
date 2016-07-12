/* eslint react/no-multi-comp: 0 */
require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {width: 400, margin: 50};

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
  onAfterChange: function(value) {
    console.log(value);
  },
  render: function() {
    return <Slider value={this.state.value} onChange={this.onSliderChange} onAfterChange={this.onAfterChange} />;
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

const CustomizedTrack = ({className, included, vertical, offset, length}) => {
  const style = {
    visibility: included ? 'visible' : 'hidden',
    backgroundColor: 'tomato',
  };
  if (vertical) {
    style.bottom = offset + '%';
    style.height = length + '%';
  } else {
    style.left = offset + '%';
    style.width = length + '%';
  }
  return <div className={className + ' customClass'} style={style} />;
};

const CustomizedSteps = ({prefixCls, vertical, marks, dots, step, included,
                lowerBound, upperBound, max, min}) => {
  const customStyle = {
    background: `rgba(255,0,0,${upperBound})`,
  }
  return <div className={prefixCls + '-step'} style={customStyle} />;
};



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
    <div style={style}>
      <p>Customized Track component</p>
      <Slider trackComponent={CustomizedTrack} defaultValue={25} />
    </div>
    <div style={style}>
      <p>Customized Steps component</p>
      <Slider stepsComponent={CustomizedSteps} defaultValue={0.25} min={0} max={1} step={0.01} />
    </div>
  </div>
  , document.getElementById('__react-content'));
