// Configs
import { SIZES } from '../config.js';

export function genRndUnusedIndex(indexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 7);
  } while (indexes.includes(index));
  return index;
}

export function calcGrid(grid) {
  for (let i = 0; i < 7; i++)
    grid[i] = i * SIZES.brick.width + i * SIZES.brick.margin;
}
