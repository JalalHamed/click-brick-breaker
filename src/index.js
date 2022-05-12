// Handlers
import handleLoad from './functions/handlers/handleLoad.js';
import handleMouseMove from './functions/handlers/handleMouseMove.js';
import handleResize from './functions/handlers/handleResize.js';
import handleClick from './functions/handlers/handleClick.js';
// Functions
import spawnBaB from './functions/motions/spawnBaB.js';
import genFirstProjectile from './functions/generators/genFirstProjectile.js';
import draw from './functions/draw.js';
import { calcGrid, increase } from './functions/helpers.js';
// State
import state from './state.js';

const animate = () => {
  state.counter = increase(state.counter, 1, 999, 0);
  draw();
  requestAnimationFrame(animate);
};

const init = () => {
  genFirstProjectile();
  calcGrid();
  if (!state.getLS('record') || state.getLS('record') === 1) {
    // show game introductions
    spawnBaB();
  }
  animate();
};

addEventListener('load', () => handleLoad(init));
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
