import React from 'react';
import { Direction, OnStartMove } from '../interface';
import { OffsetValues } from './useOffset';

function getPosition(
  e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
) {
  const obj = 'touches' in e ? e.touches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

const useDrag = (
  containerRef: React.RefObject<HTMLDivElement>,
  direction: Direction,
  rawValues: number[],
  min: number,
  max: number,
  formatValue: (value: number) => number,
  triggerChange: (values: number[]) => void,
  offsetValues: OffsetValues
): {
  draggingIndex: number;
  draggingValue: number;
  cacheValues: number[];
  onStartDrag: OnStartMove;
} => {
  const [draggingValue, setDraggingValue] = React.useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [cacheValues, setCacheValues] = React.useState(rawValues);
  const [originValues, setOriginValues] = React.useState(rawValues);

  const mouseMoveEventRef = React.useRef<
    null | ((event: MouseEvent | TouchEvent) => void)
  >(null);
  const mouseUpEventRef = React.useRef<
    null | ((event: MouseEvent | TouchEvent) => void)
  >(null);

  React.useEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  // Clean up event
  React.useEffect(
    () => () => {
      if (mouseMoveEventRef.current)
        document.removeEventListener('mousemove', mouseMoveEventRef.current);
      if (mouseUpEventRef.current)
        document.removeEventListener('mouseup', mouseUpEventRef.current);
      if (mouseMoveEventRef.current)
        document.removeEventListener('touchmove', mouseMoveEventRef.current);
      if (mouseUpEventRef.current)
        document.removeEventListener('touchend', mouseUpEventRef.current);
    },
    []
  );

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
    // Basic point offset

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
      const offsetDist = (max - min) * offsetPercent;

      // Always start with the valueIndex origin value
      const cloneValues = [...cacheValues];
      cloneValues[valueIndex] = originValues[valueIndex];

      const next = offsetValues(cloneValues, offsetDist, valueIndex, 'dist');

      flushValues(next.values, next.values[valueIndex]);
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

    const { pageX: startX, pageY: startY } = getPosition(e);

    // Moving
    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = getPosition(event);
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      if (!containerRef.current) return;

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
    const onMouseUp = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      mouseMoveEventRef.current = null;
      mouseUpEventRef.current = null;

      setDraggingIndex(-1);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('touchmove', onMouseMove);
    mouseMoveEventRef.current = onMouseMove;
    mouseUpEventRef.current = onMouseUp;
  };

  // Only return cache value when it mapping with rawValues
  const returnValues = React.useMemo(() => {
    const sourceValues = [...rawValues].sort((a, b) => a - b);
    const targetValues = [...cacheValues].sort((a, b) => a - b);

    return sourceValues.every((val, index) => val === targetValues[index])
      ? cacheValues
      : rawValues;
  }, [rawValues, cacheValues]);

  return {
    draggingIndex,
    draggingValue: draggingValue!,
    cacheValues: returnValues,
    onStartDrag: onStartMove,
  };
};

export default useDrag;
