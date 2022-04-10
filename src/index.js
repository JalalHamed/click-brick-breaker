// Handlers
import handleGameFont from './handlers/handleGameFont.js';
import handleMouseMove from './handlers/handleMouseMove.js';
import handleResize from './handlers/handleResize.js';
import handleClick from './handlers/handleClick.js';
// Functions
import shoot from './functions/shoot.js';
import setRound from './functions/setRound.js';
import draw from './functions/draw.js';
import render from './functions/render.js';
import { calcGrid } from './functions/helpers.js';
// State
import { state } from './state.js';

export const init = () => {
  animate();
  calcGrid();
  setRound();
};

const animate = () => {
  const rAF = requestAnimationFrame(animate);
  state.offset--;
  draw();
  render();
  if (state.isBallMoving) shoot();
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
