// Classes
import Ball from './classes/balls/Ball.js';
import Bonus from './classes/bonus.js';
import Brick from './classes/brick.js';
// Object Instances
import mainBall from './classes/balls/mainBall.js';
import pointer from './classes/pointer.js';
import topBorder from './classes/borders/topBorder.js';
import bottomBorder from './classes/borders/bottomBorder.js';
import record from './classes/statistics/record.js';
import score from './classes/statistics/score.js';
import coefficient from './classes/coefficient.js';
import fps from './classes/fps.js';
// Handlers
import handleMouseMove from './handlers/handleMouseMove.js';
import handleResize from './handlers/handleResize.js';
// Functions
import shoot from './functions/shoot.js';
import setRound from './functions/setRound.js';
import {
  genRndUnusedIndex,
  calcGrid,
  isInBorder,
} from './functions/helpers.js';
// State
import { storage, state } from './state.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, SIZES, CANVAS, C } from './config.js';

let offset = 0;

const handleClick = e => {
  if (isInBorder(e.y) && !state.isBallMoving) {
    state.isBallMoving = true;
    state.isMouseInBorder = false;
    CANVAS.style.cursor = 'auto';
    let angle = Math.atan2(e.y - mainBall.pos.y, e.x - mainBall.pos.x);
    if (angle > -MIN_ANGLE) angle = -MIN_ANGLE;
    if (angle < -MAX_ANGLE) angle = -MAX_ANGLE;
    const velocity = { x: Math.cos(angle) * 15, y: Math.sin(angle) * 15 };
    mainBall.velocity = velocity;
    state.shotBalls.push(mainBall);
    for (let i = 1; i < coefficient.count; i++) {
      state.shotBalls.push(new Ball({ velocity, delay: i }));
    }
  }
};

const draw = () => {
  C.clearRect(0, 0, CANVAS.width, CANVAS.height);
  fps.draw();
  score.draw();
  record.draw();
  topBorder.draw();
  bottomBorder.draw();
  mainBall.draw();
  coefficient.draw();
  state.bricks.forEach(brick => brick.draw());
  state.bonuses.forEach(bonus => bonus.draw());
  if (state.isMouseInBorder && !state.isBallMoving) pointer.draw(offset);
};

const render = () => {
  state.bonuses.forEach(bonus => bonus.render());
};

const animate = () => {
  const rAF = requestAnimationFrame(animate);
  offset--;
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
