import React, { useState } from 'react';
import { Range, RangeProps, Slider, SliderProps } from '../src';

type RangeWithStateProps = Omit<RangeProps, 'value'> & {
  defaultValue: number[] | null;
};
const RangeWithState = ({
  defaultValue,
  onChange,
  ...props
}: RangeWithStateProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Range
      {...props}
      value={value}
      onChange={(value) => {
        onChange?.(value);
        setValue(value);
      }}
    />
  );
};

type SliderWithStateProps = Omit<SliderProps, 'value'> & {
  defaultValue: number | null;
};
const SliderWithState = ({
  defaultValue,
  onChange,
  ...props
}: SliderWithStateProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Slider
      {...props}
      value={value}
      readOnly
      onChange={(value) => {
        onChange?.(value);
        setValue(value);
      }}
    />
  );
};

export { RangeWithState, SliderWithState };
export type { RangeWithStateProps, SliderWithStateProps };
