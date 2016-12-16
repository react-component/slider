require('react-flex-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('react-flex-slider');

const style = { width: 400, margin: 50 };
const marks = {
  0: 0,
  50: 50,
  100: 100,
};

function log(value) {
  console.log(value); // eslint-disable-line no-console
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Slider (choose marks only)</p>
      <Slider marks={marks} step={null} onChange={log} defaultValue={50} />
    </div>
    <div style={style}>
      <p>Slider (choose all values)</p>
      <Slider marks={marks} onChange={log} defaultValue={20} />
    </div>
    <div style={style}>
      <p>Slider (choose values in steps)</p>
      <Slider marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>
  </div>
  , document.getElementById('__react-content'));
