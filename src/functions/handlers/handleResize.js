// Constructor Instances
import record from '../../classes/statistics/record.js';
import score from '../../classes/statistics/score.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
import topBorder from '../../classes/borders/topBorder.js';
import coefficient from '../../classes/coefficient.js';
// Functions
import {
  calcGrid,
  getBorderHeight,
  getBorderMargin,
  getBrickHeight,
  getBrickWidth,
  getFontSize,
  getParticleRadius,
  isAnythingMoving,
} from '../helpers.js';
// Configs
import {
  CANVAS,
  SIZES,
  CANVAS_MIN_WIDTH,
  CANVAS_MIN_HEIGHT,
} from '../../config.js';
// State
import state from '../../state.js';

const handleResize = () => {
  if (
    !isAnythingMoving() &&
    innerWidth >= CANVAS_MIN_WIDTH &&
    innerHeight >= CANVAS_MIN_HEIGHT
  ) {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;

    SIZES.border.margin = getBorderMargin();
    SIZES.border.height = getBorderHeight();
    SIZES.projectile.radius = getParticleRadius();
    SIZES.brick.width = getBrickWidth();
    SIZES.brick.height = getBrickHeight();
    SIZES.bonus.radius = getParticleRadius();
    SIZES.bonus.ring.min = getParticleRadius();
    SIZES.bonus.ring.max = getParticleRadius() * 2.5;
    SIZES.BaB_bounce = getBrickHeight() / 2;
    SIZES.font = getFontSize();

    calcGrid();

    [bottomBorder, topBorder].forEach(item => item.repoSize()); // bottom border should repoSize before projectile
    state.projectiles.forEach(projectile => projectile.repoSize()); // projectiles should repoSize before coefficient
    [coefficient, record, score].forEach(item => item.repoSize());
    [...state.bricks, ...state.bonuses].forEach(item => item.repoSize());

    state.innerWidth = innerWidth;
  }
};

export default handleResize;
