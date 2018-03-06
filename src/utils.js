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
  return vertical ? e.clientY : e.pageX;
}

export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
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

// http://hammerjs.github.io/api/#directions
export const DIRECTION_NONE = 1;     // 00001
export const DIRECTION_LEFT = 2;     // 00010
export const DIRECTION_RIGHT = 4;    // 00100
export const DIRECTION_UP = 8;       // 01000
export const DIRECTION_DOWN = 16;    // 10000

/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
export function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }
  if (Math.abs(x) >= Math.abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }
  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

export function getTouchDirection(startTouches, touches) {
  const { clientX: x1, clientY: y1 } = startTouches[0];
  const { clientX: x2, clientY: y2 } = touches[0];
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  return getDirection(deltaX, deltaY);
}

export function isRightDirection(startTouches, touches, vertical) {
  const direction = getTouchDirection(startTouches, touches);
  if (vertical) {
    return direction === DIRECTION_UP || direction === DIRECTION_DOWN;
  }
  return direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT;
}
