import React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import warning from 'rc-util/lib/warning';
import Steps from './Steps';
import Marks from './Marks';
import Handle, { HandleProps } from '../Handle';
import * as utils from '../utils';
import { GenericSliderProps, GenericSliderState, GenericSlider } from '../interface';

/* eslint-disable @typescript-eslint/no-explicit-any */

function noop() {}

export default function createSlider<
  Props extends GenericSliderProps,
  State extends GenericSliderState
>(Component: GenericSlider<Props, State>): React.ComponentClass<Props, State> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return class ComponentEnhancer extends Component {
    static displayName = `ComponentEnhancer(${Component.displayName})`;

    static defaultProps = {
      ...Component.defaultProps,
      prefixCls: 'rc-slider',
      className: '',
      min: 0,
      max: 100,
      step: 1,
      marks: {},
      handle(props: HandleProps & { index: number; dragging: boolean }) {
        const { index, ...restProps } = props;
        delete restProps.dragging;
        if (restProps.value === null) {
          return null;
        }

        return <Handle {...restProps} key={index} />;
      },
      onBeforeChange: noop,
      onChange: noop,
      onAfterChange: noop,
      included: true,
      disabled: false,
      dots: false,
      vertical: false,
      reverse: false,
      trackStyle: [{}],
      handleStyle: [{}],
      railStyle: {},
      dotStyle: {},
      activeDotStyle: {},
    };

    handlesRefs: any;

    sliderRef: HTMLDivElement;

    document: Document;

    dragOffset: number;

    prevMovedHandleIndex: number;

    onTouchMoveListener: any;

    onTouchUpListener: any;

    onMouseMoveListener: any;

    onMouseUpListener: any;

    inTrack: boolean;

    startBounds: number[];

    constructor(props: Props) {
      super(props);

      const { step, max, min } = props;
      const isPointDiffEven = isFinite(max - min) ? (max - min) % step === 0 : true; // eslint-disable-line
      warning(
        step && Math.floor(step) === step ? isPointDiffEven : true,
        `Slider[max] - Slider[min] (${max - min}) should be a multiple of Slider[step] (${step})`,
      );
      this.handlesRefs = {};
    }

    componentDidMount() {
      // Snapshot testing cannot handle refs, so be sure to null-check this.
      this.document = this.sliderRef && this.sliderRef.ownerDocument;

      const { autoFocus, disabled } = this.props;
      if (autoFocus && !disabled) {
        this.focus();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount();
      this.removeDocumentEvents();
    }

    onDown = (e, position) => {
      let p = position;
      const { draggableTrack, vertical: isVertical } = this.props;
      const { bounds } = this.state;

      const value = this.positionGetValue(p) || [];

      const inPoint = utils.isEventFromHandle(e, this.handlesRefs);
      this.inTrack =
        draggableTrack &&
        !inPoint &&
        !value
          .map((n, i) => {
            const v = !i ? n >= bounds[i] : true;
            return i === value.length - 1 ? n <= bounds[i] : v;
          })
          .some((c) => !c);

      const handlePosition = utils.getHandleCenterPosition(isVertical, e.target);

      if (this.inTrack) {
        this.dragOffset = p;
        this.startBounds = [...bounds];
      } else {
        if (!inPoint) {
          this.dragOffset = 0;
        } else {
          this.dragOffset = p - handlePosition;
          p = handlePosition;
        }
        this.onStart(p);
      }
    };

    onMouseDown = (e: any) => {
      if (e.button !== 0) {
        return;
      }

      this.removeDocumentEvents();
      const isVertical = this.props.vertical;
      const position = utils.getMousePosition(isVertical, e);
      this.onDown(e, position);
      this.addDocumentMouseEvents();
    };

    onTouchStart = (e: any) => {
      if (utils.isNotTouchEvent(e)) return;
      const isVertical = this.props.vertical;
      const position = utils.getTouchPosition(isVertical, e);
      this.onDown(e, position);
      this.addDocumentTouchEvents();
      utils.pauseEvent(e);
    };

    onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      const { onFocus, vertical } = this.props;
      if (utils.isEventFromHandle(e, this.handlesRefs) && !this.inTrack) {
        const handlePosition = utils.getHandleCenterPosition(vertical, e.target);
        this.dragOffset = 0;
        this.onStart(handlePosition);
        utils.pauseEvent(e);
        if (onFocus) {
          onFocus(e);
        }
      }
    };

    onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      const { onBlur } = this.props;
      if (!this.inTrack) {
        this.onEnd();
      }

      if (onBlur) {
        onBlur(e);
      }
    };

    onMouseUp = () => {
      if (this.handlesRefs[this.prevMovedHandleIndex]) {
        this.handlesRefs[this.prevMovedHandleIndex].clickFocus();
      }
    };

    onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!this.sliderRef) {
        this.onEnd();
        return;
      }
      const position = utils.getMousePosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset, this.inTrack, this.startBounds);
    };

    onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      if (utils.isNotTouchEvent(e) || !this.sliderRef) {
        this.onEnd();
        return;
      }

      const position = utils.getTouchPosition(this.props.vertical, e);
      this.onMove(e, position - this.dragOffset, this.inTrack, this.startBounds);
    };

    onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (this.sliderRef && utils.isEventFromHandle(e as any, this.handlesRefs)) {
        this.onKeyboard(e);
      }
    };

    onClickMarkLabel = (e: React.MouseEvent<HTMLDivElement>, value: any) => {
      e.stopPropagation();
      this.onChange({ value });
      // eslint-disable-next-line react/no-unused-state
      this.setState({ value }, () => this.onEnd(true));
    };

    getSliderStart() {
      const slider = this.sliderRef;
      const { vertical, reverse } = this.props;
      const rect = slider.getBoundingClientRect();
      if (vertical) {
        return reverse ? rect.bottom : rect.top;
      }
      return window.pageXOffset + (reverse ? rect.right : rect.left);
    }

    getSliderLength() {
      const slider = this.sliderRef;
      if (!slider) {
        return 0;
      }

      const coords = slider.getBoundingClientRect();
      return this.props.vertical ? coords.height : coords.width;
    }

    addDocumentTouchEvents() {
      // just work for Chrome iOS Safari and Android Browser
      this.onTouchMoveListener = addEventListener(this.document, 'touchmove', this.onTouchMove);
      this.onTouchUpListener = addEventListener(this.document, 'touchend', this.onEnd);
    }

    addDocumentMouseEvents() {
      this.onMouseMoveListener = addEventListener(this.document, 'mousemove', this.onMouseMove);
      this.onMouseUpListener = addEventListener(this.document, 'mouseup', this.onEnd);
    }

    removeDocumentEvents() {
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      this.onTouchMoveListener && this.onTouchMoveListener.remove();
      this.onTouchUpListener && this.onTouchUpListener.remove();

      this.onMouseMoveListener && this.onMouseMoveListener.remove();
      this.onMouseUpListener && this.onMouseUpListener.remove();
      /* eslint-enable no-unused-expressions */
    }

    focus() {
      if (this.props.disabled) {
        return;
      }
      this.handlesRefs[0]?.focus();
    }

    blur() {
      if (this.props.disabled) {
        return;
      }
      Object.keys(this.handlesRefs).forEach((key) => {
        this.handlesRefs[key]?.blur?.();
      });
    }

    calcValue(offset: number) {
      const { vertical, min, max } = this.props;
      const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
      const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
      return value;
    }

    calcValueByPos(position: number) {
      const sign = this.props.reverse ? -1 : +1;
      const pixelOffset = sign * (position - this.getSliderStart());
      const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
      return nextValue;
    }

    calcOffset(value: number) {
      const { min, max } = this.props;
      const ratio = (value - min) / (max - min);
      return Math.max(0, ratio * 100);
    }

    saveSlider = (slider: HTMLDivElement) => {
      this.sliderRef = slider;
    };

    saveHandle(index: number, handle: any) {
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
        reverse,
        min,
        max,
        children,
        maximumTrackStyle,
        style,
        railStyle,
        dotStyle,
        activeDotStyle,
      } = this.props;
      const { tracks, handles } = super.render() as any;

      const sliderClassName = classNames(prefixCls, {
        [`${prefixCls}-with-marks`]: Object.keys(marks).length,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-vertical`]: vertical,
        [className]: className,
      });
      return (
        <div
          ref={this.saveSlider}
          className={sliderClassName}
          onTouchStart={disabled ? noop : this.onTouchStart}
          onMouseDown={disabled ? noop : this.onMouseDown}
          onMouseUp={disabled ? noop : this.onMouseUp}
          onKeyDown={disabled ? noop : this.onKeyDown}
          onFocus={disabled ? noop : this.onFocus}
          onBlur={disabled ? noop : this.onBlur}
          style={style}
        >
          <div
            className={`${prefixCls}-rail`}
            style={{
              ...maximumTrackStyle,
              ...railStyle,
            }}
          />
          {tracks}
          <Steps
            prefixCls={prefixCls}
            vertical={vertical}
            reverse={reverse}
            marks={marks}
            dots={dots}
            step={step}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
            dotStyle={dotStyle}
            activeDotStyle={activeDotStyle}
          />
          {handles}
          <Marks
            className={`${prefixCls}-mark`}
            onClickLabel={disabled ? noop : this.onClickMarkLabel}
            vertical={vertical}
            marks={marks}
            included={included}
            lowerBound={this.getLowerBound()}
            upperBound={this.getUpperBound()}
            max={max}
            min={min}
            reverse={reverse}
          />
          {children}
        </div>
      );
    }
  };
}
