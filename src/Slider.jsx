'use strict';

var React = require('react');
var DomUtils = require('rc-util').Dom;

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

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

function getSimulatedMouseEvent(mouseEventType, touchEvent) {
  // initMouseEvent(type, canBubble, cancelable, view, clickCount,
  //                screenX, screenY, clientX, clientY, ctrlKey,
  //                altKey, shiftKey, metaKey, button, relatedTarget);

  var simulatedEvent = document.createEvent('MouseEvent');
  simulatedEvent.initMouseEvent(mouseEventType, true, true, window, 1,
                                touchEvent.screenX, touchEvent.screenY,
                                touchEvent.clientX, touchEvent.clientY, false,
                                false, false, false, 0/*left*/, null);
  return simulatedEvent;
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
    var value = this._trimAlignValue(props.value);
    var marksLen = props.marks.length;
    if (marksLen > 0) {
      value = ((props.max - props.min) / (marksLen - 1)) * (props.index);
      value = value.toFixed(5);
    }

    return {
      upperBound: 0,
      sliderLength: 0,
      value: value,
      active: props.disabled ? '' : ((value > props.min || props.index > 0) ? 'active' : '')
    };
  },

  componentWillReceiveProps: function(newProps) {
    var value = newProps.value;
    this.state.value = this._trimAlignValue(value, newProps);
  },

  componentDidMount: function() {
    this._onHandleResizeListener = DomUtils.addEventListener(window, 'resize', this.handleResize);
    DomUtils.addEventListener(this.refs.handle.getDOMNode(), 'touchstart', this.handleTouchEvents);
    DomUtils.addEventListener(this.refs.handle.getDOMNode(), 'touchmove', this.handleTouchEvents);
    DomUtils.addEventListener(this.refs.handle.getDOMNode(), 'touchend', this.handleTouchEvents);
    this.handleResize();
  },

  componentWillUnmount: function() {
    if (this._onHandleResizeListener) {
      this._onHandleResizeListener.remove();
    }
  },

  getValue: function() {
    return this.state.value;
  },

  getIndex: function() {
    var props = this.props;
    if (props.marks.length === 0) {
      return 0;
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

    this.setState({value: nextValue, active: 'active'}, callback);
  },

  _getMousePosition: function(e) {
    return e.pageX || (e.clientX + document.documentElement.scrollLeft);
  },

  _triggerEvents: function(event) {
    var props = this.props;
    var hasMarks = props.marks && props.marks.length > 0;
    if (props[event]) {
      props[event](hasMarks ? this.getIndex() : this.state.value);
    }
  },

  _addEventHandles: function() {
    this._onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this._onMouseMove);
    this._onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this._onMouseUp);
  },

  _removeEventHandles: function () {
    if (this._onMouseMoveListener) {
      this._onMouseMoveListener.remove();
    }

    if (this._onMouseUpListener) {
      this._onMouseUpListener.remove();
    }
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

  _end: function() {
    this._removeEventHandles();
    this.setState(this._triggerEvents.bind(this, 'onAfterChange'));
  },

  _onMouseUp: function() {
    this._end();
  },

  _onMouseMove: function(e) {
    pauseEvent(e);
    var position = this._getMousePosition(e);
    var props = this.props;
    var state = this.state;

    var value = state.value;
    var oldValue = value;

    var diffPosition = position - state.startPosition;

    var diffValue = diffPosition / (state.sliderLength) * (props.max - props.min);
    var newValue = this._trimAlignValue(state.startValue + diffValue);

    value = newValue;

    if (newValue !== oldValue) {
      this.setState({value: value, active: 'active'}, this._triggerEvents.bind(this, 'onChange'));
    }
  },

  handleTouchEvents: function (event) {
    event.preventDefault();
    var touches = event.changedTouches,
        first = touches[0],
        type = '';

    switch (event.type) {
      case 'touchstart':
        type = 'mousedown';
        this.handleMouseDown(getSimulatedMouseEvent(type, first));
        break;
      case 'touchmove':
        type = 'mousemove';
        this._onMouseMove(getSimulatedMouseEvent(type, first));
        break;
      case 'touchend':
        type = 'mouseup';
        this._onMouseUp(getSimulatedMouseEvent(type, first));
        break;
      default:
        return;
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
    return (e) => {
      if (this.props.disabled) {
        return;
      }
      var position = this._getMousePosition(e);
      this._start(position);
      this._addEventHandles();
      pauseEvent(e);
    };
  },

  handleSliderMouseDown: function(e) {
    if (this.props.disabled) {
      return;
    }
    var position = this._getMousePosition(e);
    this._calValueByPos(position,
      () => {
        this._triggerEvents('onChange');
        this._start(position);
        this._addEventHandles();
      }
    );
    pauseEvent(e);
  },

  renderSteps: function() {
    var props = this.props;
    var marksLen = props.marks.length;
    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
    var unit = this.state.sliderLength / (stepNum - 1);

    var prefixCls = props.className;
    var stepClassName = prefixClsFn(prefixCls, 'step');

    var elements = [];
    for (var i = 0; i < stepNum; i++) {
      var offset = unit * i;
      var style = {
        left: offset.toFixed(5)
      };
      var className = prefixClsFn(prefixCls, 'dot');
      if (i <= this.getIndex() || (this._calcValue(offset) <= this.getValue())) {
        className = prefixClsFn(prefixCls, 'dot', 'dot-active');
      }
      elements[i] = (
        <span className={className} style={style} ref={'step' + i}></span>
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
      width: (unit / 2).toFixed(5)
    };

    if (i === (marksLen - 1)) {
      style.right = '0';
      style.width = 'auto';
    }else {
      style.left = (i > 0 ? (offset - (unit / 4)).toFixed(5) : offset);
    }

    var prefixCls = this.props.className;
    var className = prefixClsFn(prefixCls, 'mark-text');

    if (i <= this.getIndex()) {
      className = prefixClsFn(prefixCls, 'mark-text', 'mark-text-active');
    }

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

    var prefixCls = this.props.className;
    var className = prefixClsFn(prefixCls, 'mark');

    return (
      <div className={className}>
        {elements}
      </div>
    );
  },

  renderHandle: function(offset) {
    var handleStyle = {
      left: offset
    };

    var prefixCls = this.props.className;
    var className = prefixClsFn(prefixCls, 'handle');

    if (this.state.active) {
      className =  prefixClsFn(prefixCls, 'handle', 'handle-active');
    }

    return (
      <a className={className}
        ref = 'handle'
        style = {handleStyle}
        href = '#'
        onMouseDown={this.handleMouseDown}></a>
    );
  },

  renderTrack: function(offset) {
    var style = {
      width: offset
    };

    var prefixCls = this.props.className;
    var trackClassName = prefixClsFn(prefixCls, 'track');

    return (
      <div className={trackClassName} ref='track' style={style}></div>
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

    var prefixCls = props.className;
    var sliderClassName = props.disabled ? prefixClsFn(prefixCls, 'disabled') : prefixCls;

    return (
      <div className={sliderClassName} ref='slider' onMouseDown={this.handleSliderMouseDown}>
        {track}
        {handles}
        {steps}
        {sliderMarks}
      </div>
    );
  }
});

module.exports = Slider;
