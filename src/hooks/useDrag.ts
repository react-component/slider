import * as React from 'react';

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  values: number[],
  onValueChange: (valueIndex: number, offSetPercent: number) => void,
) {
  const [dragIndex, setDragIndex] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const [cacheValues, setCacheValues] = React.useState(values);

  const onMouseDown = (e: React.MouseEvent, valueIndex: number) => {
    e.preventDefault();

    const { pageX: startX, pageY: startY } = e;
    const cloneValues = [...values];
    setDragging(true);
    setDragIndex(valueIndex);

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      const { pageX: moveX, pageY: moveY } = event;
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const offSetPercent = offsetX / width;
      onValueChange(valueIndex, offSetPercent);
    };
    const onMouseUp = (event: MouseEvent) => {
      event.preventDefault();

      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);

      setDragging(false);
      setDragIndex(-1);
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  const mergedValues = dragging ? cacheValues : values;

  return [onMouseDown, mergedValues];
}
