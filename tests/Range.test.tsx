/* eslint-disable max-len, no-undef, react/no-string-refs, no-param-reassign, max-classes-per-file */
import '@testing-library/jest-dom';
import { createEvent, fireEvent, render } from '@testing-library/react';
import keyCode from 'rc-util/lib/KeyCode';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import { resetWarned } from 'rc-util/lib/warning';
import React from 'react';
import Slider from '../src';

describe('Range', () => {
  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
        left: 0,
        top: 0,
        bottom: 100,
        right: 100,
      }),
    });
  });

  beforeEach(() => {
    resetWarned();
  });

  function doMouseDown(
    container: HTMLElement,
    start: number,
    element = 'rc-slider-handle',
    skipEventCheck = false,
  ) {
    const ele = container.getElementsByClassName(element)[0];
    const mouseDown = createEvent.mouseDown(ele);
    (mouseDown as any).pageX = start;
    (mouseDown as any).pageY = start;

    const preventDefault = jest.fn();

    Object.defineProperties(mouseDown, {
      clientX: { get: () => start },
      clientY: { get: () => start },
      preventDefault: { value: preventDefault },
    });

    fireEvent.mouseEnter(ele);
    fireEvent(ele, mouseDown);

    // Should not prevent default since focus will not change
    if (!skipEventCheck) {
      expect(preventDefault).not.toHaveBeenCalled();
    }
  }

  function doMouseDrag(end: number) {
    const mouseMove = createEvent.mouseMove(document);
    (mouseMove as any).pageX = end;
    (mouseMove as any).pageY = end;
    fireEvent(document, mouseMove);
  }

  function doMouseMove(
    container: HTMLElement,
    start: number,
    end: number,
    element = 'rc-slider-handle',
  ) {
    doMouseDown(container, start, element);

    // Drag
    doMouseDrag(end);
  }

  function doTouchMove(
    container: HTMLElement,
    start: number,
    end: number,
    element = 'rc-slider-handle',
  ) {
    const touchStart = createEvent.touchStart(container.getElementsByClassName(element)[0], {
      touches: [{}],
      targetTouches: [{}],
    });
    (touchStart as any).targetTouches[0].pageX = start;
    fireEvent(container.getElementsByClassName(element)[0], touchStart);

    // Drag
    const touchMove = createEvent.touchMove(container.getElementsByClassName(element)[0], {
      touches: [{}],
      targetTouches: [{}],
    });
    (touchMove as any).targetTouches[0].pageX = end;
    fireEvent(container.getElementsByClassName(element)[0], touchMove);
  }

  it('should render Range with correct DOM structure', () => {
    const { asFragment } = render(<Slider range />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const { asFragment } = render(<Slider range count={3} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should render Range with value correctly', async () => {
    const { container } = render(<Slider range value={[0, 50]} />);

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveStyle('left: 0%');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveStyle('left: 50%');

    expect(container.getElementsByClassName('rc-slider-track')[0]).toHaveStyle(
      'left: 0%; width: 50%',
    );
  });

  it('should render reverse Range with value correctly', () => {
    const { container } = render(<Slider range value={[0, 50]} reverse />);

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveStyle('right: 0%');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveStyle('right: 50%');

    expect(container.getElementsByClassName('rc-slider-track')[0]).toHaveStyle(
      'right: 0%; width: 50%',
    );
  });

  it('should render Range with tabIndex correctly', () => {
    const { container } = render(<Slider range tabIndex={[1, 2]} />);

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
    const { container } = render(<Slider range tabIndex={[null, null]} />);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).not.toHaveAttribute('tabIndex');
    expect(container.getElementsByClassName('rc-slider-handle')[1]).not.toHaveAttribute('tabIndex');
  });

  it('it should trigger onAfterChange when key pressed', () => {
    const onAfterChange = jest.fn();
    const { container } = render(
      <Slider range defaultValue={[20, 50]} onChangeComplete={onAfterChange} />,
    );

    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.RIGHT,
    });
    expect(onAfterChange).not.toHaveBeenCalled();

    fireEvent.keyUp(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.RIGHT,
    });

    expect(onAfterChange).toHaveBeenCalled();
  });

  it('should not change value from keyboard events when disabled', () => {
    const onAfterChange = jest.fn();
    const { container } = render(
      <Slider range keyboard={false} defaultValue={[20, 50]} onChangeComplete={onAfterChange} />,
    );

    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.RIGHT,
    });

    expect(onAfterChange).not.toBeCalled();
  });

  it('should render Multi-Range with value correctly', () => {
    const { container } = render(<Slider range count={3} value={[0, 25, 50, 75]} />);

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
    const { container, rerender } = render(<Slider range value={[2, 4, 6]} />);
    expect(container.getElementsByClassName('rc-slider-handle')).toHaveLength(3);

    rerender(<Slider range value={[2, 4]} />);
    expect(container.getElementsByClassName('rc-slider-handle')).toHaveLength(2);
  });

  it('not moved if controlled', () => {
    const onChange = jest.fn();
    const { container } = render(<Slider range value={[2, 4, 6]} onChange={onChange} />);
    doMouseMove(container, 0, 9999999);

    expect(onChange).toHaveBeenCalled();

    expect(container.querySelector('.rc-slider-handle-dragging')).toHaveStyle({
      left: '2%',
    });
  });

  // Not trigger onChange anymore
  // it('should only update bounds that are out of range', () => {
  //   const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
  //   const range = mount(<Slider range {...props} step={0.1} />);
  //   range.setProps({ min: 0, max: 500 });

  //   expect(props.onChange).toHaveBeenCalledWith([0.01, 500]);
  // });

  // Not trigger onChange anymore
  // it('should only update bounds if they are out of range', () => {
  //   const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
  //   const range = mount(<Slider range {...props} />);
  //   range.setProps({ min: 0, max: 500, value: [0.01, 466] });

  //   expect(props.onChange).toHaveBeenCalledTimes(0);
  // });

  // https://github.com/react-component/slider/pull/256
  // Move to antd instead
  // it('should handle multi handle mouseEnter correctly', () => {
  //   const wrapper = mount(<Slider range WithTooltip min={0} max={1000} defaultValue={[50, 55]} />);
  //   wrapper.find('.rc-slider-handle').at(1).simulate('mouseEnter');
  //   expect(wrapper.state().visibles[0]).toBe(true);
  //   wrapper.find('.rc-slider-handle').at(3).simulate('mouseEnter');
  //   expect(wrapper.state().visibles[1]).toBe(true);
  //   wrapper.find('.rc-slider-handle').at(1).simulate('mouseLeave');
  //   expect(wrapper.state().visibles[0]).toBe(false);
  //   wrapper.find('.rc-slider-handle').at(3).simulate('mouseLeave');
  //   expect(wrapper.state().visibles[1]).toBe(false);
  // });

  it('should keep pushable when not allowCross', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Slider range allowCross={false} onChange={onChange} defaultValue={[29, 40]} pushable={10} />,
    );

    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
      keyCode: keyCode.UP,
    });
    expect(onChange).toHaveBeenCalledWith([30, 40]);

    onChange.mockReset();
    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
      keyCode: keyCode.UP,
    });
    expect(onChange).not.toHaveBeenCalled();

    onChange.mockReset();
    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.UP,
    });
    expect(onChange).toHaveBeenCalledWith([30, 41]);

    // Push to the edge
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
        keyCode: keyCode.DOWN,
      });
    }
    expect(onChange).toHaveBeenCalledWith([30, 40]);

    onChange.mockReset();
    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.DOWN,
    });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pushable & allowCross', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Slider range onChange={onChange} defaultValue={[10, 30, 50]} pushable={10} />,
    );

    // Left to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
        keyCode: keyCode.UP,
      });
    }
    expect(onChange).toHaveBeenCalledWith([80, 90, 100]);

    // Center to Left
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
        keyCode: keyCode.DOWN,
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 10, 100]);

    // Right to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[2], {
        keyCode: keyCode.DOWN,
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 10, 20]);

    // Center to Right
    for (let i = 0; i < 99; i += 1) {
      fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
        keyCode: keyCode.UP,
      });
    }
    expect(onChange).toHaveBeenCalledWith([0, 90, 100]);
  });

  describe('should render correctly when allowCross', () => {
    function testLTR(name, func) {
      it(name, () => {
        const onChange = jest.fn();
        const { container, unmount } = render(
          <Slider range onChange={onChange} defaultValue={[20, 40]} />,
        );

        // Do move
        func(container);

        expect(onChange).toHaveBeenCalledWith([40, 100]);

        unmount();
      });
    }

    testLTR('mouse', (container) => doMouseMove(container, 0, 9999));
    testLTR('touch', (container) => doTouchMove(container, 0, 9999));

    it('reverse', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Slider range onChange={onChange} defaultValue={[20, 40]} reverse />,
      );

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([30, 40]);
    });

    it('vertical', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Slider range onChange={onChange} defaultValue={[20, 40]} vertical />,
      );

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([30, 40]);
    });

    it('vertical & reverse', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Slider range onChange={onChange} defaultValue={[20, 40]} vertical reverse />,
      );

      // Do move
      doMouseMove(container, 0, -10);

      expect(onChange).toHaveBeenCalledWith([10, 40]);
    });
  });

  describe('should keep pushable with pushable s defalutValue when not allowCross and setState', () => {
    function test(name, func) {
      it(name, () => {
        const onChange = jest.fn();

        const Demo = () => {
          const [value, setValue] = React.useState([20, 40]);

          return (
            <Slider
              range
              onChange={(values: number[]) => {
                setValue(values);
                onChange(values);
              }}
              value={value}
              allowCross={false}
              pushable
            />
          );
        };

        global.error = true;
        const { container, unmount } = render(<Demo />);

        // Do move
        func(container);

        expect(onChange).toHaveBeenCalledWith([39, 40]);

        unmount();
      });
    }

    test('mouse', (container) => doMouseMove(container, 0, 9999));
    test('touch', (container) => doTouchMove(container, 0, 9999));
  });

  describe('track draggable', () => {
    function test(name, func) {
      it(name, () => {
        const onChange = jest.fn();

        const { container, unmount } = render(
          <Slider range={{ draggableTrack: true }} defaultValue={[0, 30]} onChange={onChange} />,
        );

        // Do move
        func(container);

        expect(onChange).toHaveBeenCalledWith([20, 50]);

        unmount();
      });
    }

    test('mouse', (container) => doMouseMove(container, 0, 20, 'rc-slider-track'));
    test('touch', (container) => doTouchMove(container, 0, 20, 'rc-slider-track'));
  });

  it('sets aria-orientation to default on the handle', () => {
    const { container } = render(<Slider range />);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('sets aria-orientation to vertical on the handles of vertical Slider', () => {
    const { container } = render(<Slider range vertical defaultValue={[0, 20]} />);
    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
    expect(container.getElementsByClassName('rc-slider-handle')[1]).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('sets aria-label on the handles', () => {
    const { container } = render(
      <Slider range ariaLabelForHandle={['Some Label', 'Some other Label']} />,
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
      <Slider range ariaLabelledByForHandle={['some_id', 'some_other_id']} />,
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
      <Slider
        range
        min={0}
        max={5}
        defaultValue={[1, 3]}
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
        0: { label: '0', style: {} },
        25: { label: '25', style: {} },
        50: { label: '50', style: {} },
        75: { label: '75', style: {} },
        100: { label: '100', style: {} },
      },
      step: null,
    };

    const { container, rerender } = render(<Slider {...props} value={[0, 25, 50, 75, 100]} />);

    const verifyHandles = (values) => {
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
    rerender(<Slider {...props} value={[0, 75, 100]} />);
    verifyHandles([0, 75, 100]);

    // Assert that handles are correct after increasing their number.
    rerender(<Slider {...props} value={[0, 25, 75, 100]} />);
    verifyHandles([0, 25, 75, 100]);
  });

  describe('focus & blur', () => {
    it('focus()', () => {
      const handleFocus = jest.fn();
      const { container } = render(<Slider range min={0} max={20} onFocus={handleFocus} />);
      container.querySelector<HTMLDivElement>('.rc-slider-handle').focus();
      expect(handleFocus).toBeCalled();
    });

    it('blur()', () => {
      const handleBlur = jest.fn();
      const { container } = render(<Slider range min={0} max={20} onBlur={handleBlur} />);
      container.querySelector<HTMLDivElement>('.rc-slider-handle').focus();
      container.querySelector<HTMLDivElement>('.rc-slider-handle').blur();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  it('warning for `draggableTrack` and `mergedStep=null`', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Slider range={{ draggableTrack: true }} step={null} />);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: `draggableTrack` is not supported when `step` is `null`.',
    );
    errorSpy.mockRestore();
  });

  it('Track should have the correct thickness', () => {
    const { container } = render(
      <Slider range={{ draggableTrack: true }} allowCross={false} reverse defaultValue={[0, 40]} />,
    );

    const { container: containerVertical } = render(
      <Slider
        range={{ draggableTrack: true }}
        allowCross={false}
        reverse
        defaultValue={[0, 40]}
        vertical
        style={{ height: '300px' }}
      />,
    );
    expect(container.querySelector('.rc-slider-track-draggable')).toBeTruthy();
    expect(containerVertical.querySelector('.rc-slider-track-draggable')).toBeTruthy();
  });

  it('styles', () => {
    const { container } = render(
      <Slider
        range
        value={[0, 10]}
        styles={{
          tracks: { backgroundColor: '#654321' },
          track: { backgroundColor: '#123456' },
          handle: { backgroundColor: '#112233' },
          rail: { backgroundColor: '#332211' },
        }}
      />,
    );

    expect(container.querySelector('.rc-slider-tracks')).toHaveStyle({
      backgroundColor: '#654321',
    });
    expect(container.querySelector('.rc-slider-track')).toHaveStyle({
      backgroundColor: '#123456',
    });
    expect(container.querySelector('.rc-slider-handle')).toHaveStyle({
      backgroundColor: '#112233',
    });
    expect(container.querySelector('.rc-slider-rail')).toHaveStyle({
      backgroundColor: '#332211',
    });
  });

  it('classNames', () => {
    const { container } = render(
      <Slider
        range
        value={[0, 10]}
        classNames={{
          tracks: 'my-tracks',
          track: 'my-track',
          handle: 'my-handle',
          rail: 'my-rail',
        }}
      />,
    );

    expect(container.querySelector('.rc-slider-tracks')).toHaveClass('my-tracks');
    expect(container.querySelector('.rc-slider-track')).toHaveClass('my-track');
    expect(container.querySelector('.rc-slider-handle')).toHaveClass('my-handle');
    expect(container.querySelector('.rc-slider-rail')).toHaveClass('my-rail');
  });

  describe('editable', () => {
    it('click to create', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Slider
          onChange={onChange}
          min={0}
          max={100}
          value={[0, 100]}
          range={{ editable: true }}
        />,
      );

      doMouseDown(container, 50, 'rc-slider', true);

      expect(onChange).toHaveBeenCalledWith([0, 50, 100]);
    });

    it('can not editable with draggableTrack at same time', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(<Slider range={{ editable: true, draggableTrack: true }} />);

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: `editable` can not work with `draggableTrack`.',
      );
      errorSpy.mockRestore();
    });

    describe('drag out to remove', () => {
      it('uncontrolled', () => {
        const onChange = jest.fn();
        const onChangeComplete = jest.fn();
        const { container } = render(
          <Slider
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            min={0}
            max={100}
            defaultValue={[0, 50, 100]}
            range={{ editable: true }}
          />,
        );

        doMouseMove(container, 0, 1000);
        expect(onChange).toHaveBeenCalledWith([50, 100]);

        expect(container.querySelectorAll('.rc-slider-track')).toHaveLength(1);

        // Fire mouse up
        fireEvent.mouseUp(container.querySelector('.rc-slider-handle'));
        expect(onChangeComplete).toHaveBeenCalledWith([50, 100]);
      });

      it('out and back', () => {
        const onChange = jest.fn();
        const onChangeComplete = jest.fn();
        const { container } = render(
          <Slider
            onChange={onChange}
            onChangeComplete={onChangeComplete}
            min={0}
            max={100}
            defaultValue={[0, 50]}
            range={{ editable: true }}
          />,
        );

        doMouseMove(container, 0, 1000);
        expect(onChange).toHaveBeenCalledWith([50]);

        doMouseDrag(0);
        expect(onChange).toHaveBeenCalledWith([0, 50]);

        // Fire mouse up
        fireEvent.mouseUp(container.querySelector('.rc-slider-handle'));
        expect(onChangeComplete).toHaveBeenCalledWith([0, 50]);
      });

      it('controlled', () => {
        const onChange = jest.fn();
        const onChangeComplete = jest.fn();

        const Demo = () => {
          const [value, setValue] = React.useState([0, 50, 100]);
          return (
            <Slider
              onChange={(nextValue: number[]) => {
                onChange(nextValue);
                setValue(nextValue);
              }}
              onChangeComplete={onChangeComplete}
              min={0}
              max={100}
              value={value}
              range={{ editable: true }}
            />
          );
        };

        const { container } = render(<Demo />);

        doMouseMove(container, 0, 1000);
        expect(onChange).toHaveBeenCalledWith([50, 100]);

        // Fire mouse up
        fireEvent.mouseUp(container.querySelector('.rc-slider-handle'));
        expect(onChangeComplete).toHaveBeenCalledWith([50, 100]);
      });
    });

    it('key to delete', () => {
      const onChange = jest.fn();

      const { container } = render(
        <Slider
          onChange={onChange}
          min={0}
          max={100}
          defaultValue={[0, 50, 100]}
          range={{ editable: true }}
          // Test for active handle render
          activeHandleRender={(ori) => ori}
        />,
      );

      const handle = container.querySelectorAll('.rc-slider-handle')[1];

      fireEvent.mouseEnter(handle);
      fireEvent.keyDown(handle, {
        keyCode: keyCode.DELETE,
      });

      expect(onChange).toHaveBeenCalledWith([0, 100]);

      // Clear all
      fireEvent.keyDown(container.querySelector('.rc-slider-handle'), {
        keyCode: keyCode.DELETE,
      });
      fireEvent.keyDown(container.querySelector('.rc-slider-handle'), {
        keyCode: keyCode.DELETE,
      });
      expect(onChange).toHaveBeenCalledWith([]);

      // 2 handle
      expect(container.querySelectorAll('.rc-slider-handle')).toHaveLength(0);
    });

    it('not remove when minCount', () => {
      const onChange = jest.fn();

      const { container } = render(
        <Slider
          onChange={onChange}
          min={0}
          max={100}
          defaultValue={[0]}
          range={{ editable: true, minCount: 1 }}
          activeHandleRender={(ori) => ori}
        />,
      );

      const handle = container.querySelector('.rc-slider-handle');

      // Key
      fireEvent.mouseEnter(handle);
      fireEvent.keyDown(handle, {
        keyCode: keyCode.DELETE,
      });
      expect(onChange).not.toHaveBeenCalled();

      // Mouse
      doMouseMove(container, 0, 1000);
      expect(onChange).toHaveBeenCalledWith([100]);
    });

    it('maxCount not add', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Slider
          onChange={onChange}
          min={0}
          max={100}
          value={[0, 100]}
          range={{ editable: true, maxCount: 2 }}
        />,
      );

      doMouseDown(container, 50, 'rc-slider', true);
      expect(onChange).toHaveBeenCalledWith([0, 50]);
    });
  });
});
