/* eslint-disable max-len, no-undef */
import React from 'react';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../src';

describe('marks', () => {
  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
      }),
    });
  });

  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: 0, 30: '30', 99: '', 100: '100' };

    const { container } = render(<Slider value={30} marks={marks} />);
    expect(container.getElementsByClassName('rc-slider-mark-text')).toHaveLength(3);
    expect(container.getElementsByClassName('rc-slider-mark-text')[0].innerHTML).toBe('0');
    expect(container.getElementsByClassName('rc-slider-mark-text')[1].innerHTML).toBe('30');
    expect(container.getElementsByClassName('rc-slider-mark-text')[2].innerHTML).toBe('100');

    const { container: container2 } = render(<Slider range value={[0, 30]} marks={marks} />);
    expect(container2.getElementsByClassName('rc-slider-mark-text')).toHaveLength(3);
    expect(container2.getElementsByClassName('rc-slider-mark-text')[0].innerHTML).toBe('0');
    expect(container2.getElementsByClassName('rc-slider-mark-text')[1].innerHTML).toBe('30');
    expect(container2.getElementsByClassName('rc-slider-mark-text')[2].innerHTML).toBe('100');

    expect(container.querySelector('.rc-slider-with-marks')).toBeTruthy();
  });

  it('should select correct value while click on marks', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const { container } = render(<Slider marks={marks} />);
    fireEvent.click(container.getElementsByClassName('rc-slider-mark-text')[1]);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '30',
    );
  });

  // TODO: not implement yet
  // zombieJ: since this test leave years but not implement. Could we remove this?
  // xit('should select correct value while click on marks in Ranger', () => {
  //   const rangeWrapper = render(<Range marks={marks} />);
  //   const rangeMark = rangeWrapper.find('.rc-slider-mark-text').at(1);
  //   rangeMark.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: rangeMark,
  //     pageX: 25,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(rangeWrapper.state('bounds')).toBe([0, 30]);
  // });
});
