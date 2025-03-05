import React from 'react';
import { render, fireEvent, screen, queryByText, getByTestId  } from '@testing-library/react';
import App from '../App';

const { getAllByTestId, getByText } = screen;

test('handles player click and resets the game', () => {
  const { getAllByTestId } = screen;
  const { getByText, getByTestId } = render(<App />);
  expect(getByText('Puissance 4')).toBeInTheDocument();
  fireEvent.click(getAllByTestId('cell')[0]);
  const recommencerButton = queryByText(document.body, 'Recommencer');
  if (recommencerButton) {
    fireEvent.click(recommencerButton);
  }

});

test('handles winning scenario', () => {
  render(<App />);
  
  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[1]);
  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[1]);
  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[1]);
  fireEvent.click(getAllByTestId('cell')[0]);

  expect(getByText('Gagnant : joueur 1')).toBeInTheDocument();
});

test('handles draw scenario', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('slider'), { target: { value: 0 } });

  for(let i = 0; i < 3; i++) {
    fireEvent.click(getAllByTestId('cell')[0]);
    fireEvent.click(getAllByTestId('cell')[1]);
    fireEvent.click(getAllByTestId('cell')[2]);
    fireEvent.click(getAllByTestId('cell')[3]);
    fireEvent.click(getAllByTestId('cell')[4]);
    fireEvent.click(getAllByTestId('cell')[5]);
    fireEvent.click(getAllByTestId('cell')[6]);
  }
  for(let i = 0; i < 2; i++) {
    fireEvent.click(getAllByTestId('cell')[1]);
    fireEvent.click(getAllByTestId('cell')[2]);
    fireEvent.click(getAllByTestId('cell')[3]);
    fireEvent.click(getAllByTestId('cell')[4]);
    fireEvent.click(getAllByTestId('cell')[5]);
    fireEvent.click(getAllByTestId('cell')[6]);
  }
  fireEvent.click(getAllByTestId('cell')[6]);
  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[5]);
  fireEvent.click(getAllByTestId('cell')[4]);
  fireEvent.click(getAllByTestId('cell')[3]);
  fireEvent.click(getAllByTestId('cell')[2]);
  fireEvent.click(getAllByTestId('cell')[1]);
  fireEvent.click(getAllByTestId('cell')[0]);

  expect(getByText('Egalité')).toBeInTheDocument();
});

test('handles reverse column scenario', () => {
  render(<App />);
  
  fireEvent.change(screen.getByRole('slider'), { target: { value: 100 } });

  fireEvent.click(getAllByTestId('cell')[0]);

  expect(getByText(/Reverse sur la colonne/)).toBeInTheDocument();
});


test('changes reversibility percentage', () => {
  const { getByRole, getByText } = screen;
  render(<App />);

  fireEvent.change(getByRole('slider'), { target: { value: 50 } });

  expect(getByText('Pourcentage de chance que le reverse s\'applique : 50%')).toBeInTheDocument();
});

test('alternates player turns', () => {
  render(<App />);

  fireEvent.click(getAllByTestId('cell')[0]);
  fireEvent.click(getAllByTestId('cell')[1]);
  fireEvent.click(getAllByTestId('cell')[2]);

  expect(getByText('Au tour du joueur 2')).toBeInTheDocument();
});

test('handles click on a full column', () => {
  render(<App />);

  for (let i = 0; i < 6; i++) {
    fireEvent.click(getAllByTestId('cell')[0]);
  }
  fireEvent.click(getAllByTestId('cell')[0]);

  expect(getByText('Au tour du joueur 1')).toBeInTheDocument();
});

test('does not display messages during the game', () => {
  render(<App />);
  expect(queryByText(document.body,'Gagnant : joueur 1')).toBeNull();
  expect(queryByText(document.body,'Egalité')).toBeNull();
});

test('handles extreme reversibility percentages', () => {
  const { getByRole, getByText } = screen;
  render(<App />);

  fireEvent.change(getByRole('slider'), { target: { value: 0 } });
  fireEvent.click(getAllByTestId('cell')[0]);
  expect(queryByText(document.body,/Reverse sur la colonne/)).toBeNull();

  fireEvent.change(getByRole('slider'), { target: { value: 100 } });
  fireEvent.click(getAllByTestId('cell')[0]);
  expect(getByText(/Reverse sur la colonne/)).toBeInTheDocument();
});
