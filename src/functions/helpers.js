// Classes
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import mainBall from '../classes/balls/mainBall.js';
// Configs
import { SIZES, MIN_ANGLE, MAX_ANGLE, CANVAS } from '../config.js';
// State
import { state } from '../state.js';

export function genRndUniqueNum(numbers) {
  let number;
  do {
    number = Math.floor(Math.random() * 6);
  } while (numbers.includes(number));
  return number;
}

export function render() {
  state.bonuses.forEach(bonus => bonus.render());
}

export function calcGrid() {
  const { width, height, margin } = SIZES.brick;
  for (let i = 0; i < 6; i++) state.grid.row[i] = i * (width + margin);
  for (let i = 0; i < 8; i++) state.grid.column[i] = i * (height + margin);
  console.log(state.grid);
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
  if (width / height >= 0.8) return height / (6 * (width / height));
  else return (height - width) / 2;
}

export function getFontSize() {
  const width = (CANVAS.width - 30) / 7; // brick's width
  const height = (CANVAS.height - getBorderMargin() * 2 - 40) / 9; // brick's height
  return width > height ? width / height : height / width;
}
