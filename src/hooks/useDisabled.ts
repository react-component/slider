import * as React from 'react';

const useDisabled = (
  rawDisabled: boolean | boolean[],
  mergedValue?: number | number[],
): [boolean, (index: number) => boolean, boolean] => {

  const values = React.useMemo(
    () => (Array.isArray(mergedValue) ? mergedValue : [mergedValue]),
    [mergedValue],
  );

  const disabledArray = React.useMemo(() => {
    if (typeof rawDisabled === 'boolean') {
      return values.map(() => rawDisabled);
    }
    return Array.isArray(rawDisabled) ? rawDisabled : values.map(() => false);
  }, [rawDisabled, mergedValue]);

  const disabled = React.useMemo(() => {
    return values.every((_, index) => disabledArray[index]);
  }, [disabledArray, values]);

  const isHandleDisabled = React.useCallback(
    (index: number): boolean => {
      return disabledArray[index] ?? disabled;
    },
    [disabledArray, disabled],
  );

  const hasDisabledHandle = React.useMemo(() => {
    return disabledArray.some((d) => d);
  }, [disabledArray]);

  return [
    disabled,
    isHandleDisabled,
    hasDisabledHandle,
  ];
};

export default useDisabled;