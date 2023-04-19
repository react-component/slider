import * as React from 'react';
import classNames from 'classnames';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';

export interface DotProps {
  prefixCls: string;
  value: number;
  marksValue: number[];
  style?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
  activeStyle?: React.CSSProperties | ((dotValue: number) => React.CSSProperties);
}

export default function Dot(props: DotProps) {
  const { prefixCls, marksValue, value, style, activeStyle } = props;
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;
  const active = included && includedStart <= value && value <= includedEnd;

  // It defines the className for the marks dots.
  const marksDotClassName = `${prefixCls}-marks-dot`;
  const marksDot = marksValue.indexOf(value) >= 0;

  // ============================ Offset ============================
  let mergedStyle = {
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
      className={classNames(dotClassName, {
        [`${dotClassName}-active`]: active,
        [marksDotClassName]: marksDot,
      })}
      style={mergedStyle}
    />
  );
}
