import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { HandlesRef } from './Handles';
import Handles from './Handles';
import type { HandlesProps } from './Handles';
import useDrag from './hooks/useDrag';
import SliderContext from './context';
import type { SliderContextProps } from './context';
import Track from './Track';
import type { Direction } from './interface';
import Marks, { MarkObj } from './Marks';
import type { InternalMarkObj } from './Marks';
import type { MarksProps } from './Marks';
import Steps from './Steps';

/**
 * New:
 * - click mark to update range value
 * - handleRender
 * - Remove allowCross
 */

export interface BaseSliderProps {
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
  step?: number | null;
  /** @deprecated This prop is removed and always allow drag cross the points */
  allowCross?: boolean;

  // Direction
  reverse?: boolean;
  vertical?: boolean;

  // Style
  included?: boolean;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;

  // Decorations
  marks?: Record<string | number, React.ReactNode | MarkObj>;
  dots?: boolean;

  // Components
  handleRender?: HandlesProps['handleRender'];

  // draggableTrack?: boolean;
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

export interface SingleSliderProps extends BaseSliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onBeforeChange?: (value: number) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onAfterChange?: (value: number) => void;
}

export interface RangeSliderProps extends BaseSliderProps {
  range: true;

  value?: number[];
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onBeforeChange?: (value: number[]) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onAfterChange?: (value: number[]) => void;
}

export type SliderProps = SingleSliderProps | RangeSliderProps;

type InternalSliderProps = SliderProps & {
  range?: boolean;

  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  onBeforeChange?: (value: number | number[]) => void;
  onAfterChange?: (value: number | number[]) => void;
};

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
    onBeforeChange,
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
    dots,

    // Components
    handleRender,
  } = props as InternalSliderProps;

  const containerRef = React.useRef<HTMLDivElement>();

  const direction: Direction = vertical ? 'vertical' : reverse ? 'rtl' : 'ltr';

  // ============================= Step =============================
  const mergedStep = React.useMemo(() => (step !== null && step <= 0 ? 1 : step), [step]);

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
    if (mergedStep !== null) {
      alignValues.push(min + Math.round((formatNextValue - min) / mergedStep) * mergedStep);
    }

    // Align with marks
    let closeValue = alignValues[0];
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

  // ============================ Click =============================
  const onSliderMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const { width, height, left, bottom, right } = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let percent: number;
    switch (direction) {
      case 'vertical':
        percent = (bottom - clientY) / height;
        break;

      case 'rtl':
        percent = (right - clientX) / width;
        break;

      default:
        percent = (clientX - left) / width;
    }

    const nextValue = min + percent * (max - min);
    changeToCloseValue(formatValue(nextValue));
  };

  // ============================= Drag =============================
  const handlesRef = React.useRef<HandlesRef>();

  const finishChange = () => {
    if (onAfterChange) {
      const triggerValue = range ? rawValuesRef.current : rawValuesRef.current[0];
      onAfterChange(triggerValue);
    }
  };

  const [draggingIndex, draggingValue, cacheValues, onStartDrag] = useDrag(
    containerRef,
    direction,
    rawValues,
    min,
    max,
    formatValue,
    triggerChange,
    finishChange,
  );

  const onStartMove = (e: React.MouseEvent, valueIndex: number) => {
    onStartDrag(e, valueIndex);

    onBeforeChange?.(range ? rawValuesRef.current : rawValuesRef.current[0]);
  };

  // Auto focus for updated handle
  const dragging = draggingIndex !== -1;
  React.useEffect(() => {
    if (!dragging) {
      const valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);

  // =========================== Included ===========================
  // Provide a range values with included [min, max]
  // Used for Track, Mark & Dot
  const [includedStart, includedEnd] = React.useMemo(() => {
    const cloneValues = [...rawValues].sort((a, b) => a - b);

    if (cloneValues.length === 1) {
      return [min, cloneValues[0]];
    }

    return cloneValues;
  }, [rawValues, min]);

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
      step: mergedStep,
      included,
      includedStart,
      includedEnd,
    }),
    [min, max, direction, disabled, mergedStep, included, includedStart, includedEnd],
  );

  // ============================ Render ============================
  return (
    <SliderContext.Provider value={context}>
      <div
        ref={containerRef}
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-vertical`]: direction === 'vertical',
          [`${prefixCls}-ltr`]: direction === 'ltr',
          [`${prefixCls}-rtl`]: direction === 'rtl',
        })}
        style={style}
        onMouseDown={onSliderMouseDown}
      >
        <div className={`${prefixCls}-rail`} />

        {included && <Track prefixCls={prefixCls} style={trackStyle} />}

        <Steps prefixCls={prefixCls} marks={markList} dots={dots} />

        <Handles
          ref={handlesRef}
          prefixCls={prefixCls}
          style={handleStyle}
          values={cacheValues}
          draggingIndex={draggingIndex}
          onStartMove={onStartMove}
          onFocus={onFocus}
          onBlur={onBlur}
          handleRender={handleRender}
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
