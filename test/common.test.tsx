/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import Slider from '../src/Slider';
import Range from '../src/Range';

describe('Common', () => {
  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
      }),
    });
  });

  it('should render vertical Slider/Range, when `vertical` is true', () => {
    const { container: container1 } = render(
      <Slider value={0} readOnly vertical />
    );
    expect(
      container1.getElementsByClassName('rc-slider-vertical')
    ).toHaveLength(1);

    const { container: container2 } = render(
      <Range value={[0, 0]} readOnly vertical />
    );
    expect(
      container2.getElementsByClassName('rc-slider-vertical')
    ).toHaveLength(1);
  });

  it('should render dots correctly when `dots=true`', () => {
    const { container: container1 } = render(
      <Slider value={50} readOnly step={10} dots />
    );
    expect(container1.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(
      container1.getElementsByClassName('rc-slider-dot-active')
    ).toHaveLength(6);

    const { container: container2 } = render(
      <Range value={[20, 50]} readOnly step={10} dots />
    );
    expect(container2.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(
      container2.getElementsByClassName('rc-slider-dot-active')
    ).toHaveLength(4);
  });

  it('should render normally when `dots=true` and `step=null`', () => {
    const { container } = render(
      <Slider value={0} readOnly step={null} dots />
    );
    expect(() => container).not.toThrowError();
  });

  it('should not set value greater than `max` or smaller `min`', () => {
    const { container: container1 } = render(
      <Slider value={0} readOnly min={10} />
    );
    expect(
      container1
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('10');

    const { container: container2 } = render(
      <Slider value={100} readOnly max={90} />
    );
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('90');

    const { container: container3 } = render(
      <Range value={[0, 100]} readOnly min={10} max={90} />
    );
    expect(
      container3
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('10');
    expect(
      container3
        .getElementsByClassName('rc-slider-handle')[1]
        .getAttribute('aria-valuenow')
    ).toBe('90');
  });

  it('should not set values when sending invalid numbers', () => {
    const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });

    const { container: container1 } = render(
      <Slider value={0} readOnly min={Math.min()} />
    );
    expect(
      container1
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('0');
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Invalid `min` value: Infinity. It must be a finite number.'
    );
    errorSpy.mockReset();

    const { container: container2 } = render(
      <Slider value={100} readOnly max={Math.max()} />
    );
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('100');
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Invalid `max` value: -Infinity. It must be a finite number.'
    );
    errorSpy.mockReset();

    const { container: container3 } = render(
      <Range value={[0, 100]} readOnly min={Math.min()} max={Math.max()} />
    );
    expect(
      container3
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('0');
    expect(
      container3
        .getElementsByClassName('rc-slider-handle')[1]
        .getAttribute('aria-valuenow')
    ).toBe('100');
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Invalid `max` value: -Infinity. It must be a finite number.'
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: Invalid `min` value: Infinity. It must be a finite number.'
    );
    errorSpy.mockReset();
  });

  it('should update value when it is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={0} onChange={sliderOnChange} />
    );
    rerender1(<Slider value={0} onChange={sliderOnChange} min={10} />);
    expect(
      container1
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('10');

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Range value={[0, 0]} onChange={rangeOnChange} />
    );
    rerender2(<Range value={[0, 0]} onChange={rangeOnChange} min={10} />);
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('10');
  });

  it('should not trigger onChange when no min and max', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={0} onChange={sliderOnChange} />
    );
    rerender1(<Slider onChange={sliderOnChange} value={100} />);
    expect(
      container1
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('100');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Range value={[]} onChange={rangeOnChange} />
    );
    rerender2(<Range onChange={rangeOnChange} value={[0, 200]} />);
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('0');
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[1]
        .getAttribute('aria-valuenow')
    ).toBe('100');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not trigger onChange when value is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={9} max={10} onChange={sliderOnChange} />
    );
    rerender1(<Slider value={11} max={10} onChange={sliderOnChange} />);
    expect(
      container1
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('10');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Range value={[0, 10]} max={10} onChange={rangeOnChange} />
    );
    rerender2(<Range max={10} onChange={rangeOnChange} value={[0, 100]} />);
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[0]
        .getAttribute('aria-valuenow')
    ).toBe('0');
    expect(
      container2
        .getElementsByClassName('rc-slider-handle')[1]
        .getAttribute('aria-valuenow')
    ).toBe('10');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when value is the same', () => {
    const handler = jest.fn();

    const { container: container1 } = render(
      <Slider value={0} onChange={handler} />
    );
    const handle1 = container1.getElementsByClassName('rc-slider-handle')[0];
    fireEvent.mouseDown(handle1);
    fireEvent.mouseMove(handle1);
    fireEvent.mouseUp(handle1);

    const { container: container2 } = render(
      <Range value={[0, 100]} onChange={handler} />
    );
    const handle2 = container2.getElementsByClassName('rc-slider-handle')[1];
    fireEvent.mouseDown(handle2);
    fireEvent.mouseMove(handle2);
    fireEvent.mouseUp(handle2);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should not go to right direction when mouse go to the left', () => {
    const { container } = render(<Slider value={0} readOnly />);
    const leftHandle = container.getElementsByClassName('rc-slider-handle')[0];

    const mouseDown = createEvent.mouseDown(leftHandle);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (mouseDown as any).pageX = 5;

    expect(
      container.getElementsByClassName('rc-slider-handle')[0]
    ).toHaveAttribute('aria-valuenow', '0');

    const mouseMove = createEvent.mouseMove(leftHandle);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (mouseMove as any).pageX = 0;

    expect(
      container.getElementsByClassName('rc-slider-handle')[0]
    ).toHaveAttribute('aria-valuenow', '0');
  });
});
