// Classes
import Ball from './classes/balls/Ball.js';
import Bonus from './classes/bonus.js';
import Brick from './classes/brick.js';
import Pointer from './classes/pointer.js';
// Object Instances
import mainBall from './classes/balls/mainBall.js';
import topBorder from './classes/borders/topBorder.js';
import bottomBorder from './classes/borders/bottomBorder.js';
import record from './classes/statistics/record.js';
import score from './classes/statistics/score.js';
import coefficient from './classes/coefficient.js';
import fps from './classes/fps.js';
// Functions
import shoot from './functions/shoot.js';
import repoSize from './functions/repoSize.js';
import { genRndUnusedIndex, calcGrid } from './functions/helpers.js';
// Storage
import { storage, state } from './state.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, SIZES, CANVAS, C } from './config.js';

let offset = 0;
let pointer;

const setIsBallMoving = status => {
  if (typeof status === 'boolean') state.isBallMoving = status;
  else
    throw Error(
      "Wrong type, only boolean is acceptable. (here's why typescript exists)"
    );
};

const setBalls = array => {
  state.shotBalls = array;
};

const setRound = () => {
  let indexes = [];
  // Generate bricks
  const maxBricksCount =
    score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the bonus ball)
  const bricksCount = Math.floor(Math.random() * maxBricksCount) + 1;

  for (let i = 0; i < bricksCount; i++) {
    let index = genRndUnusedIndex(indexes);
    indexes.push(index);
    state.bricks.push(new Brick({ index }));
  }

  // Generate bonus ball
  let index = genRndUnusedIndex(indexes);
  state.bonuses.push(new Bonus({ index }));
};

const isInBorder = y => {
  return (
    y > topBorder.pos.y + topBorder.height &&
    y < bottomBorder.pos.y - mainBall.r
  );
};

const handleMouseMove = e => {
  if (!state.isBallMoving) {
    if (isInBorder(e.y)) {
      pointer = new Pointer({ e });
      CANVAS.style.cursor = 'pointer';
      if (!state.isMouseInBorder) state.isMouseInBorder = true;
    } else {
      CANVAS.style.cursor = 'auto';
      if (state.isMouseInBorder) state.isMouseInBorder = false;
    }
  }
};

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
  if (state.isBallMoving) shoot({ setBalls, setIsBallMoving });
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

const handleResize = () => {
  if (!state.isBallMoving) repoSize();
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
