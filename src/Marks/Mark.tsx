import * as React from 'react';
import classNames from 'classnames';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';

export interface MarkProps {
  prefixCls: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  value: number;
}

export default function Mark(props: MarkProps) {
  const { prefixCls, style, children, value } = props;
  const { min, max, direction, includedStart, includedEnd, included } =
    React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      className={classNames(textCls, {
        [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd,
      })}
      style={{
        ...positionStyle,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
