require('rc-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

const style = {width: 400, margin: 50};

const handleStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer',
  padding: '2px',
  border: '2px solid #abe2fb',
  borderRadius: '3px',
  background: '#fff',
  fontSize: '14px',
  textAlign: 'center',
  zIndex: 3
};

class CustomHandle extends React.Component {
  render() {
    const props = this.props;
    const {offset} = props;
    const style = Object.assign({left: offset + '%'}, handleStyle);

    return (<div style={style}>^_^</div>);
  }
}

class DisplayHandle extends React.Component {
  render() {
    const props = this.props;
    const {offset, value} = props;
    const style = Object.assign({left: offset + '%'}, handleStyle);


    return (<div style={style}>{value}</div>);
  }
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>Default slider</p>
      <Slider min={0} max={20} defaultValue={3} />
    </div>
    <div style={style}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} Handle={CustomHandle} />
    </div>
    <div style={style}>
      <p>Slider with embedded value</p>
      <Slider min={0} max={20} defaultValue={3} Handle={DisplayHandle} />
    </div>
  </div>
  , document.getElementById('__react-content'));
