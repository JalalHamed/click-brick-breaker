// Classes
import BorderPiece from '../classes/pieces/BorderPiece.js';
// Functions
import { getBorderRndXPos, getBorderRndYPos } from '../helpers.js';
// State
import state from '../state.js';

const spawnBorderPieces = () => {
  const highest = { x: 0, y: 0 };

  for (let i = 0; i < 80; i++) {
    const index = i < 40 ? i : i - 40;
    const id = i < 40 ? 'top' : 'bottom';

    state.pieces.borders.push(
      new BorderPiece({
        index,
        id,
        rndXPos: getBorderRndXPos(highest),
        rndYPos: getBorderRndYPos(highest),
      })
    );
  }

  state.pieces.borders.forEach(piece => {
    piece.calcXVelocity(highest.x);
    piece.calcYVelocity(highest.y);
  });

  highest.x = highest.y = 0;
};

export default spawnBorderPieces;
