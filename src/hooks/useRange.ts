import { warning } from 'rc-util/lib/warning';
import { useMemo } from 'react';
import type { SliderProps } from '../Slider';

export default function useRange(
  range?: SliderProps['range'],
): [
  range: boolean,
  rangeEditable: boolean,
  rangeDraggableTrack: boolean,
  minCount: number,
  maxCount?: number,
] {
  return useMemo(() => {
    if (range === true || !range) {
      return [!!range, false, false, 0];
    }

    const { editable, draggableTrack, minCount, maxCount } = range;

    if (process.env.NODE_ENV !== 'production') {
      warning(!editable || !draggableTrack, '`editable` can not work with `draggableTrack`.');
    }

    return [true, editable, !editable && draggableTrack, minCount || 0, maxCount];
  }, [range]);
}
