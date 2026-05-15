import * as React from 'react';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { UnstableContext } from '../context';
import type { Direction, OnStartMove } from '../interface';
import type { OffsetValues } from './useOffset';

/** Drag to delete offset. It's a user experience number for dragging out */
const REMOVE_DIST = 130;

function getPosition(e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) {
  const obj = 'targetTouches' in e ? e.targetTouches[0] : e;

  return { pageX: obj.pageX, pageY: obj.pageY };
}

function useDrag(
  containerRef: React.RefObject<HTMLDivElement | null>,
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
  isHandleDisabled: (index: number) => boolean,
): [
  draggingIndex: number,
  draggingValue: number,
  draggingDelete: boolean,
  returnValues: number[],
  onStartMove: OnStartMove,
] {
  const [draggingValue, setDraggingValue] = React.useState<number>(null!);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [draggingDelete, setDraggingDelete] = React.useState(false);
  const [cacheValues, setCacheValues] = React.useState(rawValues);
  const [originValues, setOriginValues] = React.useState(rawValues);

  const mouseMoveEventRef = React.useRef<EventListener | null>(null);
  const mouseUpEventRef = React.useRef<EventListener | null>(null);
  const touchEventTargetRef = React.useRef<EventTarget | null>(null);

  const { onDragStart, onDragChange } = React.useContext(UnstableContext);

  useLayoutEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  // Clean up event
  React.useEffect(
    () => () => {
      if (mouseMoveEventRef.current) {
        document.removeEventListener('mousemove', mouseMoveEventRef.current);
      }
      if (mouseUpEventRef.current) {
        document.removeEventListener('mouseup', mouseUpEventRef.current);
      }
      if (touchEventTargetRef.current) {
        if (mouseMoveEventRef.current) {
          touchEventTargetRef.current.removeEventListener('touchmove', mouseMoveEventRef.current);
        }
        if (mouseUpEventRef.current) {
          touchEventTargetRef.current.removeEventListener('touchend', mouseUpEventRef.current);
        }
      }
    },
    [],
  );

  const flushValues = (nextValues: number[], nextValue?: number, deleteMark?: boolean) => {
    // Perf: Only update state when value changed
    if (nextValue !== undefined) {
      setDraggingValue(nextValue);
    }
    setCacheValues(nextValues);

    let changeValues = nextValues;
    if (deleteMark) {
      changeValues = nextValues.filter((_, i) => i !== draggingIndex);
    }
    triggerChange(changeValues);

    // Optional callback for drag change (not used in current implementation)
    if (onDragChange) {
      onDragChange({
        rawValues: nextValues,
        deleteIndex: deleteMark ? draggingIndex : -1,
        draggingIndex,
        draggingValue: nextValue as number,
      });
    }
  };

  const updateCacheValue = useEvent(
    (valueIndex: number, offsetPercent: number, deleteMark: boolean) => {
      if (valueIndex === -1) {
        // >>>> Dragging on the track
        // Defensive: should not happen as Tracks/index.tsx blocks this when any handle is disabled
        if (originValues.some((_, index) => isHandleDisabled(index))) {
          return;
        }

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

    const initialValues = startValues || rawValues;
    // Defensive: should not happen as Handle.tsx blocks this when handle is disabled
    if (isHandleDisabled(valueIndex)) {
      return;
    }

    const originValue = initialValues[valueIndex];

    setDraggingIndex(valueIndex);
    setDraggingValue(originValue);
    setOriginValues(initialValues);
    setCacheValues(initialValues);
    setDraggingDelete(false);

    const { pageX: startX, pageY: startY } = getPosition(e);

    // We declare it here since closure can't get outer latest value
    let deleteMark = false;

    // Optional callback for drag start (not used in current implementation)
    if (onDragStart) {
      onDragStart({
        rawValues: initialValues,
        draggingIndex: valueIndex,
        draggingValue: originValue,
      });
    }

    // Moving
    const onMouseMove: EventListener = (event) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = getPosition(event as MouseEvent | TouchEvent);
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      const { width, height } = containerRef.current!.getBoundingClientRect();

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
    const onMouseUp: EventListener = (event) => {
      event.preventDefault();

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      if (touchEventTargetRef.current) {
        if (mouseMoveEventRef.current) {
          touchEventTargetRef.current.removeEventListener('touchmove', mouseMoveEventRef.current);
        }
        if (mouseUpEventRef.current) {
          touchEventTargetRef.current.removeEventListener('touchend', mouseUpEventRef.current);
        }
      }
      mouseMoveEventRef.current = null;
      mouseUpEventRef.current = null;
      touchEventTargetRef.current = null;

      finishChange(deleteMark);

      setDraggingIndex(-1);
      setDraggingDelete(false);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    e.currentTarget.addEventListener('touchend', onMouseUp);
    e.currentTarget.addEventListener('touchmove', onMouseMove);
    mouseMoveEventRef.current = onMouseMove;
    mouseUpEventRef.current = onMouseUp;
    touchEventTargetRef.current = e.currentTarget;
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
    const diffCount: number = Object.values(counts).reduce(
      (prev, next) => prev + Math.abs(next),
      0,
    );

    return diffCount <= maxDiffCount ? cacheValues : rawValues;
  }, [rawValues, cacheValues, editable]);

  return [draggingIndex, draggingValue, draggingDelete, returnValues, onStartMove];
}

export default useDrag;
