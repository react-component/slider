/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../src/Slider';
import Range from '../src/Range';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';

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

    const { container } = render(<Slider value={30} marks={marks} readOnly />);
    expect(
      container.getElementsByClassName('rc-slider-mark-text')
    ).toHaveLength(3);
    expect(
      container.getElementsByClassName('rc-slider-mark-text')[0].innerHTML
    ).toBe('0');
    expect(
      container.getElementsByClassName('rc-slider-mark-text')[1].innerHTML
    ).toBe('30');
    expect(
      container.getElementsByClassName('rc-slider-mark-text')[2].innerHTML
    ).toBe('100');

    const { container: container2 } = render(
      <Range value={[0, 30]} marks={marks} readOnly />
    );
    expect(
      container2.getElementsByClassName('rc-slider-mark-text')
    ).toHaveLength(3);
    expect(
      container2.getElementsByClassName('rc-slider-mark-text')[0].innerHTML
    ).toBe('0');
    expect(
      container2.getElementsByClassName('rc-slider-mark-text')[1].innerHTML
    ).toBe('30');
    expect(
      container2.getElementsByClassName('rc-slider-mark-text')[2].innerHTML
    ).toBe('100');

    expect(container.querySelector('.rc-slider-with-marks')).toBeTruthy();
  });

  it('should select correct value while click on marks', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const callBack = jest.fn();

    const { container } = render(
      <Slider value={0} marks={marks} onChange={callBack} readOnly />
    );
    fireEvent.click(container.getElementsByClassName('rc-slider-mark-text')[1]);
    expect(callBack).toBeCalledWith(30);
  });

  it('should show the correct aria value', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const { container } = render(<Slider marks={marks} value={30} readOnly />);
    expect(
      container.getElementsByClassName('rc-slider-handle')[0]
    ).toHaveAttribute('aria-valuenow', '30');
  });
});
