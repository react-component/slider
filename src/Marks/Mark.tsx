import * as React from 'react';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';

export interface MarkProps {
  prefixCls: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  value: number;
  onClick: (value: number) => void;
}

export default function Mark(props: MarkProps) {
  const { prefixCls, style, children, value, onClick } = props;
  const { min, max, direction } = React.useContext(SliderContext);

  const textCls = `${prefixCls}-text`;
  // ant-slider-mark-text ant-slider-mark-text-active

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  return (
    <span
      className={textCls}
      style={{
        ...positionStyle,
        ...style,
      }}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </span>
  );
}
