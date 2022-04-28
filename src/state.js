const state = {
  isMouseInBorder: false,

  projectile: {},
  isMoving: {
    BaB: true, // Bricks and Bonuses
    projectiles: false,
    increscent: false,
  },
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
