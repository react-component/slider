import React from 'react';
import clsx from 'clsx';
import { getPositionStyle } from '../util';
import SliderContext from '../context';

export interface MarkProps {
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
  value: number;
  onClick: (value: number) => void;
}

export default function Mark({
  children,
  value,
  onClick,
  className,
  activeClassName,
}: MarkProps) {
  const { min, max, direction, includedStart, includedEnd, included } =
    React.useContext(SliderContext);

  const positionStyle = getPositionStyle(direction, value, min, max);
  const active = included && includedStart <= value && value <= includedEnd;

  return (
    <span
      className={clsx(className, active && activeClassName)}
      style={positionStyle}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        onClick(value);
      }}
    >
      {children}
    </span>
  );
}
