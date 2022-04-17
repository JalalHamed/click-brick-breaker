// Classes
import Brick from '../classes/Brick.js';
import Bonus from '../classes/Bonus.js';
// Constructor Instances
import score from '../classes/statistics/score.js';
// Functions
import { genRndUniqueNum } from './helpers.js';
// Configs
import { CANVAS } from '../config.js';
// State
import { state } from '../state.js';

const setRound = () => {
  let gridRowIndexes = [];

  // Generate bricks
  const maxBricksCount =
    score.count < 25 ? Math.floor(Math.sqrt(score.count)) : 5; // Gradually increase the maximum number of bricks that can be generated (up to 5, need at least one free spot for the bonus ball)
  const bricksCount = Math.floor(Math.random() * maxBricksCount);

  for (let i = 0; i < maxBricksCount; i++) {
    let gridRowIndex = genRndUniqueNum(gridRowIndexes);
    gridRowIndexes.push(gridRowIndex);
    state.bricks.push(
      new Brick({ gridRowIndex, gridColumnIndex: 0, weight: score.count })
    );
  }

  // Generate bonus ball
  let gridRowIndex = genRndUniqueNum(gridRowIndexes);
  state.bonuses.push(
    new Bonus({ gridRowIndex, gridColumnIndex: 0, weight: score.count })
  );
};

export default setRound;
