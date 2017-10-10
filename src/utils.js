import { findDOMNode } from 'react-dom';
import keyCode from 'rc-util/lib/KeyCode';

export function isEventFromHandle(e, handles) {
  return Object.keys(handles)
    .some(key => e.target === findDOMNode(handles[key]));
}

export function isValueOutOfRange(value, { min, max }) {
  return value < min || value > max;
}

export function isNotTouchEvent(e) {
  return e.touches.length > 1 ||
    (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

export function getClosestPoint(val, { marks, step, min }) {
  const points = Object.keys(marks).map(parseFloat);
  if (step !== null) {
    const closestStep =
            Math.round((val - min) / step) * step + min;
    points.push(closestStep);
  }
  const diffs = points.map(point => Math.abs(val - point));
  return points[diffs.indexOf(Math.min(...diffs))];
}

export function getPrecision(step) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

export function getMousePosition(vertical, e) {
  return vertical ? e.clientY : e.clientX;
}

export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].clientX;
}

export function getHandleCenterPosition(vertical, handle) {
  const coords = handle.getBoundingClientRect();
  return vertical ?
    coords.top + (coords.height * 0.5) :
    coords.left + (coords.width * 0.5);
}

export function ensureValueInRange(val, { max, min }) {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

export function ensureValuePrecision(val, props) {
  const { step } = props;
  const closestPoint = getClosestPoint(val, props);
  return step === null ? closestPoint :
    parseFloat(closestPoint.toFixed(getPrecision(step)));
}

export function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

export function getKeyboardValueMutator(e) {
  switch (e.keyCode) {
    case keyCode.UP:
    case keyCode.RIGHT:
      return (value, props) => value + props.step;

    case keyCode.DOWN:
    case keyCode.LEFT:
      return (value, props) => value - props.step;

    case keyCode.END: return (value, props) => props.max;
    case keyCode.HOME: return (value, props) => props.min;
    case keyCode.PAGE_UP: return (value, props) => value + props.step * 2;
    case keyCode.PAGE_DOWN: return (value, props) => value - props.step * 2;

    default: return undefined;
  }
}
