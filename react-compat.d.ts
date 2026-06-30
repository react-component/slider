import * as React from 'react';

declare module 'react' {
  type ReactText = string | number;
  function useRef<T = undefined>(): React.MutableRefObject<T | undefined>;
  function isValidElement<P = any>(object: {} | null | undefined): object is React.ReactElement<P>;
  function cloneElement<P = any>(
    element: React.ReactElement<P>,
    props?: (Partial<P> & React.Attributes) | null,
    ...children: React.ReactNode[]
  ): React.ReactElement<P>;
}
