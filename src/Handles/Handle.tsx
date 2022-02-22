import * as React from 'react';
import classNames from 'classnames';
import SliderContext from '../context';
import { getDirectionStyle } from '../util';

interface RenderProps {
  prefixCls: string;
  value: number;
  dragging: boolean;
}

export interface HandleProps {
  prefixCls: string;
  style?: React.CSSProperties;
  value: number;
  valueIndex: number;
  dragging: boolean;
  onStartMove: (e: React.MouseEvent, valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  render?: (origin: React.ReactElement, props: RenderProps) => React.ReactElement;
}

const Handle = React.forwardRef((props: HandleProps, ref: React.Ref<HTMLDivElement>) => {
  const { prefixCls, value, valueIndex, onStartMove, style, render, dragging, ...restProps } =
    props;
  const { min, max, direction, disabled } = React.useContext(SliderContext);
  const handlePrefixCls = `${prefixCls}-handle`;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  // ============================ Render ============================
  let handleNode = (
    <div
      ref={ref}
      className={classNames(handlePrefixCls, {
        [`${handlePrefixCls}-dragging`]: dragging,
      })}
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
      aria-disabled={disabled}
      {...restProps}
    />
  );

  // Customize
  if (render) {
    handleNode = render(handleNode, {
      prefixCls,
      value,
      dragging,
    });
  }

  return handleNode;
});

if (process.env.NODE_ENV !== 'production') {
  Handle.displayName = 'Handle';
}

export default Handle;
