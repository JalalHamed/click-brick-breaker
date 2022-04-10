// Classes
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import mainBall from '../classes/balls/mainBall.js';
// Configs
import { SIZES } from '../config.js';
// State
import { state } from '../state.js';

export function genRndUnusedIndex(indexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 7);
  } while (indexes.includes(index));
  return index;
}

export function calcGrid() {
  for (let i = 0; i < 7; i++)
    state.grid[i] = i * SIZES.brick.width + i * SIZES.brick.margin;
}

export function isInBorder(y) {
  return (
    y > topBorder.pos.y + topBorder.height &&
    y < bottomBorder.pos.y - mainBall.r
  );
}
