import * as React from 'react';
import type { InternalMarkObj } from '../Marks';

/** Format the value in the range of [min, max] */
type FormatRangeValue = (value: number) => number;

/** Format value align with step */
type FormatStepValue = (value: number) => number;

/** Format value align with step & marks */
type FormatValue = (value: number) => number;

type OffsetMode = 'unit' | 'dist';

type OffsetValue = (
  values: number[],
  offset: number | 'min' | 'max',
  valueIndex: number,
  mode?: OffsetMode,
) => number;

export type OffsetValues = (
  values: number[],
  offset: number | 'min' | 'max',
  valueIndex: number,
  mode?: OffsetMode,
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
  isHandleDisabled: (index: number) => boolean,
): [FormatValue, OffsetValues] {
  const formatRangeValue: FormatRangeValue = React.useCallback(
    (val) => Math.max(min, Math.min(max, val)),
    [min, max],
  );

  const formatStepValue: FormatStepValue = React.useCallback(
    (val) => {
      if (step !== null) {
        const stepValue = min + Math.round((formatRangeValue(val) - min) / step) * step;

        // Cut number in case to be like 0.30000000000000004
        const getDecimal = (num: number) => (String(num).split('.')[1] || '').length;
        const maxDecimal = Math.max(getDecimal(step), getDecimal(max), getDecimal(min));
        const fixedValue = Number(stepValue.toFixed(maxDecimal));

        return min <= fixedValue && fixedValue <= max ? fixedValue : null!;
      }
      return null!;
    },
    [step, min, max, formatRangeValue],
  );

  const formatValue = React.useCallback<FormatValue>(
    (val) => {
      const formatNextValue = formatRangeValue(val);

      // List align values
      const alignValues = markList.map<number>((mark) => mark.value);
      if (step !== null) {
        alignValues.push(formatStepValue(val));
      }

      // min & max
      alignValues.push(min, max);

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
  const offsetValue: OffsetValue = (values, offset, valueIndex, mode = 'unit') => {
    if (typeof offset === 'number') {
      let nextValue: number;
      const originValue = values[valueIndex];

      // Only used for `dist` mode
      const targetDistValue = originValue + offset;

      // Compare next step value & mark value which is best match
      let potentialValues: number[] = [];
      markList.forEach((mark) => {
        potentialValues.push(mark.value);
      });

      // Min & Max
      potentialValues.push(min, max);

      // In case origin value is align with mark but not with step
      potentialValues.push(formatStepValue(originValue));

      // Put offset step value also
      const sign = offset > 0 ? 1 : -1;

      if (mode === 'unit') {
        potentialValues.push(formatStepValue(originValue + sign * step));
      } else {
        potentialValues.push(formatStepValue(targetDistValue));
      }

      // Find close one
      potentialValues = potentialValues
        .filter((val) => val !== null)
        // Remove reverse value
        .filter((val) => (offset < 0 ? val <= originValue : val >= originValue));

      if (mode === 'unit') {
        // `unit` mode can not contain itself
        potentialValues = potentialValues.filter((val) => val !== originValue);
      }

      const compareValue = mode === 'unit' ? originValue : targetDistValue;

      nextValue = potentialValues[0];
      let valueDist = Math.abs(nextValue - compareValue);

      potentialValues.forEach((potentialValue) => {
        const dist = Math.abs(potentialValue - compareValue);
        if (dist < valueDist) {
          nextValue = potentialValue;
          valueDist = dist;
        }
      });

      // Out of range will back to range
      if (nextValue === undefined) {
        return offset < 0 ? min : max;
      }

      // `dist` mode
      if (mode === 'dist') {
        return nextValue;
      }

      // `unit` mode may need another round
      if (Math.abs(offset) > 1) {
        const cloneValues = [...values];
        cloneValues[valueIndex] = nextValue;

        return offsetValue(cloneValues, offset - sign, valueIndex, mode);
      }

      return nextValue;
    } else if (offset === 'min') {
      return min;
    } else if (offset === 'max') {
      return max;
    }

    // Unreachable since `offset` is typed as number | 'min' | 'max'.
    return max;
  };

  /** Same as `offsetValue` but return `changed` mark to tell value changed */
  const offsetChangedValue = (
    values: number[],
    offset: number,
    valueIndex: number,
    mode: OffsetMode = 'unit',
  ) => {
    const originValue = values[valueIndex];
    const nextValue = offsetValue(values, offset, valueIndex, mode);
    return {
      value: nextValue,
      changed: nextValue !== originValue,
    };
  };

  const needPush = (dist: number) => {
    return (pushable === null && dist === 0) || (typeof pushable === 'number' && dist < pushable);
  };

  const gap = typeof pushable === 'number' ? pushable : 0;

  // Get the minimum boundary for a handle considering disabled handles as fixed anchors
  const getHandleMinBound = (values: number[], handleIndex: number): number => {
    // Collect min and all left-side disabled handle positions as candidates
    const candidates = [min];
    for (let i = handleIndex - 1; i >= 0; i -= 1) {
      if (isHandleDisabled(i)) {
        candidates.push(values[i] + gap);
        break; // Only need the nearest disabled handle
      }
    }
    return Math.max(...candidates);
  };

  // Get the maximum boundary for a handle considering disabled handles as fixed anchors
  const getHandleMaxBound = (values: number[], handleIndex: number): number => {
    // Collect max and all right-side disabled handle positions as candidates
    const candidates = [max];
    for (let i = handleIndex + 1; i < values.length; i += 1) {
      if (isHandleDisabled(i)) {
        candidates.push(values[i] - gap);
        break; // Only need the nearest disabled handle
      }
    }
    return Math.min(...candidates);
  };

  // Values
  const offsetValues: OffsetValues = (values, offset, valueIndex, mode = 'unit') => {
    const nextValues = values.map<number>(formatValue);
    const originValue = nextValues[valueIndex];

    const minBound = getHandleMinBound(nextValues, valueIndex);
    const maxBound = getHandleMaxBound(nextValues, valueIndex);

    const nextValue = offsetValue(nextValues, offset, valueIndex, mode);
    nextValues[valueIndex] = nextValue;

    // Apply disabled handle boundaries
    // If bounds conflict (min > max), the handle is locked between two disabled handles
    // In this case, keep the original value
    if (minBound <= maxBound) {
      nextValues[valueIndex] = Math.max(minBound, Math.min(maxBound, nextValues[valueIndex]));
    } else {
      nextValues[valueIndex] = originValue;
    }

    if (allowCross === false) {
      // >>>>> Allow Cross
      const pushNum = pushable || 0;

      // ============ AllowCross ===============
      if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) {
        nextValues[valueIndex] = Math.max(
          nextValues[valueIndex],
          nextValues[valueIndex - 1] + pushNum,
        );
      }

      if (valueIndex < nextValues.length - 1 && nextValues[valueIndex + 1] !== originValue) {
        nextValues[valueIndex] = Math.min(
          nextValues[valueIndex],
          nextValues[valueIndex + 1] - pushNum,
        );
      }
    } else if (typeof pushable === 'number' || pushable === null) {
      // >>>>> Pushable
      // =============== Push ==================

      // >>>>>> Basic push
      // End values (skip disabled handles)
      for (let i = valueIndex + 1; i < nextValues.length; i += 1) {
        if (isHandleDisabled(i)) {
          break; // Stop pushing when hitting a disabled handle
        }
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i], changed } = offsetChangedValue(nextValues, 1, i));
        }
        // Apply boundary constraint to pushed handle
        nextValues[i] = Math.min(nextValues[i], getHandleMaxBound(nextValues, i));
      }

      // Start values (skip disabled handles)
      for (let i = valueIndex; i > 0; i -= 1) {
        if (isHandleDisabled(i - 1)) {
          break; // Stop pushing when hitting a disabled handle
        }
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i - 1], changed } = offsetChangedValue(nextValues, -1, i - 1));
        }
        // Apply boundary constraint to pushed handle
        nextValues[i - 1] = Math.max(nextValues[i - 1], getHandleMinBound(nextValues, i - 1));
      }

      // >>>>> Revert back to safe push range
      // End to Start (skip disabled handles)
      for (let i = nextValues.length - 1; i > 0; i -= 1) {
        if (isHandleDisabled(i) || isHandleDisabled(i - 1)) {
          continue; // Skip if either handle is disabled
        }
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i - 1], changed } = offsetChangedValue(nextValues, -1, i - 1));
        }
        // Apply boundary constraint to pushed handle
        nextValues[i - 1] = Math.max(nextValues[i - 1], getHandleMinBound(nextValues, i - 1));
      }

      // Start to End (skip disabled handles)
      for (let i = 0; i < nextValues.length - 1; i += 1) {
        if (isHandleDisabled(i) || isHandleDisabled(i + 1)) {
          continue; // Skip if either handle is disabled
        }
        let changed = true;
        while (needPush(nextValues[i + 1] - nextValues[i]) && changed) {
          ({ value: nextValues[i + 1], changed } = offsetChangedValue(nextValues, 1, i + 1));
        }
        // Apply boundary constraint to pushed handle
        nextValues[i + 1] = Math.min(nextValues[i + 1], getHandleMaxBound(nextValues, i + 1));
      }
    }

    return {
      value: nextValues[valueIndex],
      values: nextValues,
    };
  };

  return [formatValue, offsetValues];
}
