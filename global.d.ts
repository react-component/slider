/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@testing-library/jest-dom" />

declare module '*.css';
declare module '*.less';
declare module 'jsonp';

declare namespace JSX {
  type Element = React.JSX.Element;
  interface ElementClass extends React.JSX.ElementClass {}
  interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
  interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
  type LibraryManagedAttributes<C, P> = React.JSX.LibraryManagedAttributes<C, P>;
  interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
  interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
  interface IntrinsicElements extends React.JSX.IntrinsicElements {}
}

declare namespace jest {
  interface Matchers<R> {
    lastCalledWith(...expected: unknown[]): R;
    nthCalledWith(nthCall: number, ...expected: unknown[]): R;
    toBeCalled(): R;
    toBeCalledTimes(expected: number): R;
    toBeCalledWith(...expected: unknown[]): R;
  }
}

declare const vi: {
  fn: <T extends (...args: any[]) => any = (...args: any[]) => any>(implementation?: T) => jest.MockedFunction<T>;
  mock: (moduleName: string, factory?: (importOriginal: <T>() => Promise<T>) => unknown) => void;
  spyOn: typeof jest.spyOn;
  useFakeTimers: () => void;
  useRealTimers: () => void;
  advanceTimersByTime: (msToRun: number) => void;
  clearAllTimers: () => void;
  runAllTimers: () => void;
  importActual: <T>(moduleName: string) => Promise<T>;
  clearAllMocks: () => void;
  resetAllMocks: () => void;
  restoreAllMocks: () => void;
};

declare const describe: any;
declare const it: any;
declare const test: any;
declare const beforeEach: any;
declare const afterEach: any;
declare const beforeAll: any;
declare const afterAll: any;
declare const expect: any;

declare module 'moment/locale/zh-cn';
