import { forwardRef } from 'react';
import type { RangeProps, RangeRef } from './Range';
import Range from './Range';

export type SliderProps = Omit<
  RangeProps,
  | 'value'
  | 'range'
  | 'count'
  | 'defaultValue'
  | 'onChange'
  | 'draggableTrack'
  | 'allowCross'
  | 'pushable'
  | 'trackClassName'
  | 'handleClassName'
> & {
  value?: number | null;
  defaultValue?: number;
  onChange?: (value: number) => void;
  handleClassName?: string;
  trackClassName?: string;
  range?: false;
};

const Slider = forwardRef<RangeRef, SliderProps>(
  ({ value, defaultValue, onChange, ...props }: SliderProps, ref) => (
    <Range
      ref={ref}
      range={false}
      value={value === undefined ? undefined : value === null ? null : [value]}
      defaultValue={defaultValue === undefined ? undefined : [defaultValue]}
      onChange={onChange === undefined ? undefined : ([newValue]) => onChange(newValue)}
      {...props}
    />
  ),
);

export default Slider;
