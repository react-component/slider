import * as React from 'react';
import type { InternalMarkObj } from '../Marks';

/** Format the value in the range of [min, max] */
type FormatRangeValue = (value: number) => number;

/** Format value align with step */
type FormatStepValue = (value: number) => number;

/** Format value align with step & marks */
type FormatValue = (value: number) => number;

type OffsetValue = (values: number[], offset: number | 'min' | 'max', valueIndex: number) => number;

type OffsetValues = (
  values: number[],
  offset: number | 'min' | 'max',
  valueIndex: number,
) => {
  value: number;
  values: number[];
};

export default function useOffset(
  min: number,
  max: number,
  step: number,
  markList: InternalMarkObj[],
  allowCross: boolean,
  pushable: false | number,
): [FormatValue, OffsetValue, OffsetValues] {
  const formatRangeValue: FormatRangeValue = React.useCallback(
    (val) => {
      let formatNextValue = Math.min(max, val);
      formatNextValue = Math.max(min, formatNextValue);

      return formatNextValue;
    },
    [min, max],
  );

  const formatStepValue: FormatStepValue = React.useCallback(
    (val) => {
      if (step !== null) {
        return min + Math.round((formatRangeValue(val) - min) / step) * step;
      }
      return null;
    },
    [step, min, formatRangeValue],
  );

  const formatValue: FormatValue = React.useCallback(
    (val) => {
      const formatNextValue = formatRangeValue(val);

      // List align values
      const alignValues = markList.map((mark) => mark.value);
      if (step !== null) {
        alignValues.push(formatStepValue(val));
      }

      // Align with marks
      let closeValue = alignValues[0];
      let closeDist = max - min;

      alignValues.forEach((alignValue) => {
        const dist = Math.abs(formatNextValue - alignValue);
        if (dist <= closeDist) {
          closeValue = alignValue;
          closeDist = dist;
        }
      });

      return closeValue;
    },
    [min, max, markList, step, formatRangeValue, formatStepValue],
  );

  // ========================== Offset ==========================
  // Single Value
  const offsetValue: OffsetValue = (values, offset, valueIndex) => {
    if (typeof offset === 'number') {
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

      const sign = offset > 0 ? 1 : -1;

      // Put offset step value also
      const nextStepOffsetValue = formatStepValue(originValue + sign * step);
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

      // Out of range will back to range
      if (nextValue === undefined) {
        return offset < 0 ? min : max;
      }

      if (Math.abs(offset) > 1) {
        const cloneValues = [...values];
        cloneValues[valueIndex] = nextValue;

        return offsetValue(cloneValues, offset - sign, valueIndex);
      }

      return nextValue;
    } else if (offset === 'min') {
      return min;
    } else if (offset === 'max') {
      return max;
    }
  };

  const needPush = (dist: number) => {
    return (pushable === null && dist === 0) || (typeof pushable === 'number' && dist < pushable);
  };

  // Values
  const offsetValues: OffsetValues = (values, offset, valueIndex) => {
    const nextValues = values.map(formatValue);
    const nextValue = offsetValue(nextValues, offset, valueIndex);
    nextValues[valueIndex] = nextValue;

    if (typeof pushable === 'number' || pushable === null) {
      // >>>>>> Basic push
      // End values
      for (let i = valueIndex + 1; i < nextValues.length; i += 1) {
        const dist = nextValues[i] - nextValues[i - 1];
        if (needPush(dist)) {
          nextValues[i] = offsetValue(nextValues, 1, i);
        }
      }

      // Start values
      for (let i = valueIndex; i > 0; i -= 1) {
        const dist = nextValues[i] - nextValues[i - 1];
        if (needPush(dist)) {
          nextValues[i - 1] = offsetValue(nextValues, -1, i - 1);
        }
      }

      // >>>>> Revert back to safe push range
      // End to Start
      for (let i = nextValues.length - 1; i > 0; i -= 1) {
        const dist = nextValues[i] - nextValues[i - 1];
        if (needPush(dist)) {
          nextValues[i - 1] = offsetValue(nextValues, -1, i - 1);
        }
      }

      // Start to End
      for (let i = 0; i < nextValues.length - 1; i += 1) {
        const dist = nextValues[i + 1] - nextValues[i];
        if (needPush(dist)) {
          nextValues[i + 1] = offsetValue(nextValues, 1, i + 1);
        }
      }
    }

    return {
      value: nextValues[valueIndex],
      values: nextValues,
    };
  };

  return [formatValue, offsetValue, offsetValues];
}
