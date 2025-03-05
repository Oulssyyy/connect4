import React from 'react';
import './Cell.scss'
import player1 from '../assets/gettyimages-165727231-612x612.jpg'
import player2 from '../assets/sticker-poker-jeton-jaune.jpg'

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick} data-testid="cell">
        {
            value !==0 && <img className='jeton' alt='jeton' src={value===1 ? player1 : player2} />
        }
    </div>
  );
};

export default Cell;
