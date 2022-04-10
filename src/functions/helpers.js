// Configs
import { SIZES } from '../config.js';
// State
import { state } from '../storage.js';

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
