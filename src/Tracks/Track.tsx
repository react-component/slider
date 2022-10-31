import React from 'react';
import SliderContext from '../context';
import { getOffset } from '../util';
import type { OnStartMove } from '../interface';

export interface TrackProps {
  className: string;
  start: number;
  end: number;
  onStartMove?: OnStartMove;
}

export default function Track(props: TrackProps) {
  const { className, start, end, onStartMove } = props;
  const { direction, min, max, disabled } = React.useContext(SliderContext);

  const offsetStart = getOffset(start, min, max);
  const offsetEnd = getOffset(end, min, max);

  // ============================ Events ============================
  const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!disabled && onStartMove) {
      onStartMove(e, -1);
    }
  };

  // ============================ Render ============================
  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    case 'btt':
      positionStyle.bottom = `${offsetStart * 100}%`;
      positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    case 'ttb':
      positionStyle.top = `${offsetStart * 100}%`;
      positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    default:
      positionStyle.left = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
  }

  return (
    <div
      className={className}
      style={{
        ...positionStyle,
      }}
      onMouseDown={onInternalStartMove}
      onTouchStart={onInternalStartMove}
    />
  );
}
