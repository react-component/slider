import * as React from 'react';
import Tooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';

function useCombinedRefs(
  ...refs: Array<React.MutableRefObject<unknown> | ((instance: unknown) => void) | null>
) {
  const targetRef = React.useRef();

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

const SliderTooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { visible, overlay } = props;
  const innerRef = React.useRef<any>(null);
  const tooltipRef = useCombinedRefs(ref, innerRef);

  const rafRef = React.useRef<number | null>(null);

  function cancelKeepAlign() {
    window.cancelAnimationFrame(rafRef.current!);
    rafRef.current = null;
  }

  function keepAlign() {
    rafRef.current = window.requestAnimationFrame(() => {
      (tooltipRef.current as any).forcePopupAlign();
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
