const state = {
  isMouseInBorder: false,
  isFirstRound: true,

  projectile: {},
  mouseCoords: {},
  furthestBonus: {},

  bricks: [],
  bonuses: [],
  projectiles: [],

  grid: { row: [], column: [] },
  pieces: { bricks: [], bonuses: [], borders: [] },

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
