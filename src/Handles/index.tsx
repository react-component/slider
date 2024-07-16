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
  onDelete: (index: number) => void;
  handleRender?: HandleProps['render'];
  /**
   * When config `activeHandleRender`,
   * it will render another hidden handle for active usage.
   * This is useful for accessibility or tooltip usage.
   */
  activeHandleRender?: HandleProps['render'];
  draggingIndex: number;
  draggingDelete: boolean;
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
    draggingDelete,
    onFocus,
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

  const onHandleFocus = (e: React.FocusEvent<HTMLDivElement>, index: number) => {
    setActiveIndex(index);
    onFocus?.(e);
  };

  const onHandleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
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
      {values.map<React.ReactNode>((value, index) => {
        const dragging = draggingIndex === index;

        return (
          <Handle
            ref={(node) => {
              if (!node) {
                delete handlesRef.current[index];
              } else {
                handlesRef.current[index] = node;
              }
            }}
            dragging={dragging}
            draggingDelete={dragging && draggingDelete}
            style={getIndex(style, index)}
            key={index}
            value={value}
            valueIndex={index}
            {...handleProps}
          />
        );
      })}

      {/* Used for render tooltip, this is not a real handle */}
      {activeHandleRender && (
        <Handle
          key="a11y"
          {...handleProps}
          value={values[activeIndex]}
          valueIndex={null}
          dragging={draggingIndex !== -1}
          draggingDelete={draggingDelete}
          render={activeHandleRender}
          style={{ pointerEvents: 'none' }}
          tabIndex={null}
          aria-hidden
        />
      )}
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
