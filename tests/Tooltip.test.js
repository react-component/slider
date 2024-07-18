import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Slider from '../src/Slider';

describe('Slider.Tooltip', () => {
  it('internal activeHandleRender support', () => {
    const { container } = render(
      <Slider
        range
        defaultValue={[20, 50]}
        activeHandleRender={(node, info) =>
          React.cloneElement(node, {
            'data-test': 'bamboo',
            'data-value': info.value,
          })
        }
      />,
    );

    // Click second
    fireEvent.mouseEnter(container.querySelectorAll('.rc-slider-handle')[1]);
    expect(container.querySelector('.rc-slider-handle[data-test]')).toBeTruthy();
    expect(
      container.querySelector('.rc-slider-handle[data-value]').getAttribute('data-value'),
    ).toBe('50');
  });
});
