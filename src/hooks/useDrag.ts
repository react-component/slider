import * as React from 'react';
import type { Direction } from '../interface';

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  direction: Direction,
  rawValues: number[],
  min: number,
  max: number,
  formatValue: (value: number) => number,
  triggerChange: (values: number[]) => void,
  finishChange: () => void,
): [number, number, number[], (e: React.MouseEvent, valueIndex: number) => void] {
  const [draggingValue, setDraggingValue] = React.useState(null);
  const [draggingIndex, setDraggingIndex] = React.useState(-1);
  const [cacheValues, setCacheValues] = React.useState(rawValues);

  React.useEffect(() => {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);

  const updateCacheValue = (valueIndex: number, offsetPercent: number) => {
    const originValue = cacheValues[valueIndex];
    const nextValue = originValue + offsetPercent * (max - min);
    const cloneCacheValues = [...cacheValues];
    const formattedValue = formatValue(nextValue);
    cloneCacheValues[valueIndex] = formattedValue;

    setDraggingValue(formattedValue);
    setCacheValues(cloneCacheValues);
    triggerChange(cloneCacheValues);

    return formattedValue;
  };

  const onStartMove = (e: React.MouseEvent, valueIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingIndex(valueIndex);
    setDraggingValue(rawValues[valueIndex]);

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
      updateCacheValue(valueIndex, offSetPercent);
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
