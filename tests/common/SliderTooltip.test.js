import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SliderTooltip from '../../src/common/SliderTooltip';

it('should keepAlign by calling forcePopupAlign', async () => {
  let ref;
  mount(
    <SliderTooltip
      title="30"
      visible
      ref={node => {
        ref = node;
      }}
    >
      <span>aaaa</span>
    </SliderTooltip>,
  );
  ref.forcePopupAlign = jest.fn();
  await act(async () => {
    await new Promise(res => setTimeout(res, 200));
  });
  expect(ref.forcePopupAlign).toHaveBeenCalled();
});
