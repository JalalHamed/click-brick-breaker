export const storage = {
  get() {
    return JSON.parse(localStorage.getItem('cbb-state'));
  },
  set(data) {
    localStorage.setItem(
      'cbb-state',
      JSON.stringify({ ...this.get(), ...data })
    );
  },
};

export const state = {
  isMouseInBorder: false,
  isBallMoving: false,
  bricks: storage.get()?.bricks || [],
  bonuses: storage.get()?.bonuses || [],
  grid: [],
  shotBalls: [],
  mouseCoords: {},
};
