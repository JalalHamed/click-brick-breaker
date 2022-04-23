// Handlers
import handleLoad from './functions/handlers/handleLoad.js';
import handleMouseMove from './functions/handlers/handleMouseMove.js';
import handleResize from './functions/handlers/handleResize.js';
import handleClick from './functions/handlers/handleClick.js';
// Functions
import bringDownBricksAndBonuses from './functions/animations/bringDownBricksAndBonuses.js';
import generateBricksAndBonus from './functions/generateBricksAndBonus.js';
import shootBalls from './functions/animations/shootBalls.js';
import draw from './functions/draw.js';
import { calcGrid } from './functions/helpers.js';
// State
import state from './state.js';

const animate = () => {
  const rAF = requestAnimationFrame(animate);
  state.counter++;
  draw();
  if (state.isBallMoving) shootBalls();
  if (state.areBricksAndBonusesMoving) bringDownBricksAndBonuses();
};

const init = () => {
  [calcGrid, generateBricksAndBonus, animate].forEach(item => item());
};

addEventListener('load', () => handleLoad(init));
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
