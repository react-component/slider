import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { composeRef } from 'rc-util/lib/ref';
import raf from 'rc-util/lib/raf';

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible, overlay } = props;
  const innerRef = React.useRef<any>(null);
  const tooltipRef = composeRef(ref, innerRef);

  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current!);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      innerRef.current?.forcePopupAlign();
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
