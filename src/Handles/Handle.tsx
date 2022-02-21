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
  const { min, max, direction } = React.useContext(SliderContext);

  // ============================ Offset ============================
  const offset = (value - min) / (max - min);

  const style: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      style.top = '50%';
      style.right = `${offset * 100}%`;
      style.transform = `translate(50%, -50%)`;
      break;

    case 'vertical':
      style.top = `${offset * 100}%`;
      style.left = '50%';
      style.transform = `translate(-50%, -50%)`;
      break;

    default:
      style.top = '50%';
      style.left = `${offset * 100}%`;
      style.transform = `translate(-50%, -50%)`;
      break;
  }

  // ============================ Render ============================
  return (
    <div
      ref={ref}
      className={`${prefixCls}-handle`}
      style={style}
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
