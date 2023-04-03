import React, { forwardRef, useMemo } from 'react';
import type { RangeProps, RangeRef } from './Range';
import Range from './Range';

export type SliderProps = Omit<
  RangeProps,
  | 'value'
  | 'range'
  | 'count'
  | 'onChange'
  | 'draggableTrack'
  | 'allowCross'
  | 'pushable'
  | 'trackClassName'
  | 'handleClassName'
  | 'tabIndex'
> & {
  value: number | null;
  onChange?: (value: number) => void;
  handleClassName?: string;
  trackClassName?: string;
  range?: false;
  tabIndex?: null | number;
};

const Slider = forwardRef<RangeRef, SliderProps>(
  ({ value, onChange, ...props }: SliderProps, ref) => {
    const valueArray = useMemo(
      () => (value === null ? null : [value]),
      [value]
    );

    return (
      <Range
        ref={ref}
        range={false}
        value={valueArray}
        onChange={
          onChange === undefined
            ? undefined
            : ([newValue]) => onChange(newValue)
        }
        {...props}
      />
    );
  }
);

export default Slider;
