const state = {
  isMouseInBorder: false,
  isBringingDown: { bonuses: false, bricks: false },
  isMoving: { projectiles: false, increscent: false },

  projectile: {},
  grid: { row: [], column: [] },
  mouseCoords: {},

  bricks: [],
  bonuses: [],
  projectiles: [],
  pieces: [],

  innerWidth,
  counter: 0,
  ids: { projectile: 1, bonus: 1, brick: 1, piece: 1 },
  mergingBonusesCount: 0,
  bonusRingRadius: 0,
  gridRowIndexes: [],

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
