/* eslint-disable react/prop-types */
import React, { PropTypes } from 'react';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';

class Slider extends React.Component {
  static displayName = 'Slider';
  static propTypes = {
    defaultValue: PropTypes.number,
    value: PropTypes.number,
    disabled: PropTypes.bool,
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
    const state = this.state;
    const value = this.calcValueByPos(position);
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
      vertical,
      included,
      disabled,
      minimumTrackStyle,
      handleStyle,
      handle: handleGenerator,
    } = this.props;
    const { value, dragging } = this.state;
    const offset = this.calcOffset(value);
    const handle = handleGenerator({
      className: `${prefixCls}-handle`,
      vertical,
      offset,
      value,
      dragging,
      disabled,
      handleStyle,
      ref: h => this.saveHandle(0, h),
    });
    const track = (
      <Track
        className={`${prefixCls}-track`}
        vertical={vertical}
        included={included}
        offset={0}
        length={offset}
        minimumTrackStyle={minimumTrackStyle}
      />
    );

    return { tracks: track, handles: handle };
  }
}

export default createSlider(Slider);
