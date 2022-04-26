// Constructor Instances
import projectile from '../classes/Projectile.js';
import pointer from '../classes/pointer.js';
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import coefficient from '../classes/coefficient.js';
import increscent from '../classes/increscent.js';
import fps from '../classes/fps.js';
// Functions
import swingBonusRing from './motions/swingBonusRing.js';
import bringDownBaB from './motions/bringDownBaB.js';
import shootProjectiles from './motions/shootProjectiles.js';
import dropBonuses from './motions/dropBonuses.js';
import mergeBonuses from './motions/mergeBonuses.js';
import displayIncrescent from './motions/displayIncrescent.js';
import { isAnythingMoving, haveAllTheProjectilesLanded } from './helpers.js';
// Configs
import { C, CANVAS } from '../config.js';
// State
import state from '../state.js';

const draw = () => {
  const collidedBonuses = [...state.droppingBonuses, ...state.mergingBonuses];

  C.clearRect(0, 0, CANVAS.width, CANVAS.height);

  // prettier-ignore
  [fps, score, record, topBorder, bottomBorder, projectile, coefficient].forEach(item => item.draw());
  state.bricks.forEach(brick => brick.draw());
  state.bonuses.forEach(bonus => bonus.draw());
  if (state.isMouseInBorder && !isAnythingMoving()) pointer.draw();
  if (collidedBonuses.length) collidedBonuses.forEach(bonus => bonus.draw());
  if (state.isIncrescent) increscent.draw();

  // Motions
  if (state.counter % 3 === 0) swingBonusRing();
  if (state.isProjectileMoving) shootProjectiles();
  if (state.areBricksAndBonusesMoving) bringDownBaB();
  if (state.droppingBonuses.length) dropBonuses();
  if (haveAllTheProjectilesLanded() && state.mergingBonuses.length)
    mergeBonuses();
  if (state.isIncrescent) displayIncrescent();
};

export default draw;
