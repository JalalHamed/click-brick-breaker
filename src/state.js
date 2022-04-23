// Configs
import { SIZES } from './config.js';

const state = {
  isMouseInBorder: false,
  isProjectileMoving: false,
  isBonusMoving: false,
  areBricksAndBonusesMoving: true,
  grid: { row: [], column: [] },
  mouseCoords: {},
  bricks: [],
  bonuses: [],
  shotProjectiles: [],
  collidedBonuses: [],
  counter: 0,
  bonusRing: SIZES.projectile.radius,
  brickID: 1,
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
