import BorderPiece from '../classes/pieces/BorderPiece.js';

const spawnBorders = () => {
  // Top-border
  for (let i = 0; i < 40; i++) new BorderPiece({ index: i });

  // Bottom-border
  for (let i = 0; i < 40; i++) new BorderPiece({ index: i });
};
