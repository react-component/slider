import type { SliderProps } from 'rc-slider';
import Slider from 'rc-slider';
import type { TooltipRef } from 'rc-tooltip';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import raf from 'rc-util/lib/raf';
import * as React from 'react';

interface HandleTooltipProps {
  value: number;
  index: number;
  children: React.ReactElement;
  visible: boolean;
  tipFormatter?: (value: number, index: number) => React.ReactNode;
}

const HandleTooltip: React.FC<HandleTooltipProps> = (props) => {
  const {
    value,
    children,
    visible,
    tipFormatter = (val) => `${val} %`,
    index,
    ...restProps
  } = props;

  const tooltipRef = React.useRef<TooltipRef>();
  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forceAlign();
    });
  }

  React.useEffect(() => {
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
      overlay={tipFormatter(value, index)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

const Handle = (props: { content: string; children }) => {
  const { content, children } = props;
  return (
    <span className="handle">
      {content}
      {children}
    </span>
  );
};

export const handleRender: SliderProps['handleRender'] = (node, props) => (
  <HandleTooltip value={props.value} visible={props.dragging} index={props.index}>
    {props.index === 0 ? <></> : <Handle content={`实验-${props.index}`} />}
  </HandleTooltip>
);

interface TooltipSliderProps extends SliderProps {
  tipFormatter?: (value: number, index: number) => React.ReactNode;
  tipProps?: any;
}

const TooltipSlider: React.FC<TooltipSliderProps> = ({ tipFormatter, tipProps, ...props }) => {
  const tipHandleRender: SliderProps['handleRender'] = (node, handleProps) => (
    <HandleTooltip
      value={handleProps.value}
      visible={handleProps.dragging}
      index={handleProps.index}
      tipFormatter={tipFormatter}
      {...tipProps}
    >
      {handleProps.index === 0 ? <></> : node}
    </HandleTooltip>
  );

  return <Slider {...props} handleRender={tipHandleRender} />;
};

export default TooltipSlider;
