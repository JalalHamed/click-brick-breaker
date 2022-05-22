// Classes
import BorderPiece from '../classes/pieces/BorderPiece.js';
// State
import state from '../state.js';

const spawnBorderPieces = () => {
  // Top-border
  for (let i = 0; i < 40; i++)
    state.pieces.borders.push(new BorderPiece({ index: i, location: 'top' }));

  // Bottom-border
  for (let i = 0; i < 40; i++)
    state.pieces.borders.push(
      new BorderPiece({ index: i, location: 'bottom' })
    );
};

export default spawnBorderPieces;
