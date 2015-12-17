import React from 'react';
import {Dom as DomUtils} from 'rc-util';
import classNames from 'classnames';
import objectAssign from 'object-assign';
import Track from './Track';
import Handle from './Handle';
import Dots from './Dots';
import Marks from './Marks';

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

function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    const {range, min, max} = props;
    const initialValue = range ? [min, min] : min;
    const defaultValue = ('defaultValue' in props ? props.defaultValue : initialValue);
    const value = ('value' in props ? props.value : defaultValue);

    let upperBound;
    let lowerBound;
    if (props.range) {
      lowerBound = this.trimAlignValue(value[0]);
      upperBound = this.trimAlignValue(value[1]);
    } else {
      upperBound = this.trimAlignValue(value);
    }

    let recent;
    if (props.range && upperBound === lowerBound) {
      if (lowerBound === max) {
        recent = 'lowerBound';
      }
      if (upperBound === min) {
        recent = 'upperBound';
      }
    } else {
      recent = 'upperBound';
    }

    this.state = {
      handle: null,
      recent: recent,
      upperBound: upperBound,
      // If Slider is not range, set `lowerBound` equal to `min`.
      lowerBound: (lowerBound || min),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

    const {lowerBound, upperBound} = this.state;
    if (nextProps.range) {
      const value = nextProps.value || [lowerBound, upperBound];
      const nextUpperBound = this.trimAlignValue(value[1], nextProps);
      const nextLowerBound = this.trimAlignValue(value[0], nextProps);
      if (nextLowerBound === lowerBound && nextUpperBound === upperBound) return;

      this.setState({
        upperBound: nextUpperBound,
        lowerBound: nextLowerBound,
      });
      if (this.isValueOutOfBounds(upperBound, nextProps) ||
          this.isValueOutOfBounds(lowerBound, nextProps)) {
        this.props.onChange([nextLowerBound, nextUpperBound]);
      }
    } else {
      const value = 'value' in nextProps ? nextProps.value : upperBound;
      const nextValue = this.trimAlignValue(value, nextProps);
      if (nextValue === upperBound && lowerBound === nextProps.min) return;

      this.setState({
        upperBound: nextValue,
        lowerBound: nextProps.min,
      });
      if (this.isValueOutOfBounds(upperBound, nextProps)) {
        this.props.onChange(nextValue);
      }
    }
  }

  onChange(state) {
    const props = this.props;
    const isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    } else if (state.handle) {
      this.setState({handle: state.handle});
    }

    const data = objectAssign({}, this.state, state);
    const changedValue = props.range ? [data.lowerBound, data.upperBound] : data.upperBound;
    props.onChange(changedValue);
  }

  onMouseMove(e) {
    const position = getMousePosition(e);
    this.onMove(e, position);
  }

  onTouchMove(e) {
    if (isNotTouchEvent(e)) {
      this.end('touch');
      return;
    }

    const position = getTouchPosition(e);
    this.onMove(e, position);
  }

  onMove(e, position) {
    pauseEvent(e);
    const props = this.props;
    const state = this.state;

    const diffPosition = position - this.startPosition;
    const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

    const value = this.trimAlignValue(this.startValue + diffValue);
    const oldValue = state[state.handle];
    if (value === oldValue) return;

    if (props.allowCross && value < state.lowerBound && state.handle === 'upperBound') {
      this.onChange({
        handle: 'lowerBound',
        lowerBound: value,
        upperBound: this.state.lowerBound,
      });
      return;
    }
    if (props.allowCross && value > state.upperBound && state.handle === 'lowerBound') {
      this.onChange({
        handle: 'upperBound',
        upperBound: value,
        lowerBound: this.state.upperBound,
      });
      return;
    }

    this.onChange({
      [state.handle]: value,
    });
  }

  onTouchStart(e) {
    if (isNotTouchEvent(e)) return;

    const position = getTouchPosition(e);
    this.onStart(position);
    this.addDocumentEvents('touch');
    pauseEvent(e);
  }

  onMouseDown(e) {
    const position = getMousePosition(e);
    this.onStart(position);
    this.addDocumentEvents('mouse');
    pauseEvent(e);
  }

  onStart(position) {
    const props = this.props;
    props.onBeforeChange(this.getValue());

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    const state = this.state;
    const {upperBound, lowerBound} = state;

    let valueNeedChanging = 'upperBound';
    if (this.props.range) {
      const isLowerBoundCloser = Math.abs(upperBound - value) > Math.abs(lowerBound - value);
      if (isLowerBoundCloser) {
        valueNeedChanging = 'lowerBound';
      }

      const isAtTheSamePoint = (upperBound === lowerBound);
      if (isAtTheSamePoint) {
        valueNeedChanging = state.recent;
      }

      if (isAtTheSamePoint && (value !== upperBound)) {
        valueNeedChanging = value < upperBound ? 'lowerBound' : 'upperBound';
      }
    }

    this.setState({
      handle: valueNeedChanging,
      recent: valueNeedChanging,
    });

    const oldValue = state[valueNeedChanging];
    if (value === oldValue) return;

    this.onChange({
      [valueNeedChanging]: value,
    });
  }

  getValue() {
    const {lowerBound, upperBound} = this.state;
    return this.props.range ? [lowerBound, upperBound] : upperBound;
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

  getPrecision() {
    const props = this.props;
    const stepString = props.step.toString();
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
      precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
  }

  isValueOutOfBounds(value, props) {
    return value < props.min || value > props.max;
  }

  trimAlignValue(v, nextProps) {
    const state = this.state || {};
    const {handle, lowerBound, upperBound} = state;
    const {marks, step, min, max, allowCross} = objectAssign({}, this.props, nextProps || {});

    let val = v;
    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }
    if (!allowCross && handle === 'upperBound' && val <= lowerBound) {
      val = lowerBound;
    }
    if (!allowCross && handle === 'lowerBound' && val >= upperBound) {
      val = upperBound;
    }

    const points = Object.keys(marks).map(parseFloat);
    if (step !== null) {
      const closestStep = Math.round(val / step) * step;
      points.push(closestStep);
    }

    const diffs = points.map((point) => Math.abs(val - point));
    const closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

    return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision())) : closestPoint;
  }

  calcOffset(value) {
    const {min, max} = this.props;
    const ratio = (value - min) / (max - min);
    return ratio * 100;
  }

  calcValue(offset) {
    const {min, max} = this.props;
    const ratio = offset / this.getSliderLength();
    return ratio * (max - min) + min;
  }

  calcValueByPos(position) {
    const pixelOffset = position - this.getSliderStart();
    const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
    return nextValue;
  }

  addDocumentEvents(type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this.onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
      this.onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
    } else if (type === 'mouse') {
      this.onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
      this.onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
    }
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

  end(type) {
    this.removeEvents(type);
    this.props.onAfterChange(this.getValue());
    this.setState({handle: null});
  }

  render() {
    const {handle, upperBound, lowerBound} = this.state;
    const {className, prefixCls, disabled, dots, included, range, step,
           marks, max, min, tipTransitionName, tipFormatter, children} = this.props;

    const upperOffset = this.calcOffset(upperBound);
    const lowerOffset = this.calcOffset(lowerBound);

    const handleClassName = prefixCls + '-handle';
    const isNoTip = (step === null) || (tipFormatter === null);

    const upper = (<Handle className={handleClassName}
                           noTip={isNoTip} tipTransitionName={tipTransitionName} tipFormatter={tipFormatter}
                           offset={upperOffset} value={upperBound} dragging={handle === 'upperBound'} />);

    let lower = null;
    if (range) {
      lower = (<Handle className={handleClassName}
                       noTip={isNoTip} tipTransitionName={tipTransitionName} tipFormatter={tipFormatter}
                       offset={lowerOffset} value={lowerBound} dragging={handle === 'lowerBound'} />);
    }

    const sliderClassName = classNames({
      [prefixCls]: true,
      [prefixCls + '-disabled']: disabled,
      [className]: !!className,
    });
    const isIncluded = included || range;
    return (
      <div ref="slider" className={sliderClassName}
           onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
           onMouseDown={disabled ? noop : this.onMouseDown.bind(this)}>
        {upper}
        {lower}
        <Track className={prefixCls + '-track'} included={isIncluded}
               offset={lowerOffset} length={upperOffset - lowerOffset}/>
        <Dots prefixCls={prefixCls} marks={marks} dots={dots} step={step}
              included={isIncluded} lowerBound={lowerBound}
              upperBound={upperBound} max={max} min={min} />
        <Marks className={prefixCls + '-mark'} marks={marks}
               included={isIncluded} lowerBound={lowerBound}
               upperBound={upperBound} max={max} min={min} />
        {children}
      </div>
    );
  }
}

Slider.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  marks: React.PropTypes.object,
  included: React.PropTypes.bool,
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.any,
  onBeforeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onAfterChange: React.PropTypes.func,
  tipTransitionName: React.PropTypes.string,
  tipFormatter: React.PropTypes.func,
  dots: React.PropTypes.bool,
  range: React.PropTypes.bool,
  allowCross: React.PropTypes.bool,
};

Slider.defaultProps = {
  prefixCls: 'rc-slider',
  className: '',
  tipTransitionName: '',
  min: 0,
  max: 100,
  step: 1,
  marks: {},
  onBeforeChange: noop,
  onChange: noop,
  onAfterChange: noop,
  included: true,
  disabled: false,
  dots: false,
  range: false,
  allowCross: true,
};

export default Slider;
