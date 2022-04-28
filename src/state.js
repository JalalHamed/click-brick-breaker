const state = {
  isMouseInBorder: false,

  motions: {
    projectiles: false,
    bricks: true,
    bonuses: true,
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
  brickID: 1,
  bonusID: 1,
  projectileID: 1,

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
