/* eslint-disable max-len, no-undef */
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { spyElementPrototypes } from '@rc-component/util';
import React from 'react';
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
    const onChange = jest.fn();
    const onChangeComplete = jest.fn();
    const { container } = render(
      <Slider marks={marks} onChange={onChange} onChangeComplete={onChangeComplete} />,
    );
    fireEvent.click(container.getElementsByClassName('rc-slider-mark-text')[1]);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '30',
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(30);
    expect(onChangeComplete).toHaveBeenCalledTimes(1);
    expect(onChangeComplete).toHaveBeenCalledWith(30);
  });

  it('should select marks with Enter and Space', () => {
    const onChange = jest.fn();
    const onChangeComplete = jest.fn();
    const { container, getByRole } = render(
      <Slider
        marks={{ 0: 'Start', 30: 'Middle', 100: 'End' }}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />,
    );

    const middleMark = getByRole('button', { name: 'Middle' });
    const endMark = getByRole('button', { name: 'End' });

    expect(fireEvent.keyDown(middleMark, { key: 'Enter', keyCode: 13, which: 13 })).toBe(false);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '30',
    );
    expect(fireEvent.keyDown(endMark, { key: ' ', keyCode: 32, which: 32 })).toBe(false);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
    expect(onChange).toHaveBeenNthCalledWith(1, 30);
    expect(onChange).toHaveBeenNthCalledWith(2, 100);
    expect(onChangeComplete).toHaveBeenNthCalledWith(1, 30);
    expect(onChangeComplete).toHaveBeenNthCalledWith(2, 100);
  });

  it('should expose disabled marks without adding them to the tab order', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<Slider disabled marks={{ 30: 'Middle' }} onChange={onChange} />);

    const mark = getByRole('button', { name: 'Middle' });

    expect(mark).toHaveAttribute('aria-disabled', 'true');
    expect(mark).toHaveAttribute('tabindex', '-1');
    fireEvent.keyDown(mark, { key: 'Enter', keyCode: 13, which: 13 });
    expect(onChange).not.toHaveBeenCalled();
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
