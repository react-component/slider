import 'rc-tooltip/assets/bootstrap.css';
import React from 'react';
import Slider from 'rc-slider';
import type { SliderProps } from 'rc-slider';
import raf from 'rc-util/lib/raf';
import Tooltip from 'rc-tooltip';
import '../../assets/index.less';

const HandleTooltip = (props: {
  value: number;
  children: React.ReactElement;
  visible: boolean;
  tipFormatter?: (value: number) => React.ReactNode;
}) => {
  const { value, children, visible, tipFormatter = (val) => `${val} %` } = props;

  const tooltipRef = React.useRef<any>();
  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
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
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      ref={tooltipRef}
      visible={visible}
    >
      {children}
    </Tooltip>
  );
};

const handleRender: SliderProps['handleRender'] = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};

const TooltipSlider = ({
  tipFormatter,
  ...props
}: SliderProps & { tipFormatter?: (value: number) => React.ReactNode }) => {
  const tipHandleRender: SliderProps['handleRender'] = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        tipFormatter={tipFormatter}
      >
        {node}
      </HandleTooltip>
    );
  };

  return <Slider {...props} handleRender={tipHandleRender} />;
};

const wrapperStyle = { width: 400, margin: 50 };

export default () => (
  <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Reversed Slider with custom handle</p>
      <Slider min={0} max={20} reverse defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with fixed values</p>
      <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
    </div>
    <div style={wrapperStyle}>
      <p>Range with custom tooltip</p>
      <TooltipSlider
        range
        min={0}
        max={20}
        defaultValue={[3, 10]}
        tipFormatter={(value) => `${value}!`}
      />
    </div>
  </div>
);
