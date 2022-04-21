// Configs
import { SIZES } from './config.js';

const state = {
  isMouseInBorder: false,
  isBallMoving: false,
  isSettingNewRound: false,
  bricks: [],
  bonuses: [],
  grid: { row: [], column: [] },
  shotBalls: [],
  mouseCoords: {},
  counter: 0,
  bonusRing: SIZES.ball.radius,
  brickID: 1,
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
