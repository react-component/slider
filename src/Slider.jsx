import React from 'react';
import rcUtil, {Dom as DomUtils} from 'rc-util';
import Track from './Track';
import Handle from './Handle';
import Steps from './Steps';
import Marks from './Marks';

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

function getValueFromIndex(props) {
  const marksLen = props.marks.length;
  const index = ('index' in props ? props.index : props.defaultIndex);

  let value;
  if (marksLen > 0) {
    value = ((props.max - props.min) / (marksLen - 1)) * (index);
    value = value.toFixed(5);
  }
  return value;
}

class Slider extends React.Component {
  constructor(props) {
    super(props);

    // Note: Maybe `value` is `0`, `false` and so on.
    //       So, check the existence of `value` with `in`.
    let value = ('value' in props ? props.value : props.defaultValue);
    value = this._trimAlignValue(value);

    const marksLen = props.marks.length;
    if (marksLen > 0) {
      value = getValueFromIndex(props);
    }

    this.state = {
      dragging: false,
      value: value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    } else if ('index' in nextProps) {
      this.setState({
        value: getValueFromIndex(nextProps),
      });
    }
  }

  onMouseMove(e) {
    const position = e.pageX || (e.clientX + document.documentElement.scrollLeft); // to compat ie8
    this.onMove(e, position);
  }

  onTouchMove(e) {
    if (e.touches.length > 1 || (e.type === 'touchend' && e.touches.length > 0)) {
      this._end('touch');
      return;
    }

    const position = this._getTouchPosition(e);

    this.onMove(e, position);
  }

  onMove(e, position) {
    pauseEvent(e);
    const props = this.props;
    const state = this.state;

    let value = state.value;
    const oldValue = value;

    const diffPosition = position - this.startPosition;

    const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);
    value = this._trimAlignValue(this.startValue + diffValue);

    if (value !== oldValue && !('value' in props) && !('index' in props)) {
      this.setState({value: value});
    }
    if (value !== oldValue) {
      this._triggerEvents('onChange', value);
    }
  }

  onTouchStart(e) {
    if (e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)) {
      return;
    }

    const position = this._getTouchPosition(e);
    const value = this._calValueByPos(position);
    this._triggerEvents('onChange', value);
    this._start(position, value);
    this._addDocumentEvents('touch');
    pauseEvent(e);
  }

  onSliderMouseDown(e) {
    const position = e.pageX || (e.clientX + document.documentElement.scrollLeft); // to compat ie8
    const value = this._calValueByPos(position);
    this._triggerEvents('onChange', value);
    this._start(position, value);
    this._addDocumentEvents('mouse');
    pauseEvent(e);
  }

  getIndex(v) {
    const props = this.props;
    const value = v === undefined ? this.state.value : v;

    if (props.marks.length === 0) {
      return Math.floor((value - props.min) / props.step);
    }
    const unit = ((props.max - props.min) / (props.marks.length - 1)).toFixed(5);
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

  render() {
    const state = this.state;
    const {value, dragging} = state;
    const props = this.props;
    const {className, prefixCls, disabled, isIncluded, withDots} = props;
    const {marks, step, max, min, tipTransitionName, children} = props;
    const marksLen = marks.length;

    const sliderClassName = rcUtil.classSet({
      [prefixCls]: true,
      [prefixCls + '-disabled']: disabled,
      [className]: !!className,
    });

    const offset = this._calcOffset(value);

    let track = null;
    if (isIncluded) {
      const trackClassName = prefixCls + '-track';
      track = <Track className={trackClassName} offset={0} length={offset - 0} />;
    }

    const handleClassName = prefixCls + '-handle';

    let steps = null;
    if (marksLen > 0 || (step > 1 && withDots)) {
      const stepsClassName = prefixCls + '-step';
      const stepNum = marksLen > 0 ? marksLen : Math.floor((max - min) / step) + 1;
      steps = (<Steps className={stepsClassName} stepNum={stepNum}
                 index={this.getIndex()} isIncluded={isIncluded} />);
    }

    let mark = null;
    if (marksLen > 0) {
      const markClassName = prefixCls + '-mark';
      mark = (<Marks className={markClassName} marks={marks}
                 index={this.getIndex()} isIncluded={isIncluded} />);
    }

    return (
      <div ref="slider" className={sliderClassName}
        onTouchStart={disabled ? noop : this.onTouchStart.bind(this)}
        onMouseDown={disabled ? noop : this.onSliderMouseDown.bind(this)}>
        {track}
        <Handle className={handleClassName} tipTransitionName={tipTransitionName}
          offset={offset} value={value} dragging={dragging} noTip={marksLen > 0} />
        {steps}
        {mark}
        {children}
      </div>
    );
  }

  _trimAlignValue(v, propsArg) {
    let val = v;
    const props = propsArg || this.props;
    const {marks, min, max} = props;
    const step = marks.length > 0 ? (max - min) / (marks.length - 1) : props.step;

    if (val <= min) {
      val = min;
    }
    if (val >= max) {
      val = max;
    }

    const valModStep = (val - min) % step;
    let alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += (valModStep > 0) ? step : (-step);
    }

    return parseFloat(alignValue.toFixed(5));
  }

  _calcOffset(value) {
    const {min, max} = this.props;
    const ratio = (value - min) / (max - min);
    return ratio * 100;
  }

  _calcValue(offset) {
    const {min, max} = this.props;
    const ratio = offset / this.getSliderLength();
    return ratio * (max - min) + min;
  }

  _calValueByPos(position) {
    const pixelOffset = position - this.getSliderStart();
    const nextValue = this._trimAlignValue(this._calcValue(pixelOffset));
    this.setState({
      value: nextValue,
    });
    return nextValue;
  }

  _getTouchPosition(e) {
    const touch = e.touches[0];
    return touch.pageX;
  }

  _triggerEvents(event, v) {
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

  _addDocumentEvents(type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this.onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
      this.onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this._end.bind(this, 'touch'));
    } else if (type === 'mouse') {
      this.onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
      this.onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this._end.bind(this, 'mouse'));
    }
  }

  _removeEventons(type) {
    if (type === 'touch') {
      this.onTouchMoveListener.remove();
      this.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      this.onMouseMoveListener.remove();
      this.onMouseUpListener.remove();
    }
  }

  _start(position, value) {
    this._triggerEvents('onBeforeChange');
    this.startValue = value;
    this.startPosition = position;
    this.setState({
      dragging: true,
    });
  }

  _end(type) {
    this._removeEventons(type);
    this._triggerEvents('onAfterChange');
    this.setState({
      dragging: false,
    });
  }
}

Slider.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  defaultValue: React.PropTypes.number,
  defaultIndex: React.PropTypes.number,
  value: React.PropTypes.number,
  index: React.PropTypes.number,
  marks: React.PropTypes.array,
  isIncluded: React.PropTypes.bool,
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  children: React.PropTypes.any,
  onBeforeChange: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onAfterChange: React.PropTypes.func,
  tipTransitionName: React.PropTypes.string,
  withDots: React.PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 0,
  defaultIndex: 0,
  marks: [],
  isIncluded: true,
  className: '',
  prefixCls: 'rc-slider',
  disabled: false,
  tipTransitionName: '',
  withDots: false,
};

export default Slider;
