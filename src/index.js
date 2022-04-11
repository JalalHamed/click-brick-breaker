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

const animate = () => {
  const rAF = requestAnimationFrame(animate);
  state.offset--;
  [draw, render].forEach(item => item());
  if (state.isBallMoving) shoot();
};

const init = () => [animate, calcGrid, setRound].forEach(item => item());

addEventListener('load', () => handleGameFont(init));
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
