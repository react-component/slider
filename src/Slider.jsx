/* eslint-disable react/prop-types */
import React, { PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import Track from './Track';
import createSlider from './createSlider';
import * as utils from './utils';

class Slider extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    value: PropTypes.number,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    const defaultValue = props.defaultValue !== undefined ?
            props.defaultValue : props.min;
    const value = props.value !== undefined ?
            props.value : defaultValue;

    this.state = {
      value: this.trimAlignValue(value),
      dragging: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

    const prevValue = this.state.value;
    const value = nextProps.value !== undefined ?
            nextProps.value : prevValue;
    const nextValue = this.trimAlignValue(value, nextProps);
    if (nextValue === prevValue) return;

    this.setState({ value: nextValue });
    if (utils.isValueOutOfRange(value, nextProps)) {
      this.props.onChange(nextValue);
    }
  }

  onChange(state) {
    const props = this.props;
    const isNotControlled = !('value' in props);
    if (isNotControlled) {
      this.setState(state);
    }

    const changedValue = state.value;
    props.onChange(changedValue);
  }

  onStart(position) {
    this.setState({ dragging: true });
    const props = this.props;
    const prevValue = this.getValue();
    props.onBeforeChange(prevValue);

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    if (value === prevValue) return;

    this.onChange({ value });
  }

  onEnd = () => {
    this.setState({ dragging: false });
    this.removeDocumentEvents();
    this.props.onAfterChange(this.getValue());
  }

  onMove(e, position) {
    utils.pauseEvent(e);
    const props = this.props;
    const state = this.state;

    let diffPosition = position - this.startPosition;
    diffPosition = this.props.vertical ? -diffPosition : diffPosition;
    const diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

    const value = this.trimAlignValue(this.startValue + diffValue);
    const oldValue = state.value;
    if (value === oldValue) return;

    this.onChange({ value });
  }

  getValue() {
    return this.state.value;
  }

  getLowerBound() {
    return this.props.min;
  }

  getUpperBound() {
    return this.state.value;
  }

  trimAlignValue(v, nextProps = {}) {
    const mergedProps = { ...this.props, ...nextProps };
    const val = utils.ensureValueInRange(v, mergedProps);
    return utils.ensureValuePrecision(val, mergedProps);
  }

  render() {
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
    const { value, dragging } = this.state;
    const offset = this.calcOffset(value);

    const handleClassName = `${prefixCls}-handle`;

    const isNoTip = (step === null) || (tipFormatter === null);

    const commonHandleProps = {
      prefixCls,
      tooltipPrefixCls,
      noTip: isNoTip,
      tipTransitionName,
      tipFormatter,
      vertical,
    };

    const handle = cloneElement(customHandle, {
      ...commonHandleProps,
      className: handleClassName,
      value,
      offset,
      dragging,
      ref: h => this.saveHandle(0, h),
    });

    const trackClassName = classNames({
      [`${prefixCls}-track`]: true,
    });
    const track = (
      <Track
        className={trackClassName}
        vertical={vertical}
        included={included}
        offset={0}
        length={offset}
      />
    );

    return { tracks: track, handles: handle };
  }
}

export default createSlider(Slider);
