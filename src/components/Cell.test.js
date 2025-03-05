import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from '../components/Cell';

test('renders Cell component', () => {
  render(<Cell value={0} onClick={() => {}} />);
});

test('calls onClick prop when clicked', () => {
  const onClickMock = jest.fn();
  const { container } = render(<Cell value={0} onClick={onClickMock} />);
  fireEvent.click(container.firstChild);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
