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
      setCacheValues(cloneCacheValues);
      triggerChange(cloneCacheValues);
    } else {
      // >>>> Dragging on the handle

      // Align value
      const originDragValue = originValues[draggingIndex];
      let nextValue = originDragValue + offsetPercent * (max - min);

      // Not pushable will make handle in the range
      if (!allowCross) {
        if (pushable === false) {
          const crossMin = cacheValues[valueIndex - 1] ?? min;
          const crossMax = cacheValues[valueIndex + 1] ?? max;

          nextValue = Math.min(nextValue, crossMax);
          nextValue = Math.max(nextValue, crossMin);
        } else if (typeof pushable === 'number') {
          nextValue = Math.max(nextValue, min + pushable * valueIndex);
          nextValue = Math.min(nextValue, max - pushable * (rawValues.length - valueIndex - 1));
        }
      }

      // Update values
      const cloneCacheValues = [...cacheValues];
      const formattedValue = formatValue(nextValue);
      cloneCacheValues[valueIndex] = formattedValue;

      // Pushable will makes others moving
      if (!allowCross && typeof pushable === 'number') {
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

      setDraggingValue(formattedValue);
      setCacheValues(cloneCacheValues);
      triggerChange(cloneCacheValues);
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
        case 'vertical':
          offSetPercent = -offsetY / height;
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

  return [draggingIndex, draggingValue, cacheValues, onStartMove];
}
