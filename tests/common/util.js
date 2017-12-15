const setWidth = (object, width) => {
  // https://github.com/tmpvar/jsdom/commit/0cdb2efcc69b6672dc2928644fc0172df5521176
  Object.defineProperty(object, 'getBoundingClientRect', {
    value: () => ({
      width,
      // Let all other values retain the JSDom default of `0`.
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
    }),
    enumerable: true,
    configurable: true,
  });
};

export { setWidth };
