import * as React from 'react';
import type { AriaValueFormat, Direction, SliderClassNames, SliderStyles } from './interface';

export interface SliderContextProps {
  min: number;
  max: number;
  includedStart: number;
  includedEnd: number;
  direction: Direction;
  disabled?: boolean;
  keyboard?: boolean;
  included?: boolean;
  step: number | null;
  range?: boolean;
  tabIndex: number | number[];
  ariaLabelForHandle?: string | string[];
  ariaLabelledByForHandle?: string | string[];
  ariaRequired?: boolean;
  ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
  classNames: SliderClassNames;
  styles: SliderStyles;
}

const SliderContext = React.createContext<SliderContextProps>({
  min: 0,
  max: 0,
  direction: 'ltr',
  step: 1,
  includedStart: 0,
  includedEnd: 0,
  tabIndex: 0,
  keyboard: true,
  styles: {},
  classNames: {},
});

export default SliderContext;

export interface UnstableContextProps {
  onDragStart?: (info: {
    rawValues: number[];
    draggingIndex: number;
    draggingValue: number;
  }) => void;
  onDragChange?: (info: {
    rawValues: number[];
    deleteIndex: number;
    draggingIndex: number;
    draggingValue: number;
  }) => void;
}

/** @private NOT PROMISE AVAILABLE. DO NOT USE IN PRODUCTION. */
export const UnstableContext = React.createContext<UnstableContextProps>({});
