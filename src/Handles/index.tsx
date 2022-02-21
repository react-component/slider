import * as React from 'react';
import Handle from './Handle';

export interface HandlesProps {
  prefixCls: string;
  values: number[];
  onStartMove: (e: React.MouseEvent, value: number) => void;
  max: number;
  min: number;
}

export default function Handles(props: HandlesProps) {
  const { prefixCls, onStartMove, values, max, min } = props;

  return (
    <>
      {values.map((value, index) => (
        <Handle
          prefixCls={prefixCls}
          key={index}
          value={value}
          valueIndex={index}
          onStartMove={onStartMove}
          max={max}
          min={min}
        />
      ))}
    </>
  );
}
