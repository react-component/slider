/* eslint-disable max-len, no-undef */
import * as utils from '../src/utils';

describe('utils', () => {
  it('should detect if not in production', () => {
    process.env.NODE_ENV = 'development';
    expect(utils.isDev()).toBe(true);

    process.env.NODE_ENV = 'production';
    expect(utils.isDev()).toBe(false);
  });

  describe('getClosestPoint', () => {
    it('should return closest value', () => {
      const value = 40;
      const props = {
        marks: { 0: 0, 30: 30, 60: 60 },
        step: null,
        min: 0,
        max: 100
      };

      expect(utils.getClosestPoint(value, props)).toBe(30);
    });

    it('should return closest value (taking step into account)', () => {
      const value = 40;
      const props = {
        marks: { 0: 0, 30: 30, 60: 60 },
        step: 3,
        min: 0,
        max: 100
      };

      expect(utils.getClosestPoint(value, props)).toBe(39);
    });

    it('should return closest value (taking boundaries into account)', () => {
      const value = 102;
      const props = {
        marks: {},
        step: 6,
        min: 0,
        max: 100
      };

      expect(utils.getClosestPoint(value, props)).toBe(96);
    });
  });

  describe('isCorrectTouchDirection', () => {
    let vertical;
    let firstTouch;
    let verticalTouch;
    let horizontalTouch;

    beforeEach(() => {
      firstTouch = {clientX: 0, clientY: 0}
      verticalTouch = {clientX: 0, clientY: 5}
      horizontalTouch = {clientX: 5, clientY: 0}
    })

    describe('when vertical=FALSE', () => {
      beforeEach(() => { vertical = false; })

      it('is FALSE when secondTouch is vertically positioned from firstTouch', () => {
        expect(utils.isCorrectTouchDirection(firstTouch, verticalTouch, vertical)).toBe(false);
      });

      it('is TRUE when secondTouch is horizontally positioned from firstTouch', () => {
        expect(utils.isCorrectTouchDirection(firstTouch, horizontalTouch, vertical)).toBe(true);
      });
    });

    describe('when vertical=TRUE', () => {
      beforeEach(() => { vertical = true; })

      it('is TRUE when secondTouch is vertically positioned from firstTouch', () => {
        expect(utils.isCorrectTouchDirection(firstTouch, verticalTouch, vertical)).toBe(true);
      });

      it('is FALSE when secondTouch is horizontally positioned from firstTouch', () => {
        expect(utils.isCorrectTouchDirection(firstTouch, horizontalTouch, vertical)).toBe(false);
      });
    });

    it('is FALSE when secondTouch is identical to firstTouch', () => {
      expect(utils.isCorrectTouchDirection(firstTouch, firstTouch, false)).toBe(false);
    })
  });
});
