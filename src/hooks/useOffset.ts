import * as React from 'react';
import type { InternalMarkObj } from '../Marks';

/** Format the value in the range of [min, max] */
type FormatRangeValue = (value: number) => number;

/** Format value align with step */
type FormatStepValue = (value: number) => number;

type OffsetValue = (values: number[], offset: -1 | 1, valueIndex: number) => number;

export default function useOffset(
  min: number,
  max: number,
  step: number,
  markList: InternalMarkObj[],
): [FormatRangeValue, FormatStepValue, OffsetValue] {
  const formatRangeValue: FormatRangeValue = React.useCallback(
    (val: number) => {
      let formatNextValue = Math.min(max, val);
      formatNextValue = Math.max(min, formatNextValue);

      return formatNextValue;
    },
    [min, max],
  );

  const formatStepValue: FormatStepValue = React.useCallback(
    (val: number) => {
      if (step !== null) {
        return min + Math.round((formatRangeValue(val) - min) / step) * step;
      }
      return null;
    },
    [step, min, formatRangeValue],
  );

  const offsetValue: OffsetValue = (values: number[], offset: -1 | 1, valueIndex: number) => {
    let nextValue: number;
    const originValue = values[valueIndex];

    // Compare next step value & mark value which is best match
    const potentialValues: number[] = [];
    markList.forEach((mark) => {
      if (
        // Negative mark
        (offset < 0 && mark.value < originValue) ||
        // Positive mark
        (offset > 0 && mark.value > originValue)
      ) {
        potentialValues.push(mark.value);
      }
    });

    // In case origin value is align with mark
    const nextStepValue = formatStepValue(originValue);
    if (
      (offset < 0 && nextStepValue < originValue) ||
      (offset > 0 && nextStepValue > originValue)
    ) {
      potentialValues.push(nextStepValue);
    }

    // Put offset step value also
    const nextStepOffsetValue = formatStepValue(originValue + offset * step);
    if (nextStepValue !== null) {
      potentialValues.push(nextStepOffsetValue);
    }

    // Find close one
    nextValue = potentialValues[0];
    let valueDist = Math.abs(nextValue - originValue);

    potentialValues.forEach((potentialValue) => {
      const dist = Math.abs(potentialValue - originValue);
      if (dist < valueDist) {
        nextValue = potentialValue;
        valueDist = dist;
      }
    });

    return nextValue;
  };

  return [formatRangeValue, formatStepValue, offsetValue];
}
