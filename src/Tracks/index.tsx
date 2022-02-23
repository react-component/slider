import * as React from 'react';
import SliderContext from '../context';
import { getOffset } from '../util';
import Track from './Track';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties;
  values: number[];
}

export default function Tracks(props: TrackProps) {
  const { prefixCls, style, values } = props;
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
          style={style}
          start={start}
          end={end}
          key={index}
        />
      ))
    : null) as unknown as React.ReactElement;
}
