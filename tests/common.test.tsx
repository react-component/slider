import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import Slider from '../src';

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
    const { container: container1 } = render(<Slider value={0} vertical />);
    expect(container1.getElementsByClassName('rc-slider-vertical')).toHaveLength(1);

    const { container: container2 } = render(<Slider value={[0, 0]} range vertical />);
    expect(container2.getElementsByClassName('rc-slider-vertical')).toHaveLength(1);
  });

  it('should render dots correctly when `dots=true`', () => {
    const { container: container1 } = render(<Slider value={50} step={10} dots />);
    expect(container1.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(container1.getElementsByClassName('rc-slider-dot-active')).toHaveLength(6);

    const { container: container2 } = render(<Slider range value={[20, 50]} step={10} dots />);
    expect(container2.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(container2.getElementsByClassName('rc-slider-dot-active')).toHaveLength(4);
  });

  it('should render normally when `dots=true` and `step=null`', () => {
    const { container } = render(<Slider value={0} step={null} dots />);
    expect(() => container).not.toThrowError();
  });

  it('should not set value greater than `max` or smaller `min`', () => {
    const { container: container1 } = render(<Slider value={0} min={10} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');

    const { container: container2 } = render(<Slider value={100} max={90} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('90');

    const { container: container3 } = render(<Slider range value={[0, 100]} min={10} max={90} />);
    expect(
      container3.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(
      container3.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('90');
  });

  it('should not set values when sending invalid numbers', () => {
    const { container: container1 } = render(<Slider value={0} min={Math.min()} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');

    const { container: container2 } = render(<Slider value={100} max={Math.max()} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('100');

    const { container: container3 } = render(
      <Slider range value={[0, 100]} min={Math.min()} max={Math.max()} />,
    );
    expect(
      container3.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container3.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('100');
  });

  it('should update value when it is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={0} onChange={sliderOnChange} />,
    );
    rerender1(<Slider value={0} onChange={sliderOnChange} min={10} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range value={[0, 0]} onChange={rangeOnChange} />,
    );
    rerender2(<Slider range value={[0, 0]} onChange={rangeOnChange} min={10} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
  });

  it('should not trigger onChange when no min and max', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={0} onChange={sliderOnChange} />,
    );
    rerender1(<Slider onChange={sliderOnChange} value={100} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('100');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range value={[]} onChange={rangeOnChange} />,
    );
    rerender2(<Slider range onChange={rangeOnChange} value={[0, 200]} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container2.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('100');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not trigger onChange when value is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={9} max={10} onChange={sliderOnChange} />,
    );
    rerender1(<Slider value={11} max={10} onChange={sliderOnChange} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range value={[0, 10]} max={10} onChange={rangeOnChange} />,
    );
    rerender2(<Slider range max={10} onChange={rangeOnChange} value={[0, 100]} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container2.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when value is the same', () => {
    const handler = jest.fn();

    const { container: container1 } = render(<Slider value={0} onChange={handler} />);
    const handle1 = container1.getElementsByClassName('rc-slider-handle')[0];
    fireEvent.mouseDown(handle1);
    fireEvent.mouseMove(handle1);
    fireEvent.mouseUp(handle1);

    const { container: container2 } = render(<Slider range value={[0, 100]} onChange={handler} />);
    const handle2 = container2.getElementsByClassName('rc-slider-handle')[1];
    fireEvent.mouseDown(handle2);
    fireEvent.mouseMove(handle2);
    fireEvent.mouseUp(handle2);

    expect(handler).not.toHaveBeenCalled();
  });

  // TODO: should update the following test cases for it should test API instead implementation
  // it('should set `dragOffset` to correct value when the left handle is clicked off-center', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: leftHandle,
  //     pageX: 5,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  // });

  // it('should respect `dragOffset` while dragging the handle via MouseEvents', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: leftHandle,
  //     pageX: 5,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  //   wrapper.instance().onMouseMove({
  //     // to propagation
  //     type: 'mousemove',
  //     target: leftHandle,
  //     pageX: 14,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().getValue()).toBe(9);
  // });

  it('should not go to right direction when mouse go to the left', () => {
    const { container } = render(<Slider value={0} />);
    const leftHandle = container.getElementsByClassName('rc-slider-handle')[0];

    const mouseDown = createEvent.mouseDown(leftHandle);
    (mouseDown as any).pageX = 5;

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '0',
    );

    const mouseMove = createEvent.mouseMove(leftHandle);
    (mouseMove as any).pageX = 0;

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });
});
