// Constructor Instances
import Projectile from '../../classes/Projectile.js';
import record from '../../classes/statistics/record.js';
import score from '../../classes/statistics/score.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
import topBorder from '../../classes/borders/topBorder.js';
import coefficient from '../../classes/coefficient.js';
// Functions
import {
  calcGrid,
  getBorderMargin,
  getFontSize,
  isAnythingMoving,
} from '../helpers.js';
// Configs
import {
  CANVAS,
  SIZES,
  MIN_PARTICLE_RADIUS,
  CANVAS_MIN_WIDTH,
  CANVAS_MIN_HEIGHT,
  BRICKS_MARGIN,
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

    SIZES.projectile.radius =
      MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.bonus.radius = MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.bonus.ring.min = MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.bonus.ring.max =
      MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200) * 3;
    SIZES.border.margin = getBorderMargin();
    SIZES.border.height = CANVAS.width / 150;
    SIZES.brick.width = (CANVAS.width - BRICKS_MARGIN * 5) / 6;
    SIZES.brick.height =
      (CANVAS.height - getBorderMargin() * 2 - SIZES.border.height - 40) / 9;
    SIZES.font = getFontSize();
    calcGrid();

    [bottomBorder, topBorder].forEach(item => item.repoSize()); // bottom border should repoSize before projectile
    state.projectile.repoSize(); // projectile should repoSize before coefficient
    // prettier-ignore
    state.projectiles.filter(item => item.id !== state.projectile.id).forEach(projectile => projectile.repoSize());
    [coefficient, record, score].forEach(item => item.repoSize());
    [...state.bricks, ...state.bonuses].forEach(item => item.repoSize());

    state.innerWidth = innerWidth;
  }
};

export default handleResize;
