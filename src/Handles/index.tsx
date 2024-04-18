import * as React from 'react';
import type { OnStartMove } from '../interface';
import { getIndex } from '../util';
import type { HandleProps } from './Handle';
import Handle from './Handle';

export interface HandlesProps {
  prefixCls: string;
  style?: React.CSSProperties | React.CSSProperties[];
  values: number[];
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRender?: HandleProps['render'];
  /**
   * When config `activeHandleRender`,
   * it will render another hidden handle for active usage.
   * This is useful for accessibility or tooltip usage.
   */
  activeHandleRender?: HandleProps['render'];
  draggingIndex: number;
  onChangeComplete?: () => void;
}

export interface HandlesRef {
  focus: (index: number) => void;
}

const Handles = React.forwardRef<HandlesRef, HandlesProps>((props, ref) => {
  const {
    prefixCls,
    style,
    onStartMove,
    onOffsetChange,
    values,
    handleRender,
    activeHandleRender,
    draggingIndex,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const handlesRef = React.useRef<Record<number, HTMLDivElement>>({});

  React.useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      handlesRef.current[index]?.focus();
    },
  }));

  // =========================== Active ===========================
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const onHandleFocus = (index: number, e: React.FocusEvent<HTMLDivElement>) => {
    setActiveIndex(index);
    onFocus?.(e);
  };

  const onHandleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  // =========================== Render ===========================
  // Handle Props
  const handleProps = {
    prefixCls,
    onStartMove,
    onOffsetChange,
    render: handleRender,
    onFocus: onHandleFocus,
    onMouseEnter: onHandleMouseEnter,
    ...restProps,
  };

  return (
    <>
      {values.map<React.ReactNode>((value, index) => (
        <Handle
          ref={(node) => {
            if (!node) {
              delete handlesRef.current[index];
            } else {
              handlesRef.current[index] = node;
            }
          }}
          dragging={draggingIndex === index}
          style={getIndex(style, index)}
          key={index}
          value={value}
          valueIndex={index}
          {...handleProps}
        />
      ))}

      {activeHandleRender && (
        <Handle
          key="a11y"
          {...handleProps}
          aria-hidden
          value={values[activeIndex]}
          valueIndex={0}
          dragging={draggingIndex !== -1}
          render={activeHandleRender}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
