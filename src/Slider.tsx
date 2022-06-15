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
import Tracks from './Tracks';
import type { AriaValueFormat, Direction, OnStartMove } from './interface';
import Marks from './Marks';
import type { MarkObj } from './Marks';
import type { InternalMarkObj } from './Marks';
import Steps from './Steps';
import useOffset from './hooks/useOffset';
import warning from 'rc-util/lib/warning';

/**
 * New:
 * - click mark to update range value
 * - handleRender
 * - Fix handle with count not correct
 * - Fix pushable not work in some case
 * - No more FindDOMNode
 * - Move all position related style into inline style
 * - Key: up is plus, down is minus
 * - fix Key with step = null not align with marks
 * - Change range should not trigger onChange
 * - keyboard support pushable
 */

export interface SliderProps<ValueType = number | number[]> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;

  // Status
  disabled?: boolean;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

  // Value
  range?: boolean;
  count?: number;
  min?: number;
  max?: number;
  step?: number | null;
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: (value: ValueType) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onBeforeChange?: (value: ValueType) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onAfterChange?: (value: ValueType) => void;

  // Cross
  allowCross?: boolean;
  pushable?: boolean | number;
  /** range only */
  draggableTrack?: boolean;

  // Direction
  reverse?: boolean;
  vertical?: boolean;

  // Style
  included?: boolean;
  startPoint?: number;
  trackStyle?: React.CSSProperties | React.CSSProperties[];
  handleStyle?: React.CSSProperties | React.CSSProperties[];
  railStyle?: React.CSSProperties;
  dotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeDotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);

  // Decorations
  marks?: Record<string | number, React.ReactNode | MarkObj>;
  dots?: boolean;

  // Components
  handleRender?: HandlesProps['handleRender'];

  // Accessibility
  tabIndex?: number | number[];
  ariaLabelForHandle?: string | string[];
  ariaLabelledByForHandle?: string | string[];
  ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
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
    disabled = false,
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
    count,
    onChange,
    onBeforeChange,
    onAfterChange,

    // Cross
    allowCross = true,
    pushable = false,
    draggableTrack,

    // Direction
    reverse,
    vertical,

    // Style
    included = true,
    startPoint,
    trackStyle,
    handleStyle,
    railStyle,
    dotStyle,
    activeDotStyle,

    // Decorations
    marks,
    dots,

    // Components
    handleRender,

    // Accessibility
    tabIndex = 0,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaValueTextFormatterForHandle,
  } = props;

  const handlesRef = React.useRef<HandlesRef>();
  const containerRef = React.useRef<HTMLDivElement>();

  const direction: Direction = React.useMemo(() => {
    if (vertical) {
      return reverse ? 'ttb' : 'btt';
    }
    return reverse ? 'rtl' : 'ltr';
  }, [reverse, vertical]);

  // ============================ Range =============================
  const mergedMin = React.useMemo(() => (isFinite(min) ? min : 0), [min]);
  const mergedMax = React.useMemo(() => (isFinite(max) ? max : 100), [max]);

  // ============================= Step =============================
  const mergedStep = React.useMemo(() => (step !== null && step <= 0 ? 1 : step), [step]);

  // ============================= Push =============================
  const mergedPush = React.useMemo(() => {
    if (pushable === true) {
      return mergedStep;
    }

    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);

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
      .filter(({ label }) => label || typeof label === 'number')
      .sort((a, b) => a.value - b.value);
  }, [marks]);

  // ============================ Format ============================
  const [formatValue, offsetValues] = useOffset(
    mergedMin,
    mergedMax,
    mergedStep,
    markList,
    allowCross,
    mergedPush,
  );

  // ============================ Values ============================
  const [mergedValue, setValue] = useMergedState<number | number[], number[]>(defaultValue, {
    value,
  });

  const rawValues = React.useMemo(() => {
    const valueList =
      mergedValue === null || mergedValue === undefined
        ? []
        : Array.isArray(mergedValue)
        ? mergedValue
        : [mergedValue];

    const [val0 = mergedMin] = valueList;
    let returnValues = mergedValue === null ? [] : [val0];

    // Format as range
    if (range) {
      returnValues = [...valueList];

      // When count provided or value is `undefined`, we fill values
      if (count || mergedValue === undefined) {
        const pointCount = count >= 0 ? count + 1 : 2;
        returnValues = returnValues.slice(0, pointCount);

        // Fill with count
        while (returnValues.length < pointCount) {
          returnValues.push(returnValues[returnValues.length - 1] ?? mergedMin);
        }
      }
      returnValues.sort((a, b) => a - b);
    }

    // Align in range
    returnValues.forEach((val, index) => {
      returnValues[index] = formatValue(val);
    });

    return returnValues;
  }, [mergedValue, range, mergedMin, count, formatValue]);

  // =========================== onChange ===========================
  const rawValuesRef = React.useRef(rawValues);
  rawValuesRef.current = rawValues;

  const getTriggerValue = (triggerValues: number[]) => (range ? triggerValues : triggerValues[0]);

  const triggerChange = (nextValues: number[]) => {
    // Order first
    const cloneNextValues = [...nextValues].sort((a, b) => a - b);

    // Trigger event if needed
    if (onChange && !shallowEqual(cloneNextValues, rawValuesRef.current)) {
      onChange(getTriggerValue(cloneNextValues));
    }

    // We set this later since it will re-render component immediately
    setValue(cloneNextValues);
  };

  const changeToCloseValue = (newValue: number) => {
    if (!disabled) {
      let valueIndex = 0;
      let valueDist = mergedMax - mergedMin;

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

      // Fill value to match default 2
      if (range && !rawValues.length && count === undefined) {
        cloneNextValues.push(newValue);
      }

      onBeforeChange?.(getTriggerValue(cloneNextValues));
      triggerChange(cloneNextValues);
      onAfterChange?.(getTriggerValue(cloneNextValues));
    }
  };

  // ============================ Click =============================
  const onSliderMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    const { width, height, left, top, bottom, right } =
      containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;

    let percent: number;
    switch (direction) {
      case 'btt':
        percent = (bottom - clientY) / height;
        break;

      case 'ttb':
        percent = (clientY - top) / height;
        break;

      case 'rtl':
        percent = (right - clientX) / width;
        break;

      default:
        percent = (clientX - left) / width;
    }

    const nextValue = mergedMin + percent * (mergedMax - mergedMin);
    changeToCloseValue(formatValue(nextValue));
  };

  // =========================== Keyboard ===========================
  const [keyboardValue, setKeyboardValue] = React.useState<number>(null);

  const onHandleOffsetChange = (offset: number | 'min' | 'max', valueIndex: number) => {
    if (!disabled) {
      const next = offsetValues(rawValues, offset, valueIndex);

      onBeforeChange?.(getTriggerValue(rawValues));
      triggerChange(next.values);
      onAfterChange?.(getTriggerValue(next.values));

      setKeyboardValue(next.value);
    }
  };

  React.useEffect(() => {
    if (keyboardValue !== null) {
      const valueIndex = rawValues.indexOf(keyboardValue);
      if (valueIndex >= 0) {
        handlesRef.current.focus(valueIndex);
      }
    }

    setKeyboardValue(null);
  }, [keyboardValue]);

  // ============================= Drag =============================
  const mergedDraggableTrack = React.useMemo(() => {
    if (draggableTrack && mergedStep === null) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, '`draggableTrack` is not supported when `step` is `null`.');
      }
      return false;
    }
    return draggableTrack;
  }, [draggableTrack, mergedStep]);

  const finishChange = () => {
    onAfterChange?.(getTriggerValue(rawValuesRef.current));
  };

  const [draggingIndex, draggingValue, cacheValues, onStartDrag] = useDrag(
    containerRef,
    direction,
    rawValues,
    mergedMin,
    mergedMax,
    formatValue,
    triggerChange,
    finishChange,
    offsetValues,
  );

  const onStartMove: OnStartMove = (e, valueIndex) => {
    onStartDrag(e, valueIndex);

    onBeforeChange?.(getTriggerValue(rawValuesRef.current));
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
  const sortedCacheValues = React.useMemo(
    () => [...cacheValues].sort((a, b) => a - b),
    [cacheValues],
  );

  // Provide a range values with included [min, max]
  // Used for Track, Mark & Dot
  const [includedStart, includedEnd] = React.useMemo(() => {
    if (!range) {
      return [mergedMin, sortedCacheValues[0]];
    }

    return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
  }, [sortedCacheValues, range, mergedMin]);

  // ============================= Refs =============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      handlesRef.current.focus(0);
    },
    blur: () => {
      const { activeElement } = document;
      if (containerRef.current.contains(activeElement)) {
        (activeElement as HTMLElement)?.blur();
      }
    },
  }));

  // ========================== Auto Focus ==========================
  React.useEffect(() => {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);

  // =========================== Context ============================
  const context = React.useMemo<SliderContextProps>(
    () => ({
      min: mergedMin,
      max: mergedMax,
      direction,
      disabled,
      step: mergedStep,
      included,
      includedStart,
      includedEnd,
      range,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle,
    }),
    [
      mergedMin,
      mergedMax,
      direction,
      disabled,
      mergedStep,
      included,
      includedStart,
      includedEnd,
      range,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaValueTextFormatterForHandle,
    ],
  );

  // ============================ Render ============================
  return (
    <SliderContext.Provider value={context}>
      <div
        ref={containerRef}
        className={classNames(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-vertical`]: vertical,
          [`${prefixCls}-horizontal`]: !vertical,
          [`${prefixCls}-with-marks`]: markList.length,
        })}
        style={style}
        onMouseDown={onSliderMouseDown}
      >
        <div className={`${prefixCls}-rail`} style={railStyle} />

        <Tracks
          prefixCls={prefixCls}
          style={trackStyle}
          values={sortedCacheValues}
          startPoint={startPoint}
          onStartMove={mergedDraggableTrack ? onStartMove : null}
        />

        <Steps
          prefixCls={prefixCls}
          marks={markList}
          dots={dots}
          style={dotStyle}
          activeStyle={activeDotStyle}
        />

        <Handles
          ref={handlesRef}
          prefixCls={prefixCls}
          style={handleStyle}
          values={cacheValues}
          draggingIndex={draggingIndex}
          onStartMove={onStartMove}
          onOffsetChange={onHandleOffsetChange}
          onFocus={onFocus}
          onBlur={onBlur}
          handleRender={handleRender}
        />

        <Marks prefixCls={prefixCls} marks={markList} onClick={changeToCloseValue} />
      </div>
    </SliderContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Slider.displayName = 'Slider';
}

export default Slider;
