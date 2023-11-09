import cls from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

export interface DotProps {
  prefixCls: string;
  value: number;
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
}

export default function Dot(props: DotProps) {
  const { prefixCls, value, style, activeStyle } = props;
  const { min, max, direction, included, includedStart, includedEnd, styles, classNames } =
    React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  let mergedStyle = {
    ...getDirectionStyle(direction, value, min, max),
    ...(typeof style === 'function' ? style(value) : style),
    ...styles.dot,
  };

  if (active) {
    mergedStyle = {
      ...mergedStyle,
      ...(typeof activeStyle === 'function' ? activeStyle(value) : activeStyle),
      ...styles.dotActive,
    };
  }

  return (
    <span
      className={cls(
        dotClassName,
        {
          [`${dotClassName}-active`]: active,
        },
        active && classNames.dotActive,
        classNames.dot,
      )}
      style={mergedStyle}
    />
  );
}
