import React from 'react';
import {Dom as DomUtils, classSet} from 'rc-util';
import Track from './Track';
import Handle from './Handle';
import Steps from './Steps';
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

function isEmpty(collection) {
  return Object.keys(collection).length === 0;
}

// This is an utility method, tries to get property, then defaultPropery with
// special check using 'in', because propery can be '0'
function propOrDefault(props, name, fallback) {
  const defaultName = 'default' + name.charAt(0).toUpperCase() + name.substring(1);
  const defaultValue = (defaultName in props ? props[defaultName] : fallback);
  return (name in props ? props[name] : defaultValue);
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    let upperBound;
    let lowerBound;
    const initialValue = props.range ? [0, 0] : 0;
    if (!isEmpty(props.marks)) {
      const index = propOrDefault(props, 'index', initialValue);
      ({lowerBound, upperBound} = this.getBoundsFromIndex(index, props));
    } else {
      const value = propOrDefault(props, 'value', initialValue);
      if (props.range) {
        lowerBound = this.trimAlignValue(value[0]);
        upperBound = this.trimAlignValue(value[1]);
      } else {
        upperBound = this.trimAlignValue(value);
      }
    }

    let recent;
    if (props.range && upperBound === lowerBound) {
      if (lowerBound === props.max) {
        recent = 'lowerBound';
      }
      if (upperBound === props.min) {
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
      lowerBound: (lowerBound || props.min),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.range) {
      const value = nextProps.value;
      if (value) {
        this.setState({
          upperBound: value[1],
          lowerBound: value[0],
        });
      }
    } else if ('value' in nextProps) {
      this.setState({
        upperBound: nextProps.value,
      });
    } else if ('index' in nextProps) {
      const index = ('index' in nextProps ? nextProps.index : nextProps.defaultIndex);
      this.setState(this.getBoundsFromIndex(index, nextProps));
    }
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

    // If it is not controlled component
    if (!('value' in props) && !('index' in props)) {
      this.setState({[state.handle]: value}, () => {
        this.triggerEvents('onChange', this.getValue());
      });
    } else {
      this.triggerEvents('onChange', this.getChangedValue(state.handle, value));
    }
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
    this.triggerEvents('onBeforeChange', this.getValue());

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

    const props = this.props;
    // If it is not controlled component
    if (!('value' in props) && !('index' in props)) {
      this.setState({
        [valueNeedChanging]: value,
      }, () => {
        this.triggerEvents('onChange', this.getValue());
      });
    } else {
      this.triggerEvents('onChange', this.getChangedValue(valueNeedChanging, value));
    }
  }

  getValue() {
    const {lowerBound, upperBound} = this.state;
    return this.props.range ? [lowerBound, upperBound] : upperBound;
  }

  getChangedValue(valueNeedChanging, value) {
    const state = this.state;
    const data = {
      upperBound: state.upperBound,
      lowerBound: state.lowerBound,
    };
    data[valueNeedChanging] = value;
    return this.props.range ? [data.lowerBound, data.upperBound] : data.upperBound;
  }

  getIndex(value) {
    const {marks, min, max, step} = this.props;

    if (isEmpty(marks)) {
      return Math.floor((value - min) / step);
    }
    const unit = ((max - min) / (Object.keys(marks).length - 1)).toFixed(5);
    return Math.round(value / unit);
  }

  getBoundsFromIndex(indexes, props) {
    if (props.range) {
      return {
        lowerBound: this.calcValueFromIndex(indexes[0], props),
        upperBound: this.calcValueFromIndex(indexes[1], props),
      };
    }
    return {
      upperBound: this.calcValueFromIndex(indexes, props),
    };
  }

  getPoints() {
    const {marks, step, min, max} = this.props;
    const points = new Set(Object.keys(marks));
    if (isEmpty(marks) || step > 1) {
      for (let i = min; i <= max; i = i + step) {
        points.add(i);
      }
    }
    return Array.from(points);
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

  trimAlignValue(v) {
    const state = this.state || {};
    const {handle, lowerBound, upperBound} = state;
    const {min, max} = this.props;

    let val = v;
    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }
    if (handle === 'upperBound' && val <= lowerBound) {
      val = lowerBound;
    }
    if (handle === 'lowerBound' && val >= upperBound) {
      val = upperBound;
    }

    const points = this.getPoints().map(parseFloat);
    const diffs = points.map((point) => Math.abs(val - point));
    const closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

    return closestPoint;
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

  calcValueFromIndex(index, props) {
    const marksCount = Object.keys(props.marks).length;
    if (marksCount > 0) {
      const value = ((props.max - props.min) / (marksCount - 1)) * (index);
      return parseFloat(value.toFixed(5));
    }
    return ('value' in props ? props.value : props.defaultValue);
  }

  triggerEvents(event, v) {
    const props = this.props;
    const hasMarks = !isEmpty(props.marks);
    if (props[event]) {
      let data;
      if (hasMarks) {
        if (props.range) {
          data = v.map(bound => this.getIndex(bound));
        } else {
          data = this.getIndex(v);
        }
      } else if (v === undefined) {
        data = this.state.value;
      } else {
        data = v;
      }
      props[event](data);
    }
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

  removeEventons(type) {
    if (type === 'touch') {
      this.onTouchMoveListener.remove();
      this.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      this.onMouseMoveListener.remove();
      this.onMouseUpListener.remove();
    }
  }

  end(type) {
    this.removeEventons(type);
    this.triggerEvents('onAfterChange', this.getValue());
    this.setState({handle: null});
  }

  render() {
    const {handle, upperBound, lowerBound} = this.state;
    const {className, prefixCls, disabled, dots, included, range,
           marks, max, min, tipTransitionName, tipFormatter, children} = this.props;
    const marksCount = Object.keys(marks).length;

    const sliderClassName = classSet({
      [prefixCls]: true,
      [prefixCls + '-disabled']: disabled,
      [className]: !!className,
    });

    const upperOffset = this.calcOffset(upperBound);
    const lowerOffset = this.calcOffset(lowerBound);

    let track = null;
    if (included || range) {
      const trackClassName = prefixCls + '-track';
      track = <Track className={trackClassName} offset={lowerOffset} length={upperOffset - lowerOffset}/>;
    }

    const handleClassName = prefixCls + '-handle';
    const isNoTip = (marksCount > 0) && !tipFormatter;
    const upper = (<Handle className={handleClassName} tipTransitionName={tipTransitionName} noTip={isNoTip} tipFormatter={tipFormatter}
                     offset={upperOffset} value={upperBound} dragging={handle === 'upperBound'} />);

    let lower = null;
    if (range) {
      lower = (<Handle className={handleClassName} tipTransitionName={tipTransitionName} noTip={isNoTip} tipFormatter={tipFormatter}
                 offset={lowerOffset} value={lowerBound} dragging={handle === 'lowerBound'} />);
    }

    const isIncluded = included || range;
    return (
      <div ref="slider" className={sliderClassName}
           onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
           onMouseDown={disabled ? noop : this.onMouseDown.bind(this)}>
        {track}
        {upper}
        {lower}
        <Steps prefixCls={prefixCls} points={this.getPoints()} dots={dots}
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
  defaultIndex: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  index: React.PropTypes.oneOfType([
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
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultIndex: 0,
  marks: {},
  included: true,
  className: '',
  prefixCls: 'rc-slider',
  disabled: false,
  tipTransitionName: '',
  dots: false,
  range: false,
};

export default Slider;
