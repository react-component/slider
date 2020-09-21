import * as React from 'react';

export interface GenericSliderProps {
  min?: number;
  max?: number;
  step?: number;
  prefixCls?: string;
  vertical?: boolean;
  included?: boolean;
  disabled?: boolean;
  reverse?: boolean;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

export interface GenericSliderState {
  value?: any;
}

export interface GenericSliderClass<Props, State> extends React.Component<Props, State> {
  onStart: (position: number) => void;

  onEnd: (force?: boolean) => void;

  onMove: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    position: number,
  ) => void;

  onKeyboard: (e: React.KeyboardEvent<HTMLDivElement>) => void;

  onChange: (state: { value: any }) => void;

  trimAlignValue: (v: number, nextProps?: Partial<Props>) => number;

  getUpperBound: () => number;

  getLowerBound: () => number;
}

export interface GenericSlider<Props, State>
  extends Pick<
    React.ComponentClass<Props, State>,
    | 'displayName'
    | 'defaultProps'
    | 'propTypes'
    | 'contextType'
    | 'contextTypes'
    | 'childContextTypes'
  > {
  new (props: Props, context?: any): GenericSliderClass<Props, State>;
}
