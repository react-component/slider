import React, { PropTypes } from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'warning';
import Handle from './Handle';
import Steps from './Steps';
import Marks from './Marks';
import * as utils from './utils';
import * as d3Scale from 'd3-scale';

function noop() {}

export default function createSlider(Component) {
  return class ComponentEnhancer extends Component {
    static displayName = `ComponentEnhancer(${Component.displayName})`;
    static propTypes = {
      ...Component.propTypes,
      scale: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      min: PropTypes.number,
      max: PropTypes.number,
      step: PropTypes.number,
      marks: PropTypes.object,
      createHandleMark: PropTypes.func,
      included: PropTypes.bool,
      className: PropTypes.string,
      prefixCls: PropTypes.string,
      disabled: PropTypes.bool,
      children: PropTypes.any,
      onBeforeChange: PropTypes.func,
      onChange: PropTypes.func,
      onAfterChange: PropTypes.func,
      handle: PropTypes.func,
      dots: PropTypes.bool,
      vertical: PropTypes.bool,
      style: PropTypes.object,
    };

    static defaultProps = {
      ...Component.defaultProps,
      prefixCls: 'rc-slider',
      className: '',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      handle({ index, ...restProps }) {
        return <Handle {...restProps} key={index} />;
      },
      onBeforeChange: noop,
      onChange: noop,
      onAfterChange: noop,
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
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
      if (!utils.isEventFromHandle(e, this.handlesRefs)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.onStart(position);
      this.addDocumentMouseEvents();
      utils.pauseEvent(e);
    }

    onTouchStart = (e) => {
      if (utils.isNotTouchEvent(e)) return;

      const isVertical = this.props.vertical;
      let position = utils.getTouchPosition(isVertical, e);
      if (!utils.isEventFromHandle(e, this.handlesRefs)) {
        this.dragOffset = 0;
      } else {
        const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);
        this.dragOffset = position - handlePosition;
        position = handlePosition;
      }
      this.onStart(position);
      this.addDocumentTouchEvents();
      utils.pauseEvent(e);
    }

    addDocumentTouchEvents() {
      // just work for Chrome iOS Safari and Android Browser
      this.onTouchMoveListener = addEventListener(document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = addEventListener(document, 'touchend', this.onEnd);
    }

    addDocumentMouseEvents() {
      this.onMouseMoveListener = addEventListener(document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = addEventListener(document, 'mouseup', this.onEnd);
    }

    removeDocumentEvents() {
      /* eslint-disable no-unused-expressions */
      this.onTouchMoveListener && this.onTouchMoveListener.remove();
      this.onTouchUpListener && this.onTouchUpListener.remove();

      this.onMouseMoveListener && this.onMouseMoveListener.remove();
      this.onMouseUpListener && this.onMouseUpListener.remove();
      /* eslint-enable no-unused-expressions */
    }

    onMouseMove = (e) => {
      const position = utils.getMousePosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }

    onTouchMove = (e) => {
      if (utils.isNotTouchEvent(e)) {
        this.onEnd();
        return;
      }

      const position = utils.getTouchPosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset);
    }

    getSliderStart() {
      const slider = this.sliderRef;
      const rect = slider.getBoundingClientRect();

      return this.props.vertical ? rect.top : rect.left;
    }

    getSliderLength() {
      const slider = this.sliderRef;
      if (!slider) {
        return 0;
      }

      return this.props.vertical ?
        slider.clientHeight : slider.clientWidth;
    }

    createScale() {
      const { vertical, min, max } = this.props;
      // The slider length isn't defined at the beginning, so we return the given value.
      // To solve this, we would use componentDidMount at the correct moment
      let domain = [0, this.getSliderLength() || 100];
      const range = [min, max];
      if (vertical) {
        domain = domain.reverse();
      }
      const scale = this.props.scale;
      let _scale = this.createLinearScale; // default
      if (typeof scale === 'function') {
        _scale = scale;
      }
      if (typeof scale === 'string') {
        switch (scale) {
        case 'linear':
          _scale = this.createLinearScale;
          break;
        case 'pow':
          _scale = this.createPowScale;
          break;
        default:
          _scale = this.createLinearScale;
        }
      }
      return _scale(domain, range);
    }

    createLinearScale(domain, range) {
      return d3Scale.scaleLinear()
        .domain(domain)
        .range(range)
        .clamp(true);
    }

    createPowScale(domain, range) {
      const scale = d3Scale.scalePow()
        .exponent(2)
        .domain(domain)
        .range(range)
        .clamp(true);
      return scale;

    }

    calcValue(offset) {
      const scale = this.createScale();
      const value = scale(offset);
      return value;
    }

    calcValueByPos(position) {
      const pixelOffset = position - this.getSliderStart();
      const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    }

    calcOffsetPercentage(value) {
      const scale = this.createScale().invert;
      const ratio = (scale(value) - scale(this.props.min)) / (scale(this.props.max) - scale(this.props.min));
      let offset = ratio * 100;
      return offset;
    }

    saveSlider = (slider) => {
      this.sliderRef = slider;
    }

    saveHandle(index, handle) {
      if (!this.handlesRefs) {
        this.handlesRefs = {};
      }
      this.handlesRefs[index] = handle;
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
        [className]: className,
      });
      // Range uses bounds, Slider uses value
      const values = this.state.bounds || [].concat(this.state.value);
      let handleMarks = {};
      if (this.props.createHandleMark) {
        handleMarks = Object.assign(...values.map((v, i) => {
          return {
            [v]: this.props.createHandleMark(v, i)
          };
        }));
      }
      const marksWithHandleMarks = {...marks, ... handleMarks};
      return (
        <div
          ref={this.saveSlider}
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
            marks={marksWithHandleMarks}
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
            marks={marksWithHandleMarks}
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
