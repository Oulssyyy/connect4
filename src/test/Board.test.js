// Board.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../components/Board';

// Exemple de test simple
test('renders Board component', () => {
  const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // Exemple de tableau
  render(<Board board={board} handleClick={() => {}} />);
});

// Exemple de test avec interaction utilisateur
test('calls handleClick prop when a cell is clicked', () => {
  const handleClickMock = jest.fn();
  const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // Exemple de tableau
  const { container } = render(<Board board={board} handleClick={handleClickMock} />);

  // Simule un clic sur une cellule
  fireEvent.click(container.querySelector('.cell'));

  // Vérifie que la fonction handleClick a été appelée
  expect(handleClickMock).toHaveBeenCalledTimes(1);
});

// Ajoutez d'autres tests en fonction de la complexité de votre composant
