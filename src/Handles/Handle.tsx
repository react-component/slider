import SliderContext from '../context';
import * as React from 'react';

export interface HandleProps {
  prefixCls: string;
  style?: React.CSSProperties;
  value: number;
  valueIndex: number;
  onStartMove: (e: React.MouseEvent, valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

const Handle = React.forwardRef((props: HandleProps, ref: React.Ref<HTMLDivElement>) => {
  const { prefixCls, value, valueIndex, onStartMove, style, ...restProps } = props;
  const { min, max, direction, disabled } = React.useContext(SliderContext);

  // ============================ Offset ============================
  const offset = (value - min) / (max - min);

  const positionStyle: React.CSSProperties = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offset * 100}%`;
      break;

    case 'vertical':
      positionStyle.bottom = `${offset * 100}%`;
      break;

    default:
      positionStyle.left = `${offset * 100}%`;
      break;
  }

  // ============================ Render ============================
  return (
    <div
      ref={ref}
      className={`${prefixCls}-handle`}
      style={{
        ...positionStyle,
        ...style,
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          onStartMove(e, valueIndex);
        }
      }}
      tabIndex={0}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      // aria-disabled="false"
      {...restProps}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
