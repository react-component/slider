/* eslint-disable max-len, no-undef */
import * as utils from '../src/utils';

describe('utils', () => {
  it('should detect if not in production', () => {
    process.env.NODE_ENV = 'development';
    expect(utils.isDev()).toBe(true);

    process.env.NODE_ENV = 'production';
    expect(utils.isDev()).toBe(false);
  });
});
