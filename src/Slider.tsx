import React from 'react';
import warning from 'rc-util/lib/warning';
import Track from './common/Track';
import createSlider from './common/createSlider';
import * as utils from './utils';
import { GenericSliderProps, GenericSliderState } from './interface';

export interface SliderProps extends GenericSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number | null;
  prefixCls?: string;
  onChange?: (value: number) => void;
  onBeforeChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  vertical?: boolean;
  included?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  minimumTrackStyle?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  tabIndex?: number;
  ariaLabelForHandle?: string;
  ariaLabelledByForHandle?: string;
  ariaValueTextFormatterForHandle?: string;
  startPoint?: number;
  handle?: (props: {
    className: string;
    prefixCls?: string;
    vertical?: boolean;
    offset: number;
    value: number;
    dragging?: boolean;
    disabled?: boolean;
    min?: number;
    max?: number;
    reverse?: boolean;
    index: number;
    tabIndex?: number;
    ariaLabel: string;
    ariaLabelledBy: string;
    ariaValueTextFormatter: string;
    style?: React.CSSProperties;
    ref?: React.Ref<any>;
  }) => React.ReactElement;
}
export interface SliderState extends GenericSliderState {
  value: number;
  dragging: boolean;
}

class Slider extends React.Component<SliderProps, SliderState> {
  /**
   * [Legacy] Used for inherit other component.
   * It's a bad code style which should be refactor.
   */
  /* eslint-disable @typescript-eslint/no-unused-vars, class-methods-use-this */
  calcValueByPos(value: number) {
    return 0;
  }

  calcOffset(value: number) {
    return 0;
  }

  saveHandle(index: number, h: any) {}

  removeDocumentEvents() {}
  /* eslint-enable */

  constructor(props: SliderProps) {
    super(props);

    const defaultValue = props.defaultValue !== undefined ? props.defaultValue : props.min;
    const value = props.value !== undefined ? props.value : defaultValue;

    this.state = {
      value: this.trimAlignValue(value),
      dragging: false,
    };

    warning(
      !('minimumTrackStyle' in props),
      'minimumTrackStyle will be deprecated, please use trackStyle instead.',
    );
    warning(
      !('maximumTrackStyle' in props),
      'maximumTrackStyle will be deprecated, please use railStyle instead.',
    );
  }

  startValue: number;

  startPosition: number;

  prevMovedHandleIndex: number;

  componentDidUpdate(_: SliderProps, prevState: SliderState) {
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

  onChange(state: { value: number }) {
    const { props } = this;
    const isNotControlled = !('value' in props);
    const nextState = state.value > this.props.max ? { ...state, value: this.props.max } : state;
    if (isNotControlled) {
      this.setState(nextState);
    }

    const changedValue = nextState.value;
    props.onChange(changedValue);
  }

  onStart(position: number) {
    this.setState({ dragging: true });
    const { props } = this;
    const prevValue = this.getValue();
    props.onBeforeChange(prevValue);

    const value = this.calcValueByPos(position);
    this.startValue = value;
    this.startPosition = position;

    if (value === prevValue) return;

    this.prevMovedHandleIndex = 0;

    this.onChange({ value });
  }

  onEnd = (force?: boolean) => {
    const { dragging } = this.state;
    this.removeDocumentEvents();
    if (dragging || force) {
      this.props.onAfterChange(this.getValue());
    }
    this.setState({ dragging: false });
  };

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
      const { state } = this;
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
    const minPoint = this.props.startPoint || this.props.min;
    return this.state.value > minPoint ? minPoint : this.state.value;
  }

  getUpperBound() {
    if (this.state.value < this.props.startPoint) {
      return this.props.startPoint;
    }
    return this.state.value;
  }

  trimAlignValue(v: number, nextProps: Partial<SliderProps> = {}) {
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
      startPoint,
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

    const trackOffset = startPoint !== undefined ? this.calcOffset(startPoint) : 0;
    const mergedTrackStyle = trackStyle[0] || trackStyle;
    const track = (
      <Track
        className={`${prefixCls}-track`}
        vertical={vertical}
        included={included}
        offset={trackOffset}
        reverse={reverse}
        length={offset - trackOffset}
        style={{
          ...minimumTrackStyle,
          ...mergedTrackStyle,
        }}
      />
    );

    return { tracks: track, handles: handle };
  }
}

export default createSlider(Slider);
