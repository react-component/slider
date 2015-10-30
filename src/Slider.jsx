import React from 'react';
import rcUtil, {Dom as DomUtils} from 'rc-util';
import Track from './Track';
import Handle from './Handle';
import Steps from './Steps';
import Marks from './Marks';

function noop() {}

function isNotTouchEvent(e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

function getTouchPosition(e) {
  return e.touches[0].pageX;
}

function getMousePosition(e) {
  return e.pageX || (e.clientX + document.documentElement.scrollLeft); // to compat ie8
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

class Slider extends React.Component {
  constructor(props) {
    super(props);

    let upperBound;
    let lowerBound;
    if (props.range) {
      const value = (props.value || props.defaultValue || [0, 0]);
      upperBound = this.trimAlignValue(value[1]);
      lowerBound = this.trimAlignValue(value[0]);
    } else if (props.marks.length > 0) {
      upperBound = this.calcValueFromProps(props);
    } else {
      // Note: Maybe `value` is `0`.
      //       So, check the existence of `value` with `in`.
      const defaultValue = ('defauleValue' in props ? props.defaultValue : 0);
      const value = ('value' in props ? props.value : defaultValue);
      upperBound = this.trimAlignValue(value);
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
      this.setState({
        upperBound: this.calcValueFromProps(nextProps),
      });
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

    if (!('value' in props) && !('index' in props)) {
      this.setState({[state.handle]: value});
    }

    if (props.range) {
      // `this.state` will not be updated immediately after `this.setState`.
      // So, create a similar object.
      const data = Object.assign({}, state, {[state.handle]: value});
      this.triggerEvents('onChange', [data.lowerBound, data.upperBound]);
    } else {
      this.triggerEvents('onChange', value);
    }
  }

  onTouchStart(e) {
    if (isNotTouchEvent(e)) return;

    const position = getTouchPosition(e);
    this.onStart(position);
    this.addDocumentEvents('touch');
    pauseEvent(e);
  }

  onSliderMouseDown(e) {
    const position = getMousePosition(e);
    this.onStart(position);
    this.addDocumentEvents('mouse');
    pauseEvent(e);
  }

  onStart(position) {
    this.triggerEvents('onBeforeChange');

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    const {upperBound, lowerBound} = this.state;
    const isUpperBoundCloser = Math.abs(upperBound - value) < Math.abs(lowerBound - value);
    let valueNeedChanging = (!this.props.range || isUpperBoundCloser) ? 'upperBound' : 'lowerBound';
    const isAtTheSamePoint = (upperBound === lowerBound);
    valueNeedChanging = isAtTheSamePoint ? this.state.recent : valueNeedChanging;

    this.setState({
      handle: valueNeedChanging,
      recent: valueNeedChanging,
      [valueNeedChanging]: value,
    });

    if (this.props.range) {
      const data = Object.assign({}, this.state, {[valueNeedChanging]: value});
      this.triggerEvents('onChange', [data.lowerBound, data.upperBound]);
    } else {
      this.triggerEvents('onChange', value);
    }
  }

  getIndex(value) {
    const {marks, min, max, step} = this.props;

    if (marks.length === 0) {
      return Math.floor((value - min) / step);
    }
    const unit = ((max - min) / (marks.length - 1)).toFixed(5);
    return Math.round(value / unit);
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
    const props = this.props;
    const {marks, min, max} = props;
    const step = marks.length > 0 ? (max - min) / (marks.length - 1) : props.step;

    let val = v;
    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }
    if (state.handle === 'upperBound' && val <= state.lowerBound) {
      val = state.lowerBound;
    }
    if (state.handle === 'lowerBound' && val >= state.upperBound) {
      val = state.upperBound;
    }

    const valModStep = (val - min) % step;
    let alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += (valModStep > 0) ? step : (-step);
    }

    return parseFloat(alignValue.toFixed(5));
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

  calcValueFromProps(props) {
    const marksLen = props.marks.length;
    if (marksLen > 0) {
      const index = ('index' in props ? props.index : props.defaultIndex);
      const value = ((props.max - props.min) / (marksLen - 1)) * (index);
      // `'1' / 1 => 1`, to make sure that the returned value is a `Number`.
      return value.toFixed(5) / 1;
    }
    return ('value' in props ? props.value : props.defaultValue);
  }

  triggerEvents(event, v) {
    const props = this.props;
    const hasMarks = (props.marks.length > 0);
    if (props[event]) {
      let data;
      if (hasMarks) {
        data = this.getIndex(v);
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
    this.triggerEvents('onAfterChange');
    this.setState({ handle: null });
  }

  render() {
    const {handle, upperBound, lowerBound} = this.state;
    const props = this.props;
    const {className, prefixCls, disabled, included, dots, range} = props;
    const {marks, step, max, min, tipTransitionName, children} = props;
    const marksLen = marks.length;

    const sliderClassName = rcUtil.classSet({
      [prefixCls]: true,
      [prefixCls + '-disabled']: disabled,
      [className]: !!className,
    });

    const upperOffset = this.calcOffset(upperBound);
    const lowerOffset = this.calcOffset(lowerBound);

    let track = null;
    if (included || range) {
      const trackClassName = prefixCls + '-track';
      track = <Track className={trackClassName} offset={lowerOffset} length={upperOffset - lowerOffset} />;
    }

    const handleClassName = prefixCls + '-handle';
    const isNoTip = marksLen > 0;
    const upper = (<Handle className={handleClassName} tipTransitionName={tipTransitionName} noTip={isNoTip}
                     offset={upperOffset} value={upperBound} dragging={handle === 'upperBound'} />);

    let lower = null;
    if (range) {
      lower = (<Handle className={handleClassName} tipTransitionName={tipTransitionName} noTip={isNoTip}
                 offset={lowerOffset} value={lowerBound} dragging={handle === 'lowerBound'} />);
    }

    const upperIndex = this.getIndex(upperBound);

    let steps = null;
    if (marksLen > 0 || (step > 1 && dots)) {
      const stepsClassName = prefixCls + '-step';
      const stepNum = marksLen > 0 ? marksLen : Math.floor((max - min) / step) + 1;
      steps = (<Steps className={stepsClassName} stepNum={stepNum}
                 lowerIndex={this.getIndex(lowerBound)} upperIndex={upperIndex}
                 included={included || range} />);
    }

    let mark = null;
    if (marksLen > 0) {
      const markClassName = prefixCls + '-mark';
      mark = (<Marks className={markClassName} marks={marks}
                 index={upperIndex} included={included} />);
    }

    return (
      <div ref="slider" className={sliderClassName}
        onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
        onMouseDown={disabled ? noop : this.onSliderMouseDown.bind(this)}>
        {track}
        {upper}
        {lower}
        {steps}
        {mark}
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
  defaultIndex: React.PropTypes.number,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number),
  ]),
  index: React.PropTypes.number,
  marks: React.PropTypes.array,
  included: React.PropTypes.bool,
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.any,
  onBeforeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onAfterChange: React.PropTypes.func,
  tipTransitionName: React.PropTypes.string,
  dots: React.PropTypes.bool,
  range: React.PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultIndex: 0,
  marks: [],
  included: true,
  className: '',
  prefixCls: 'rc-slider',
  disabled: false,
  tipTransitionName: '',
  dots: false,
  range: false,
};

export default Slider;
