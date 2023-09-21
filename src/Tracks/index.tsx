import cls from 'classnames';
import * as React from 'react';
import SliderContext from '../context';
import type { OnStartMove } from '../interface';
import { getIndex } from '../util';
import Track from './Track';

export interface TrackProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove?: OnStartMove;
  startPoint?: number;
}

export default function Tracks(props: TrackProps) {
  const { prefixCls, style, values, startPoint, onStartMove } = props;
  const { included, range, min, styles, classNames } = React.useContext(SliderContext);

  // =========================== List ===========================
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
    const list: { start: number; end: number }[] = [];

    for (let i = 0; i < values.length - 1; i += 1) {
      list.push({
        start: values[i],
        end: values[i + 1],
      });
    }

    return list;
  }, [values, range, startPoint, min]);

  // ========================== Render ==========================
  let tracksNode: React.ReactElement = null;

  if (classNames.tracks || styles.tracks) {
    tracksNode = (
      <Track
        index={null}
        prefixCls={prefixCls}
        start={trackList[0].start}
        end={trackList[trackList.length - 1].end}
        replaceCls={cls(classNames.tracks, `${prefixCls}-tracks`)}
        style={styles.tracks}
      />
    );
  }

  return (included ? (
    <>
      {tracksNode}
      {trackList.map(({ start, end }, index) => (
        <Track
          index={index}
          prefixCls={prefixCls}
          style={{
            ...getIndex(style, index),
            ...styles.track,
          }}
          start={start}
          end={end}
          key={index}
          onStartMove={onStartMove}
        />
      ))}
    </>
  ) : null) as unknown as React.ReactElement;
}
