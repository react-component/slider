import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { HandlesRef } from './Handles';
import Handles from './Handles';
import useDrag from './hooks/useDrag';
import SliderContext from './context';
import type { SliderContextProps } from './context';
import Track from './Track';
import type { Direction } from './interface';
import Marks, { InternalMarkObj } from './Marks';
import type { MarksProps } from './Marks';

export interface SliderProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;

  // Status
  disabled?: boolean;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

  // Value
  min?: number;
  max?: number;
  value?: number | number[];
  defaultValue?: number | number[];
  step?: number | null;
  range?: boolean;
  onChange?: (value: number | number[]) => void;
  onAfterChange?: (value: number | number[]) => void;

  // Direction
  reverse?: boolean;
  vertical?: boolean;

  // Style
  included?: boolean;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;

  // Decorations
  marks?: MarksProps['marks'];
  // dots?: boolean;
  // draggableTrack?: boolean;
  // onBeforeChange?: (value: number) => void;
  // included?: boolean;
  // disabled?: boolean;
  // minimumTrackStyle?: React.CSSProperties;
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

    // Status
    disabled,
    autoFocus,
    onFocus,
    onBlur,

    // Value
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    range,
    onChange,
    onAfterChange,

    // Direction
    reverse,
    vertical,

    // Style
    included = true,
    trackStyle,
    handleStyle,

    // Decorations
    marks,
  } = props;

  const railRef = React.useRef<HTMLDivElement>();

  const direction: Direction = vertical ? 'vertical' : reverse ? 'rtl' : 'ltr';

  // ============================ Marks =============================
  const markList = React.useMemo<InternalMarkObj[]>(() => {
    const keys = Object.keys(marks || {});

    return keys
      .map((key) => {
        const mark = marks[key];
        const markObj: InternalMarkObj = {
          value: Number(key),
        };

        if (
          mark &&
          typeof mark === 'object' &&
          !React.isValidElement(mark) &&
          ('label' in mark || 'style' in mark)
        ) {
          markObj.style = mark.style;
          markObj.label = mark.label;
        } else {
          markObj.label = mark;
        }

        return markObj;
      })
      .sort((a, b) => a.value - b.value);
  }, [marks]);

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

    // List align values
    const alignValues = markList.map((mark) => mark.value);
    if (step !== null) {
      alignValues.push(min + Math.round((formatNextValue - min) / step) * step);
    }

    // Align with marks
    let closeValue = markList[0].value;
    let closeDist = max - min;

    alignValues.forEach((alignValue) => {
      const dist = Math.abs(formatNextValue - alignValue);
      if (dist <= closeDist) {
        closeValue = alignValue;
        closeDist = dist;
      }
    });

    return closeValue;
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

  const changeToCloseValue = (newValue: number) => {
    if (!disabled) {
      let valueIndex = 0;
      let valueDist = max - min;

      rawValues.forEach((val, index) => {
        const dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index;
        }
      });

      // Create new values
      const cloneNextValues = [...rawValues];
      cloneNextValues[valueIndex] = newValue;

      triggerChange(cloneNextValues);
    }
  };

  // ============================= Drag =============================
  const handlesRef = React.useRef<HandlesRef>();

  const finishChange = () => {
    if (onAfterChange) {
      const triggerValue = range ? rawValuesRef.current : rawValuesRef.current[0];
      onAfterChange(triggerValue);
    }
  };

  const [dragging, draggingValue, cacheValues, onStartMove] = useDrag(
    railRef,
    direction,
    rawValues,
    min,
    max,
    formatValue,
    triggerChange,
    finishChange,
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

  // ============================ Effect ============================
  React.useEffect(() => {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);

  // =========================== Context ============================
  const context = React.useMemo<SliderContextProps>(
    () => ({
      min,
      max,
      direction,
      disabled,
    }),
    [min, max, direction, disabled],
  );

  // ============================ Render ============================
  return (
    <SliderContext.Provider value={context}>
      <div
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-vertical`]: direction === 'vertical',
          [`${prefixCls}-ltr`]: direction === 'ltr',
          [`${prefixCls}-rtl`]: direction === 'rtl',
        })}
        style={style}
      >
        <div className={`${prefixCls}-rail`} ref={railRef} />

        {included && <Track prefixCls={prefixCls} style={trackStyle} values={cacheValues} />}

        <Handles
          ref={handlesRef}
          prefixCls={prefixCls}
          style={handleStyle}
          values={cacheValues}
          onStartMove={onStartMove}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        <Marks prefixCls={prefixCls} marks={markList} onClick={changeToCloseValue} />
      </div>
    </SliderContext.Provider>
  );
});

if (process.env.NODE_ENV === 'development') {
  Slider.displayName = 'Slider';
}

export default Slider;
