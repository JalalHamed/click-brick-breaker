const state = {
  isMouseInBorder: false,
  isBallMoving: false,
  isSettingsNewRound: false,
  bricks: [],
  bonuses: [],
  grid: { row: [], column: [] },
  shotBalls: [],
  mouseCoords: {},
  counter: 0,
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
