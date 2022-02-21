import * as React from 'react';
import SliderContext from './context';
import type { Direction } from './interface';

export interface TrackProps {
  prefixCls: string;
  values: number[];
}

export default function Track(props: TrackProps) {
  const { prefixCls, values } = props;
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
  const style: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      style.right = `${ptgValues[0] * 100}%`;
      style.width = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
      break;

    case 'vertical':
      style.bottom = `${ptgValues[0] * 100}%`;
      style.height = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
      break;

    default:
      style.left = `${ptgValues[0] * 100}%`;
      style.width = `${ptgValues[1] * 100 - ptgValues[0] * 100}%`;
  }

  return <div className={`${prefixCls}-track`} style={style} />;
}
