import { findDOMNode } from 'react-dom';
import React, { cloneElement } from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import Track from './Track';
import DefaultHandle from './Handle';
import Scale from './Scale';
import Marks from './Marks';
import warning from 'warning';

function noop() {
}

function isNotTouchEvent(e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

function getTouchPosition(e) {
  return e.touches[0].pageX;
}

function getMousePosition(e) {
  return e.pageX;
}

function getHandleCenterPosition(handle) {
  const coords = handle.getBoundingClientRect();
  return coords.left + (coords.width * 0.5);
}

function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    const { min, max, step } = props;
    const initialValue = min;
    const defaultValue = ('defaultValue' in props ? props.defaultValue : initialValue);
    const value = (props.value !== undefined ? props.value : defaultValue);

    const bounds = ([min, value]).map(v => this.trimAlignValue(v));

    const recent = bounds.length - 1;

    if (process.env.NODE_ENV !== 'production' &&
        step && Math.floor(step) === step &&
        (max - min) % step !== 0) {
      warning(
        false,
        'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)',
        max - min,
        step
      );
    }

    this.state = {
      handle: null,
      recent,
      bounds,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

    const { bounds } = this.state;
    const value = nextProps.value !== undefined ? nextProps.value : bounds[1];
    const nextValue = this.trimAlignValue(value, nextProps);
    if (nextValue === bounds[1] && bounds[0] === nextProps.min) return;

    this.setState({ bounds: [nextProps.min, nextValue] });
    if (this.isValueOutOfBounds(bounds[1], nextProps)) {
      this.props.onChange(nextValue);
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
    props.onChange(data.bounds[1]);
  }

  onMouseDown(e) {
    if (e.button !== 0) { return; }

    let position = getMousePosition(e);
    if (!this.isEventFromHandle(e)) {
      this.dragOffset = 0;
    } else {
      const handlePosition = getHandleCenterPosition(e.target);
      this.dragOffset = position - handlePosition;
      position = handlePosition;
    }
    this.onStart(position);
    this.addDocumentEvents('mouse');
    pauseEvent(e);
  }

  onMouseMove(e) {
    const position = getMousePosition(e);
    this.onMove(e, position - this.dragOffset);
  }

  onMove(e, position) {
    pauseEvent(e);
    const props = this.props;
    const state = this.state;

    let diffPosition = position - this.startPosition;
    const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

    const value = this.trimAlignValue(this.startValue + diffValue);
    const oldValue = state.bounds[state.handle];
    if (value === oldValue) return;

    const nextBounds = [...state.bounds];
    nextBounds[state.handle] = value;
    let nextHandle = state.handle;
    this.onChange({
      handle: nextHandle,
      bounds: nextBounds,
    });
  }

  onStart(position) {
    const props = this.props;
    props.onBeforeChange(this.getValue());

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    const state = this.state;
    const { bounds } = state;

    let valueNeedChanging = 1;

    this.setState({
      handle: valueNeedChanging,
      recent: valueNeedChanging,
    });

    const oldValue = state.bounds[valueNeedChanging];
    if (value === oldValue) return;

    const nextBounds = [...state.bounds];
    nextBounds[valueNeedChanging] = value;
    this.onChange({ bounds: nextBounds });
  }

  onTouchMove(e) {
    if (isNotTouchEvent(e)) {
      this.end('touch');
      return;
    }

    const position = getTouchPosition(e);
    this.onMove(e, position - this.dragOffset);
  }

  onTouchStart(e) {
    if (isNotTouchEvent(e)) return;

    let position = getTouchPosition(e);
    if (!this.isEventFromHandle(e)) {
      this.dragOffset = 0;
    } else {
      const handlePosition = getHandleCenterPosition(e.target);
      this.dragOffset = position - handlePosition;
      position = handlePosition;
    }
    this.onStart(position);
    this.addDocumentEvents('touch');
    pauseEvent(e);
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

  getPrecision(step) {
    const stepString = step.toString();
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
      precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
  }

  getSliderLength() {
    const slider = this.refs.slider;
    if (!slider) {
      return 0;
    }

    return slider.clientWidth;
  }

  getSliderStart() {
    const slider = this.refs.slider;
    const rect = slider.getBoundingClientRect();

    return rect.left;
  }

  getValue() {
    const { bounds } = this.state;
    return bounds[1];
  }

  addDocumentEvents(type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this.onTouchMoveListener =
        addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
      this.onTouchUpListener =
        addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
    } else if (type === 'mouse') {
      this.onMouseMoveListener =
        addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
      this.onMouseUpListener =
        addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
    }
  }

  calcOffset(value) {
    const { min, max } = this.props;
    const ratio = (value - min) / (max - min);
    return ratio * 100;
  }

  calcValue(offset) {
    const { min, max } = this.props;
    const ratio = Math.abs(offset / this.getSliderLength());
    const value = ratio * (max - min) + min;
    return value;
  }

  calcValueByPos(position) {
    const pixelOffset = position - this.getSliderStart();
    const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
    return nextValue;
  }

  end(type) {
    this.removeEvents(type);
    this.props.onAfterChange(this.getValue());
    this.setState({ handle: null });
  }

  isEventFromHandle(e) {
    return this.state.bounds.some((x, i) => (
        this.refs[`handle-${i}`] &&
        e.target === findDOMNode(this.refs[`handle-${i}`])
    ));
  }

  isValueOutOfBounds(value, props) {
    return value < props.min || value > props.max;
  }

  removeEvents(type) {
    if (type === 'touch') {
      this.onTouchMoveListener.remove();
      this.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      this.onMouseMoveListener.remove();
      this.onMouseUpListener.remove();
    }
  }

  trimAlignValue(v, nextProps) {
    const state = this.state || {};
    const { handle, bounds } = state;
    const { marks, step, min, max } = { ...this.props, ...(nextProps || {}) };

    let val = v;
    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }
    /* eslint-disable eqeqeq */
    if (handle != null && handle > 0 && val <= bounds[handle - 1]) {
      val = bounds[handle - 1];
    }
    if (handle != null && handle < bounds.length - 1 && val >= bounds[handle + 1]) {
      val = bounds[handle + 1];
    }
    /* eslint-enable eqeqeq */

    const points = Object.keys(marks).map(parseFloat);
    if (step !== null) {
      const closestStep = (Math.round((val - min) / step) * step) + min;
      points.push(closestStep);
    }

    const diffs = points.map((point) => Math.abs(val - point));
    const closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

    return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision(step))) : closestPoint;
  }

  render() {
    const {
        handle,
        bounds,
    } = this.state;
    const {
        className,
        prefixCls,
        disabled,
        dots,
        included,
        step,
        marks,
        max, min,
        children,
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

    const commonHandleProps = {
      prefixCls
    };

    const handles = bounds.map((v, i) => cloneElement(customHandle, {
      ...commonHandleProps,
      className: handlesClassNames[i],
      value: v,
      offset: offsets[i],
      dragging: handle === i,
      index: i,
      key: i,
      ref: `handle-${i}`,
    }));
    handles.shift();

    const isIncluded = included;

    const tracks = [];
    for (let i = 1; i < bounds.length; ++i) {
      const trackClassName = classNames({
        [`${prefixCls}-track`]: true,
        [`${prefixCls}-track-${i}`]: true,
      });
      tracks.push(
        <Track className={trackClassName} included={isIncluded}
          offset={offsets[i - 1]} length={offsets[i] - offsets[i - 1]} key={i}
        />
      );
    }

    const sliderClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-with-marks`]: Object.keys(marks).length,
      [`${prefixCls}-disabled`]: disabled,
      [className]: !!className,
    });

    return (
      <div ref="slider" className={sliderClassName}
        onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
        onMouseDown={disabled ? noop : this.onMouseDown.bind(this)}
      >
        <Scale prefixCls={prefixCls} marks={marks} dots={dots} step={step}
          included={isIncluded} handles={handles} tracks={tracks} lowerBound={bounds[0]}
          upperBound={bounds[bounds.length - 1]} max={max} min={min}
        />
        <Marks className={`${prefixCls}-mark`} marks={marks}
          included={isIncluded} lowerBound={bounds[0]}
          upperBound={bounds[bounds.length - 1]} max={max} min={min}
        />
        {children}
      </div>
    );
  }
}

Slider.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  defaultValue: React.PropTypes.number,
  value: React.PropTypes.number,
  marks: React.PropTypes.object,
  included: React.PropTypes.bool,
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.any,
  onBeforeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onAfterChange: React.PropTypes.func,
  handle: React.PropTypes.element,
  dots: React.PropTypes.bool,
};

Slider.defaultProps = {
  prefixCls: 'rc-slider',
  className: '',
  min: 0,
  max: 100,
  step: 1,
  marks: {},
  handle: <DefaultHandle />,
  onBeforeChange: noop,
  onChange: noop,
  onAfterChange: noop,
  included: true,
  disabled: false,
  dots: false,
};

export default Slider;
