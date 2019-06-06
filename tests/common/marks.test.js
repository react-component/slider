/* eslint-disable max-len, no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Slider, { Range } from '../../src';

describe('marks', () => {
  let originGetBoundingClientRect;
  beforeAll(() => {
    // Mock
    originGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = () => ({
      width: 100,
      height: 100,
    });
  });

  afterAll(() => {
    // Restore Mock
    HTMLElement.prototype.getBoundingClientRect = originGetBoundingClientRect;
  });

  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: 0, 30: '30', 99: '', 100: '100' };

    const sliderWrapper = mount(<Slider value={30} marks={marks} />);
    expect(sliderWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(sliderWrapper.find('.rc-slider-mark-text').at(0).instance().innerHTML).toBe('0');
    expect(sliderWrapper.find('.rc-slider-mark-text').at(1).instance().innerHTML).toBe('30');
    expect(sliderWrapper.find('.rc-slider-mark-text').at(2).instance().innerHTML).toBe('100');

    const rangeWrapper = mount(<Range value={[0, 30]} marks={marks} />);
    expect(rangeWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(rangeWrapper.find('.rc-slider-mark-text').at(0).instance().innerHTML).toBe('0');
    expect(rangeWrapper.find('.rc-slider-mark-text').at(1).instance().innerHTML).toBe('30');
    expect(rangeWrapper.find('.rc-slider-mark-text').at(2).instance().innerHTML).toBe('100');
  });

  it('should select correct value while click on marks', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const sliderWrapper = mount(<Slider marks={marks} />);
    const sliderMark = sliderWrapper.find('.rc-slider-mark-text').at(1);
    sliderMark.simulate('mousedown', {
      type: 'mousedown',
      target: sliderMark,
      pageX: 25,
      button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(sliderWrapper.state('value')).toBe(30);
  });

  // TODO: not implement yet
  xit('should select correct value while click on marks in Ranger', () => {
    const rangeWrapper = mount(<Range marks={marks} />);
    const rangeMark = rangeWrapper.find('.rc-slider-mark-text').at(1);
    rangeMark.simulate('mousedown', {
      type: 'mousedown',
      target: rangeMark,
      pageX: 25,
      button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(rangeWrapper.state('bounds')).toBe([0, 30]);
  });
});
