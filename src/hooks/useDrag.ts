import * as React from 'react';

export default function useDrag(
  containerRef: React.RefObject<HTMLDivElement>,
  onValueChange: (valueIndex: number, offSetPercent: number) => void,
) {
  const onMouseDown = (e: React.MouseEvent, valueIndex: number) => {
    e.preventDefault();

    const { pageX: startX, pageY: startY } = e;

    console.log('Mouse Down:', startX, startY, valueIndex);

    const onMouseMove = (event: MouseEvent) => {
      const { pageX: moveX, pageY: moveY } = event;
      const offsetX = moveX - startX;
      const offsetY = moveY - startY;

      const { width, height } = containerRef.current.getBoundingClientRect();
      const offSetPercent = offsetX / width;
      onValueChange(valueIndex, offSetPercent);
    };
    const onMouseUp = (event: MouseEvent) => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      console.log('Mouse Up!');
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  return [onMouseDown];
}
