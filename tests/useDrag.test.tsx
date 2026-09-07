import { act, createEvent, fireEvent, renderHook } from '@testing-library/react';
import type React from 'react';
import useDrag from '../src/hooks/useDrag';

describe('useDrag', () => {
  it('should ignore mouse movement when the container is no longer available', () => {
    const containerRef: React.RefObject<HTMLDivElement | null> = {
      current: document.createElement('div'),
    };
    const rawValues = [50];
    const triggerChange = jest.fn();
    const finishChange = jest.fn();

    const { result } = renderHook(() =>
      useDrag(
        containerRef,
        'ltr',
        rawValues,
        0,
        100,
        (value) => value,
        triggerChange,
        finishChange,
        (values, offset, valueIndex) => {
          const value = values[valueIndex] + Number(offset);
          return { value, values: [value] };
        },
        false,
        0,
        () => false,
      ),
    );

    const eventTarget = document.createElement('div');
    act(() => {
      result.current[4](
        {
          currentTarget: eventTarget,
          pageX: 0,
          pageY: 0,
          stopPropagation: jest.fn(),
        } as unknown as React.MouseEvent,
        0,
      );
    });

    containerRef.current = null;
    const mouseMove = createEvent.mouseMove(document);
    Object.defineProperties(mouseMove, {
      pageX: { value: 20 },
      pageY: { value: 0 },
    });

    expect(() => fireEvent(document, mouseMove)).not.toThrow();
    expect(triggerChange).not.toHaveBeenCalled();

    fireEvent.mouseUp(document);
    expect(finishChange).toHaveBeenCalledWith(false);
    expect(finishChange).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(-1);

    fireEvent.mouseUp(document);
    expect(finishChange).toHaveBeenCalledTimes(1);
  });
});
