import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { Range } from '../src';
import { act } from 'react-dom/test-utils';

describe('Range', () => {
  let mainContainer: HTMLElement;

  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
      }),
    });
  });

  beforeEach(() => {
    mainContainer = document.createElement('div');
    document.body.appendChild(mainContainer);
  });

  afterEach(() => {
    document.body.removeChild(mainContainer);
  });

  function doMouseMove(
    container: HTMLElement,
    start: number,
    end: number,
    element = 'rc-slider-handle',
  ) {
    const mouseDown = createEvent.mouseDown(container.getElementsByClassName(element)[0]);
    (mouseDown as any).pageX = start;
    (mouseDown as any).pageY = start;
    fireEvent(container.getElementsByClassName(element)[0], mouseDown);

    // Drag
    const mouseMove = createEvent.mouseMove(document);
    (mouseMove as any).pageX = end;
    (mouseMove as any).pageY = end;
    fireEvent(document, mouseMove);
  }

  function doTouchMove(
    container: HTMLElement,
    start: number,
    end: number,
    element = 'rc-slider-handle',
  ) {
    const touchStart = createEvent.touchStart(container.getElementsByClassName(element)[0], {
      touches: [{}],
    });
    ((touchStart as TouchEvent).touches[0] as any).pageX = start;
    fireEvent(container.getElementsByClassName(element)[0], touchStart);

    // Drag
    const touchMove = createEvent.touchMove(document, {
      touches: [{}],
    });
    ((touchStart as TouchEvent).touches[0] as any).pageX = end;
    fireEvent(document, touchMove);
  }

  it('should render Range with correct DOM structure', () => {
    const { asFragment } = render(
      <Range
        range
        value={[0, 0]}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
        handleClassName={[
          'rc-slider-handle rc-slider-handle-1',
          'rc-slider-handle rc-slider-handle-2',
          'rc-slider-handle rc-slider-handle-3',
          'rc-slider-handle rc-slider-handle-4',
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const { asFragment } = render(
      <Range
        range
        value={[0, 0]}
        count={3}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
          'rc-slider-track rc-slider-track-4',
        ]}
        handleClassName={[
          'rc-slider-handle rc-slider-handle-1',
          'rc-slider-handle rc-slider-handle-2',
          'rc-slider-handle rc-slider-handle-3',
          'rc-slider-handle rc-slider-handle-4',
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render Range with value correctly', async () => {
    const { container } = render(
      <Range
        range
        value={[0, 50]}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
        handleClassName={[
          'rc-slider-handle rc-slider-handle-1',
          'rc-slider-handle rc-slider-handle-2',
          'rc-slider-handle rc-slider-handle-3',
          'rc-slider-handle rc-slider-handle-4',
        ]}
      />,
    );

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveStyle('left: 0%');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveStyle('left: 50%');

    expect(container.getElementsByClassName('rc-slider-track')[0]).toHaveStyle(
      'left: 0%; width: 50%',
    );
  });

  it('should render reverse Range with value correctly', () => {
    const { container } = render(
      <Range
        range
        value={[0, 50]}
        reverse
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
      />,
    );

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveStyle('right: 0%');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveStyle('right: 50%');

    expect(container.getElementsByClassName('rc-slider-track')[0]).toHaveStyle(
      'right: 0%; width: 50%',
    );
  });

  it('should render Range with tabIndex correctly', () => {
    const { container } = render(
      <Range
        range
        value={[0, 0]}
        tabIndex={[1, 2]}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
      />,
    );

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'tabIndex',
      '1',
    );
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveAttribute(
      'tabIndex',
      '2',
    );
  });

  it('should render Range without tabIndex (equal null) correctly', () => {
    const { container } = render(
      <Range
        range
        value={[0, 0]}
        tabIndex={null}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
      />,
    );
    expect(container.getElementsByClassName('rc-slider-handle')[0]).not.toHaveAttribute('tabIndex');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).not.toHaveAttribute('tabIndex');
  });

  it('should render Multi-Range with value correctly', () => {
    const { container } = render(
      <Range
        range
        count={3}
        value={[0, 25, 50, 75]}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
      />,
    );

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveStyle('left: 0%');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveStyle('left: 25%');
    expect(container.getElementsByClassName('rc-slider-handle')[2]).toHaveStyle('left: 50%');
    expect(container.getElementsByClassName('rc-slider-handle')[3]).toHaveStyle('left: 75%');

    expect(container.getElementsByClassName('rc-slider-track')[0]).toHaveStyle(
      'left: 0%; width: 25%',
    );

    expect(container.getElementsByClassName('rc-slider-track')[1]).toHaveStyle(
      'left: 25%; width: 25%',
    );

    expect(container.getElementsByClassName('rc-slider-track')[2]).toHaveStyle(
      'left: 50%; width: 25%',
    );
  });

  it('should update Range correctly in controlled model', () => {
    const { container, rerender } = render(<Range range value={[2, 4, 6]} />);
    expect(container.getElementsByClassName('rc-slider-handle')).toHaveLength(3);

    rerender(<Range range value={[2, 4]} />);
    expect(container.getElementsByClassName('rc-slider-handle')).toHaveLength(2);
  });

  // FIXME No state handling
  it('should keep pushable when not allowCross', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Range range allowCross={false} onChange={onChange} value={[30, 40]} pushable={10} />,
    );

    onChange.mockReset();
    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
      keyCode: 'ArrowUp',
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  // FIXME: Broken
  it.skip('pushable & allowCross', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Range
        range
        onChange={onChange}
        value={[10, 30, 50]}
        pushable={10}
        trackClassName={[
          'rc-slider-track rc-slider-track-1',
          'rc-slider-track rc-slider-track-2',
          'rc-slider-track rc-slider-track-3',
        ]}
      />,
    );

    // Left to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
        keyCode: 'ArrowUp',
      });
    }
    expect(onChange).toHaveBeenCalledWith([80, 90, 100]);

    // Center to Left
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
        keyCode: 'ArrowDown',
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 10, 100]);

    // Right to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[2], {
        keyCode: 'ArrowDown',
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 10, 20]);

    // Center to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
        keyCode: 'ArrowUp',
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 90, 100]);
  });

  describe('should render correctly when allowCross', () => {
    function testLTR(name: string, motion: (container: HTMLElement) => void) {
      it(name, () => {
        const onChange = jest.fn();
        const { container, unmount } = render(
          <Range
            range
            onChange={onChange}
            value={[20, 40]}
            trackClassName={[
              'rc-slider-track rc-slider-track-1',
              'rc-slider-track rc-slider-track-2',
              'rc-slider-track rc-slider-track-3',
            ]}
          />,
        );

        // Do move
        motion(container);

        expect(onChange).toHaveBeenCalledWith([40, 100]);

        unmount();
      });
    }

    // testLTR("mouse", (container: HTMLElement) =>
    //   doMouseMove(container, 0, 9999)
    // );
    testLTR('touch', (container: HTMLElement) => doTouchMove(container, 0, 9999));

    // FIXME: ?
    it('reverse', () => {
      const onChange = jest.fn();
      const { container } = render(<Range onChange={onChange} value={[20, 40]} reverse />);

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([30, 40]);
    });

    // FIXME: ?
    it('vertical', () => {
      const onChange = jest.fn();
      const { container } = render(<Range range onChange={onChange} value={[20, 40]} vertical />);

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([30, 40]);
    });

    // FIXME
    it('vertical & reverse', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Range range onChange={onChange} value={[20, 40]} vertical reverse />,
      );

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([10, 40]);
    });
  });

  // FIXME: Broken
  describe.skip('should keep pushable with pushable s defalutValue when not allowCross and setState', () => {
    function test(name: string, func: (container: HTMLElement) => void) {
      it(name, () => {
        const onChange = jest.fn();

        const Demo = () => {
          const [, setValue] = React.useState<number | number[]>([20, 40]);

          return (
            <Range
              range
              onChange={(newValues) => {
                setValue(newValues);
                onChange(newValues);
              }}
              value={[20, 40]}
              allowCross={false}
              pushable
            />
          );
        };

        const { container, unmount } = render(<Demo />);

        // Do move
        func(container.getElementsByClassName('rc-slider-handle')[0] as HTMLElement);

        expect(onChange).toHaveBeenCalledWith([39, 40]);

        unmount();
      });
    }

    test('mouse', (container: HTMLElement) => doMouseMove(container, 0, 9999));
    test('touch', (container: HTMLElement) => doTouchMove(container, 0, 9999));
  });

  // FIXME: Broken
  describe.skip('track draggable', () => {
    function test(name: string, func: (container: HTMLElement) => void) {
      it(name, () => {
        const onChange = jest.fn();

        let container: any, unmount: any;
        act(() => {
          const u = render(<Range range value={[0, 30]} draggableTrack onChange={onChange} />);
          container = u.container;
          unmount = u.unmount;
        });

        // Do move

        func(container);
        expect(onChange).toHaveBeenCalledWith([20, 50]);
        (unmount as any)?.();
      });
    }

    test('mouse', (container: HTMLElement) => doMouseMove(container, 0, 20, 'rc-slider-track'));
    test('touch', (container: HTMLElement) => doTouchMove(container, 0, 20, 'rc-slider-track'));
  });

  it('sets aria-label on the handles', () => {
    const { container } = render(
      <Range range value={[0, 0]} ariaLabelForHandle={['Some Label', 'Some other Label']} />,
    );
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-label',
      'Some Label',
    );
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveAttribute(
      'aria-label',
      'Some other Label',
    );
  });

  it('sets aria-labelledby on the handles', () => {
    const { container } = render(
      <Range range value={[0, 0]} ariaLabelledByForHandle={['some_id', 'some_other_id']} />,
    );
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-labelledby',
      'some_id',
    );
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveAttribute(
      'aria-labelledby',
      'some_other_id',
    );
  });

  it('sets aria-valuetext on the handles', () => {
    const { container } = render(
      <Range
        range
        min={0}
        max={5}
        value={[1, 3]}
        ariaValueTextFormatterForHandle={[
          (value) => `${value} of something`,
          (value) => `${value} of something else`,
        ]}
      />,
    );
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuetext',
      '1 of something',
    );
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveAttribute(
      'aria-valuetext',
      '3 of something else',
    );
  });

  // Corresponds to the issue described in https://github.com/react-component/slider/issues/690.
  it('should correctly display a dynamically changed number of handles', () => {
    const props = {
      range: true,
      allowCross: false,
      marks: {
        0: '0',
        25: '25',
        50: '50',
        75: '75',
        100: '100',
      },
      step: null,
    };

    const { container, rerender } = render(<Range {...props} range value={[0, 25, 50, 75, 100]} />);

    const verifyHandles = (values: number[]) => {
      // Has the number of handles that we set.
      expect(container.getElementsByClassName('rc-slider-handle')).toHaveLength(values.length);

      // Handles have the values that we set.
      Array.from(container.getElementsByClassName('rc-slider-handle')).forEach((ele, index) => {
        expect(ele).toHaveAttribute('aria-valuenow', values[index].toString());
      });
    };

    // Assert that handles are correct initially.
    verifyHandles([0, 25, 50, 75, 100]);

    // Assert that handles are correct after decreasing their number.
    rerender(<Range {...props} range value={[0, 75, 100]} />);
    verifyHandles([0, 75, 100]);

    // Assert that handles are correct after increasing their number.
    rerender(<Range {...props} range value={[0, 25, 75, 100]} />);
    verifyHandles([0, 25, 75, 100]);
  });

  describe('focus & blur', () => {
    it('focus()', () => {
      const handleFocus = jest.fn();
      const { container } = render(
        <Range range value={[0, 0]} min={0} max={20} onFocus={handleFocus} />,
      );
      (container.getElementsByClassName('rc-slider-handle')[0] as HTMLElement).focus();
      expect(handleFocus).toBeCalled();
    });

    it('blur', () => {
      const handleBlur = jest.fn();
      const { container } = render(
        <Range range value={[0, 0]} min={0} max={20} onBlur={handleBlur} />,
      );
      (container.getElementsByClassName('rc-slider-handle')[0] as HTMLElement).focus();
      (container.getElementsByClassName('rc-slider-handle')[0] as HTMLElement).blur();
      expect(handleBlur).toBeCalled();
    });
  });

  it('warning for `draggableTrack` and `mergedStep=null`', () => {
    const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Range range value={[0, 0]} draggableTrack step={null} />);

    expect(errorSpy).toHaveBeenCalledWith(
      '`draggableTrack` is not supported when `step` is `null`.',
    );
    errorSpy.mockRestore();
  });
});
