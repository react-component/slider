import { useEvent } from 'rc-util';
import * as React from 'react';
import type { Direction, OnStartMove } from '../interface';
import type { OffsetValues } from './useOffset';

/** Drag to delete offset. It's a user experience number for dragging out */
const REMOVE_DIST = 130;

function getPosition(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) {
  const obj = 'touches' in e ? e.touches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  direction: Direction,
  rawValues: number[],
  min: number,
  max: number,
  formatValue: (value: number) => number,
  triggerChange: (values: number[]) => void,
  finishChange: (draggingDelete: boolean) => void,
  offsetValues: OffsetValues,
  editable: boolean,
  minCount: number,
): [
  draggingIndex: number,
  draggingValue: number,
  draggingDelete: boolean,
  returnValues: number[],
  onStartMove: OnStartMove,
] {
  const [draggingValue, setDraggingValue] = React.useState(null);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [draggingDelete, setDraggingDelete] = React.useState(false);
  const [cacheValues, setCacheValues] = React.useState(rawValues);
  const [originValues, setOriginValues] = React.useState(rawValues);

  const mouseMoveEventRef = React.useRef<(event: MouseEvent) => void>(null);
  const mouseUpEventRef = React.useRef<(event: MouseEvent) => void>(null);

  React.useLayoutEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  // Clean up event
  React.useEffect(
    () => () => {
      document.removeEventListener('mousemove', mouseMoveEventRef.current);
      document.removeEventListener('mouseup', mouseUpEventRef.current);
      document.removeEventListener('touchmove', mouseMoveEventRef.current);
      document.removeEventListener('touchend', mouseUpEventRef.current);
    },
    [],
  );

  const flushValues = (nextValues: number[], nextValue?: number, deleteMark?: boolean) => {
    // Perf: Only update state when value changed
    if (cacheValues.some((val, i) => val !== nextValues[i]) || deleteMark) {
      if (nextValue !== undefined) {
        setDraggingValue(nextValue);
      }
      setCacheValues(nextValues);

      let changeValues = nextValues;
      if (deleteMark) {
        changeValues = nextValues.filter((_, i) => i !== draggingIndex);
      }
      triggerChange(changeValues);
    }
  };

  const updateCacheValue = useEvent(
    (valueIndex: number, offsetPercent: number, deleteMark: boolean) => {
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
        const cloneCacheValues = originValues.map<number>((val) => val + offset);
        flushValues(cloneCacheValues);
      } else {
        // >>>> Dragging on the handle
        const offsetDist = (max - min) * offsetPercent;

        // Always start with the valueIndex origin value
        const cloneValues = [...cacheValues];
        cloneValues[valueIndex] = originValues[valueIndex];

        const next = offsetValues(cloneValues, offsetDist, valueIndex, 'dist');

        flushValues(next.values, next.value, deleteMark);
      }
    },
  );

  const onStartMove: OnStartMove = (e, valueIndex, startValues?: number[]) => {
    e.stopPropagation();

    // 如果是点击 track 触发的，需要传入变化后的初始值，而不能直接用 rawValues
    const initialValues = startValues || rawValues;
    const originValue = initialValues[valueIndex];

    setDraggingIndex(valueIndex);
    setDraggingValue(originValue);
    setOriginValues(initialValues);
    setCacheValues(initialValues);
    setDraggingDelete(false);

    const { pageX: startX, pageY: startY } = getPosition(e);

    // We declare it here since closure can't get outer latest value
    let deleteMark = false;

    // Moving
    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = getPosition(event);
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      const { width, height } = containerRef.current.getBoundingClientRect();

      let offSetPercent: number;
      let removeDist: number;

      switch (direction) {
        case 'btt':
          offSetPercent = -offsetY / height;
          removeDist = offsetX;
          break;

        case 'ttb':
          offSetPercent = offsetY / height;
          removeDist = offsetX;
          break;

        case 'rtl':
          offSetPercent = -offsetX / width;
          removeDist = offsetY;
          break;

        default:
          offSetPercent = offsetX / width;
          removeDist = offsetY;
      }

      // Check if need mark remove
      deleteMark = editable
        ? Math.abs(removeDist) > REMOVE_DIST && minCount < cacheValues.length
        : false;
      setDraggingDelete(deleteMark);

      updateCacheValue(valueIndex, offSetPercent, deleteMark);
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

      finishChange(deleteMark);

      setDraggingIndex(-1);
      setDraggingDelete(false);
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

    const counts: Record<number, number> = {};
    targetValues.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1;
    });
    sourceValues.forEach((val) => {
      counts[val] = (counts[val] || 0) - 1;
    });

    const maxDiffCount = editable ? 1 : 0;
    const diffCount: number = Object.values(counts).reduce((prev, next) => prev + next, 0);

    return diffCount <= maxDiffCount ? cacheValues : rawValues;
  }, [rawValues, cacheValues, editable]);

  return [draggingIndex, draggingValue, draggingDelete, returnValues, onStartMove];
}

export default useDrag;
