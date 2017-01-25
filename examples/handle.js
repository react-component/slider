/* eslint-disable react/prop-types */

require('rc-slider/assets/index.less');
require('rc-tooltip/assets/bootstrap.css');

const React = require('react');
const ReactDOM = require('react-dom');
const Tooltip = require('rc-tooltip');
const Slider = require('rc-slider');
const Range = Slider.Range;
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index } = props;
  return (
    <Tooltip
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...props} />
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
      <p>Range with custom handle</p>
      <Range min={0} max={20} defaultValue={[3, 10]} handle={handle} />
    </div>
  </div>,
  document.getElementById('__react-content')
);
