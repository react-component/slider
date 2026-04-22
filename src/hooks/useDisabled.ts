import * as React from 'react';

const useDisabled = (
  rawDisabled: boolean | boolean[],
  rawValue: number[],
): [boolean, boolean] => {

  const disabledArray = React.useMemo(() => {
    if (typeof rawDisabled === 'boolean') {
      return rawValue.map(() => rawDisabled);
    }
    return Array.isArray(rawDisabled) ? rawDisabled : rawValue.map(() => false);
  }, [rawDisabled, rawValue]);

  const disabled = React.useMemo(() => {
    return rawValue.length > 0 && rawValue.every((_, index) => disabledArray[index]);
  }, [disabledArray, rawValue]);

  const hasDisabledHandle = React.useMemo(() => {
    return disabledArray.some((d) => d);
  }, [disabledArray]);

  return [
    disabled,
    hasDisabledHandle,
  ];
};

export default useDisabled;