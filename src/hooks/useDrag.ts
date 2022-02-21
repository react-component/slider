import * as React from 'react';

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  onValueChange: (valueIndex: number, offSetPercent: number) => void,
) {
  const onMouseDown = (e: React.MouseEvent, valueIndex: number) => {
    e.preventDefault();

    const { pageX: startX, pageY: startY } = e;

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
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  return [onMouseDown];
}
