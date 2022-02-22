import * as React from 'react';
import type { Direction } from './interface';

export interface SliderContextProps {
  min: number;
  max: number;
  direction: Direction;
  disabled?: boolean;
}

const SliderContext = React.createContext<SliderContextProps>({
  min: 0,
  max: 0,
  direction: 'ltr',
});

export default SliderContext;
