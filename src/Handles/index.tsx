import * as React from 'react';
import Handle from './Handle';
import type { HandleProps } from './Handle';

export interface HandlesProps {
  prefixCls: string;
  style?: React.CSSProperties;
  values: number[];
  onStartMove: (e: React.MouseEvent, value: number) => void;
  onChange: (value: number, valueIndex: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
  handleRender?: HandleProps['render'];
  draggingIndex: number;
}

export interface HandlesRef {
  focus: (index: number) => void;
}

const Handles = React.forwardRef((props: HandlesProps, ref: React.Ref<HandlesRef>) => {
  const {
    prefixCls,
    style,
    onStartMove,
    onChange,
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
    <>
      {values.map((value, index) => (
        <Handle
          ref={(node) => {
            if (!node) {
              delete handlesRef.current[index];
            } else {
              handlesRef.current[index] = node;
            }
          }}
          dragging={draggingIndex === index}
          prefixCls={prefixCls}
          style={style}
          key={index}
          value={value}
          valueIndex={index}
          onStartMove={onStartMove}
          onChange={onChange}
          render={handleRender}
          {...restProps}
        />
      ))}
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
