import * as React from 'react';
import classNames from 'classnames';
import SliderContext from '../context';
import { getOffset } from '../util';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties;
  start: number;
  end: number;
  index: number;
}

export default function Track(props: TrackProps) {
  const { prefixCls, style, start, end, index } = props;
  const { direction, min, max } = React.useContext(SliderContext);

  const trackPrefixCls = `${prefixCls}-track`;

  const offsetStart = getOffset(start, min, max);
  const offsetEnd = getOffset(end, min, max);

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
      className={classNames(trackPrefixCls, `${trackPrefixCls}-${index + 1}`)}
      style={{
        ...positionStyle,
        ...style,
      }}
    />
  );
}
