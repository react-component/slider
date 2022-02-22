import * as React from 'react';
import type { Direction } from './interface';

export interface SliderContextProps {
  min: number;
  max: number;
  direction: Direction;
  disabled?: boolean;
  step: number | null;
}

const SliderContext = React.createContext<SliderContextProps>({
  min: 0,
  max: 0,
  direction: 'ltr',
  step: 1,
});

export default SliderContext;
