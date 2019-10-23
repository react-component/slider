/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';

class Slider extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    tabIndex: PropTypes.number,
    reverse: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    ariaLabelForHandle: PropTypes.string,
    ariaLabelledByForHandle: PropTypes.string,
    ariaValueTextFormatterForHandle: PropTypes.func,
  };

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

    warning(
      !('minimumTrackStyle' in props),
      'minimumTrackStyle will be deprecated, please use trackStyle instead.'
    );
    warning(
      !('maximumTrackStyle' in props),
      'maximumTrackStyle will be deprecated, please use railStyle instead.'
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!('value' in this.props || 'min' in this.props || 'max' in this.props)) {
      return;
    }
    const { value, onChange } = this.props;
    const theValue = value !== undefined ? value : prevState.value;
    const nextValue = this.trimAlignValue(theValue, this.props);
    if (nextValue !== prevState.value) {
      // eslint-disable-next-line
      this.setState({ value: nextValue });
      if (utils.isValueOutOfRange(theValue, this.props)) {
        onChange(nextValue);
      }
    }
  }

  onChange(state) {
    const props = this.props;
    const isNotControlled = !('value' in props);
    const nextState = state.value > this.props.max ? {...state, value: this.props.max} : state;
    if (isNotControlled) {
      this.setState(nextState);
    }

    const changedValue = nextState.value;
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

    this.prevMovedHandleIndex = 0;

    this.onChange({ value });
  }

  onEnd = (force) => {
    const { dragging } = this.state;
    this.removeDocumentEvents();
    if (dragging || force) {
      this.props.onAfterChange(this.getValue());
    }
    this.setState({ dragging: false });
  }

  onMove(e, position) {
    utils.pauseEvent(e);
    const { value: oldValue } = this.state;
    const value = this.calcValueByPos(position);
    if (value === oldValue) return;

    this.onChange({ value });
  }

  onKeyboard(e) {
    const { reverse, vertical } = this.props;
    const valueMutator = utils.getKeyboardValueMutator(e, vertical, reverse);
    if (valueMutator) {
      utils.pauseEvent(e);
      const state = this.state;
      const oldValue = state.value;
      const mutatedValue = valueMutator(oldValue, this.props);
      const value = this.trimAlignValue(mutatedValue);
      if (value === oldValue) return;

      this.onChange({ value });
      this.props.onAfterChange(value);
      this.onEnd();
    }
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
    if (v === null) {
      return null;
    }

    const mergedProps = { ...this.props, ...nextProps };
    const val = utils.ensureValueInRange(v, mergedProps);
    return utils.ensureValuePrecision(val, mergedProps);
  }

  render() {
    const {
      prefixCls,
      vertical,
      included,
      disabled,
      minimumTrackStyle,
      trackStyle,
      handleStyle,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle,
      min,
      max,
      reverse,
      handle: handleGenerator,
    } = this.props;
    const { value, dragging } = this.state;
    const offset = this.calcOffset(value);
    const handle = handleGenerator({
      className: `${prefixCls}-handle`,
      prefixCls,
      vertical,
      offset,
      value,
      dragging,
      disabled,
      min,
      max,
      reverse,
      index: 0,
      tabIndex,
      ariaLabel: ariaLabelForHandle,
      ariaLabelledBy: ariaLabelledByForHandle,
      ariaValueTextFormatter: ariaValueTextFormatterForHandle,
      style: handleStyle[0] || handleStyle,
      ref: h => this.saveHandle(0, h),
    });

    const _trackStyle = trackStyle[0] || trackStyle;
    const track = (
      <Track
        className={`${prefixCls}-track`}
        vertical={vertical}
        included={included}
        offset={0}
        reverse={reverse}
        length={offset}
        style={{
          ...minimumTrackStyle,
          ..._trackStyle,
        }}
      />
    );

    return { tracks: track, handles: handle };
  }
}

export default createSlider(Slider);
