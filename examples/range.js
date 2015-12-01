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
      value: [20, 40],
    };
  },
  onChange: function(value) {
    log(value);
    this.setState({
      value: value,
    });
  },
  render: function() {
    return <Slider range value={this.state.value} onChange={this.onChange} />;
  },
});

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Basic Range</p>
      <Slider range defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic Range，`step=20` </p>
      <Slider range step={20} defaultValue={[20, 40]} onBeforeChange={log} />
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
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
  </div>
  , document.getElementById('__react-content'));
