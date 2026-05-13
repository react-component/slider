import * as React from 'react';

const useDisabled = (
  rawDisabled: boolean | boolean[],
  rawValues: number[],
): [
  isHandleDisabled: (index: number) => boolean,
  disabled: boolean,
  hasDisabledHandle: boolean,
] => {
  const isHandleDisabled = React.useCallback(
    (index: number) => {
      if (typeof rawDisabled === 'boolean') {
        return rawDisabled;
      }

      return rawDisabled[index] ?? false;
    },
    [rawDisabled],
  );

  const [disabled, hasDisabledHandle] = React.useMemo<
    [disabled: boolean, hasDisabledHandle: boolean]
  >(
    () => {
      if (typeof rawDisabled === 'boolean') {
        return [rawDisabled, rawDisabled && rawValues.length > 0];
      }

      return [
        rawValues.length > 0 && rawValues.every((_, index) => isHandleDisabled(index)),
        rawValues.some((_, index) => isHandleDisabled(index)),
      ];
    },
    [rawDisabled, rawValues, isHandleDisabled],
  );

  return React.useMemo(() => [isHandleDisabled, disabled, hasDisabledHandle], [
    isHandleDisabled,
    disabled,
    hasDisabledHandle,
  ]);
};

export default useDisabled;
