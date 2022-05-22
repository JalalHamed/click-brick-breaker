// Classes
import BorderPiece from '../classes/pieces/BorderPiece.js';
// Configs
import { SIZES } from '../config.js';
// State
import state from '../state.js';

let rndInts = [];

const genRndInt = () => {
  const rndInt = SIZES.brick.height * 1.5 + Math.random() * 50;
  rndInts.push(rndInt);
  return rndInt;
};

const spawnBorderPieces = () => {
  // Top-border
  for (let i = 0; i < 40; i++) {
    state.pieces.borders.push(
      new BorderPiece({ index: i, location: 'top', rndInt: genRndInt() })
    );
  }

  state.pieces.borders.forEach(piece =>
    piece.calcYVelocity(Math.max(...rndInts))
  );
  rndInts = [];

  // Bottom-border
  for (let i = 0; i < 40; i++)
    state.pieces.borders.push(
      new BorderPiece({ index: i, location: 'bottom', rndInt: genRndInt() })
    );

  state.pieces.borders
    .filter(piece => piece.props.location === 'bottom')
    .forEach(piece => piece.calcYVelocity(Math.max(...rndInts)));
  rndInts = [];
};

export default spawnBorderPieces;
