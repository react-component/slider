import React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'warning';
import DefaultHandle from './Handle';
import Steps from './Steps';
import Marks from './Marks';
import * as utils from './utils';

function noop() {}

export default function createSlider(Component) {
  return class ComponentWrapper extends Component {
    static propTypes = {
      min: React.PropTypes.number,
      max: React.PropTypes.number,
      step: React.PropTypes.number,
      defaultValue: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.arrayOf(React.PropTypes.number),
      ]),
      value: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.arrayOf(React.PropTypes.number),
      ]),
      marks: React.PropTypes.object,
      included: React.PropTypes.bool,
      className: React.PropTypes.string,
      prefixCls: React.PropTypes.string,
      tooltipPrefixCls: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      children: React.PropTypes.any,
      onBeforeChange: React.PropTypes.func,
      onChange: React.PropTypes.func,
      onAfterChange: React.PropTypes.func,
      handle: React.PropTypes.element,
      tipTransitionName: React.PropTypes.string,
      tipFormatter: React.PropTypes.func,
      dots: React.PropTypes.bool,
      range: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.number,
      ]),
      vertical: React.PropTypes.bool,
      allowCross: React.PropTypes.bool,
      pushable: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.number,
      ]),
      style: React.PropTypes.object,
    };

    static defaultProps = {
      prefixCls: 'rc-slider',
      className: '',
      tipTransitionName: '',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      handle: <DefaultHandle />,
      onBeforeChange: noop,
      onChange: noop,
      onAfterChange: noop,
      tipFormatter: value => value,
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      allowCross: true,
      pushable: false,
    };

    constructor(props) {
      super(props);

      if (process.env.NODE_ENV !== 'production') {
        const { step, max, min } = props;
        warning(
          step && Math.floor(step) === step ? (max - min) % step === 0 : true,
          'Slider[max] - Slider[min] (%s) should be a multiple of Slider[step] (%s)',
          max - min,
          step
        );
      }
    }
    onMouseDown = (e) => {
      if (e.button !== 0) { return; }

      const isVertical = this.props.vertical;
      let position = utils.getMousePosition(isVertical, e);
      if (!utils.isEventFromHandle(e, this.handles)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.onStart(position);
      this.addDocumentEvents('mouse');
      utils.pauseEvent(e);
    }

    onTouchStart = (e) => {
      if (utils.isNotTouchEvent(e)) return;

      let position = utils.getTouchPosition(this.props.vertical, e);
      if (!utils.isEventFromHandle(e, this.handles)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(this.props.vertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.onStart(position);
      this.addDocumentEvents('touch');
      utils.pauseEvent(e);
    }

    addDocumentEvents(type) {
      if (type === 'touch') {
        // just work for Chrome iOS Safari and Android Browser
        this.onTouchMoveListener = addEventListener(document, 'touchmove', this.onTouchMove);
        this.onTouchUpListener =
          addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
      }
      if (type === 'mouse') {
        this.onMouseMoveListener = addEventListener(document, 'mousemove', this.onMouseMove);
        this.onMouseUpListener =
          addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
      }
    }

    onMouseMove = (e) => {
      const position = utils.getMousePosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }

    onTouchMove = (e) => {
      if (utils.isNotTouchEvent(e)) {
        this.end('touch');
        return;
      }

      const position = utils.getTouchPosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }

    getSliderLength() {
      const slider = this.refs.slider;
      if (!slider) {
        return 0;
      }

      return this.props.vertical ?
        slider.clientHeight : slider.clientWidth;
    }

    getSliderStart() {
      const slider = this.refs.slider;
      const rect = slider.getBoundingClientRect();

      return this.props.vertical ? rect.top : rect.left;
    }


    calcValue(offset) {
      const { vertical, min, max } = this.props;
      const ratio = Math.abs(offset / this.getSliderLength());
      const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    }

    calcValueByPos(position) {
      const pixelOffset = position - this.getSliderStart();
      const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    }

    end(type) {
      this.dragging = false;
      this.removeEvents(type);
      this.props.onAfterChange(this.getValue());
      this.setState({ handle: null });
    }

    removeEvents(type) {
      if (type === 'touch') {
        this.onTouchMoveListener.remove();
        this.onTouchUpListener.remove();
      }
      if (type === 'mouse') {
        this.onMouseMoveListener.remove();
        this.onMouseUpListener.remove();
      }
    }

    calcOffset(value) {
      const { min, max } = this.props;
      const ratio = (value - min) / (max - min);
      return ratio * 100;
    }

    saveHandle(index, handle) {
      if (!this.handles) {
        this.handles = {};
      }
      this.handles[index] = handle;
    }


    render() {
      const {
        prefixCls,
        className,
        marks,
        dots,
        step,
        included,
        disabled,
        vertical,
        min,
        max,
        children,
        style,
      } = this.props;
      const { tracks, handles } = super.render();

      const sliderClassName = classNames({
        [prefixCls]: true,
        [`${prefixCls}-with-marks`]: Object.keys(marks).length,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical,
        [className]: !!className,
      });
      return (
        <div
          ref="slider"
          className={sliderClassName}
          onTouchStart={disabled ? noop : this.onTouchStart}
          onMouseDown={disabled ? noop : this.onMouseDown}
          style={style}
        >
          <div className={`${prefixCls}-rail`} />
          {tracks}
          <Steps
            prefixCls={prefixCls}
            vertical={vertical}
            marks={marks}
            dots={dots}
            step={step}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
          />
          {handles}
          <Marks
            className={`${prefixCls}-mark`}
            vertical={vertical}
            marks={marks}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
          />
          {children}
        </div>
      );
    }
  };
}
