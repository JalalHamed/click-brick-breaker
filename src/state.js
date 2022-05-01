// Constructor Instances
import score from './classes/statistics/score.js';

const state = {
  isMouseInBorder: false,
  isMoving: {
    BaB: true, // Bricks and Bonuses
    projectiles: false,
    increscent: false,
  },

  projectile: {},
  grid: { row: [], column: [] },
  mouseCoords: {},

  bricks: [],
  bonuses: [],
  projectiles: [],
  mergingProjectiles: [],
  droppingBonuses: [],
  mergingBonuses: [],

  innerWidth,
  counter: 0,
  mergingBonusesCount: 0,
  ids: {
    projectile: 1,
    bonus: 1,
    brick: 1,
  },

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
