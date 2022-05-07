// Constructor Instances
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
// Configs
import {
  SIZES,
  MIN_ANGLE,
  MAX_ANGLE,
  CANVAS,
  BRICKS_MARGIN,
  MIN_PARTICLE_RADIUS,
} from '../config.js';
// State
import state from '../state.js';

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
  if (
    state.isMoving.projectiles ||
    state.isMoving.BaB ||
    state.bonuses.some(bonus => bonus.mode === 'drop' || bonus.mode === 'merge')
  )
    return true;
  else return false;
}

export function haveAllTheProjectilesLanded() {
  if (
    state.projectiles.every(
      projectile =>
        projectile.velocity.x === 0 &&
        projectile.velocity.y === 0 &&
        projectile.mode !== 'merge'
    )
  )
    return true;
  else return false;
}

export function genRndUniqueGridRowIndex(usedIndexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 6);
  } while (usedIndexes.includes(index));
  return index;
}
