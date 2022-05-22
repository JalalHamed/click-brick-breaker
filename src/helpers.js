// Objects
import topBorder from './classes/borders/topBorder.js';
import bottomBorder from './classes/borders/bottomBorder.js';
// Configs
import {
  SIZES,
  MIN_ANGLE,
  MAX_ANGLE,
  CANVAS,
  BRICKS_MARGIN,
  MIN_PARTICLE_RADIUS,
} from './config.js';
// State
import state from './state.js';

export function calcGrid() {
  const { width, height } = SIZES.brick;
  for (let i = 0; i < 6; i++) state.grid.row[i] = i * (width + BRICKS_MARGIN);
  for (let i = 0; i < 9; i++)
    state.grid.column[i] = i * (height + BRICKS_MARGIN);
}

export function isInBorder(y) {
  return (
    y > topBorder.pos.y + topBorder.height &&
    y < bottomBorder.pos.y - SIZES.projectile.radius
  );
}

export function getAngle(e) {
  let angle = Math.atan2(
    state.projectile.pos.y - e.y,
    state.projectile.pos.x - e.x
  );
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

export function getBorderHeight() {
  return CANVAS.width / 150;
}

export function getBrickHeight() {
  const { height, width } = CANVAS;
  return (height - getBorderMargin() * 2 - width / 150 - BRICKS_MARGIN * 8) / 9;
}

export function getBrickWidth() {
  return (CANVAS.width - BRICKS_MARGIN * 5) / 6;
}

export function getParticleRadius() {
  return MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200);
}

export function getFontSize() {
  const width = getBrickWidth();
  const height = getBrickHeight();
  return width > height ? width / height : height / width;
}

export function isAnythingMoving() {
  return [...state.projectiles, ...state.bonuses, ...state.bricks].some(
    item => item.mode !== 'stable'
  );
}

export function genRndUniqueGridRowIndex(usedIndexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 6);
  } while (usedIndexes.includes(index));
  return index;
}

export function getID(object) {
  switch (object) {
    case 'projectile':
      return state.ids.projectile++;
    case 'bonus':
      return state.ids.bonus++;
    case 'brick':
      return state.ids.brick++;
    default:
      return;
  }
}

export function getBrickPiecePos(index) {
  const { height, width } = SIZES.pieces.brick;
  if (index < 6) return { x: index * width, y: 0 };
  if (index < 12) return { x: (index - 6) * width, y: height };
  if (index < 18) return { x: (index - 12) * width, y: height * 2 };
  else return { x: (index - 18) * width, y: height * 3 };
}

export function decrease(variable, value, target) {
  if (variable - value > target) return variable - value;
  else return target;
}

export function increase(variable, value, target, fallback) {
  if (variable + value < target) return variable + value;
  else return fallback;
}

export function getBrickYPos(gridColumnIndex) {
  return topBorder.heightFromTop + state.grid.column[gridColumnIndex];
}

export function convertRGBtoArr(rgb) {
  return rgb.slice(4, -1).split(',').map(Number);
}

export function getColorsDifferences(color1, color2) {
  let differences = [];
  for (let i = 0; i < 3; i++)
    differences.push(
      Math.abs(convertRGBtoArr(color1)[i] - convertRGBtoArr(color2)[i])
    );
  return differences;
}

export function getBonusYPos(gridColumnIndex) {
  return (
    topBorder.heightFromTop +
    SIZES.brick.height / 2 +
    state.grid.column[gridColumnIndex]
  );
}

export function getXDist(obj1, obj2) {
  return Math.abs(obj1.pos.x - obj2.pos.x);
}

export function getBonusPiecePos(index) {
  const r = Math.floor(state.bonusRingRadius);
  const { width, height } = SIZES.pieces.bonus;
  if (index < 6) return { x: index * (r / 6) - width, y: index * (r / 6) - r };
  if (index < 12)
    return {
      x: r - (index - 6) * (r / 6),
      y: (index - 6) * (r / 6) - height / 2,
    };
  if (index < 18)
    return {
      x: -(index - 12) * (r / 6) - width / 2,
      y: r - (index - 12) * (r / 6),
    };
  else
    return {
      x: -r + ((index - 18) * r) / 6,
      y: -height / 2 - ((index - 18) * r) / 6,
    };
}

export function getStandardColor(color) {
  const rgbArr = convertRGBtoArr(color);
  if (rgbArr.length === 3) return color;
  else return `rgb(${rgbArr[0]}, ${rgbArr[1]}, ${rgbArr[2]})`;
}

export function getBorderRndYPos(highest) {
  const rndInt = SIZES.brick.height * 1.5 + Math.random() * 50;
  if (rndInt > highest.y) highest.y = rndInt;
  return rndInt;
}

export function getBorderRndXPos(highest) {
  const rndInt = Math.random() * 50 - 25;
  if (rndInt > highest.x) highest.x = rndInt;
  return rndInt;
}
