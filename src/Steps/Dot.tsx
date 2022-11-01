import React from 'react';
import clsx from 'clsx';
import { getPositionStyle } from '../util';
import SliderContext from '../context';

export interface DotProps {
  value: number;
  className?: string;
  activeClassName?: string;
}

export default function Dot(props: DotProps) {
  const { value, className, activeClassName } = props;
  const {
    min,
    max,
    direction,
    included,
    includedStart,
    includedEnd,
  } = React.useContext(SliderContext);

  const active = included && includedStart <= value && value <= includedEnd;

  // ============================ Offset ============================
  const directionStyle = getPositionStyle(direction, value, min, max);

  return (
    <span
      className={clsx(className, active && activeClassName)}
      style={directionStyle}
    />
  );
}
