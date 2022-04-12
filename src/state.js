export const state = {
  isMouseInBorder: false,
  isBallMoving: false,
  bricks: [],
  bonuses: [],
  grid: [],
  shotBalls: [],
  mouseCoords: {},
  offset: 0,
  innerWidth,
  getLS(data) {
    const storage = JSON.parse(localStorage.getItem('cbb-state'));
    return storage && storage[data];
  },
  setLS(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({ ...this.getLS(), ...data })
    );
  },
};
