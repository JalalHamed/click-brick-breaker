// Handlers
import handleMouseMove from './functions/handlers/handleMouseMove.js';
import handleResize from './functions/handlers/handleResize.js';
import handleClick from './functions/handlers/handleClick.js';
// Functions
import spawnBaB from './functions/spawns/spawnBaB.js';
import spawnProjectile from './functions/spawns/spawnProjectile.js';
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
  document.querySelector('.loading').style.display = 'none';
  [spawnProjectile, calcGrid, spawnBaB, animate].forEach(item => item());
};

addEventListener('load', init);
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
