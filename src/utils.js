import { findDOMNode } from 'react-dom';
import keyCode from 'rc-util/lib/KeyCode';

const MAX_PRECISION_FOR_OPERATIONS = 15;

export function isEventFromHandle(e, handles) {
  try {
    return Object.keys(handles)
      .some(key => e.target === findDOMNode(handles[key]));
  } catch(error) {
    return false;
  }
}

export function isValueOutOfRange(value, { min, max }) {
  return value < min || value > max;
}

export function isNotTouchEvent(e) {
  return e.touches.length > 1 ||
    (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

export function getPrecision(step) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

function withPrecision(value, precision) {
  return parseFloat(value.toFixed(precision));
}

// safeDivideBy and safeMultiply: if either term is a float,
// then round the result to the combined precision

function safeDivideBy(a, b) {
  const precision = Math.min(
    getPrecision(a) + getPrecision(b),
    MAX_PRECISION_FOR_OPERATIONS
  );
  return precision === 0 ? a / b : withPrecision(a / b, precision);
}

function safeMultiply(a, b) {
  const precision = Math.min(
    getPrecision(a) + getPrecision(b),
    MAX_PRECISION_FOR_OPERATIONS
  );
  return withPrecision(a * b, precision);
}

export function getClosestPoint(val, { marks, step, min, max }) {
  const points = Object.keys(marks).map(parseFloat);
  if (step !== null) {
    const maxSteps = Math.floor(safeDivideBy(max - min, step));
    const steps = Math.min(safeDivideBy(val - min, step), maxSteps);
    const closestStep =
            safeMultiply(Math.round(steps), step) + min;
    points.push(closestStep);
  }
  const diffs = points.map(point => Math.abs(val - point));
  return points[diffs.indexOf(Math.min(...diffs))];
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
    window.pageXOffset + coords.left + (coords.width * 0.5);
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
  const closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0; // eslint-disable-line
  return step === null ? closestPoint :
    withPrecision(closestPoint, getPrecision(step));
}

export function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

export function calculateNextValue(func, value, props) {
  const operations = {
    increase: (a, b) => a + b,
    decrease: (a, b) => a - b,
  };

  const indexToGet = operations[func](Object.keys(props.marks).indexOf(JSON.stringify(value)), 1);
  const keyToGet = Object.keys(props.marks)[indexToGet];

  if (props.step) {
    return operations[func](value, props.step);
  } else if (!!Object.keys(props.marks).length && !!props.marks[keyToGet]) {
    return props.marks[keyToGet];
  }
  return value;
}

export function getKeyboardValueMutator(e, vertical, reverse) {
  const increase = 'increase';
  const decrease = 'decrease';
  let  method = increase;
  switch (e.keyCode) {
    case keyCode.UP:
      method = vertical && reverse ? decrease: increase; break;
    case keyCode.RIGHT:
      method = !vertical && reverse ? decrease: increase; break;
    case keyCode.DOWN:
      method = vertical && reverse ? increase: decrease; break;
    case keyCode.LEFT:
      method = !vertical && reverse ? increase: decrease; break;

    case keyCode.END: return (value, props) => props.max;
    case keyCode.HOME: return (value, props) => props.min;
    case keyCode.PAGE_UP: return (value, props) => value + props.step * 2;
    case keyCode.PAGE_DOWN: return (value, props) => value - props.step * 2;

    default: return undefined;
  }
  return (value, props) => calculateNextValue(method, value, props);
}
