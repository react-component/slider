require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {width: 400, margin: 50};
const styleWarning = {color: '#ff0c31'};

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C',
};

function log(value) {
  console.log(value);
}

function labelFormater(value) {
  let labelText;
  if (value < 15) {
    labelText = 'cold!';
  } else if (value < 30) {
    labelText = 'nice!';
  } else if (value < 50) {
    labelText = 'hot!';
  } else {
    labelText = 'fire!';
  }

  return labelText;
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Slider with label</p>
      <Slider min={0} max={100} onChange={log} defaultValue={20}
              labelFormater={labelFormater} />
    </div>

    <div style={style}>
      <p>Basic Range with label</p>
      <Slider range min={0} max={100} onChange={log} defaultValue={[20, 40]}
              labelFormater={labelFormater} />
    </div>

    <div style={style}>
      <p>Slider with label <span style={styleWarning}>does not plays well with marks </span></p>
      <Slider min={0} max={100} onChange={log} defaultValue={37}
              labelFormater={labelFormater} marks={marks} />
    </div>
  </div>
  , document.getElementById('__react-content'));
