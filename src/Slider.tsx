import useControlledState from '@rc-component/util/lib/hooks/useControlledState';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import isEqual from '@rc-component/util/lib/isEqual';
import warning from '@rc-component/util/lib/warning';
import { clsx } from 'clsx';
import * as React from 'react';
import type { HandlesProps, HandlesRef } from './Handles';
import Handles from './Handles';
import type { InternalMarkObj, MarkObj } from './Marks';
import Marks from './Marks';
import Steps from './Steps';
import Tracks from './Tracks';
import type { SliderContextProps } from './context';
import SliderContext from './context';
import useDrag from './hooks/useDrag';
import useOffset from './hooks/useOffset';
import useRange from './hooks/useRange';
import type {
  AriaValueFormat,
  Direction,
  OnStartMove,
  SliderClassNames,
  SliderStyles,
} from './interface';

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

export type RangeConfig = {
  editable?: boolean;
  draggableTrack?: boolean;
  /** Set min count when `editable` */
  minCount?: number;
  /** Set max count when `editable` */
  maxCount?: number;
};

export interface SliderProps<ValueType = number | number[]> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;

  classNames?: SliderClassNames;
  styles?: SliderStyles;

  id?: string;

  // Status
  disabled?: boolean;
  keyboard?: boolean;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

  // Value
  range?: boolean | RangeConfig;
  /** @deprecated Use `range.minCount` or `range.maxCount` to handle this */
  count?: number;
  min?: number;
  max?: number;
  step?: number | null;
  value?: ValueType;
  defaultValue?: ValueType;
  onChange?: (value: ValueType) => void;
  /** @deprecated It's always better to use `onChange` instead */
  onBeforeChange?: (value: ValueType) => void;
  /** @deprecated Use `onChangeComplete` instead */
  onAfterChange?: (value: ValueType) => void;
  onChangeComplete?: (value: ValueType) => void;

  // Cross
  allowCross?: boolean;
  pushable?: boolean | number;

  // Direction
  reverse?: boolean;
  vertical?: boolean;

  // Style
  included?: boolean;
  startPoint?: number;
  /** @deprecated Please use `styles.track` instead */
  trackStyle?: React.CSSProperties | React.CSSProperties[];
  /** @deprecated Please use `styles.handle` instead */
  handleStyle?: React.CSSProperties | React.CSSProperties[];
  /** @deprecated Please use `styles.rail` instead */
  railStyle?: React.CSSProperties;
  dotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeDotStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);

  // Decorations
  marks?: Record<string | number, React.ReactNode | MarkObj>;
  dots?: boolean;

  // Components
  handleRender?: HandlesProps['handleRender'];
  activeHandleRender?: HandlesProps['handleRender'];
  track?: boolean;

  // Accessibility
  tabIndex?: number | number[];
  ariaLabelForHandle?: string | string[];
  ariaLabelledByForHandle?: string | string[];
  ariaRequired?: boolean;
  ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
}

export interface SliderRef {
  focus: () => void;
  blur: () => void;
}

const Slider = React.forwardRef<SliderRef, SliderProps<number | number[]>>((props, ref) => {
  const {
    prefixCls = 'rc-slider',
    className,
    style,
    classNames,
    styles,

    id,

    // Status
    disabled = false,
    keyboard = true,
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
    onChangeComplete,

    // Cross
    allowCross = true,
    pushable = false,

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
    activeHandleRender,
    track,

    // Accessibility
    tabIndex = 0,
    ariaLabelForHandle,
    ariaLabelledByForHandle,
    ariaRequired,
    ariaValueTextFormatterForHandle,
  } = props;

  const handlesRef = React.useRef<HandlesRef>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const direction = React.useMemo<Direction>(() => {
    if (vertical) {
      return reverse ? 'ttb' : 'btt';
    }
    return reverse ? 'rtl' : 'ltr';
  }, [reverse, vertical]);

  // ============================ Range =============================
  const [rangeEnabled, rangeEditable, rangeDraggableTrack, minCount, maxCount] = useRange(range);

  const mergedMin = React.useMemo(() => (isFinite(min) ? min : 0), [min]);
  const mergedMax = React.useMemo(() => (isFinite(max) ? max : 100), [max]);

  // ============================= Step =============================
  const mergedStep = React.useMemo(() => (step !== null && step <= 0 ? 1 : step), [step]);

  // ============================= Push =============================
  const mergedPush = React.useMemo(() => {
    if (typeof pushable === 'boolean') {
      return pushable ? mergedStep : false;
    }
    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);

  // ============================ Marks =============================
  const markList = React.useMemo<InternalMarkObj[]>(() => {
    return Object.keys(marks || {})
      .map<InternalMarkObj>((key) => {
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
          markObj.label = mark as React.ReactNode;
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
  const [mergedValue, setValue] = useControlledState(defaultValue, value);

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
    if (rangeEnabled) {
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
  }, [mergedValue, rangeEnabled, mergedMin, count, formatValue]);

  // =========================== onChange ===========================
  const getTriggerValue = (triggerValues: number[]) =>
    rangeEnabled ? triggerValues : triggerValues[0];

  const triggerChange = useEvent((nextValues: number[]) => {
    // Order first
    const cloneNextValues = [...nextValues].sort((a, b) => a - b);

    // Trigger event if needed
    if (onChange && !isEqual(cloneNextValues, rawValues, true)) {
      onChange(getTriggerValue(cloneNextValues));
    }

    // We set this later since it will re-render component immediately
    setValue(cloneNextValues);
  });

  const finishChange = useEvent((draggingDelete?: boolean) => {
    // Trigger from `useDrag` will tell if it's a delete action
    if (draggingDelete) {
      handlesRef.current.hideHelp();
    }

    const finishValue = getTriggerValue(rawValues);
    onAfterChange?.(finishValue);
    warning(
      !onAfterChange,
      '[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.',
    );
    onChangeComplete?.(finishValue);
  });

  const onDelete = (index: number) => {
    if (disabled || !rangeEditable || rawValues.length <= minCount) {
      return;
    }

    const cloneNextValues = [...rawValues];
    cloneNextValues.splice(index, 1);

    onBeforeChange?.(getTriggerValue(cloneNextValues));
    triggerChange(cloneNextValues);

    const nextFocusIndex = Math.max(0, index - 1);
    handlesRef.current.hideHelp();
    handlesRef.current.focus(nextFocusIndex);
  };

  const [draggingIndex, draggingValue, draggingDelete, cacheValues, onStartDrag] = useDrag(
    containerRef,
    direction,
    rawValues,
    mergedMin,
    mergedMax,
    formatValue,
    triggerChange,
    finishChange,
    offsetValues,
    rangeEditable,
    minCount,
  );

  /**
   * When `rangeEditable` will insert a new value in the values array.
   * Else it will replace the value in the values array.
   */
  const changeToCloseValue = (newValue: number, e?: React.MouseEvent) => {
    if (!disabled) {
      // Create new values
      const cloneNextValues = [...rawValues];

      let valueIndex = 0;
      let valueBeforeIndex = 0; // Record the index which value < newValue
      let valueDist = mergedMax - mergedMin;

      rawValues.forEach((val, index) => {
        const dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index;
        }

        if (val < newValue) {
          valueBeforeIndex = index;
        }
      });

      let focusIndex = valueIndex;

      if (rangeEditable && valueDist !== 0 && (!maxCount || rawValues.length < maxCount)) {
        cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
        focusIndex = valueBeforeIndex + 1;
      } else {
        cloneNextValues[valueIndex] = newValue;
      }

      // Fill value to match default 2 (only when `rawValues` is empty)
      if (rangeEnabled && !rawValues.length && count === undefined) {
        cloneNextValues.push(newValue);
      }

      const nextValue = getTriggerValue(cloneNextValues);
      onBeforeChange?.(nextValue);
      triggerChange(cloneNextValues);

      if (e) {
        (document.activeElement as HTMLElement)?.blur?.();
        handlesRef.current.focus(focusIndex);
        onStartDrag(e, focusIndex, cloneNextValues);
      } else {
        // https://github.com/ant-design/ant-design/issues/49997
        onAfterChange?.(nextValue);
        warning(
          !onAfterChange,
          '[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.',
        );
        onChangeComplete?.(nextValue);
      }
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
    changeToCloseValue(formatValue(nextValue), e);
  };

  // =========================== Keyboard ===========================
  const [keyboardValue, setKeyboardValue] = React.useState<number>(null);

  const onHandleOffsetChange = (offset: number | 'min' | 'max', valueIndex: number) => {
    if (!disabled) {
      const next = offsetValues(rawValues, offset, valueIndex);

      onBeforeChange?.(getTriggerValue(rawValues));
      triggerChange(next.values);

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
    if (rangeDraggableTrack && mergedStep === null) {
      if (process.env.NODE_ENV !== 'production') {
        warning(false, '`draggableTrack` is not supported when `step` is `null`.');
      }
      return false;
    }
    return rangeDraggableTrack;
  }, [rangeDraggableTrack, mergedStep]);

  const onStartMove: OnStartMove = useEvent((e, valueIndex) => {
    onStartDrag(e, valueIndex);

    onBeforeChange?.(getTriggerValue(rawValues));
  });

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
    if (!rangeEnabled) {
      return [mergedMin, sortedCacheValues[0]];
    }

    return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
  }, [sortedCacheValues, rangeEnabled, mergedMin]);

  // ============================= Refs =============================
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      handlesRef.current.focus(0);
    },
    blur: () => {
      const { activeElement } = document;
      if (containerRef.current?.contains(activeElement)) {
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
      keyboard,
      step: mergedStep,
      included,
      includedStart,
      includedEnd,
      range: rangeEnabled,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaRequired,
      ariaValueTextFormatterForHandle,
      styles: styles || {},
      classNames: classNames || {},
    }),
    [
      mergedMin,
      mergedMax,
      direction,
      disabled,
      keyboard,
      mergedStep,
      included,
      includedStart,
      includedEnd,
      rangeEnabled,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaRequired,
      ariaValueTextFormatterForHandle,
      styles,
      classNames,
    ],
  );

  // ============================ Render ============================
  return (
    <SliderContext.Provider value={context}>
      <div
        ref={containerRef}
        className={clsx(prefixCls, className, {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-vertical`]: vertical,
          [`${prefixCls}-horizontal`]: !vertical,
          [`${prefixCls}-with-marks`]: markList.length,
        })}
        style={style}
        onMouseDown={onSliderMouseDown}
        id={id}
      >
        <div
          className={clsx(`${prefixCls}-rail`, classNames?.rail)}
          style={{ ...railStyle, ...styles?.rail }}
        />

        {track !== false && (
          <Tracks
            prefixCls={prefixCls}
            style={trackStyle}
            values={rawValues}
            startPoint={startPoint}
            onStartMove={mergedDraggableTrack ? onStartMove : undefined}
          />
        )}

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
          draggingDelete={draggingDelete}
          onStartMove={onStartMove}
          onOffsetChange={onHandleOffsetChange}
          onFocus={onFocus}
          onBlur={onBlur}
          handleRender={handleRender}
          activeHandleRender={activeHandleRender}
          onChangeComplete={finishChange}
          onDelete={rangeEditable ? onDelete : undefined}
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
