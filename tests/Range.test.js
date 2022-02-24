/* eslint-disable max-len, no-undef, react/no-string-refs, no-param-reassign, max-classes-per-file */
import React from 'react';
import { render, mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import Slider from '../src/';

// const RangeWithTooltip = createSliderWithTooltip(Range);

describe('Range', () => {
  it('should render Range with correct DOM structure', () => {
    const wrapper = render(<Slider range />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const wrapper = render(<Slider range count={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Range with value correctly', () => {
    const wrapper = mount(<Slider range value={[0, 50]} />);
    expect(wrapper.find('.rc-slider-handle').at(0).props().style.left).toMatch(
      '0%',
    );
    expect(wrapper.find('.rc-slider-handle').at(1).props().style.left).toMatch(
      '50%',
    );

    const trackStyle = wrapper.find('.rc-slider-track').at(0).props().style;
    expect(trackStyle.left).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
  });

  it('should render reverse Range with value correctly', () => {
    const wrapper = mount(<Slider range value={[0, 50]} reverse />);
    expect(wrapper.find('.rc-slider-handle').at(0).props().style.right).toMatch(
      '0%',
    );
    expect(wrapper.find('.rc-slider-handle').at(1).props().style.right).toMatch(
      '50%',
    );

    const trackStyle = wrapper.find('.rc-slider-track').at(0).props().style;
    expect(trackStyle.right).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
  });

  it('should render Range with tabIndex correctly', () => {
    const wrapper = mount(<Slider range tabIndex={[1, 2]} />);
    expect(wrapper.find('.rc-slider-handle').at(0).props().tabIndex).toEqual(1);
    expect(wrapper.find('.rc-slider-handle').at(1).props().tabIndex).toEqual(2);
  });

  it('should render Range without tabIndex (equal null) correctly', () => {
    const wrapper = mount(<Slider range tabIndex={[null, null]} />);
    const firstHandle = wrapper.find('.rc-slider-handle').at(0).getDOMNode();
    const secondHandle = wrapper.find('.rc-slider-handle').at(1).getDOMNode();
    expect(firstHandle.hasAttribute('tabIndex')).toEqual(false);
    expect(secondHandle.hasAttribute('tabIndex')).toEqual(false);
  });

  // it('it should trigger onAfterChange when key pressed', () => {
  //   const onAfterChange = jest.fn();
  //   const wrapper = mount(<Slider range defaultValue={[20, 50]} onAfterChange={onAfterChange} />);

  //   const secondHandle = wrapper.find('.rc-slider-handle').at(1);
  //   wrapper.simulate('focus');
  //   secondHandle.simulate('keyDown', { keyCode: keyCode.RIGHT });

  //   expect(onAfterChange).toBeCalled();
  // });

  // it('should render Multi-Range with value correctly', () => {
  //   const wrapper = mount(<Slider range count={3} value={[0, 25, 50, 75]} />);
  //   expect(wrapper.state('bounds')[0]).toBe(0);
  //   expect(wrapper.state('bounds')[1]).toBe(25);
  //   expect(wrapper.state('bounds')[2]).toBe(50);
  //   expect(wrapper.state('bounds')[3]).toBe(75);
  //   expect(wrapper.find('.rc-slider-handle').at(0).props().style.left).toMatch(
  //     '0%',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(1).props().style.right).toMatch(
  //     'auto',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(1).props().style.right).toMatch(
  //     'auto',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(1).props().style.left).toMatch(
  //     '25%',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(2).props().style.left).toMatch(
  //     '50%',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(2).props().style.right).toMatch(
  //     'auto',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(3).props().style.left).toMatch(
  //     '75%',
  //   );
  //   expect(wrapper.find('.rc-slider-handle').at(3).props().style.right).toMatch(
  //     'auto',
  //   );

  //   const track1Style = wrapper.find('.rc-slider-track').at(0).props().style;
  //   expect(track1Style.left).toMatch('0%');
  //   expect(track1Style.right).toMatch('auto');
  //   expect(track1Style.width).toMatch('25%');

  //   const track2Style = wrapper.find('.rc-slider-track').at(1).props().style;
  //   expect(track2Style.left).toMatch('25%');
  //   expect(track2Style.right).toMatch('auto');
  //   expect(track2Style.width).toMatch('25%');

  //   const track3Style = wrapper.find('.rc-slider-track').at(2).props().style;
  //   expect(track3Style.left).toMatch('50%');
  //   expect(track3Style.right).toMatch('auto');
  //   expect(track3Style.width).toMatch('25%');
  // });

  // it('should update Range correctly in controllered model', () => {
  //   class TestParent extends React.Component {
  //     // eslint-disable-line
  //     state = {
  //       value: [2, 4, 6],
  //     };

  //     getSlider() {
  //       return this.refs.slider;
  //     }

  //     render() {
  //       return <Slider range ref="slider" value={this.state.value} />;
  //     }
  //   }
  //   const wrapper = mount(<TestParent />);

  //   expect(wrapper.instance().getSlider().state.bounds.length).toBe(3);
  //   expect(wrapper.find('.rc-slider-handle').length).toBe(3);
  //   wrapper.setState({ value: [2, 4] });
  //   expect(wrapper.instance().getSlider().state.bounds.length).toBe(2);
  //   expect(wrapper.find('.rc-slider-handle').length).toBe(2);
  // });

  // it('should only update bounds that are out of range', () => {
  //   const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
  //   const range = mount(<Slider range {...props} step={0.1} />);
  //   range.setProps({ min: 0, max: 500 });

  //   expect(props.onChange).toHaveBeenCalledWith([0.01, 500]);
  // });

  // it('should only update bounds if they are out of range', () => {
  //   const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
  //   const range = mount(<Slider range {...props} />);
  //   range.setProps({ min: 0, max: 500, value: [0.01, 466] });

  //   expect(props.onChange).toHaveBeenCalledTimes(0);
  // });

  // // https://github.com/react-component/slider/pull/256
  // it('should handle mutli handle mouseEnter correctly', () => {
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

  // it('should keep pushable when not allowCross and setState', () => {
  //   class CustomizedRange extends React.Component {
  //     // eslint-disable-line
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         value: [20, 40],
  //       };
  //     }

  //     getSlider() {
  //       return this.refs.slider;
  //     }

  //     render() {
  //       return (
  //         <Slider range ref="slider" allowCross={false} value={this.state.value} pushable={10} />
  //       );
  //     }
  //   }
  //   const wrapper = mount(<CustomizedRange />);
  //   expect(wrapper.instance().getSlider().state.bounds[0]).toBe(20);
  //   expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  //   wrapper.setState({ value: [30, 40] });
  //   expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
  //   expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  //   wrapper.setState({ value: [35, 40] });
  //   expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
  //   expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  //   wrapper.setState({ value: [30, 30] });
  //   expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
  //   expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  // });

  // it('should render correctly when allowCross', () => {
  //   class CustomizedRange extends React.Component {
  //     // eslint-disable-line
  //     constructor(props) {
  //       super(props);
  //       this.state = {
  //         value: [20, 40],
  //       };
  //     }

  //     onChange = (value) => {
  //       this.setState({
  //         value,
  //       });
  //     };

  //     getSlider() {
  //       return this.refs.slider;
  //     }

  //     render() {
  //       return <Slider range ref="slider" onChange={this.onChange} value={this.state.value} />;
  //     }
  //   }
  //   const map = {};
  //   document.addEventListener = jest.fn().mockImplementation((event, cb) => {
  //     map[event] = cb;
  //   });

  //   const mockRect = (wrapper) => {
  //     wrapper.instance().getSlider().sliderRef.getBoundingClientRect = () => ({
  //       left: 0,
  //       width: 100,
  //     });
  //   };

  //   const container = document.createElement('div');
  //   document.body.appendChild(container);

  //   const wrapper = mount(<CustomizedRange />, { attachTo: container });
  //   mockRect(wrapper);

  //   expect(wrapper.instance().getSlider().state.bounds).toEqual([20, 40]);

  //   wrapper.find('.rc-slider').simulate('mouseDown', {
  //     button: 0,
  //     pageX: 0,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mousemove({
  //     type: 'mousemove',
  //     pageX: 60,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });

  //   expect(wrapper.instance().getSlider().state.bounds).toEqual([40, 60]);
  //   expect(wrapper.find('.rc-slider-handle-2').at(1).getDOMNode().className).toContain(
  //     'rc-slider-handle-dragging',
  //   );
  // });

  // it('should keep pushable with pushable s defalutValue when not allowCross and setState', () => {
  //   class CustomizedRange extends React.Component {
  //     // eslint-disable-line
  //     state = {
  //       value: [20, 40],
  //     };

  //     onChange = (value) => {
  //       this.setState({
  //         value,
  //       });
  //     };

  //     getSlider() {
  //       return this.slider;
  //     }

  //     saveSlider = (slider) => {
  //       this.slider = slider;
  //     };

  //     render() {
  //       return (
  //         <Slider
  //           range
  //           ref={this.saveSlider}
  //           allowCross={false}
  //           value={this.state.value}
  //           pushable
  //           onChange={this.onChange}
  //         />
  //       );
  //     }
  //   }
  //   const map = {};
  //   document.addEventListener = jest.fn().mockImplementation((event, cb) => {
  //     map[event] = cb;
  //   });

  //   const mockRect = (wrapper) => {
  //     wrapper.instance().getSlider().sliderRef.getBoundingClientRect = () => ({
  //       left: 0,
  //       width: 100,
  //     });
  //   };

  //   const container = document.createElement('div');
  //   document.body.appendChild(container);

  //   const wrapper = mount(<CustomizedRange />, { attachTo: container });
  //   mockRect(wrapper);

  //   expect(wrapper.instance().getSlider().state.bounds).toEqual([20, 40]);

  //   wrapper.find('.rc-slider').simulate('mouseDown', {
  //     button: 0,
  //     pageX: 0,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mousemove({
  //     type: 'mousemove',
  //     pageX: 30,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mouseup({
  //     type: 'mouseup',
  //     pageX: 30,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });

  //   expect(wrapper.instance().getSlider().state.bounds).toEqual([30, 40]);

  //   wrapper.find('.rc-slider').simulate('mouseDown', {
  //     button: 0,
  //     pageX: 0,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mousemove({
  //     type: 'mousemove',
  //     pageX: 50,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mouseup({
  //     type: 'mouseup',
  //     pageX: 50,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   expect(wrapper.instance().getSlider().state.bounds).toEqual([39, 40]);
  // });

  // it('track draggable', () => {
  //   class CustomizedRange extends React.Component {
  //     // eslint-disable-line
  //     state = {
  //       value: [0, 30],
  //     };

  //     onChange = (value) => {
  //       this.setState({
  //         value,
  //       });
  //     };

  //     getSlider() {
  //       return this.slider;
  //     }

  //     saveSlider = (slider) => {
  //       this.slider = slider;
  //     };

  //     render() {
  //       return (
  //         <Slider
  //           range
  //           ref={this.saveSlider}
  //           value={this.state.value}
  //           onChange={this.onChange}
  //           draggableTrack
  //         />
  //       );
  //     }
  //   }
  //   const map = {};
  //   document.addEventListener = jest.fn().mockImplementation((event, cb) => {
  //     map[event] = cb;
  //   });

  //   const mockRect = (wrapper) => {
  //     wrapper.instance().getSlider().sliderRef.getBoundingClientRect = () => ({
  //       left: 0,
  //       width: 100,
  //     });
  //   };

  //   const container = document.createElement('div');
  //   document.body.appendChild(container);

  //   const range = mount(<CustomizedRange />, { attachTo: container });
  //   mockRect(range);
  //   console.log(range.state().value);
  //   expect(range.state().value).toEqual([0, 30]);

  //   range.find('.rc-slider').simulate('mouseDown', {
  //     button: 0,
  //     pageX: 10,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   map.mousemove({
  //     type: 'mousemove',
  //     pageX: 30,
  //     pageY: 0,
  //     stopPropagation: () => {},
  //     preventDefault: () => {},
  //   });
  //   console.log(range.state().value);
  //   expect(range.state().value).toEqual([20, 50]);
  // });

  // it('sets aria-label on the handles', () => {
  //   const wrapper = mount(
  //     <Slider range ariaLabelGroupForHandles={['Some Label', 'Some other Label']} />,
  //   );
  //   expect(wrapper.find('.rc-slider-handle-1').at(1).prop('aria-label')).toEqual('Some Label');
  //   expect(wrapper.find('.rc-slider-handle-2').at(1).prop('aria-label')).toEqual(
  //     'Some other Label',
  //   );
  // });

  // it('sets aria-labelledby on the handles', () => {
  //   const wrapper = mount(
  //     <Slider range ariaLabelledByGroupForHandles={['some_id', 'some_other_id']} />,
  //   );
  //   expect(wrapper.find('.rc-slider-handle-1').at(1).prop('aria-labelledby')).toEqual('some_id');
  //   expect(wrapper.find('.rc-slider-handle-2').at(1).prop('aria-labelledby')).toEqual(
  //     'some_other_id',
  //   );
  // });

  // it('sets aria-valuetext on the handles', () => {
  //   const wrapper = mount(
  //     <Slider
  //       range
  //       min={0}
  //       max={5}
  //       defaultValue={[1, 3]}
  //       ariaValueTextFormatterGroupForHandles={[
  //         (value) => `${value} of something`,
  //         (value) => `${value} of something else`,
  //       ]}
  //     />,
  //   );
  //   expect(wrapper.find('.rc-slider-handle-1').at(1).prop('aria-valuetext')).toEqual(
  //     '1 of something',
  //   );
  //   expect(wrapper.find('.rc-slider-handle-2').at(1).prop('aria-valuetext')).toEqual(
  //     '3 of something else',
  //   );
  // });

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
