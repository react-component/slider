import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';

var Range = function (_React$Component) {
  _inherits(Range, _React$Component);

  function Range(props) {
    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onEnd = function () {
      _this.removeDocumentEvents();
      _this.props.onAfterChange(_this.getValue());
    };

    var count = props.count,
        min = props.min,
        max = props.max;

    var initialValue = Array.apply(null, Array(count + 1)).map(function () {
      return min;
    });
    var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
    var value = props.value !== undefined ? props.value : defaultValue;
    var bounds = value.map(function (v, i) {
      return _this.trimAlignValue(v, i);
    });
    var recent = bounds[0] === max ? 0 : bounds.length - 1;

    _this.state = {
      handle: null,
      recent: recent,
      bounds: bounds
    };
    return _this;
  }

  Range.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;
    if (this.props.min === nextProps.min && this.props.max === nextProps.max && shallowEqual(this.props.value, nextProps.value)) {
      return;
    }

    var bounds = this.state.bounds;

    var value = nextProps.value || bounds;
    var nextBounds = value.map(function (v, i) {
      return _this2.trimAlignValue(v, i, nextProps);
    });
    if (nextBounds.length === bounds.length && nextBounds.every(function (v, i) {
      return v === bounds[i];
    })) return;

    this.setState({ bounds: nextBounds });

    if (bounds.some(function (v) {
      return utils.isValueOutOfRange(v, nextProps);
    })) {
      var newValues = value.map(function (v) {
        return utils.ensureValueInRange(v, nextProps);
      });
      this.props.onChange(newValues);
    }
  };

  Range.prototype.onChange = function onChange(state) {
    var props = this.props;
    var isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    } else if (state.handle !== undefined) {
      this.setState({ handle: state.handle });
    }

    var data = _extends({}, this.state, state);
    var changedValue = data.bounds;
    props.onChange(changedValue);
  };

  Range.prototype.onStart = function onStart(position) {
    var props = this.props;
    var state = this.state;
    var bounds = this.getValue();
    props.onBeforeChange(bounds);

    var value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    var closestBound = this.getClosestBound(value);
    this.prevMovedHandleIndex = this.getBoundNeedMoving(value, closestBound);

    this.setState({
      handle: this.prevMovedHandleIndex,
      recent: this.prevMovedHandleIndex
    });

    var prevValue = bounds[this.prevMovedHandleIndex];
    if (value === prevValue) return;

    var nextBounds = [].concat(state.bounds);
    nextBounds[this.prevMovedHandleIndex] = value;
    this.onChange({ bounds: nextBounds });
  };

  Range.prototype.onMove = function onMove(e, position) {
    utils.pauseEvent(e);
    var state = this.state;

    var value = this.calcValueByPos(position);
    var oldValue = state.bounds[state.handle];
    if (value === oldValue) return;

    this.moveTo(value);
  };

  Range.prototype.onKeyboard = function onKeyboard(e) {
    var valueMutator = utils.getKeyboardValueMutator(e);

    if (valueMutator) {
      utils.pauseEvent(e);
      var state = this.state,
          props = this.props;
      var bounds = state.bounds,
          handle = state.handle;

      var oldValue = bounds[handle];
      var mutatedValue = valueMutator(oldValue, props);
      var value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;
      var isFromKeyboardEvent = true;
      this.moveTo(value, isFromKeyboardEvent);
    }
  };

  Range.prototype.getValue = function getValue() {
    return this.state.bounds;
  };

  Range.prototype.getClosestBound = function getClosestBound(value) {
    var bounds = this.state.bounds;

    var closestBound = 0;
    for (var i = 1; i < bounds.length - 1; ++i) {
      if (value > bounds[i]) {
        closestBound = i;
      }
    }
    if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
      closestBound = closestBound + 1;
    }
    return closestBound;
  };

  Range.prototype.getBoundNeedMoving = function getBoundNeedMoving(value, closestBound) {
    var _state = this.state,
        bounds = _state.bounds,
        recent = _state.recent;

    var boundNeedMoving = closestBound;
    var isAtTheSamePoint = bounds[closestBound + 1] === bounds[closestBound];

    if (isAtTheSamePoint && bounds[recent] === bounds[closestBound]) {
      boundNeedMoving = recent;
    }

    if (isAtTheSamePoint && value !== bounds[closestBound + 1]) {
      boundNeedMoving = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
    }
    return boundNeedMoving;
  };

  Range.prototype.getLowerBound = function getLowerBound() {
    return this.state.bounds[0];
  };

  Range.prototype.getUpperBound = function getUpperBound() {
    var bounds = this.state.bounds;

    return bounds[bounds.length - 1];
  };

  /**
   * Returns an array of possible slider points, taking into account both
   * `marks` and `step`. The result is cached.
   */


  Range.prototype.getPoints = function getPoints() {
    var _props = this.props,
        marks = _props.marks,
        step = _props.step,
        min = _props.min,
        max = _props.max;

    var cache = this._getPointsCache;
    if (!cache || cache.marks !== marks || cache.step !== step) {
      var pointsObject = _extends({}, marks);
      if (step !== null) {
        for (var point = min; point <= max; point += step) {
          pointsObject[point] = point;
        }
      }
      var points = Object.keys(pointsObject).map(parseFloat);
      points.sort(function (a, b) {
        return a - b;
      });
      this._getPointsCache = { marks: marks, step: step, points: points };
    }
    return this._getPointsCache.points;
  };

  Range.prototype.moveTo = function moveTo(value, isFromKeyboardEvent) {
    var _this3 = this;

    var state = this.state,
        props = this.props;

    var nextBounds = [].concat(state.bounds);
    nextBounds[state.handle] = value;
    var nextHandle = state.handle;
    if (props.pushable !== false) {
      this.pushSurroundingHandles(nextBounds, nextHandle);
    } else if (props.allowCross) {
      nextBounds.sort(function (a, b) {
        return a - b;
      });
      nextHandle = nextBounds.indexOf(value);
    }
    this.onChange({
      handle: nextHandle,
      bounds: nextBounds
    });
    if (isFromKeyboardEvent) {
      // known problem: because setState is async,
      // so trigger focus will invoke handler's onEnd and another handler's onStart too early,
      // cause onBeforeChange and onAfterChange receive wrong value.
      // here use setState callback to hack，but not elegant
      this.setState({}, function () {
        _this3.handlesRefs[nextHandle].focus();
      });
    }
  };

  Range.prototype.pushSurroundingHandles = function pushSurroundingHandles(bounds, handle) {
    var value = bounds[handle];
    var threshold = this.props.pushable;

    threshold = Number(threshold);

    var direction = 0;
    if (bounds[handle + 1] - value < threshold) {
      direction = +1; // push to right
    }
    if (value - bounds[handle - 1] < threshold) {
      direction = -1; // push to left
    }

    if (direction === 0) {
      return;
    }

    var nextHandle = handle + direction;
    var diffToNext = direction * (bounds[nextHandle] - value);
    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // revert to original value if pushing is impossible
      bounds[handle] = bounds[nextHandle] - direction * threshold;
    }
  };

  Range.prototype.pushHandle = function pushHandle(bounds, handle, direction, amount) {
    var originalValue = bounds[handle];
    var currentValue = bounds[handle];
    while (direction * (currentValue - originalValue) < amount) {
      if (!this.pushHandleOnePoint(bounds, handle, direction)) {
        // can't push handle enough to create the needed `amount` gap, so we
        // revert its position to the original value
        bounds[handle] = originalValue;
        return false;
      }
      currentValue = bounds[handle];
    }
    // the handle was pushed enough to create the needed `amount` gap
    return true;
  };

  Range.prototype.pushHandleOnePoint = function pushHandleOnePoint(bounds, handle, direction) {
    var points = this.getPoints();
    var pointIndex = points.indexOf(bounds[handle]);
    var nextPointIndex = pointIndex + direction;
    if (nextPointIndex >= points.length || nextPointIndex < 0) {
      // reached the minimum or maximum available point, can't push anymore
      return false;
    }
    var nextHandle = handle + direction;
    var nextValue = points[nextPointIndex];
    var threshold = this.props.pushable;

    var diffToNext = direction * (bounds[nextHandle] - nextValue);
    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // couldn't push next handle, so we won't push this one either
      return false;
    }
    // push the handle
    bounds[handle] = nextValue;
    return true;
  };

  Range.prototype.trimAlignValue = function trimAlignValue(v, handle) {
    var nextProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var mergedProps = _extends({}, this.props, nextProps);
    var valInRange = utils.ensureValueInRange(v, mergedProps);
    var valNotConflict = this.ensureValueNotConflict(handle, valInRange, mergedProps);
    return utils.ensureValuePrecision(valNotConflict, mergedProps);
  };

  Range.prototype.ensureValueNotConflict = function ensureValueNotConflict(handle, val, _ref) {
    var allowCross = _ref.allowCross,
        thershold = _ref.pushable;

    var state = this.state || {};
    var bounds = state.bounds;

    handle = handle === undefined ? state.handle : handle;
    thershold = Number(thershold);
    /* eslint-disable eqeqeq */
    if (!allowCross && handle != null && bounds !== undefined) {
      if (handle > 0 && val <= bounds[handle - 1] + thershold) {
        return bounds[handle - 1] + thershold;
      }
      if (handle < bounds.length - 1 && val >= bounds[handle + 1] - thershold) {
        return bounds[handle + 1] - thershold;
      }
    }
    /* eslint-enable eqeqeq */
    return val;
  };

  Range.prototype.render = function render() {
    var _this4 = this;

    var _state2 = this.state,
        handle = _state2.handle,
        bounds = _state2.bounds;
    var _props2 = this.props,
        prefixCls = _props2.prefixCls,
        vertical = _props2.vertical,
        included = _props2.included,
        disabled = _props2.disabled,
        min = _props2.min,
        max = _props2.max,
        handleGenerator = _props2.handle,
        trackStyle = _props2.trackStyle,
        handleStyle = _props2.handleStyle,
        tabIndex = _props2.tabIndex;


    var offsets = bounds.map(function (v) {
      return _this4.calcOffset(v);
    });

    var handleClassName = prefixCls + '-handle';
    var handles = bounds.map(function (v, i) {
      var _classNames;

      return handleGenerator({
        className: classNames((_classNames = {}, _classNames[handleClassName] = true, _classNames[handleClassName + '-' + (i + 1)] = true, _classNames)),
        prefixCls: prefixCls,
        vertical: vertical,
        offset: offsets[i],
        value: v,
        dragging: handle === i,
        index: i,
        tabIndex: tabIndex[i] || 0,
        min: min,
        max: max,
        disabled: disabled,
        style: handleStyle[i],
        ref: function ref(h) {
          return _this4.saveHandle(i, h);
        }
      });
    });

    var tracks = bounds.slice(0, -1).map(function (_, index) {
      var _classNames2;

      var i = index + 1;
      var trackClassName = classNames((_classNames2 = {}, _classNames2[prefixCls + '-track'] = true, _classNames2[prefixCls + '-track-' + i] = true, _classNames2));
      return React.createElement(Track, {
        className: trackClassName,
        vertical: vertical,
        included: included,
        offset: offsets[i - 1],
        length: offsets[i] - offsets[i - 1],
        style: trackStyle[index],
        key: i
      });
    });

    return { tracks: tracks, handles: handles };
  };

  return Range;
}(React.Component);

Range.displayName = 'Range';
Range.propTypes = {
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  value: PropTypes.arrayOf(PropTypes.number),
  count: PropTypes.number,
  pushable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  allowCross: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.arrayOf(PropTypes.number)
};
Range.defaultProps = {
  count: 1,
  allowCross: true,
  pushable: false,
  tabIndex: []
};


export default createSlider(Range);