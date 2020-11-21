/* eslint-disable max-len, no-undef */
import * as utils from '../src/utils';

describe('utils', () => {
  describe('getClosestPoint', () => {
    it('should return closest value', () => {
      const value = 40;
      const props = {
        marks: { 0: 0, 30: 30, 60: 60 },
        step: null,
        min: 0,
        max: 100,
      };

      expect(utils.getClosestPoint(value, props)).toBe(30);
    });

    it('should return closest value (taking step into account)', () => {
      const value = 40;
      const props = {
        marks: { 0: 0, 30: 30, 60: 60 },
        step: 3,
        min: 0,
        max: 100,
      };

      expect(utils.getClosestPoint(value, props)).toBe(39);
    });

    it('should return closest value (taking boundaries into account)', () => {
      const value = 102;
      const props = {
        marks: {},
        step: 6,
        min: 0,
        max: 100,
      };

      expect(utils.getClosestPoint(value, props)).toBe(96);
    });

    it('should return closest precision float value', () => {
      expect(
        utils.ensureValuePrecision(8151.23, {
          marks: {},
          step: 0.01,
          min: 0.2,
          max: 8151.23,
        }),
      ).toBe(8151.23);

      expect(
        utils.ensureValuePrecision(0.2, {
          marks: {},
          step: 0.01,
          min: 0.2,
          max: 8151.23,
        }),
      ).toBe(0.2);

      expect(
        utils.ensureValuePrecision(815.23, {
          marks: {},
          step: 0.01,
          min: 0.2,
          max: 8151.23,
        }),
      ).toBe(815.23);
    });
  });
});
