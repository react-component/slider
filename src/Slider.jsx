'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');
var rcUtil = require('rc-util');
var DomUtils = rcUtil.Dom;

function noop() {
}

function pauseEvent(e) {
  e.cancelBubble = true;
  e.returnValue = false;
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
    defaultValue: React.PropTypes.number,
    defaultIndex: React.PropTypes.number,
    marks: React.PropTypes.array,
    isIncluded: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onBeforeChange: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onAfterChange: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 0,
      marks: [],
      isIncluded: true,
      className: '',
      prefixCls: 'rc-slider',
      disabled: false,
      defaultIndex: 0
    };
  },

  getInitialState: function () {
    var props = this.props;
    var value = props.defaultValue;
    value = this._trimAlignValue(value);
    var marksLen = props.marks.length;
    if (marksLen > 0) {
      value = ((props.max - props.min) / (marksLen - 1)) * (props.defaultIndex);
      value = value.toFixed(5);
    }

    return {
      value: value
    };
  },

  getIndex: function () {
    var props = this.props;
    var value = this.state.value;

    if (props.marks.length === 0) {
      return Math.floor((value - props.min) / props.step);
    } else {
      var unit = ((props.max - props.min) / (props.marks.length - 1)).toFixed(5);
      return Math.round(value / unit);
    }
  },

  _trimAlignValue: function (val, props) {
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

  _calcOffset: function (value) {
    var ratio = (value - this.props.min) / (this.props.max - this.props.min);
    return ratio * 100 + '%';
  },

  _calcValue: function (offset) {
    var ratio = offset / this.getSliderLength();
    return ratio * (this.props.max - this.props.min) + this.props.min;
  },

  _calValueByPos: function (position) {
    var pixelOffset = position - this.getSliderStart();
    // pixelOffset -= (this.state.handleSize / 2);
    var nextValue = this._trimAlignValue(this._calcValue(pixelOffset));
    // do not use setState
    this.state.value = nextValue;
    this.setState({
      value: nextValue
    });
    return nextValue;
  },

  _getTouchPosition: function (e) {
    var touch = e.touches[0];
    return touch.pageX;
  },

  _triggerEvents: function (event) {
    var props = this.props;
    var hasMarks = props.marks && props.marks.length > 0;
    if (props[event]) {
      props[event](hasMarks ? this.getIndex() : this.state.value);
    }
  },

  _addEventHandles: function (type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this._onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this._onTouchMove);
      this._onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this._onTouchUp);
    } else if (type === 'mouse') {
      this._onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this._onMouseMove);
      this._onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this._onMouseUp);
    }
  },

  _removeEventHandles: function (type) {
    if (type === 'touch') {
      this._onTouchMoveListener.remove();
      this._onTouchUpListener.remove();
    } else if (type === 'mouse') {
      this._onMouseMoveListener.remove();
      this._onMouseUpListener.remove();
    }
  },

  _start: function (position) {
    this._triggerEvents('onBeforeChange');
    this.startValue = this.state.value;
    this.startPosition = position;
  },

  _end: function (type) {
    this._removeEventHandles(type);
    this._triggerEvents('onAfterChange');
  },

  _onMouseUp: function () {
    this._end('mouse');
  },

  _onTouchUp: function () {
    this._end('touch');
  },

  _onMouseMove: function (e) {
    var position = e.pageX;
    this._handleMove(e, position);
  },

  _onTouchMove: function (e) {
    if (e.touches.length > 1 || (e.type === 'touchend' && e.touches.length > 0)) {
      this._end('touch');
      return;
    }

    var position = this._getTouchPosition(e);

    this._handleMove(e, position);
  },

  _handleMove: function (e, position) {
    pauseEvent(e);
    var props = this.props;
    var state = this.state;

    var value = state.value;
    var oldValue = value;

    var diffPosition = position - this.startPosition;

    var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
    var newValue = this._trimAlignValue(this.startValue + diffValue);

    value = newValue;

    if (newValue !== oldValue) {
      this.setState({value: value});
      this._triggerEvents('onChange');
    }
  },

  getSliderLength: function () {
    var slider = this.refs.slider;
    if (!slider) {
      return 0;
    }

    return slider.getDOMNode().clientWidth;
  },

  getSliderStart: function () {
    var slider = this.refs.slider.getDOMNode();
    var rect = slider.getBoundingClientRect();

    return rect.left;
  },

  handleTouchStart: function (e) {
    if (e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)) {
      return;
    }

    var position = this._getTouchPosition(e);
    this._calValueByPos(position);
    this._triggerEvents('onChange');
    this._start(position);
    this._addEventHandles('touch');
    pauseEvent(e);
  },

  handleSliderMouseDown: function (e) {
    var position = e.pageX;
    this._calValueByPos(position);
    this._triggerEvents('onChange');
    this._start(position);
    this._addEventHandles('mouse');
    pauseEvent(e);
  },

  renderSteps: function () {
    var props = this.props;
    var marksLen = props.marks.length;
    var stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
    var unit = 100 / (stepNum - 1);

    var prefixCls = props.prefixCls;
    var stepClassName = prefixClsFn(prefixCls, 'step');

    var elements = [];
    for (var i = 0; i < stepNum; i++) {
      var offset = unit * i + '%';
      var style = {
        left: offset
      };
      var className = prefixClsFn(prefixCls, 'dot');
      if (props.isIncluded) {
        if (i <= this.getIndex()) {
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

  renderMark: function (i) {
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

    var prefixCls = this.props.prefixCls;
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

  renderMarks: function () {
    var marks = this.props.marks;
    var marksLen = marks.length;
    var elements = [];
    for (var i = 0; i < marksLen; i++) {
      elements[i] = this.renderMark(i);
    }

    var prefixCls = this.props.prefixCls;
    var className = prefixClsFn(prefixCls, 'mark');

    return (
      <div className={className}>
        {elements}
      </div>
    );
  },

  renderHandle: function (offset) {
    var handleStyle = {
      left: offset
    };

    var prefixCls = this.props.prefixCls;
    var className = prefixClsFn(prefixCls, 'handle');

    var handle = <div className={className}
      ref = "handle"
      style = {handleStyle}></div>;

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

  renderTrack: function (offset) {
    var style = {
      width: offset
    };

    var prefixCls = this.props.prefixCls;
    var trackClassName = prefixClsFn(prefixCls, 'track');

    return (
      <div className={trackClassName} ref="track" style={style}></div>
    );
  },

  render: function () {
    var state = this.state;
    var props = this.props;

    var value = state.value;
    var offset = this._calcOffset(value);

    var track = this.props.isIncluded ? this.renderTrack(offset) : null;
    var handles = this.renderHandle(offset);
    var steps = (props.step > 1 || props.marks.length > 0) ? this.renderSteps() : null;
    var sliderMarks = (props.marks.length > 0) ? this.renderMarks() : null;

    var prefixCls = props.prefixCls;
    var disabled = props.disabled;
    var sliderClassName = {
      [prefixCls]: 1,
      [props.className]: !!props.className,
      [`${prefixCls}-disabled`]: disabled
    };

    return (
      <div className={rcUtil.classSet(sliderClassName)} ref="slider"
        onTouchStart={disabled ? noop : this.handleTouchStart}
        onMouseDown={disabled ? noop : this.handleSliderMouseDown}>
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
