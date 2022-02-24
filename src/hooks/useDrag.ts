import * as React from 'react';
import type { Direction, OnStartMove } from '../interface';

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  direction: Direction,
  rawValues: number[],
  min: number,
  max: number,
  allowCross: boolean,
  pushable: boolean | number,
  formatValue: (value: number) => number,
  triggerChange: (values: number[]) => void,
  finishChange: () => void,
): [number, number, number[], OnStartMove] {
  // const [originDragValue, setOriginDragValue] = React.useState(null);
  const [draggingValue, setDraggingValue] = React.useState(null);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [cacheValues, setCacheValues] = React.useState(rawValues);
  const [originValues, setOriginValues] = React.useState(rawValues);

  React.useEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  const flushValues = (nextValues: number[], nextValue?: number) => {
    // Perf: Only update state when value changed
    if (cacheValues.some((val, i) => val !== nextValues[i])) {
      if (nextValue !== undefined) {
        setDraggingValue(nextValue);
      }
      setCacheValues(nextValues);
      triggerChange(nextValues);
    }
  };

  const updateCacheValue = (valueIndex: number, offsetPercent: number) => {
    if (valueIndex === -1) {
      // >>>> Dragging on the track

      const startValue = originValues[0];
      const endValue = originValues[originValues.length - 1];

      const maxStartOffset = min - startValue;
      const maxEndOffset = max - endValue;

      // Get valid offset
      let offset = offsetPercent * (max - min);
      offset = Math.max(offset, maxStartOffset);
      offset = Math.min(offset, maxEndOffset);

      // Use first value to revert back of valid offset (like steps marks)
      const formatStartValue = formatValue(startValue + offset);
      offset = formatStartValue - startValue;

      const cloneCacheValues = originValues.map((val) => val + offset);
      flushValues(cloneCacheValues);
    } else {
      // >>>> Dragging on the handle

      // Align value
      const originDragValue = originValues[draggingIndex];
      let nextValue = originDragValue + offsetPercent * (max - min);

      // Not pushable will make handle in the range
      if (typeof pushable === 'number') {
        nextValue = Math.max(nextValue, min + pushable * valueIndex);
        nextValue = Math.min(nextValue, max - pushable * (rawValues.length - valueIndex - 1));
      } else if (!allowCross) {
        const crossMin = cacheValues[valueIndex - 1] ?? min;
        const crossMax = cacheValues[valueIndex + 1] ?? max;

        nextValue = Math.min(nextValue, crossMax);
        nextValue = Math.max(nextValue, crossMin);
      }

      // Update values
      const cloneCacheValues = [...cacheValues];
      const formattedValue = formatValue(nextValue);
      cloneCacheValues[valueIndex] = formattedValue;

      // Pushable will makes others moving
      if (typeof pushable === 'number') {
        // Right
        let lastValue = formattedValue;
        for (let i = valueIndex + 1; i < cacheValues.length; i += 1) {
          if (lastValue + pushable > cloneCacheValues[i]) {
            const validValue = formatValue(lastValue + pushable);
            cloneCacheValues[i] = validValue;
            lastValue = validValue;
          }
        }

        // Left
        lastValue = formattedValue;
        for (let i = valueIndex - 1; i >= 0; i -= 1) {
          if (lastValue - pushable < cloneCacheValues[i]) {
            const validValue = formatValue(lastValue - pushable);
            cloneCacheValues[i] = validValue;
            lastValue = validValue;
          }
        }
      }

      flushValues(cloneCacheValues, formattedValue);
    }
  };

  // Resolve closure
  const updateCacheValueRef = React.useRef(updateCacheValue);
  updateCacheValueRef.current = updateCacheValue;

  const onStartMove: OnStartMove = (e, valueIndex) => {
    e.preventDefault();
    e.stopPropagation();

    const originValue = rawValues[valueIndex];

    setDraggingIndex(valueIndex);
    setDraggingValue(originValue);
    setOriginValues(rawValues);

    const { pageX: startX, pageY: startY } = e;
    (e.target as HTMLDivElement).focus();

    // Moving
    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = event;
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      const { width, height } = containerRef.current.getBoundingClientRect();

      let offSetPercent: number;
      switch (direction) {
        case 'btt':
          offSetPercent = -offsetY / height;
          break;

        case 'ttb':
          offSetPercent = offsetY / height;
          break;

        case 'rtl':
          offSetPercent = -offsetX / width;
          break;

        default:
          offSetPercent = offsetX / width;
      }
      updateCacheValueRef.current(valueIndex, offSetPercent);
    };

    // End
    const onMouseUp = (event: MouseEvent) => {
      event.preventDefault();

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);

      setDraggingIndex(-1);
      finishChange();
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  // Only return cache value when it mapping with rawValues
  const returnValues = React.useMemo(() => {
    const sourceValues = [...rawValues].sort((a, b) => a - b);
    const targetValues = [...cacheValues].sort((a, b) => a - b);

    return sourceValues.every((val, index) => val === targetValues[index])
      ? cacheValues
      : rawValues;
  }, [rawValues, cacheValues]);

  return [draggingIndex, draggingValue, returnValues, onStartMove];
}
