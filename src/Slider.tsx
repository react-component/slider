import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import Handles from './Handles';
import useDrag from './hooks/useDrag';

export interface SliderProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;

  // Value
  min?: number;
  max?: number;
  value?: number | number[];
  defaultValue?: number | number[];
  step?: number | null;
  onChange?: (value: number | number[]) => void;

  range?: boolean;

  // vertical?: boolean;
  // included?: boolean;
  // disabled?: boolean;
  // reverse?: boolean;
  // // trackStyle?: React.CSSProperties | React.CSSProperties[];
  // // handleStyle?: React.CSSProperties | React.CSSProperties[];
  // autoFocus?: boolean;
  // onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  // onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  // marks?: Record<number, React.ReactNode | { style?: React.CSSProperties; label?: string }>;
  // dots?: boolean;
  // // maximumTrackStyle?: React.CSSProperties;
  // style?: React.CSSProperties;
  // // railStyle?: React.CSSProperties;
  // // dotStyle?: React.CSSProperties;
  // // activeDotStyle?: React.CSSProperties;
  // draggableTrack?: boolean;
  // onBeforeChange?: (value: number) => void;
  // onAfterChange?: (value: number) => void;
  // vertical?: boolean;
  // included?: boolean;
  // disabled?: boolean;
  // reverse?: boolean;
  // minimumTrackStyle?: React.CSSProperties;
  // trackStyle?: React.CSSProperties;
  // handleStyle?: React.CSSProperties;
  // tabIndex?: number;
  // ariaLabelForHandle?: string;
  // ariaLabelledByForHandle?: string;
  // ariaValueTextFormatterForHandle?: (value: number) => string;
  // startPoint?: number;
  // handle?: (props: {
  //   className: string;
  //   prefixCls?: string;
  //   vertical?: boolean;
  //   offset: number;
  //   value: number;
  //   dragging?: boolean;
  //   disabled?: boolean;
  //   min?: number;
  //   max?: number;
  //   reverse?: boolean;
  //   index: number;
  //   tabIndex?: number;
  //   ariaLabel: string;
  //   ariaLabelledBy: string;
  //   ariaValueTextFormatter?: (value: number) => string;
  //   style?: React.CSSProperties;
  //   ref?: React.Ref<any>;
  // }) => React.ReactElement;
}
export interface SliderRef {
  focus: () => void;
  blur: () => void;
}

const Slider = React.forwardRef((props: SliderProps, ref: React.Ref<SliderRef>) => {
  const {
    prefixCls = 'rc-slider',
    className,
    style,

    // Value
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    range,
    onChange,
  } = props;

  const railRef = React.useRef<HTMLDivElement>();

  // ============================ Values ============================
  const [mergedValue, setValue] = useMergedState<number | number[], number[]>(defaultValue, {
    value,
    postState: (rawValue) => {
      if (rawValue === null || rawValue === undefined) {
        return [];
      }

      return Array.isArray(rawValue) ? rawValue : [rawValue];
    },
  });

  const rawValues = React.useMemo(() => {
    const [val0 = min, val1 = min] = mergedValue;

    if (range) {
      return [val0, val1].sort((a, b) => a - b);
    }

    return [val0];
  }, [mergedValue, range, min]);

  // =========================== onChange ===========================
  const valuesRef = React.useRef(rawValues);
  valuesRef.current = rawValues;

  const triggerChange = (nextValues: number[]) => {
    if (onChange && !shallowEqual(nextValues, valuesRef.current)) {
      const triggerValue = range ? nextValues : nextValues[0];
      onChange(triggerValue);
    }
  };

  const onValueChange = (valueIndex: number, nextValue: number) => {
    // Format value
    // TODO: align with mark if needed
    let formatNextValue = Math.min(max, nextValue);
    formatNextValue = Math.max(min, formatNextValue);
    formatNextValue = min + Math.round((formatNextValue - min) / step) * step;

    // Create next values
    const nextValues = [...rawValues];
    nextValues[valueIndex] = formatNextValue;

    // Callback
    nextValues.sort((a, b) => a - b);

    console.log('next values', nextValues);
    setValue(nextValues);
    triggerChange(nextValues);
  };

  // ============================= Drag =============================
  const onPercentChange = (valueIndex: number, offsetPercent: number) => {
    const originValue = rawValues[valueIndex];
    onValueChange(valueIndex, originValue + offsetPercent * (max - min));
  };

  const [onStartMove] = useDrag(railRef, onPercentChange);

  // ============================= Refs =============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {},
    blur: () => {},
  }));

  // ============================ Render ============================
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-rail`} ref={railRef} />
      <div className={`${prefixCls}-track`} />
      <Handles
        prefixCls={prefixCls}
        values={rawValues}
        onStartMove={onStartMove}
        max={max}
        min={min}
      />
      <div className={`${prefixCls}-mark`} />
    </div>
  );
});

if (process.env.NODE_ENV === 'development') {
  Slider.displayName = 'Slider';
}

export default Slider;
