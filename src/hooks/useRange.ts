import { useMemo } from 'react';
import type { SliderProps } from '../Slider';

export default function useRange(
  range?: SliderProps['range'],
): [range: boolean, rangeEditable: boolean, rangeDraggableTrack: boolean] {
  return useMemo(() => {
    if (range === true || !range) {
      return [!!range, false, false];
    }

    return [true, range.editable, range.draggableTrack];
  }, [range]);
}
