import React, { useRef, useEffect } from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';
import type { RangeProps } from '../Range';
import Slider from '../Range';

const HandleTooltip = ({
  value,
  children,
  visible,
  tipFormatter = (val) => `${val}%`,
  ...restProps
}: {
  value: number;
  children: React.ReactElement;
  visible: boolean;
  tipFormatter?: (value: number) => React.ReactNode;
}) => {
  const tooltipRef = useRef<any>();
  const rafRef = useRef<number | null>(null);

  const cancelKeepAlign = () => {
    raf.cancel(rafRef.current!);
  };

  const keepAlign = () => {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  };

  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender: RangeProps['handleRender'] = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};

const TooltipSlider = ({
  tipFormatter,
  tipProps,
  ...props
}: RangeProps & {
  tipFormatter?: (value: number) => React.ReactNode;
  tipProps: any;
}) => {
  const tipHandleRender: RangeProps['handleRender'] = (node, handleProps) => (
    <HandleTooltip
      value={handleProps.value}
      visible={handleProps.dragging}
      tipFormatter={tipFormatter}
      {...tipProps}
    >
      {node}
    </HandleTooltip>
  );

  return <Slider {...props} handleRender={tipHandleRender} />;
};

export default TooltipSlider;
