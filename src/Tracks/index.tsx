import * as React from 'react';
import SliderContext from '../context';
import Track from './Track';
import type { OnStartMove } from '../interface';
import { getIndex } from '../util';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove?: OnStartMove;
  startPoint?: number;
}

export default function Tracks(props: TrackProps) {
  const { prefixCls, style, values, startPoint, onStartMove } = props;
  const { included, range, min } = React.useContext(SliderContext);

  const trackList = React.useMemo(() => {
    if (!range) {
      // null value do not have track
      if (values.length === 0) {
        return [];
      }

      const startValue = startPoint ?? min;
      const endValue = values[0];

      return [
        {
          start: Math.min(startValue, endValue),
          end: Math.max(startValue, endValue),
        },
      ];
    }

    // Multiple
    const list = [];

    for (let i = 0; i < values.length - 1; i += 1) {
      list.push({
        start: values[i],
        end: values[i + 1],
      });
    }

    return list;
  }, [values, range, startPoint, min]);

  return (included
    ? trackList.map(({ start, end }, index) => (
        <Track
          index={index}
          prefixCls={prefixCls}
          style={getIndex(style, index)}
          start={start}
          end={end}
          key={index}
          onStartMove={onStartMove}
        />
      ))
    : null) as unknown as React.ReactElement;
}
