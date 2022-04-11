export const state = {
  isMouseInBorder: false,
  isBallMoving: false,
  bricks: [],
  bonuses: [],
  grid: [],
  shotBalls: [],
  mouseCoords: {},
  offset: 0,
  innerWidth: innerWidth,
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('cbb-state'));
  },
  setLocalStorage(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({ ...this.getLocalStorage(), ...data })
    );
  },
};
