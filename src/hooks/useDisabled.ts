import * as React from 'react';

const useDisabled = (
  rawDisabled: boolean | boolean[],
  mergedValue?: number | number[],
): [boolean, (index: number) => boolean, boolean] => {

  const disabledIsArray = Array.isArray(rawDisabled);
  const disabledIsBoolean = typeof rawDisabled === 'boolean';
  const values = React.useMemo(
    () => (Array.isArray(mergedValue) ? mergedValue : [mergedValue]),
    [mergedValue],
  );

  const disabled = React.useMemo(() => {
    if (disabledIsBoolean) {
      return rawDisabled;
    }
    return disabledIsArray ? values.every((_, index) => rawDisabled[index]) : false;
  }, [rawDisabled, mergedValue]);

  const isHandleDisabled = React.useCallback(
    (index: number): boolean => {
      if (disabledIsBoolean) {
        return rawDisabled;
      }
      return rawDisabled[index] ?? disabled;
    },
    [rawDisabled, disabled],
  );

  const hasDisabledHandle = React.useMemo(() => {
    if (disabledIsBoolean) {
      return rawDisabled;
    }
    return rawDisabled.some((d) => d);
  }, [rawDisabled]);

  return [
    disabled,
    isHandleDisabled,
    hasDisabledHandle,
  ];
};

export default useDisabled;