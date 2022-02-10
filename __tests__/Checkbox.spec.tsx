import React from 'react';

import Checkbox from '../src';

import { render, fireEvent } from '@testing-library/react-native';

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
  it('Testing Checkbox renderization', () => {
    const { getByTestId } = render(CarouselComponent);
    expect(getByTestId('checkbox-button')).not.toBeNull();
  });
});
