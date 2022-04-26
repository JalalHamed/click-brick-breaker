// Classes
import Projectile from './classes/Projectile.js';
// Handlers
import handleLoad from './functions/handlers/handleLoad.js';
import handleMouseMove from './functions/handlers/handleMouseMove.js';
import handleResize from './functions/handlers/handleResize.js';
import handleClick from './functions/handlers/handleClick.js';
// Functions
import genBaB from './functions/generators/genBaB.js';
import draw from './functions/draw.js';
import { calcGrid } from './functions/helpers.js';
// State
import state from './state.js';

const animate = () => {
  state.counter++;
  draw();
  requestAnimationFrame(animate);
};

const init = () => {
  state.projectiles.push(new Projectile());
  [calcGrid, genBaB, animate].forEach(item => item());
};

addEventListener('load', () => handleLoad(init));
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
