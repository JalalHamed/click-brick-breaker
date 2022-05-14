// Configs
import { BRICKS_AND_BONUSES_BOUNCE_SIZE as B_A_B_B_S } from '../config.js';
import { convertRGBtoArr, getColorsDifferences } from '../helpers.js';
// State
import state from '../state.js';

let isGoingDown = true;
let hasCalculatedSteps = false;
let steps;

const loweringBricksAndBonuses = () => {
  const velocity = 7;
  const bricksAndBonuses = [...state.bricks, ...state.bonuses].filter(
    item => item.mode === 'lower'
  );

  bricksAndBonuses.forEach(item => {
    if (!hasCalculatedSteps && item.constructor.name === 'Brick') {
      steps = Math.ceil((item.pos.nextY + B_A_B_B_S - item.pos.y) / velocity);
      hasCalculatedSteps = true;
    }

    if (item.pos.y < item.pos.nextY + B_A_B_B_S && isGoingDown) {
      item.pos.y += velocity;
      // Update color
      if (item.constructor.name === 'Brick') {
        const currColor = convertRGBtoArr(item.color);
        console.log(currColor);
        const differences = getColorsDifferences(
          item.color,
          item.updateColor()
        );
        item.color = `rgb(255, ${currColor[1] + differences[1] / steps}, ${
          currColor[2] + differences[2] / steps
        })`;
      }
    } else if (item.pos.y - velocity > item.pos.nextY) {
      item.pos.y -= velocity;
      isGoingDown = false;
    } else {
      if (item.constructor.name === 'Brick') item.color = item.updateColor();
      isGoingDown = true;
      hasCalculatedSteps = false;
      steps = null;
      bricksAndBonuses.forEach(item => (item.mode = 'stable'));
    }
  });

  if (bricksAndBonuses.every(item => item.mode === 'stable'))
    bricksAndBonuses.forEach(item => item.updateYPos());
};

export default loweringBricksAndBonuses;
