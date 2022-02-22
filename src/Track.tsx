import * as React from 'react';
import SliderContext from './context';
import { getOffset } from './util';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties;
}

export default function Track(props: TrackProps) {
  const { prefixCls, style } = props;
  const { direction, includedStart, includedEnd, min, max } = React.useContext(SliderContext);

  const offsetStart = getOffset(includedStart, min, max);
  const offsetEnd = getOffset(includedEnd, min, max);

  // ============================ Render ============================
  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    case 'vertical':
      positionStyle.bottom = `${offsetStart * 100}%`;
      positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
      break;

    default:
      positionStyle.left = `${offsetStart * 100}%`;
      positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
  }

  return (
    <div
      className={`${prefixCls}-track`}
      style={{
        ...positionStyle,
        ...style,
      }}
    />
  );
}
