// Classes
import Brick from '../../classes/Brick.js';
import Bonus from '../../classes/Bonus.js';
// Constructor Instances
import score from '../../classes/statistics/score.js';
// Functions
import { genRndUniqueGridRowIndex } from '../helpers.js';
// State
import state from '../../state.js';

const genBricksAndBonus = () => {
  let gridRowIndexes = [];

  // Generate brick(s)
  const maxBricksCount =
    score.count > 3
      ? score.count < 25
        ? Math.floor(Math.sqrt(score.count))
        : 5
      : 2; // Gradually increase the maximum number of bricks that can be generated (up to 5, need at least one free spot for the bonus) starting at 2.
  const bricksCount = Math.floor(Math.random() * maxBricksCount) + 1;

  for (let i = 0; i < bricksCount; i++) {
    const gridRowIndex = genRndUniqueGridRowIndex(gridRowIndexes);
    gridRowIndexes.push(gridRowIndex);
    state.bricks.push(new Brick({ gridRowIndex, status: 'zoom-in' }));
  }

  // Generate bonus
  state.bonuses.push(
    new Bonus({
      gridRowIndex: genRndUniqueGridRowIndex(gridRowIndexes),
      status: 'zoom-in',
    })
  );
};

export default genBricksAndBonus;
