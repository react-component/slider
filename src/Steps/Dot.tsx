import React from 'react';
import clsx from 'clsx';
import { getPositionStyle } from '../util';
import SliderContext from '../context';

export interface DotProps {
  value: number;
  className?: string;
  activeClassName?: string;
}

export default function Dot({ value, className, activeClassName }: DotProps) {
  const { min, max, direction, included, includedStart, includedEnd } =
    React.useContext(SliderContext);

  const active = included && includedStart <= value && value <= includedEnd;

  const positionStyle = getPositionStyle(direction, value, min, max);

  return (
    <span
      className={clsx(className, active && activeClassName)}
      style={positionStyle}
    />
  );
}
