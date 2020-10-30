import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { composeRef } from 'rc-util/lib/ref';

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible, overlay } = props;
  const innerRef = React.useRef<any>(null);
  const tooltipRef = composeRef(ref, innerRef);

  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    window.cancelAnimationFrame(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = window.requestAnimationFrame(() => {
      (innerRef.current as any).forcePopupAlign();
      rafRef.current = null;
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [visible, overlay]);

  return <Tooltip ref={tooltipRef} {...props} />;
});

export default SliderTooltip;
