import * as React from 'react';
import Handle from './Handle';

export interface HandlesProps {
  prefixCls: string;
  values: number[];
  onStartMove: (e: React.MouseEvent, value: number) => void;
  max: number;
  min: number;
}

export interface HandlesRef {
  focus: (index: number) => void;
}

const Handles = React.forwardRef((props: HandlesProps, ref: React.Ref<HandlesRef>) => {
  const { prefixCls, onStartMove, values, max, min } = props;
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
});

if (process.env.NODE_ENV !== 'production') {
  Handles.displayName = 'Handles';
}

export default Handles;
