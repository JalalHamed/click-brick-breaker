// Classes
import BorderPiece from '../classes/pieces/BorderPiece.js';
// Configs
import { SIZES } from '../config.js';
// State
import state from '../state.js';

const rndInts = { x: [], y: [] };

const genRndYPos = () => {
  const rndInt = SIZES.brick.height * 1.5 + Math.random() * 50;
  rndInts.y.push(rndInt);
  return rndInt;
};

const genRndXPos = () => {
  const rndInt = Math.random() * 50 - 25;
  rndInts.x.push(rndInt);
  return rndInt;
};

const spawnBorderPieces = () => {
  // Top-border
  for (let i = 0; i < 40; i++) {
    state.pieces.borders.push(
      new BorderPiece({
        index: i,
        id: 'top',
        rndXPos: genRndXPos(),
        rndYPos: genRndYPos(),
      })
    );
  }

  state.pieces.borders.forEach(piece => {
    piece.calcXVelocity(Math.max(...rndInts.x));
    piece.calcYVelocity(Math.max(...rndInts.y));
  });

  rndInts.x = [];
  rndInts.y = [];

  // Bottom-border
  for (let i = 0; i < 40; i++)
    state.pieces.borders.push(
      new BorderPiece({
        index: i,
        id: 'bottom',
        rndXPos: genRndXPos(),
        rndYPos: genRndYPos(),
      })
    );

  state.pieces.borders
    .filter(piece => piece.props.id === 'bottom')
    .forEach(piece => {
      piece.calcXVelocity(Math.max(...rndInts.x));
      piece.calcYVelocity(Math.max(...rndInts.y));
    });

  rndInts.x = [];
  rndInts.y = [];
};

export default spawnBorderPieces;
