require('react-flex-slider/assets/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('react-flex-slider');

const wrapperStyle = { width: 400, margin: 50 };

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
};

class CustomHandle extends React.Component {
  render() {
    const props = this.props;
    const style = Object.assign({ left: `${props.offset}%` }, handleStyle);
    return (
        <div style={style}>val: {props.value}</div>
    );
  }
}

CustomHandle.propTypes = {
  value: React.PropTypes.any,
  offset: React.PropTypes.number,
};

ReactDOM.render(
  <div>
    <div style={wrapperStyle}>
      <p>Default slider</p>
      <Slider min={0} max={20} defaultValue={3} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handle={<CustomHandle />} />
    </div>
  </div>,
  document.getElementById('__react-content')
);
