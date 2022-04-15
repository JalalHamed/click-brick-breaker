// Classes
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import mainBall from '../classes/balls/mainBall.js';
// Configs
import { SIZES, MIN_ANGLE, MAX_ANGLE, CANVAS } from '../config.js';
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

export function getAngle(e) {
  let angle = Math.atan2(mainBall.pos.y - e.y, mainBall.pos.x - e.x);
  // Prevent angle from being lower than 10 degrees
  if (angle < MIN_ANGLE) angle = MIN_ANGLE;
  // Prevent angle from surpassing 170 degrees
  if (angle > MAX_ANGLE) angle = MAX_ANGLE;
  return angle;
}

export function getBorderMargin() {
  const { height, width } = CANVAS;
  if (width / height >= 0.8) return height / (5 * (width / height));
  else return (height - width) / 2;
}

export function getFontSize() {
  const { width, height } = SIZES.brick;
  return width > height ? width / height : height / width;
}
