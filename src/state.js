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
  getLS() {
    return JSON.parse(localStorage.getItem('cbb-state'));
  },
  setLS(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({ ...this.getLS(), ...data })
    );
  },
};
