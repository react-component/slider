import * as React from 'react';
import SliderContext from '../context';
import Track from './Track';
import type { OnStartMove } from '../interface';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove?: OnStartMove;
}

export default function Tracks(props: TrackProps) {
  const { prefixCls, style, values, onStartMove } = props;
  const { included, range, min } = React.useContext(SliderContext);

  const trackList = React.useMemo(() => {
    if (!range) {
      return [
        {
          start: min,
          end: values[0],
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
  }, [values, range, min]);

  return (included
    ? trackList.map(({ start, end }, index) => (
        <Track
          index={index}
          prefixCls={prefixCls}
          style={Array.isArray(style) ? style[index] : style}
          start={start}
          end={end}
          key={index}
          onStartMove={onStartMove}
        />
      ))
    : null) as unknown as React.ReactElement;
}
