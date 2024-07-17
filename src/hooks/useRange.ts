import { warning } from 'rc-util/lib/warning';
import { useMemo } from 'react';
import type { SliderProps } from '../Slider';

export default function useRange(
  range?: SliderProps['range'],
): [range: boolean, rangeEditable: boolean, rangeDraggableTrack: boolean] {
  return useMemo(() => {
    if (range === true || !range) {
      return [!!range, false, false];
    }

    const { editable, draggableTrack } = range;

    if (process.env.NODE_ENV !== 'production') {
      warning(!editable || !draggableTrack, '`editable` can not work with `draggableTrack`.');
    }

    return [true, editable, !editable && draggableTrack];
  }, [range]);
}
