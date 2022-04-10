// Handlers
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
  draw();
  render();
  if (state.isBallMoving) shoot();
};

const init = () => {
  animate();
  calcGrid();
  setRound();
};

const handleGameFont = () => {
  const loadingEl = document.querySelector('.loading');
  WebFont.load({
    google: {
      families: ['Play:700'],
    },
    active() {
      loadingEl.style.display = 'none';
      init();
    },
    inactive() {
      loadingEl.style.display = 'none';
      alert(
        "Couldn't load game's fonts. Please make sure you have a sustainable internet connection and try again."
      );
      location.reload();
    },
  });
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
