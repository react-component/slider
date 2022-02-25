/* eslint-disable max-len, no-undef, react/no-string-refs, no-param-reassign, max-classes-per-file */
import React from 'react';
// import { render, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import keyCode from 'rc-util/lib/KeyCode';
import { render, fireEvent, waitFor, screen, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import Slider from '../src/';

// const RangeWithTooltip = createSliderWithTooltip(Range);

describe('Range', () => {
  let container;

  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
      }),
    });
  });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

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
      <Slider range defaultValue={[20, 50]} onAfterChange={onAfterChange} />,
    );

    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[1], {
      keyCode: keyCode.RIGHT,
    });

    expect(onAfterChange).toBeCalled();
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

  it('should render correctly when allowCross', () => {
    const onChange = jest.fn();
    const { container, unmount } = render(
      <Slider range onChange={onChange} defaultValue={[20, 40]} />,
    );

    // Mouse Down
    const mouseDown = createEvent.mouseDown(
      container.getElementsByClassName('rc-slider-handle')[0],
    );
    mouseDown.pageX = 0;
    fireEvent(container.getElementsByClassName('rc-slider-handle')[0], mouseDown);

    // Drag
    const mouseMove = createEvent.mouseMove(document);
    mouseMove.pageX = 9999;
    fireEvent(document, mouseMove);

    expect(onChange).toHaveBeenCalledWith([40, 100]);

    unmount();
  });

  it('should keep pushable with pushable s defalutValue when not allowCross and setState', () => {
    const onChange = jest.fn();

    const Demo = () => {
      const [value, setValue] = React.useState([20, 40]);

      return (
        <Slider
          range
          onChange={(values) => {
            setValue(values);
            onChange(values);
          }}
          value={[20, 40]}
          allowCross={false}
          pushable
        />
      );
    };

    global.error = true;
    const { container, unmount } = render(<Demo />);

    // Mouse Down
    const mouseDown = createEvent.mouseDown(
      container.getElementsByClassName('rc-slider-handle')[0],
    );
    mouseDown.pageX = 0;
    fireEvent(container.getElementsByClassName('rc-slider-handle')[0], mouseDown);

    // Drag
    const mouseMove = createEvent.mouseMove(document);
    mouseMove.pageX = 9999;
    fireEvent(document, mouseMove);

    expect(onChange).toHaveBeenCalledWith([39, 40]);

    unmount();
  });

  it('track draggable', () => {
    const onChange = jest.fn();

    const { container, unmount } = render(
      <Slider range defaultValue={[0, 30]} draggableTrack onChange={onChange} />,
    );

    // Mouse Down
    const mouseDown = createEvent.mouseDown(container.getElementsByClassName('rc-slider-track')[0]);
    mouseDown.pageX = 0;
    fireEvent(container.getElementsByClassName('rc-slider-track')[0], mouseDown);

    // Drag
    const mouseMove = createEvent.mouseMove(document);
    mouseMove.pageX = 20;
    fireEvent(document, mouseMove);

    expect(onChange).toHaveBeenCalledWith([20, 50]);

    unmount();
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

  // !!!!!!!!!!!!!!!!

  // // Corresponds to the issue described in https://github.com/react-component/slider/issues/690.
  // it('should correctly display a dynamically changed number of handles', () => {
  //   class RangeUnderTest extends React.Component {
  //     state = {
  //       handles: [0, 25, 50, 75, 100],
  //     };

  //     render() {
  //       return (
  //         <Slider
  //           range
  //           allowCross={false}
  //           marks={{
  //             0: { label: '0', style: {} },
  //             25: { label: '25', style: {} },
  //             50: { label: '50', style: {} },
  //             75: { label: '75', style: {} },
  //             100: { label: '100', style: {} },
  //           }}
  //           step={null}
  //           value={this.state.handles}
  //         />
  //       );
  //     }
  //   }

  //   const rangeUnderTest = mount(<Slider range UnderTest />);
  //   const verifyHandles = () => {
  //     // Has the number of handles that we set.
  //     expect(rangeUnderTest.find('div.rc-slider-handle')).toHaveLength(
  //       rangeUnderTest.state('handles').length,
  //     );
  //     // Handles have the values that we set.
  //     expect(
  //       rangeUnderTest
  //         .find('div.rc-slider-handle')
  //         .everyWhere(
  //           (element, index) =>
  //             Number(element.prop('aria-valuenow')) === rangeUnderTest.state('handles')[index],
  //         ),
  //     ).toEqual(true);
  //   };

  //   // Assert that handles are correct initially.
  //   verifyHandles();

  //   // Assert that handles are correct after decreasing their number.
  //   rangeUnderTest.setState({ handles: [0, 75, 100] });
  //   verifyHandles();

  //   // Assert that handles are correct after increasing their number.
  //   rangeUnderTest.setState({ handles: [0, 25, 75, 100] });
  //   verifyHandles();
  // });

  // describe('focus & blur', () => {
  //   let container;

  //   beforeEach(() => {
  //     container = document.createElement('div');
  //     document.body.appendChild(container);
  //   });

  //   afterEach(() => {
  //     document.body.removeChild(container);
  //   });

  //   const mockRect = (wrapper) => {
  //     wrapper.instance().sliderRef.getBoundingClientRect = () => ({
  //       left: 10,
  //       width: 100,
  //     });
  //   };

  //   it('focus()', () => {
  //     const handleFocus = jest.fn();
  //     const wrapper = mount(<Slider range min={0} max={20} onFocus={handleFocus} />, {
  //       attachTo: container,
  //     });
  //     mockRect(wrapper);
  //     wrapper.instance().focus();
  //     expect(handleFocus).toBeCalled();
  //   });

  //   it('blur', () => {
  //     const handleBlur = jest.fn();
  //     const wrapper = mount(<Slider range min={0} max={20} onBlur={handleBlur} />, {
  //       attachTo: container,
  //     });
  //     mockRect(wrapper);
  //     wrapper.instance().focus();
  //     wrapper.instance().blur();
  //     expect(handleBlur).toBeCalled();
  //   });
  // });
});
