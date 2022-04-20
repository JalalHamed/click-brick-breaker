// Handlers
import handleLoad from './handlers/handleLoad.js';
import handleMouseMove from './handlers/handleMouseMove.js';
import handleResize from './handlers/handleResize.js';
import handleClick from './handlers/handleClick.js';
// Functions
import shoot from './functions/shoot.js';
import generateBricksAndBonus from './functions/generateBricksAndBonus.js';
import draw from './functions/draw.js';
import setNewRound from './functions/setNewRound.js';
import { calcGrid } from './functions/helpers.js';
// State
import state from './state.js';

const animate = () => {
  const rAF = requestAnimationFrame(animate);
  state.counter++;
  draw();
  if (state.isBallMoving) shoot();
  if (state.isSettingNewRound) setNewRound();
};

const init = () =>
  [calcGrid, generateBricksAndBonus, animate].forEach(item => item());

addEventListener('load', () => handleLoad(init));
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
