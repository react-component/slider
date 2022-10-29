import * as React from 'react';
import Handle from './Handle';
import type { HandleProps } from './Handle';
import { getIndex } from '../util';
import type { OnStartMove } from '../interface';

export interface HandlesProps {
  values: number[];
  className?: string | string[];
  draggingClassName?: string;
  onStartMove: OnStartMove;
  onOffsetChange: (value: number | 'min' | 'max', valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRender?: HandleProps['render'];
  draggingIndex: number;
}

export interface HandlesRef {
  focus: (index: number) => void;
}

const Handles = React.forwardRef<HandlesRef, HandlesProps>((props, ref) => {
  const {
    className,
    draggingClassName,
    onStartMove,
    onOffsetChange,
    values,
    handleRender,
    draggingIndex,
    ...restProps
  } = props;
  const handlesRef = React.useRef<Record<number, HTMLDivElement>>({});

  React.useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      handlesRef.current[index]?.focus();
    },
  }));

  return (
    <React.Fragment>
      {values.map((value, index) => (
        <Handle
          ref={(node) => {
            if (node) {
              handlesRef.current[index] = node;
            } else {
              delete handlesRef.current[index];
            }
          }}
          dragging={draggingIndex === index}
          className={getIndex(className, index)}
          draggingClassName={draggingClassName}
          key={index}
          value={value}
          valueIndex={index}
          onStartMove={onStartMove}
          onOffsetChange={onOffsetChange}
          render={handleRender}
          {...restProps}
        />
      ))}
    </React.Fragment>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
