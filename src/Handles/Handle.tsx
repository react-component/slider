import SliderContext from '../context';
import * as React from 'react';

export interface HandleProps {
  prefixCls: string;
  value: number;
  valueIndex: number;
  onStartMove: (e: React.MouseEvent, valueIndex: number) => void;
}

const Handle = React.forwardRef((props: HandleProps, ref: React.Ref<HTMLDivElement>) => {
  const { prefixCls, value, valueIndex, onStartMove } = props;
  const { min, max } = React.useContext(SliderContext);

  // ============================ Offset ============================
  const offset = (value - min) / (max - min);

  // ============================ Render ============================
  return (
    <div
      ref={ref}
      className={`${prefixCls}-handle`}
      style={{
        left: `${offset * 100}%`,
        transform: `translateX(-50%)`,
      }}
      onMouseDown={(e) => {
        onStartMove(e, valueIndex);
      }}
      tabIndex={0}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      // aria-disabled="false"
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
