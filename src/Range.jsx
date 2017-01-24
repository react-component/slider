/* eslint-disable react/prop-types */
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import Track from './Track';
import createSlider from './createSlider';
import * as utils from './utils';

class Range extends React.Component {
  constructor(props) {
    super(props);

    const { range = 1, min, max } = props;
    const initialValue = Array.apply(null, Array(range + 1))
            .map(() => min);
    const defaultValue = 'defaultValue' in props ?
            props.defaultValue : initialValue;
    const value = props.value !== undefined ?
            props.value : defaultValue;
    const bounds = value.map(v => this.trimAlignValue(v));
    const recent = bounds[0] === max ? 0 : bounds.length - 1;

    this.state = {
      handle: null,
      recent,
      bounds,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

    const { bounds } = this.state;
    const value = nextProps.value || bounds;
    const nextBounds = value.map(v => this.trimAlignValue(v, nextProps));
    if (nextBounds.every((v, i) => v === bounds[i])) return;

    this.setState({ bounds: nextBounds });
    if (bounds.some(v => utils.isValueOutOfRange(v, nextProps))) {
      this.props.onChange(nextBounds);
    }
  }

  onChange(state) {
    const props = this.props;
    const isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    } else if (state.handle !== undefined) {
      this.setState({ handle: state.handle });
    }

    const data = { ...this.state, ...state };
    const changedValue = data.bounds;
    props.onChange(changedValue);
  }

  onStart(position) {
    const props = this.props;
    const state = this.state;
    const bounds = this.getValue();
    props.onBeforeChange(bounds);

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    let valueNeedChanging = 1;
    let closestBound = 0;
    for (let i = 1; i < bounds.length - 1; ++i) {
      if (value > bounds[i]) { closestBound = i; }
    }
    if (Math.abs(bounds[closestBound + 1] - value) < Math.abs(bounds[closestBound] - value)) {
      closestBound = closestBound + 1;
    }
    valueNeedChanging = closestBound;

    const isAtTheSamePoint = (bounds[closestBound + 1] === bounds[closestBound]);
    if (isAtTheSamePoint) {
      valueNeedChanging = state.recent;
    }

    if (isAtTheSamePoint && (value !== bounds[closestBound + 1])) {
      valueNeedChanging = value < bounds[closestBound + 1] ? closestBound : closestBound + 1;
    }

    this.setState({
      handle: valueNeedChanging,
      recent: valueNeedChanging,
    });

    const oldValue = bounds[valueNeedChanging];
    if (value === oldValue) return;

    const nextBounds = [...state.bounds];
    nextBounds[valueNeedChanging] = value;
    this.onChange({ bounds: nextBounds });
  }

  onMove(e, position) {
    utils.pauseEvent(e);
    const props = this.props;
    const state = this.state;

    let diffPosition = position - this.startPosition;
    diffPosition = this.props.vertical ? -diffPosition : diffPosition;
    const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

    const value = this.trimAlignValue(this.startValue + diffValue);
    const oldValue = state.bounds[state.handle];
    if (value === oldValue) return;

    const nextBounds = [...state.bounds];
    nextBounds[state.handle] = value;
    let nextHandle = state.handle;
    if (props.pushable !== false) {
      const originalValue = state.bounds[nextHandle];
      this.pushSurroundingHandles(nextBounds, nextHandle, originalValue);
    } else if (props.allowCross) {
      nextBounds.sort((a, b) => a - b);
      nextHandle = nextBounds.indexOf(value);
    }
    this.onChange({
      handle: nextHandle,
      bounds: nextBounds,
    });
  }

  getValue() {
    return this.state.bounds;
  }

  /**
   * Returns an array of possible slider points, taking into account both
   * `marks` and `step`. The result is cached.
   */
  getPoints() {
    const { marks, step, min, max } = this.props;
    const cache = this._getPointsCache;
    if (!cache || cache.marks !== marks || cache.step !== step) {
      const pointsObject = { ...marks };
      if (step !== null) {
        for (let point = min; point <= max; point += step) {
          pointsObject[point] = point;
        }
      }
      const points = Object.keys(pointsObject).map(parseFloat);
      points.sort((a, b) => a - b);
      this._getPointsCache = { marks, step, points };
    }
    return this._getPointsCache.points;
  }

  getLowerBound() {
    return this.state.bounds[0];
  }

  getUpperBound() {
    const { bounds } = this.state;
    return bounds[bounds.length - 1];
  }

  pushSurroundingHandles(bounds, handle, originalValue) {
    const { pushable: threshold } = this.props;
    const value = bounds[handle];

    let direction = 0;
    if (bounds[handle + 1] - value < threshold) {
      direction = +1;
    } else if (value - bounds[handle - 1] < threshold) {
      direction = -1;
    }

    if (direction === 0) { return; }

    const nextHandle = handle + direction;
    const diffToNext = direction * (bounds[nextHandle] - value);
    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // revert to original value if pushing is impossible
      bounds[handle] = originalValue;
    }
  }

  pushHandle(bounds, handle, direction, amount) {
    const originalValue = bounds[handle];
    let currentValue = bounds[handle];
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
  }

  pushHandleOnePoint(bounds, handle, direction) {
    const points = this.getPoints();
    const pointIndex = points.indexOf(bounds[handle]);
    const nextPointIndex = pointIndex + direction;
    if (nextPointIndex >= points.length || nextPointIndex < 0) {
      // reached the minimum or maximum available point, can't push anymore
      return false;
    }
    const nextHandle = handle + direction;
    const nextValue = points[nextPointIndex];
    const { pushable: threshold } = this.props;
    const diffToNext = direction * (bounds[nextHandle] - nextValue);
    if (!this.pushHandle(bounds, nextHandle, direction, threshold - diffToNext)) {
      // couldn't push next handle, so we won't push this one either
      return false;
    }
    // push the handle
    bounds[handle] = nextValue;
    return true;
  }

  trimAlignValue(v, nextProps = {}) {
    const state = this.state || {};
    const { handle, bounds } = state;
    const mergedProps = { ...this.props, ...nextProps };
    const { step, min, max, allowCross } = mergedProps;
    let val = v;
    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }
    /* eslint-disable eqeqeq */
    if (!allowCross && handle != null) {
      // value should not smaller than left-most handle's
      if (handle > 0 && val <= bounds[handle - 1]) {
        val = bounds[handle - 1];
      }
      // value should not greater than right-most handle's
      if (handle < bounds.length - 1 && val >= bounds[handle + 1]) {
        val = bounds[handle + 1];
      }
    }
    /* eslint-enable eqeqeq */
    const closestPoint = utils.getClosestPoint(val, mergedProps);
    return step === null ? closestPoint :
      parseFloat(closestPoint.toFixed(utils.getPrecision(step)));
  }

  render() {
    const {
      handle,
      bounds,
    } = this.state;
    const {
      prefixCls,
      tooltipPrefixCls,
      vertical,
      included,
      step,
      tipTransitionName,
      tipFormatter,
    } = this.props;

    const customHandle = this.props.handle;

    const offsets = bounds.map(v => this.calcOffset(v));

    const handleClassName = `${prefixCls}-handle`;

    const handlesClassNames = bounds.map((v, i) => classNames({
      [handleClassName]: true,
      [`${handleClassName}-${i + 1}`]: true,
      [`${handleClassName}-lower`]: i === 0,
      [`${handleClassName}-upper`]: i === bounds.length - 1,
    }));

    const isNoTip = (step === null) || (tipFormatter === null);

    const commonHandleProps = {
      prefixCls,
      tooltipPrefixCls,
      noTip: isNoTip,
      tipTransitionName,
      tipFormatter,
      vertical,
    };

    const handles = bounds.map((v, i) => cloneElement(customHandle, {
      ...commonHandleProps,
      className: handlesClassNames[i],
      value: v,
      offset: offsets[i],
      dragging: handle === i,
      index: i,
      key: i,
      ref: h => this.saveHandle(i, h),
    }));

    const tracks = [];
    for (let i = 1; i < bounds.length; ++i) {
      const trackClassName = classNames({
        [`${prefixCls}-track`]: true,
        [`${prefixCls}-track-${i}`]: true,
      });
      tracks.push(
        <Track
          className={trackClassName}
          vertical={vertical}
          included={included}
          offset={offsets[i - 1]}
          length={offsets[i] - offsets[i - 1]}
          key={i}
        />
      );
    }

    return { tracks, handles };
  }
}

export default createSlider(Range);
