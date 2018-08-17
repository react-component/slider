import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onEnd = function () {
      _this.setState({ dragging: false });
      _this.removeDocumentEvents();
      _this.props.onAfterChange(_this.getValue());
    };

    var defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    var value = props.value !== undefined ? props.value : defaultValue;

    _this.state = {
      value: _this.trimAlignValue(value),
      dragging: false
    };
    if (process.env.NODE_ENV !== 'production') {
      warning(!('minimumTrackStyle' in props), 'minimumTrackStyle will be deprecate, please use trackStyle instead.');
      warning(!('maximumTrackStyle' in props), 'maximumTrackStyle will be deprecate, please use railStyle instead.');
    }
    return _this;
  }

  Slider.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        autoFocus = _props.autoFocus,
        disabled = _props.disabled;

    if (autoFocus && !disabled) {
      this.focus();
    }
  };

  Slider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

    var prevValue = this.state.value;
    var value = nextProps.value !== undefined ? nextProps.value : prevValue;
    var nextValue = this.trimAlignValue(value, nextProps);
    if (nextValue === prevValue) return;

    this.setState({ value: nextValue });
    if (utils.isValueOutOfRange(value, nextProps)) {
      this.props.onChange(nextValue);
    }
  };

  Slider.prototype.onChange = function onChange(state) {
    var props = this.props;
    var isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    }
    props.onChange(state);
  };

  Slider.prototype.onStart = function onStart(position) {
    this.setState({ dragging: true });
    var props = this.props;
    var prevValue = this.getValue();
    props.onBeforeChange(prevValue);

    var value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    if (value === prevValue) return;

    this.prevMovedHandleIndex = 0;

    this.onChange({ value: value });
  };

  Slider.prototype.onMove = function onMove(e, position) {
    utils.pauseEvent(e);
    var oldValue = this.state.value;

    var value = this.calcValueByPos(position);
    if (value === oldValue) return;

    this.onChange({ value: value, source: 'slider' });
  };

  Slider.prototype.onKeyboard = function onKeyboard(e) {
    var valueMutator = utils.getKeyboardValueMutator(e);

    if (valueMutator) {
      utils.pauseEvent(e);
      var state = this.state;
      var oldValue = state.value;
      var mutatedValue = valueMutator(oldValue, this.props);
      var value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;

      this.onChange({ value: value, source: 'keyboard' });
    }
  };

  Slider.prototype.getValue = function getValue() {
    return this.state.value;
  };

  Slider.prototype.getLowerBound = function getLowerBound() {
    return this.props.min;
  };

  Slider.prototype.getUpperBound = function getUpperBound() {
    return this.state.value;
  };

  Slider.prototype.trimAlignValue = function trimAlignValue(v) {
    var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var mergedProps = _extends({}, this.props, nextProps);
    var val = utils.ensureValueInRange(v, mergedProps);
    return utils.ensureValuePrecision(val, mergedProps);
  };

  Slider.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        vertical = _props2.vertical,
        included = _props2.included,
        disabled = _props2.disabled,
        minimumTrackStyle = _props2.minimumTrackStyle,
        trackStyle = _props2.trackStyle,
        handleStyle = _props2.handleStyle,
        tabIndex = _props2.tabIndex,
        min = _props2.min,
        max = _props2.max,
        handleGenerator = _props2.handle;
    var _state = this.state,
        value = _state.value,
        dragging = _state.dragging;

    var offset = this.calcOffset(value);
    var handle = handleGenerator({
      className: prefixCls + '-handle',
      prefixCls: prefixCls,
      vertical: vertical,
      offset: offset,
      value: value,
      dragging: dragging,
      disabled: disabled,
      min: min,
      max: max,
      index: 0,
      tabIndex: tabIndex,
      style: handleStyle[0] || handleStyle,
      ref: function ref(h) {
        return _this2.saveHandle(0, h);
      }
    });

    var _trackStyle = trackStyle[0] || trackStyle;
    var track = React.createElement(Track, {
      className: prefixCls + '-track',
      vertical: vertical,
      included: included,
      offset: 0,
      length: offset,
      style: _extends({}, minimumTrackStyle, _trackStyle)
    });

    return { tracks: track, handles: handle };
  };

  return Slider;
}(React.Component);

Slider.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  tabIndex: PropTypes.number
};


export default createSlider(Slider);