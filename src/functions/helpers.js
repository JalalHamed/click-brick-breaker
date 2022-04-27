// Constructor Instances
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
// Configs
import { SIZES, MIN_ANGLE, MAX_ANGLE, CANVAS } from '../config.js';
// State
import state from '../state.js';

export function calcGrid() {
  const { width, height, margin } = SIZES.brick;
  for (let i = 0; i < 6; i++) state.grid.row[i] = i * (width + margin);
  for (let i = 0; i < 9; i++) state.grid.column[i] = i * (height + margin);
}

export function isInBorder(y) {
  return (
    y > topBorder.pos.y + topBorder.height &&
    y < bottomBorder.pos.y - SIZES.projectile.radius
  );
}

export function getAngle(e) {
  let angle = Math.atan2(
    state.projectiles[0].pos.y - e.y,
    state.projectiles[0].pos.x - e.x
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

export function getFontSize() {
  const width = (CANVAS.width - 30) / 7; // brick's width
  const height = (CANVAS.height - getBorderMargin() * 2 - 40) / 9; // brick's height
  return width > height ? width / height : height / width;
}

export function isAnythingMoving() {
  if (
    state.isProjectileMoving ||
    state.areBricksAndBonusesMoving ||
    state.droppingBonuses.length ||
    state.mergingBonuses.length
  )
    return true;
  else return false;
}

export function haveAllTheProjectilesLanded() {
  if (
    state.projectiles.every(
      shotProjectile =>
        shotProjectile.velocity.x === 0 && shotProjectile.velocity.y === 0
    )
  )
    return true;
  else return false;
}
