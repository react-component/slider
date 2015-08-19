import React from 'react';
import Tooltip from 'rc-tooltip';
import rcUtil, {Dom as DomUtils} from 'rc-util';

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

function prefixClsFn(prefixCls, ...args) {
  return args.map((s)=> {
    return prefixCls + '-' + s;
  }).join(' ');
}

function getValueFromIndex(props) {
  let value;
  const marksLen = props.marks.length;
  let index;
  if ('index' in props) {
    index = props.index;
  } else {
    index = props.defaultIndex;
  }
  if (marksLen > 0) {
    value = ((props.max - props.min) / (marksLen - 1)) * (index);
    value = value.toFixed(5) / 1;
  }
  return value;
}

const Slider = React.createClass({
  propTypes: {
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
  },

  getDefaultProps() {
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
      defaultIndex: 0,
    };
  },

  getInitialState() {
    const props = this.props;
    let value = props.defaultValue;
    if ('value' in props) {
      value = props.value;
    }
    value = this._trimAlignValue(value);
    const marksLen = props.marks.length;
    if (marksLen > 0) {
      value = getValueFromIndex(props);
    }
    return {
      dragging: false,
      showTooltip: false,
      value: value,
    };
  },

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
  },

  onMouseUp() {
    this._end('mouse');
  },

  onTouchUp() {
    this._end('touch');
  },

  onMouseMove(e) {
    const position = e.pageX || (e.clientX + document.documentElement.scrollLeft); // to compat ie8
    this.onMove(e, position);
  },

  onTouchMove(e) {
    if (e.touches.length > 1 || (e.type === 'touchend' && e.touches.length > 0)) {
      this._end('touch');
      return;
    }

    const position = this._getTouchPosition(e);

    this.onMove(e, position);
  },

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
  },

  onTouchStart(e) {
    if (e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)) {
      return;
    }

    const position = this._getTouchPosition(e);
    const value = this._calValueByPos(position);
    this._triggerEvents('onChange', value);
    this._start(position);
    this._addDocumentEvents('touch');
    pauseEvent(e);
  },

  onSliderMouseDown(e) {
    const position = e.pageX || (e.clientX + document.documentElement.scrollLeft); // to compat ie8
    const value = this._calValueByPos(position);
    this._triggerEvents('onChange', value);
    this._start(position);
    this._addDocumentEvents('mouse');
    pauseEvent(e);
  },

  getIndex(v) {
    const props = this.props;
    const value = v === undefined ? this.state.value : v;

    if (props.marks.length === 0) {
      return Math.floor((value - props.min) / props.step);
    }
    const unit = ((props.max - props.min) / (props.marks.length - 1)).toFixed(5);
    return Math.round(value / unit);
  },

  getSliderLength() {
    const slider = this.refs.slider;
    if (!slider) {
      return 0;
    }

    return slider.getDOMNode().clientWidth;
  },

  getSliderStart() {
    const slider = this.refs.slider.getDOMNode();
    const rect = slider.getBoundingClientRect();

    return rect.left;
  },

  renderSteps() {
    const props = this.props;
    const marksLen = props.marks.length;
    const stepNum = marksLen > 0 ? marksLen : Math.floor((props.max - props.min) / props.step) + 1;
    const unit = 100 / (stepNum - 1);

    const prefixCls = props.prefixCls;
    const stepClassName = prefixClsFn(prefixCls, 'step');

    const elements = [];
    for (let i = 0; i < stepNum; i++) {
      const offset = unit * i + '%';
      const style = {
        left: offset,
      };
      let className = prefixClsFn(prefixCls, 'dot');
      if (props.isIncluded) {
        if (i <= this.getIndex()) {
          className = prefixClsFn(prefixCls, 'dot', 'dot-active');
        }
      } else {
        className = (i === this.getIndex()) ? prefixClsFn(prefixCls, 'dot', 'dot-active') : className;
      }

      elements[i] = (
        <span className={className} style={style} ref={'step' + i} key={'step' + i}></span>
      );
    }

    return (
      <div className={stepClassName}>
        {elements}
      </div>
    );
  },

  renderMark(i) {
    const marks = this.props.marks;
    const marksLen = marks.length;
    const unit = 100 / (marksLen - 1);
    const offset = unit * i;

    const style = {
      width: unit / 2 + '%',
    };

    if (i === marksLen - 1) {
      style.right = -unit / 4 + '%';
    } else {
      style.left = i > 0 ? offset - unit / 4 + '%' : -unit / 4 + '%';
    }

    const prefixCls = this.props.prefixCls;
    let className = prefixClsFn(prefixCls, 'mark-text');

    if (this.props.isIncluded) {
      if (i <= this.getIndex()) {
        className = prefixClsFn(prefixCls, 'mark-text', 'mark-text-active');
      }
    } else {
      className = (i === this.getIndex()) ? prefixClsFn(prefixCls, 'mark-text', 'mark-text-active') : className;
    }

    return (
      <span className={className} style={style} key={i}>{this.props.marks[i]}</span>
    );
  },

  renderMarks() {
    const marks = this.props.marks;
    const marksLen = marks.length;
    const elements = [];
    for (let i = 0; i < marksLen; i++) {
      elements[i] = this.renderMark(i);
    }

    const prefixCls = this.props.prefixCls;
    const className = prefixClsFn(prefixCls, 'mark');

    return (
      <div className={className}>
        {elements}
      </div>
    );
  },

  renderHandler(offset) {
    const onStyle = {
      left: offset,
    };

    const prefixCls = this.props.prefixCls;
    const className = prefixClsFn(prefixCls, 'handle');

    let events = {};

    let tooltipVisible;

    if (this.state.dragging) {
      tooltipVisible = true;
    } else {
      events = {
        onClick: this.showTooltip.bind(this, true),
        onMouseEnter: this.showTooltip.bind(this, true),
        onMouseLeave: this.showTooltip.bind(this, false),
      };
      tooltipVisible = this.state.showTooltip;
    }

    const handle = (<div className={className}
      {...events}
                          ref="handle"
                          style={onStyle}></div>);

    if (this.props.marks.length > 0) {
      return handle;
    }
    return (
      <Tooltip
        placement={{points: ['bc', 'tc']}}
        visible={tooltipVisible}
        overlay={<span>{this.state.value}</span>}
        delay={0}
        prefixCls={prefixClsFn(prefixCls, 'tooltip')}>
        {handle}
      </Tooltip>
    );
  },

  renderTrack(offset) {
    const style = {
      width: offset,
    };

    const prefixCls = this.props.prefixCls;
    const trackClassName = prefixClsFn(prefixCls, 'track');

    return (
      <div className={trackClassName} ref="track" style={style}></div>
    );
  },

  render() {
    const state = this.state;
    const props = this.props;
    const value = state.value;
    const offset = this._calcOffset(value);
    const track = this.props.isIncluded ? this.renderTrack(offset) : null;
    const ons = this.renderHandler(offset);
    const steps = (props.step > 1 || props.marks.length > 0) ? this.renderSteps() : null;
    const sliderMarks = (props.marks.length > 0) ? this.renderMarks() : null;
    const prefixCls = props.prefixCls;
    const disabled = props.disabled;
    const sliderClassName = {
      [prefixCls]: 1,
      [props.className]: !!props.className,
      [`${prefixCls}-disabled`]: disabled,
    };

    return (
      <div className={rcUtil.classSet(sliderClassName)} ref="slider"
           onTouchStart={disabled ? noop : this.onTouchStart}
           onMouseDown={disabled ? noop : this.onSliderMouseDown}>
        {track}
        {ons}
        {steps}
        {sliderMarks}
        {this.props.children}
      </div>
    );
  },

  showTooltip(show) {
    this.setState({
      showTooltip: show,
    });
  },

  _trimAlignValue(v, propsArg) {
    let val = v;
    const props = propsArg || this.props;
    const step = props.marks.length > 0 ? (props.max - props.min) / (props.marks.length - 1) : props.step;

    if (val <= props.min) {
      val = props.min;
    }
    if (val >= props.max) {
      val = props.max;
    }

    const valModStep = (val - props.min) % step;
    let alignValue = val - valModStep;

    if (Math.abs(valModStep) * 2 >= step) {
      alignValue += (valModStep > 0) ? step : (-step);
    }

    return parseFloat(alignValue.toFixed(5));
  },

  _calcOffset(value) {
    const ratio = (value - this.props.min) / (this.props.max - this.props.min);
    return ratio * 100 + '%';
  },

  _calcValue(offset) {
    const ratio = offset / this.getSliderLength();
    return ratio * (this.props.max - this.props.min) + this.props.min;
  },

  _calValueByPos(position) {
    const pixelOffset = position - this.getSliderStart();
    // pixelOffset -= (this.state.onSize / 2);
    const nextValue = this._trimAlignValue(this._calcValue(pixelOffset));
    this.setState({
      value: nextValue,
    });
    return nextValue;
  },

  _getTouchPosition(e) {
    const touch = e.touches[0];
    return touch.pageX;
  },

  _triggerEvents(event, v) {
    const props = this.props;
    const hasMarks = props.marks && props.marks.length > 0;
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
  },

  _addDocumentEvents(type) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      this.onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this.onTouchUp);
    } else if (type === 'mouse') {
      this.onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this.onMouseUp);
    }
  },

  _removeEventons(type) {
    if (type === 'touch') {
      this.onTouchMoveListener.remove();
      this.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      this.onMouseMoveListener.remove();
      this.onMouseUpListener.remove();
    }
  },

  _start(position) {
    this._triggerEvents('onBeforeChange');
    this.startValue = this.state.value;
    this.startPosition = position;
    this.setState({
      dragging: true,
    });
  },

  _end(type) {
    this._removeEventons(type);
    this._triggerEvents('onAfterChange');
    this.setState({
      dragging: false,
      showTooltip: false,
    });
  },
});

export default Slider;
