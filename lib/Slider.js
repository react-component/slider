/** @jsx React.DOM */
var React = require('react');

function pauseEvent(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  } 
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

var Slider = React.createClass({
  propTypes: {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    index: React.PropTypes.number,
    marks: React.PropTypes.array,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onBeforeChange: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      marks: [],
      className: 'rc-slider',
      disabled: false,
      index: 0
    };
  },

  getInitialState: function() {
    var props = this.props;
    var value = props.value;
    var marksLen = props.marks.length;
    if (marksLen > 0) {
      value = ((props.max - props.min) / (marksLen - 1)) * (props.index);
      value = value.toFixed(5);
    }

    return {
      upperBound: 0,
      sliderLength: 0,
      value: value,
      active: props.disabled ? '' : ((value > 0 || props.index > 0) ? 'active' : '')
    };
  },

  componentWillReceiveProps: function(newProps) {
    var value = newProps.value;
    this.state.value = this._trimAlignValue(value, newProps);
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  getValue: function() {
    return this.state.value;
  },

  getIndex: function() {
    var props = this.props;
    if (props.marks.length === 0) { 
      return;
    }
    var value = this.state.value;
    var unit = (props.max - props.min) / (props.marks.length - 1);
    return Math.floor(value / unit);
  },

  _trimAlignValue: function(val, props) {
    props = props || this.props;

    var step = props.marks.length > 0 ? (props.max - props.min) / (props.marks.length - 1) : props.step;

    if (val <= props.min) {
      val = props.min;
    }
    if (val >= props.max) {
      val = props.max;
    }

    var valModStep = (val - props.min) % step;
    var alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += (valModStep > 0) ? step : (-step);
    }

    return parseFloat(alignValue.toFixed(5));
  },

  _calcOffset: function(value) {
    var ratio = (value - this.props.min) / (this.props.max - this.props.min);
    return ratio * this.state.upperBound;
  },

  _calcValue: function(offset) {
    var ratio = offset / this.state.upperBound;
    return ratio * (this.props.max - this.props.min) + this.props.min;
  },

  _calValueByPos: function (position, callback) {
    var pixelOffset = position - this.state.sliderStart;
    // pixelOffset -= (this.state.handleSize / 2);

    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));

    this.setState({value: nextValue, active: 'active'}, callback.bind(this));
  },

  _triggerEvents: function(event) {
    if (this.props[event]) {
      this.props[event](this.state.value);
    }
  },

  _addEventHandles: function(eventMap) {
    for (var key in eventMap) {
      document.addEventListener(key, eventMap[key], false);
    }
  },

  _removeEventHandles: function (eventMap) {
    for (var key in eventMap) {
      document.removeEventListener(key, eventMap[key], false);
    }
  },

  _getMouseEventMap: function() {
    return {
      mousemove: this._onMouseMove,
      mouseup: this._onMouseUp
    };
  },

  _start: function(position) {
    if (document.activeElement) {
      document.activeElement.blur();
    }

    this._triggerEvents('onBeforeChange');

    this.setState({
      startValue: this.state.value,
      startPosition: position
    });
  },

  _end: function(eventMap) {
    this._removeEventHandles(eventMap);
    this.setState(this._triggerEvents.bind(this, 'onAfterChange'));
  },

  _onMouseUp: function() {
    this._end(this._getMouseEventMap());
  },

  _onMouseMove: function(e) {
    var position = e.pageX;

    var props = this.props;
    var state = this.state;

    var value = state.value;
    var oldValue = value;

    var diffPosition = position - state.startPosition;

    var diffValue = diffPosition / (state.sliderLength) * (props.max - props.min);
    var newValue = this._trimAlignValue(state.startValue + diffValue);

    value = newValue;

    if (newValue !== oldValue) {
      this.setState({value: value, active: 'active'} ,this._triggerEvents.bind(this, 'onChange'));
    }
  },

  handleResize: function() {
    var slider = this.refs.slider.getDOMNode();
    var rect = slider.getBoundingClientRect();

    var sliderMin = rect.left;
    var sliderMax = rect.right;
    this.setState({
      upperBound: slider.clientWidth,
      sliderLength: Math.abs(sliderMax - sliderMin),
      sliderStart: sliderMin
    });
  },

  handleMouseDown: function() {
    return function(e) {
      if (this.props.disabled) {
        return;
      }
      var position = e.pageX;
      this._start(position);
      this._addEventHandles(this._getMouseEventMap());
      pauseEvent(e);
    }.bind(this);
  },

  handleSliderMouseDown: function(e) {
    if (this.props.disabled) {
      return;
    }
    var position = e.pageX;
    this._calValueByPos(position, function() {
      this._triggerEvents('onChange');
      this._start(position);
      this._addEventHandles(this._getMouseEventMap());
    }.bind(this));
    pauseEvent(e);
  },

  renderSteps: function() {
    var props = this.props;
    var marksLen = props.marks.length;
    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
    var unit = this.state.sliderLength / (stepNum - 1);

    var stepClassName = props.className + '-step';

    var elements = [];
    for (var i = 0; i < stepNum; i++) {
      var style = {
        left: (unit * i).toFixed(5) + 'px'
      };
      elements[i] = (
        <span className='dot' style={style} ref={'step'+i}></span>
      );
    }

    return (
      <div className={stepClassName}>
        {elements}
      </div>
    );
  },

  renderMark: function(i) {
    var marks = this.props.marks;
    var marksLen = marks.length;
    var unit = this.state.sliderLength / (marksLen - 1);
    var offset = unit * i;

    var style = {
      width: (unit / 2).toFixed(5) + 'px'
    };

    if (i === (marksLen - 1)) {
      style.right = '0';
      style.width = 'auto';
    }else {
      style.left = (i > 0 ? (offset - (unit / 4)).toFixed(5) : offset) + 'px';
    }
    var className = this.props.className + '-mark-text ';

    return (
      <span className={className} style={style}>{this.props.marks[i]}</span>
    );
  },

  renderMarks: function() {
    var marks = this.props.marks;
    var marksLen = marks.length;
    var elements = [];
    for (var i = 0; i < marksLen; i++) {
      elements[i] = this.renderMark(i);
    }

    return (
      <div className={this.props.className + "-mark"} onMouseDown={this.handleSliderMouseDown}>
        {elements}
      </div>
    );
  },

  renderHandle: function(offset) {
    var handleStyle = {
      left: offset + 'px'
    };
    var className = this.props.className + '-handle ' + this.state.active;

    return (
      <a className={className}
        ref = "handle"
        style = {handleStyle}
        href = "#"
        onMouseDown={this.handleMouseDown}></a>
    );
  },

  renderTrack: function(offset) {
    var style = {
      left: 0,
      width: offset
    };
    var trackClassName = this.props.className + '-track';
    return (
      <div className={trackClassName} ref="track" style={style}></div>
    );
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var value = state.value;
    var offset = this._calcOffset(value);

    var track = this.renderTrack(offset);
    var handles = this.renderHandle(offset);
    var steps = (props.step > 1 || props.marks.length > 0) ? this.renderSteps() : null;
    var sliderMarks = (props.marks.length > 0) ? this.renderMarks() : null;

    var sliderClassName = props.className + (props.disabled ? ' '+props.className+ '-disabled' : '');

    return (
      <div className={sliderClassName} ref="slider" onMouseDown={this.handleSliderMouseDown}>
        {track}
        {handles}
        {steps}
        {sliderMarks}
      </div>
    );
  }
});

module.exports = Slider;
