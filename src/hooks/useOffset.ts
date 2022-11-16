import { useCallback } from 'react';
import { InternalMarkObj } from '../Marks';

/** Constrain value align with step & marks */
type ConstrainValue = (value: number) => number;

type OffsetAmount = number | 'min' | 'max';
type OffsetMode = 'unit' | 'dist';

type OffsetValue = (
  originValue: number,
  offset: OffsetAmount,
  mode: OffsetMode
) => number;

export type OffsetValues = (
  values: number[],
  valueIndex: number,
  offset: OffsetAmount,
  mode: OffsetMode
) => {
  values: number[];
};

const constrainValueInRange = (min: number, val: number, max: number) =>
  Math.max(min, Math.min(max, val));

const constrainValueToStepSize = (
  min: number,
  val: number,
  max: number,
  step: number
) => {
  // Round the value to min + step * n
  const stepValue =
    min +
    Math.round((constrainValueInRange(min, val, max) - min) / step) * step;

  // Cut number in case to be like 0.30000000000000004
  const getPrecision = (num: number) =>
    (String(num).split('.')[1] || '').length;
  const maxPrecision = Math.max(
    getPrecision(step),
    getPrecision(max),
    getPrecision(min)
  );
  const fixedValue = Number(stepValue.toFixed(maxPrecision));

  return min <= fixedValue && fixedValue <= max ? fixedValue : null;
};

const useConstrain = (
  min: number,
  max: number,
  step: number | null,
  markList: InternalMarkObj[],
  allowCross: boolean,
  pushable: false | number | null
): { constrainValue: ConstrainValue; offsetValues: OffsetValues } => {
  /**
   * Constrain a value to one of the valid candidates.
   */
  const constrainValue: ConstrainValue = useCallback(
    (val) => {
      // Constrain the value to one of the marks
      const candidates = markList.map((mark) => mark.value);

      // If step is null, disable `step` size
      if (step !== null) {
        const constrainedValue = constrainValueToStepSize(min, val, max, step);
        if (constrainedValue !== null) candidates.push(constrainedValue);
      }

      // Constrain to max and min
      candidates.push(min, max);

      // Constrain to the nearest allowed value
      let closestValue = candidates[0];
      let closestDist = Math.abs(val - closestValue);

      candidates.forEach((alignValue) => {
        const dist = Math.abs(val - alignValue);
        if (dist < closestDist) {
          closestValue = alignValue;
          closestDist = dist;
        }
      });

      return closestValue;
    },
    [min, max, markList, step]
  );

  // ========================== Offset ==========================
  // Single Value
  const offsetValue: OffsetValue = (originValue, offset, mode) => {
    if (offset === 'min') {
      return min;
    }

    if (offset === 'max') {
      return max;
    }

    // Only used for `dist` mode
    const targetDistValue = originValue + offset;

    // Compare next step value & mark value which is best match
    let candidates: number[] = markList.map(({ value }) => value);

    // Min & Max
    candidates.push(min, max);

    // In case origin value is align with mark but not with step
    if (step !== null) {
      const formattedValue = constrainValueToStepSize(
        min,
        originValue,
        max,
        step
      );
      if (formattedValue) candidates.push(formattedValue);
    }

    // Put offset step value also
    const sign = Math.sign(offset);

    if (step !== null) {
      if (mode === 'unit') {
        const constrainedCandidate = constrainValueToStepSize(
          min,
          originValue + sign * step,
          max,
          step
        );
        if (constrainedCandidate) candidates.push(constrainedCandidate);
      } else {
        const formattedPotentialValue = constrainValueToStepSize(
          min,
          targetDistValue,
          max,
          step
        );
        if (formattedPotentialValue) candidates.push(formattedPotentialValue);
      }
    }

    // Remove values in opposite direction
    candidates = candidates.filter((val) =>
      sign < 0 ? val <= originValue : val >= originValue
    );

    if (mode === 'unit') {
      // `unit` mode can not contain itself
      candidates = candidates.filter((val) => val !== originValue);
    }

    const compareValue = mode === 'unit' ? originValue : targetDistValue;

    let nextValue = candidates[0];
    let valueDist = Math.abs(nextValue - compareValue);

    candidates.forEach((potentialValue) => {
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

    // `unit` mode may need another round
    if (mode === 'unit' && Math.abs(offset) > 1) {
      return offsetValue(nextValue, offset - sign, mode);
    }

    return nextValue;
  };

  /** Same as `offsetValue` but return `changed` mark to tell value changed */
  const offsetChangedValue = (
    values: number[],
    offset: number,
    valueIndex: number,
    mode: OffsetMode
  ) => {
    const originValue = values[valueIndex];
    const nextValue = offsetValue(originValue, offset, mode);
    return {
      value: nextValue,
      changed: nextValue !== originValue,
    };
  };

  const needPush = (dist: number) =>
    (pushable === null && dist === 0) ||
    (typeof pushable === 'number' && dist < pushable);

  // Values
  const offsetValues: OffsetValues = (values, valueIndex, offset, mode) => {
    const nextValues = values.map(constrainValue);
    const originValue = nextValues[valueIndex];
    const nextValue = offsetValue(originValue, offset, mode);
    nextValues[valueIndex] = nextValue;

    if (allowCross === false) {
      // >>>>> Allow Cross
      const pushNum = pushable || 0;

      // ============ AllowCross ===============
      if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) {
        nextValues[valueIndex] = Math.max(
          nextValues[valueIndex],
          nextValues[valueIndex - 1] + pushNum
        );
      }

      if (
        valueIndex < nextValues.length - 1 &&
        nextValues[valueIndex + 1] !== originValue
      ) {
        nextValues[valueIndex] = Math.min(
          nextValues[valueIndex],
          nextValues[valueIndex + 1] - pushNum
        );
      }
    } else if (typeof pushable === 'number' || pushable === null) {
      // >>>>> Pushable
      // =============== Push ==================

      // >>>>>> Basic push
      // End values
      for (let i = valueIndex + 1; i < nextValues.length; i += 1) {
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i], changed } = offsetChangedValue(
            nextValues,
            1,
            i,
            'unit'
          ));
        }
      }

      // Start values
      for (let i = valueIndex; i > 0; i -= 1) {
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i - 1], changed } = offsetChangedValue(
            nextValues,
            -1,
            i - 1,
            'unit'
          ));
        }
      }

      // >>>>> Revert back to safe push range
      // End to Start
      for (let i = nextValues.length - 1; i > 0; i -= 1) {
        let changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          ({ value: nextValues[i - 1], changed } = offsetChangedValue(
            nextValues,
            -1,
            i - 1,
            'unit'
          ));
        }
      }

      // Start to End
      for (let i = 0; i < nextValues.length - 1; i += 1) {
        let changed = true;
        while (needPush(nextValues[i + 1] - nextValues[i]) && changed) {
          ({ value: nextValues[i + 1], changed } = offsetChangedValue(
            nextValues,
            1,
            i + 1,
            'unit'
          ));
        }
      }
    }

    return {
      values: nextValues,
    };
  };

  return { constrainValue, offsetValues };
};

export default useConstrain;
