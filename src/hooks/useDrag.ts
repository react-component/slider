import React from 'react';
import { HandlesRef } from '../Handles';
import { Direction, OnStartMove } from '../interface';
import { ConstrainValue, OffsetValues } from './useOffset';

function getPosition(
  e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
) {
  const obj = 'touches' in e ? e.touches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

const useDrag = ({
  containerRef,
  handlesRef,
  direction,
  rawValues,
  min,
  max,
  constrainValue,
  triggerChange,
  offsetValues,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  handlesRef: React.RefObject<HandlesRef>;
  direction: Direction;
  rawValues: number[];
  min: number;
  max: number;
  constrainValue: ConstrainValue;
  triggerChange: (values: number[]) => void;
  offsetValues: OffsetValues;
}): {
  draggingIndex: number;
  onStartDrag: OnStartMove;
} => {
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

  const flushValues = (nextValues: number[]) => {
    // Perf: Only update state when value changed
    if (cacheValues.some((val, i) => val !== nextValues[i])) {
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
      const formatStartValue = constrainValue(startValue + offset);
      offset = formatStartValue - startValue;
      const cloneCacheValues = originValues.map((val) => val + offset);
      flushValues(cloneCacheValues);
    } else {
      // >>>> Dragging on the handle
      const offsetDist = (max - min) * offsetPercent;

      // Always start with the valueIndex origin value
      const cloneValues = [...cacheValues];
      cloneValues[valueIndex] = originValues[valueIndex];

      const next = offsetValues(cloneValues, valueIndex, offsetDist, 'dist');

      flushValues(next.values);
    }
  };

  // Resolve closure
  const updateCacheValueRef = React.useRef(updateCacheValue);
  updateCacheValueRef.current = updateCacheValue;

  const onStartDrag: OnStartMove = (e, valueIndex) => {
    e.preventDefault();
    e.stopPropagation();

    setDraggingIndex(valueIndex);
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

      let offsetRatio: number;
      switch (direction) {
        case 'btt':
          offsetRatio = -offsetY / height;
          break;

        case 'ttb':
          offsetRatio = offsetY / height;
          break;

        case 'rtl':
          offsetRatio = -offsetX / width;
          break;

        default:
          offsetRatio = offsetX / width;
      }
      updateCacheValueRef.current(valueIndex, offsetRatio);
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

      handlesRef.current?.focus(valueIndex);
      setDraggingIndex(-1);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    document.addEventListener('touchmove', onMouseMove);
    mouseMoveEventRef.current = onMouseMove;
    mouseUpEventRef.current = onMouseUp;
  };

  return {
    draggingIndex,
    onStartDrag,
  };
};

export default useDrag;
