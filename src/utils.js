import { findDOMNode } from 'react-dom';
import keyCode from 'rc-util/lib/KeyCode';

export function isEventFromHandle(e, handles) {
  return Object.keys(handles).some(
    key => e.target === findDOMNode(handles[key])
  );
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

    case keyCode.END:
      return (value, props) => props.max;
    case keyCode.HOME:
      return (value, props) => props.min;
    case keyCode.PAGE_UP:
      return (value, props) => value + props.step * 2;
    case keyCode.PAGE_DOWN:
      return (value, props) => value - props.step * 2;

    default:
      return undefined;
  }
}

// from https://github.com/adambisek/string-pixel-width/blob/master/src/widthsMap.js
const FONT_WIDTHS = {
  // width in pixels for 100px.
  arial: {
    0: 56,
    1: 56,
    2: 56,
    3: 56,
    4: 56,
    5: 56,
    6: 56,
    7: 56,
    8: 56,
    9: 56,
    ' ': 28,
    '!': 28,
    '\\': 35,
    '#': 56,
    $: 56,
    '%': 89,
    '&': 67,
    "'": 19,
    '(': 33,
    ')': 33,
    '*': 39,
    '+': 58,
    ',': 28,
    '-': 33,
    '.': 28,
    '/': 28,
    ':': 28,
    ';': 28,
    '<': 58,
    '=': 58,
    '>': 58,
    '?': 56,
    '@': 102,
    A: 67,
    B: 67,
    C: 72,
    D: 72,
    E: 67,
    F: 61,
    G: 78,
    H: 72,
    I: 28,
    J: 50,
    K: 67,
    L: 56,
    M: 83,
    N: 72,
    O: 78,
    P: 67,
    Q: 78,
    R: 72,
    S: 67,
    T: 61,
    U: 72,
    V: 67,
    W: 94,
    X: 67,
    Y: 67,
    Z: 61,
    '[': 28,
    ']': 28,
    '^': 47,
    _: 56,
    '`': 33,
    a: 56,
    b: 56,
    c: 50,
    d: 56,
    e: 56,
    f: 28,
    g: 56,
    h: 56,
    i: 22,
    j: 22,
    k: 50,
    l: 22,
    m: 83,
    n: 56,
    o: 56,
    p: 56,
    q: 56,
    r: 33,
    s: 50,
    t: 28,
    u: 56,
    v: 50,
    w: 72,
    x: 50,
    y: 50,
    z: 50,
    '{': 33,
    '|': 26,
    '}': 33,
    '~': 58,
  },
};

export function getWidthOfText(text, fontSize) {
  const BASE_FONT_SIZE = 100;
  const textToCheck = typeof text !== 'string' ? text.props.children : text;
  return textToCheck.split('').reduce((totalWidth, letter) => {
    // widthsMap has width of letters in pixels for 100px
    const widthForThisLetter =
      FONT_WIDTHS.arial[letter] * (fontSize / BASE_FONT_SIZE);

    if (isNaN(widthForThisLetter)) {
      return totalWidth + 5;
    }
    return totalWidth + widthForThisLetter;
  }, 0).toFixed(3);
}
