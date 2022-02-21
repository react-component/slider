import * as React from 'react';

export interface SliderContextProps {
  min: number;
  max: number;
  direction: 'vertical' | 'rtl' | 'ltr';
}

const SliderContext = React.createContext<SliderContextProps>({
  min: 0,
  max: 0,
  direction: 'ltr',
});

export default SliderContext;
