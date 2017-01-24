import { findDOMNode } from 'react-dom';

export function isEventFromHandle(e, handles) {
  return Object.keys(handles)
    .some(key => e.target === findDOMNode(handles[key]));
}

export function getClosestPoint(val, props) {
  const { marks, step, min } = props;
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

export function isValueOutOfRange(value, { min, max }) {
  return value < min || value > max;
}

export function getMousePosition(vertical, e) {
  return vertical ? e.clientY : e.pageX;
}

export function getHandleCenterPosition(vertical, handle) {
  const coords = handle.getBoundingClientRect();
  return vertical ?
    coords.top + (coords.height * 0.5) :
    coords.left + (coords.width * 0.5);
}

export function pauseEvent(e) {
  e.stopPropagation();
  e.preventDefault();
}

export function isNotTouchEvent(e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
}

export function getTouchPosition(vertical, e) {
  return vertical ? e.touches[0].clientY : e.touches[0].pageX;
}
