import { clsx } from 'clsx';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface DotProps {
  prefixCls: string;
  value: number;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
}

const Dot: React.FC<DotProps> = (props) => {
  const { prefixCls, value, style, activeStyle } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  let mergedStyle: React.CSSProperties = {
    ...getDirectionStyle(direction, value, min, max),
    ...(typeof style === 'function' ? style(value) : style),
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
    };
  }

  return (
    <span
      className={clsx(dotClassName, { [`${dotClassName}-active`]: active })}
      style={mergedStyle}
    />
  );
};

export default Dot;
