'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');
var DomUtils = require('rc-util').Dom;

function pauseEvent(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
}

function prefixClsFn(prefixCls) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

var Slider = React.createClass({
  propTypes: {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    index: React.PropTypes.number,
    marks: React.PropTypes.array,
    isIncluded: React.PropTypes.bool,
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
      isIncluded: true,
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
      value: value,
      active: props.disabled ? '' : ((value > props.min || props.index > 0) ? 'active' : '')
    };
  },

  componentWillReceiveProps: function(newProps) {
    var value = newProps.value;
    this.state.value = this._trimAlignValue(value, newProps);
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
    var unit = ((props.max - props.min) / (props.marks.length - 1)).toFixed(5);
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
    return ratio * 100 + '%';
  },

  _calcValue: function(offset) {
    var ratio = offset / this.getSliderLength();
    return ratio * (this.props.max - this.props.min) + this.props.min;
  },

  _calValueByPos: function (position, callback) {
    var pixelOffset = position - this.getSliderStart();
    // pixelOffset -= (this.state.handleSize / 2);

    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));

    this.setState({value: nextValue, active: 'active'}, callback);
  },

  _getMousePosition: function(e) {
    return e.pageX || (e.clientX + document.documentElement.scrollLeft);
  },

  _getTouchPosition: function (e) {
    var touch = e.touches[0];
    return touch.pageX;
  },

  _triggerEvents: function(event) {
    var props = this.props;
    var hasMarks = props.marks && props.marks.length > 0;
    if (props[event]) {
      props[event](hasMarks ? this.getIndex() : this.state.value);
    }
  },

  _addEventHandles: function(type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this._onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this._onTouchMove);
      this._onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this._onTouchUp);
    }

    if (type === 'mouse') {
      this._onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this._onMouseMove);
      this._onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this._onMouseUp);
    }
  },

  _removeEventHandles: function (type) {
    if (type === 'touch') {
      this._onTouchMoveListener.remove();
      this._onTouchUpListener.remove();
    }

    if (type === 'mouse') {
      this._onMouseMoveListener.remove();
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

  _end: function(type) {
    this._removeEventHandles(type);
    this.setState(this._triggerEvents.bind(this, 'onAfterChange'));
  },

  _onMouseUp: function() {
    this._end('mouse');
  },

  _onTouchUp: function() {
    this._end('touch');
  },

  _onMouseMove: function(e) {
    var position = this._getMousePosition(e);
    this._handleMove(e, position);
  },

  _onTouchMove: function(e) {
    if (e.touches.length > 1 || (e.type === 'touchend' && e.touches.length > 0)) {
      return;
    }

    var position = this._getTouchPosition(e);

    this._handleMove(e, position);
  },

  _handleMove: function(e, position) {
    pauseEvent(e);
    // var position = this._getMousePosition(e);
    var props = this.props;
    var state = this.state;

    var value = state.value;
    var oldValue = value;

    var diffPosition = position - state.startPosition;

    var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
    var newValue = this._trimAlignValue(state.startValue + diffValue);

    value = newValue;

    if (newValue !== oldValue) {
      this.setState({value: value, active: 'active'}, this._triggerEvents.bind(this, 'onChange'));
    }
  },

  getSliderLength: function() {
    var slider = this.refs.slider;
    if (!slider) {
      return 0;
    }

    return slider.getDOMNode().clientWidth;
  },

  getSliderStart: function() {
    var slider = this.refs.slider.getDOMNode();
    var rect = slider.getBoundingClientRect();

    return rect.left;
  },

  handleTouchStart: function(e) {
    if (this.props.disabled || e.touches.length > 1 || (e.type === 'touchend' && e.touches.length > 0)) {
      return;
    }

    var position = this._getTouchPosition(e);
    this.startPosition = position;
    this._start(position);
    this._addEventHandles('touch');
    pauseEvent(e);
  },

  handleMouseDown: function() {
    return (e) => {
      if (this.props.disabled) {
        return;
      }
      var position = this._getMousePosition(e);
      this._start(position);
      this._addEventHandles('mouse');
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
        this._addEventHandles('mouse');
      }
    );

    pauseEvent(e);
  },

  renderSteps: function() {
    var props = this.props;
    var marksLen = props.marks.length;
    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
    var unit = 100 / (stepNum - 1);

    var prefixCls = props.className;
    var stepClassName = prefixClsFn(prefixCls, 'step');

    var elements = [];
    for (var i = 0; i < stepNum; i++) {
      var offset = unit * i + '%';
      var style = {
        left: offset
      };
      var className = prefixClsFn(prefixCls, 'dot');
      if (props.isIncluded) {
        if (i <= this.getIndex() || (this._calcValue(offset) <= this.getValue())) {
          className = prefixClsFn(prefixCls, 'dot', 'dot-active');
        }
      } else {
        className = (i === this.getIndex()) ? prefixClsFn(prefixCls, 'dot', 'dot-active') : className;
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
    var unit = 100 / (marksLen - 1);
    var offset = unit * i;

    var style = {
      width: unit / 2 + '%'
    };

    if (i === marksLen - 1) {
      style.right = -unit / 4 + '%';
    } else {
      style.left = i > 0 ? offset - unit / 4 + '%' : -unit / 4 + '%';
    }

    var prefixCls = this.props.className;
    var className = prefixClsFn(prefixCls, 'mark-text');

    if (this.props.isIncluded) {
      if (i <= this.getIndex()) {
        className = prefixClsFn(prefixCls, 'mark-text', 'mark-text-active');
      }
    } else {
      className = (i === this.getIndex()) ? prefixClsFn(prefixCls, 'mark-text', 'mark-text-active') : className;
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

    var handle =  <a className={className}
        ref = "handle"
        style = {handleStyle}
        href = "#"
        onMouseDown = {this.handleMouseDown}
        onTouchStart = {this.handleTouchStart}></a>;

    if (this.props.marks.length > 0) {
      return handle;
    } else {
      return (
        <Tooltip
          placement="top"
          overlay={<span>{this.state.value}</span>}
          delay={0}
          prefixCls={prefixClsFn(prefixCls, 'tooltip')}>
          {handle}
        </Tooltip>
      );
    }
  },

  renderTrack: function(offset) {
    var style = {
      width: offset
    };

    var prefixCls = this.props.className;
    var trackClassName = prefixClsFn(prefixCls, 'track');

    return (
      <div className={trackClassName} ref="track" style={style}></div>
    );
  },

  render: function() {
    var state = this.state;
    var props = this.props;

    var value = state.value;
    var offset = this._calcOffset(value);

    var track = this.props.isIncluded ? this.renderTrack(offset) : null;
    var handles = this.renderHandle(offset);
    var steps = (props.step > 1 || props.marks.length > 0) ? this.renderSteps() : null;
    var sliderMarks = (props.marks.length > 0) ? this.renderMarks() : null;

    var prefixCls = props.className;
    var sliderClassName = props.disabled ? prefixCls + ' ' + prefixClsFn(prefixCls, 'disabled') : prefixCls;

    return (
      <div className={sliderClassName} ref="slider" onMouseDown={this.handleSliderMouseDown}>
        {track}
        {handles}
        {steps}
        {sliderMarks}
        {this.props.children}
      </div>
    );
  }
});

module.exports = Slider;
