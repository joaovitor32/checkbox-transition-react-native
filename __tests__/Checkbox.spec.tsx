import React from 'react';

import Checkbox from '../src';

import { render, fireEvent, act, waitFor } from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const setState = jest.fn();

const CarouselComponent = (
  <Checkbox
    value={true}
    checkedColor={'#ffc800'}
    uncheckedColor={'#800080'}
    checkHeight={170}
    checkWidth={180}
    onChange={setState}
    animationTime={150}
    disabled={false}
  />
);

describe('Checkbox component', () => {
  it('Testing if setState mock is being called, --success case', () => {
    const { getByTestId } = render(CarouselComponent);

    const checkboxTouchable = getByTestId('checkbox-button');

    act(() => {
      fireEvent.press(checkboxTouchable);
    });

    expect(setState).toHaveBeenCalled();
  });
  it('Testing Checkbox  color change of hexcode to rgb, --success case', async () => {
    const { getByTestId } = await waitFor(() => render(CarouselComponent));

    const checkboxTouchable = getByTestId('checkbox-button');

    await expect(checkboxTouchable.props.style.borderColor).toBe('#ffc800');

    await act(async () => {
      await fireEvent.press(checkboxTouchable);
    });

    await expect(checkboxTouchable.props.style.borderColor).toContain('rgb');
  });
  it('Testing Checkbox renderization, --success case', () => {
    const { getByTestId } = render(CarouselComponent);

    expect(getByTestId('checkbox-button')).not.toBeNull();
  });
});
