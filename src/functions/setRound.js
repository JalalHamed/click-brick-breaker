// Classes
import Brick from '../classes/brick.js';
import Bonus from '../classes/bonus.js';
// Constructor Instances
import score from '../classes/statistics/score.js';
// Configs
import { genRndUnusedIndex } from './helpers.js';
// State
import { state } from '../state.js';

const setRound = () => {
  let indexes = [];

  // Generate bricks
  const maxBricksCount =
    score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the bonus ball)
  const bricksCount = Math.floor(Math.random() * maxBricksCount) + 1;

  for (let i = 0; i < bricksCount; i++) {
    let index = genRndUnusedIndex(indexes);
    indexes.push(index);
    state.bricks.push(new Brick({ index }));
  }

  // Generate bonus ball
  let index = genRndUnusedIndex(indexes);
  state.bonuses.push(new Bonus({ index }));
};

export default setRound;
