import * as React from 'react';

const useDisabled = (
  rawDisabled: boolean | boolean[],
  rawValues: number[],
): [disabled: boolean, hasDisabledHandle: boolean] => {
  return React.useMemo(() => {
    if (typeof rawDisabled === 'boolean') {
      return [rawDisabled, rawDisabled && rawValues.length > 0];
    }

    return [
      rawValues.length > 0 && rawValues.every((_, index) => rawDisabled[index]),
      rawValues.some((_, index) => rawDisabled[index]),
    ];
  }, [rawDisabled, rawValues]);
};

export default useDisabled;
