import React from 'react';

import Checkbox from '../src';

import { render, fireEvent, act, waitFor } from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const setState = jest.fn();

jest.setTimeout(60000);

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
  it('Testing Checkbox renderization, --success case', () => {
    const { getByTestId } = render(CarouselComponent);

    expect(getByTestId('checkbox-button')).not.toBeNull();
  });
  it('Testing Checkbox content spin and rotation, --success case', async () => {
    const { getByTestId } = render(CarouselComponent);

    const checkboxSpin = getByTestId('spin-box');
    const checkboxTouchable = getByTestId('checkbox-button');

    expect(checkboxSpin.props.style.transform[0].scale).toBe(0);
    expect(checkboxSpin.props.style.transform[1].rotate).toBe('0deg');

    await act(async () => {
      await fireEvent.press(checkboxTouchable);
    });

    expect(checkboxSpin.props.style.transform[0].scale).toBeGreaterThan(0);
    expect(checkboxSpin.props.style.transform[1].rotate).not.toBe('0deg');
  });
  it('Testing if setState mock is being called, --success case', async () => {
    const { getByTestId } = render(CarouselComponent);
    jest.useFakeTimers();
    const checkboxTouchable = getByTestId('checkbox-button');

    await act(async () => {
      await fireEvent.press(checkboxTouchable);
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(setState).toHaveBeenCalled();
    });
  });

  it('Testing Checkbox  color change of hexcode to rgb, --success case', async () => {
    const { getByTestId } = await waitFor(() => render(CarouselComponent));
    jest.useFakeTimers();
    const checkboxTouchable = getByTestId('checkbox-button');

    expect(checkboxTouchable.props.style.borderColor).toBe('#ffc800');

    await act(async () => {
      await fireEvent.press(checkboxTouchable);
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(checkboxTouchable.props.style.borderColor).toContain('rgb');
    });
  });
});
