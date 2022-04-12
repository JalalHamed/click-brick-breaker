// Classes
import Brick from '../classes/Brick.js';
import Bonus from '../classes/Bonus.js';
// Constructor Instances
import score from '../classes/statistics/score.js';
// Functions
import { genRndUnusedIndex } from './helpers.js';
// Configs
import { CANVAS } from '../config.js';
// State
import { state } from '../state.js';

const setRound = () => {
  let indexes = [];

  if (!state.getLS('record')) {
    console.log('First time EVER playing the game.');
    // state.setLS({ mainBall: CANVAS.width / 2, record: 1, score: 1 });
  }

  if (!state.getLS('bricks')?.length && !state.getLS('bonuses')?.length) {
    // Generate bricks
    const maxBricksCount =
      score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the bonus ball)
    const bricksCount = Math.floor(Math.random() * maxBricksCount) + 1;

    for (let i = 0; i < bricksCount; i++) {
      let index = genRndUnusedIndex(indexes);
      indexes.push(index);
      state.bricks.push(new Brick({ index, weight: score.count }));
    }

    // Generate bonus ball
    let index = genRndUnusedIndex(indexes);
    state.bonuses.push(new Bonus({ index, weight: score.count }));

    state.setLS({
      bricks: [{ index: state.bricks[0].index, weight: score.count }],
      bonuses: [state.bonuses[0].index],
    });
  } else {
    state.getLS('bricks').forEach(brick => {
      state.bricks.push(
        new Brick({ index: brick.index, weight: brick.weight })
      );
    });
    state.getLS('bonuses').forEach(bonus => {
      state.bonuses.push(new Bonus({ index: bonus }));
    });
  }
};

export default setRound;
