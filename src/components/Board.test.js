import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../components/Board';

test('renders Board component', () => {
  const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  render(<Board board={board} handleClick={() => {}} />);
});

test('calls handleClick prop when a cell is clicked', () => {
  const handleClickMock = jest.fn();
  const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const { container } = render(<Board board={board} handleClick={handleClickMock} />);

  fireEvent.click(container.querySelector('.cell'));

  expect(handleClickMock).toHaveBeenCalledTimes(1);
});
