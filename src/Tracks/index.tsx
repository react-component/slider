import React from 'react';
import SliderContext from '../context';
import Track from './Track';
import { OnStartMove } from '../interface';
import { getIndex } from '../util';

export interface TrackProps {
  trackClassName: string | string[];
  values: number[];
  onStartMove?: OnStartMove;
  startPoint: number;
}

export default function Tracks({
  trackClassName,
  values,
  startPoint,
  onStartMove,
}: TrackProps) {
  const { range } = React.useContext(SliderContext);

  const trackList = React.useMemo(() => {
    if (range) {
      // Multiple
      const list = [];

      for (let i = 0; i < values.length - 1; i += 1) {
        list.push({
          start: values[i],
          end: values[i + 1],
        });
      }

      return list;
    }

    // null value do not have track
    if (values.length === 0) {
      return [];
    }

    const startValue = startPoint;
    const endValue = values[0];

    return [
      {
        start: Math.min(startValue, endValue),
        end: Math.max(startValue, endValue),
      },
    ];
  }, [values, range, startPoint]);

  return (
    <>
      {trackList.map(({ start, end }, index) => (
        <Track
          className={getIndex(trackClassName, index)}
          start={start}
          end={end}
          key={index}
          onStartMove={onStartMove}
        />
      ))}
    </>
  );
}
