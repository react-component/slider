import * as React from 'react';
import classNames from 'classnames';
import SliderContext from '../context';
import { getOffset } from '../util';
import type { OnStartMove } from '../interface';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties;
  start: number;
  end: number;
  index: number;
  onStartMove?: OnStartMove;
}

export default function Track(props: TrackProps) {
  const { prefixCls, style, start, end, index, onStartMove } = props;
  const { direction, min, max, disabled, range } = React.useContext(SliderContext);

  const trackPrefixCls = `${prefixCls}-track`;

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
      className={classNames(trackPrefixCls, range && `${trackPrefixCls}-${index + 1}`)}
      style={{
        ...positionStyle,
        ...style,
      }}
      onMouseDown={onInternalStartMove}
      onTouchStart={onInternalStartMove}
    />
  );
}
