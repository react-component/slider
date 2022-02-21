import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { HandlesRef } from './Handles';
import Handles from './Handles';
import useDrag from './hooks/useDrag';
import SliderContext, { SliderContextProps } from './context';

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
  range?: boolean;
  onChange?: (value: number | number[]) => void;

  // Direction
  reverse?: boolean;
  vertical?: boolean;

  // included?: boolean;
  // disabled?: boolean;

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
  // included?: boolean;
  // disabled?: boolean;
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

    // Direction
    reverse,
    vertical,
  } = props;

  const railRef = React.useRef<HTMLDivElement>();

  const direction = vertical ? 'vertical' : reverse ? 'rtl' : 'ltr';

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

  const formatValue = (val: number) => {
    let formatNextValue = Math.min(max, val);
    formatNextValue = Math.max(min, formatNextValue);
    formatNextValue = min + Math.round((formatNextValue - min) / step) * step;
    return formatNextValue;
  };

  // =========================== onChange ===========================
  const rawValuesRef = React.useRef(rawValues);
  rawValuesRef.current = rawValues;

  const triggerChange = (nextValues: number[]) => {
    // Order first
    const cloneNextValues = [...nextValues].sort((a, b) => a - b);

    // Trigger event if needed
    if (onChange && !shallowEqual(cloneNextValues, rawValuesRef.current)) {
      const triggerValue = range ? cloneNextValues : cloneNextValues[0];
      onChange(triggerValue);
    }

    // We set this later since it will re-render component immediately
    setValue(cloneNextValues);
  };

  // ============================= Drag =============================
  const handlesRef = React.useRef<HandlesRef>();

  const [dragging, draggingValue, cacheValues, onStartMove] = useDrag(
    railRef,
    direction,
    rawValues,
    min,
    max,
    formatValue,
    triggerChange,
  );

  // Auto focus for updated handle
  React.useEffect(() => {
    if (!dragging) {
      const valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);

  // ============================= Refs =============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      handlesRef.current.focus(0);
    },
    blur: () => {},
  }));

  // =========================== Context ============================
  const context = React.useMemo<SliderContextProps>(
    () => ({
      min,
      max,
      direction,
    }),
    [min, max, direction],
  );

  // ============================ Render ============================
  return (
    <SliderContext.Provider value={context}>
      <div className={classNames(prefixCls, className)} style={style}>
        <div className={`${prefixCls}-rail`} ref={railRef} />
        <div className={`${prefixCls}-track`} />
        <Handles
          ref={handlesRef}
          prefixCls={prefixCls}
          values={cacheValues}
          onStartMove={onStartMove}
        />
        <div className={`${prefixCls}-mark`} />
      </div>
    </SliderContext.Provider>
  );
});

if (process.env.NODE_ENV === 'development') {
  Slider.displayName = 'Slider';
}

export default Slider;
