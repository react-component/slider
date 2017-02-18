/* eslint-disable react/prop-types */

require('rc-slider/assets/index.less');
require('rc-tooltip/assets/bootstrap.css');

const React = require('react');
const ReactDOM = require('react-dom');
const Tooltip = require('rc-tooltip');
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const RangeAutoDisable = createSliderWithTooltip(Slider.Range, true);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 400, margin: 50 };
ReactDOM.render(
  <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handle={handle} />
    </div>
    <div style={wrapperStyle}>
      <p>Range wrappered by createSliderWithTooltip </p>
      <Range min={0} max={20} defaultValue={[3, 10]}/>
    </div>
    <div style={wrapperStyle}>
      <p>Range wrappered by createSliderWithTooltip , which set autoDisabled to be true</p>
      <RangeAutoDisable min={0} max={20} defaultValue={[3, 10]} disabled/>
    </div>
  </div>,
  document.getElementById('__react-content')
);
