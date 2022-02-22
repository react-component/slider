import * as React from 'react';
import SliderContext from './context';
import type { Direction } from './interface';

export interface TrackProps {
  prefixCls: string;
  values: number[];
  style?: React.CSSProperties;
}

export default function Track(props: TrackProps) {
  const { prefixCls, values, style } = props;
  const { direction, min, max } = React.useContext(SliderContext);

  const sortValues = React.useMemo(() => {
    const cloneValues = [...values].sort((a, b) => a - b);

    if (cloneValues.length === 1) {
      return [min, cloneValues[0]];
    }

    return cloneValues;
  }, [values, min]);

  const ptgValues = React.useMemo(
    () => sortValues.map((val) => (val - min) / (max - min)),
    [min, max, sortValues],
  );

  // ============================ Render ============================
  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${ptgValues[0] * 100}%`;
      positionStyle.width = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
      break;

    case 'vertical':
      positionStyle.bottom = `${ptgValues[0] * 100}%`;
      positionStyle.height = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
      break;

    default:
      positionStyle.left = `${ptgValues[0] * 100}%`;
      positionStyle.width = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
  }

  return (
    <div
      className={`${prefixCls}-track`}
      style={{
        ...positionStyle,
        ...style,
      }}
    />
  );
}
