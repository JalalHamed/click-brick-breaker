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
  shotProjectiles: [],
  droppingBonuses: [],
  mergingBonuses: [],

  counter: 0,
  mergingBonusesCount: 0,
  brickID: 1,
  bonusID: 1,
  bonusRingRadius: SIZES.projectile.radius,
  innerWidth,

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
