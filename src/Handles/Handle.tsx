import * as React from 'react';

export interface HandleProps {
  prefixCls: string;
  value: number;
  valueIndex: number;
  max: number;
  min: number;
  onStartMove: (e: React.MouseEvent, valueIndex: number) => void;
}

export default function Handle(props: HandleProps) {
  const { prefixCls, value, valueIndex, max, min, onStartMove } = props;

  // ============================ Offset ============================
  const offset = (value - min) / (max - min);

  // ============================ Render ============================
  return (
    <div
      className={`${prefixCls}-handle`}
      style={{
        left: `${offset * 100}%`,
        transform: `translateX(-50%)`,
      }}
      onMouseDown={(e) => {
        onStartMove(e, valueIndex);
      }}
    />
  );
}
