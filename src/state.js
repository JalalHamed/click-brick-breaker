// Configs
import { SIZES } from './config.js';

const state = {
  isMouseInBorder: false,
  isProjectileMoving: false,
  isIncrescentVisible: false,
  areBricksAndBonusesMoving: true,

  grid: { row: [], column: [] },
  mouseCoords: {},

  bricks: [],
  bonuses: [],
  projectiles: [],
  droppingBonuses: [],
  mergingBonuses: [],

  innerWidth,
  counter: 0,
  mergingBonusesCount: 0,
  brickID: 1,
  bonusID: 1,
  projectileID: 1,
  bonusRingRadius: SIZES.projectile.radius,

  getLS(data) {
    const storage = JSON.parse(localStorage.getItem('cbb-state'));
    return storage && storage[data];
  },
  setLS(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('cbb-state')),
        ...data,
      })
    );
  },
};

export default state;
