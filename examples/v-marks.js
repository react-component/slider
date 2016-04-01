require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {height: 400, marginBottom: 50, marginLeft: 50};
const marks = {
  '-10': '-10°C',
  0: <strong>0°C</strong>,
  26: '26°C',
  37: '37°C',
  50: '50°C',
  100: {
    style: {
      color: 'red',
    },
    label: <strong>100°C</strong>,
  },
};

function log(value) {
  console.log(value);
}

ReactDOM.render(
  <div>
    <p>Slider with marks, `step=null`</p>
    <div style={style}>
      <Slider vertical min={-10} marks={marks} step={null} onChange={log} defaultValue={20} />
    </div>
    <p>Slider with marks and steps</p>
    <div style={style}>
      <Slider vertical dots min={-10} marks={marks} step={10} onChange={log} defaultValue={20} />
    </div>
    <p>Slider with marks, `included=false`</p>
    <div style={style}>
      <Slider vertical min={-10} marks={marks} included={false} defaultValue={20} />
    </div>
    <p>Slider with marks and steps, `included=false`</p>
    <div style={style}>
      <Slider vertical min={-10} marks={marks} step={10} included={false} defaultValue={20} />
    </div>
    <p>Range with marks</p>
    <div style={style}>
      <Slider vertical min={-10} range marks={marks} onChange={log} defaultValue={[20, 40]} />
    </div>
    <p>Range with marks and steps</p>
    <div style={style}>
      <Slider vertical min={-10} range marks={marks} step={10} onChange={log} defaultValue={[20, 40]} />
    </div>
  </div>
  , document.getElementById('__react-content'));
