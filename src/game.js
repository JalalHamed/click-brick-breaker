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
import shoot from './utils/shoot.js';
// Helpers
import { findIndex, storage } from './utils/helpers.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, SIZES, CANVAS, C } from './utils/config.js';

let isMouseInBorder = false;
let isBallMoving = false;
let bricks = storage.get()?.bricks || [];
let bonuses = storage.get()?.bonuses || [];
let grid = [];
let balls = [];
let indexes = [];
let counter = 0;
let offset = 0;
let pointer;

const setIsBallMoving = status => {
  if (typeof status === 'boolean') isBallMoving = status;
  else
    throw Error(
      "Wrong type, only boolean is acceptable. (here's why typescript exists)"
    );
};

const setBalls = array => {
  balls = array;
};

class Game {
  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  setRound() {
    // Generate bricks
    const maxBricks = score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the bonus mainBall)
    const bricksCount = Math.floor(Math.random() * maxBricks) + 1;

    for (let i = 0; i < bricksCount; i++) {
      let index = findIndex(indexes);
      indexes.push(index);
      bricks.push(new Brick({ grid, index, topBorder, score }));
    }

    // Generate bonus mainBall
    let index = findIndex(indexes);
    bonuses.push(new Bonus({ grid, index }));
  }

  handleMouseMove(e) {
    if (!isBallMoving) {
      if (this.isInBorder(e.y)) {
        pointer = new Pointer({ e });
        CANVAS.style.cursor = 'pointer';
        if (!isMouseInBorder) isMouseInBorder = true;
      } else {
        CANVAS.style.cursor = 'auto';
        if (isMouseInBorder) isMouseInBorder = false;
      }
    }
  }

  handleClick(e) {
    if (this.isInBorder(e.y) && !isBallMoving) {
      isBallMoving = true;
      isMouseInBorder = false;
      CANVAS.style.cursor = 'auto';
      let angle = Math.atan2(e.y - mainBall.pos.y, e.x - mainBall.pos.x);
      if (angle > -MIN_ANGLE) angle = -MIN_ANGLE;
      if (angle < -MAX_ANGLE) angle = -MAX_ANGLE;
      const velocity = { x: Math.cos(angle) * 15, y: Math.sin(angle) * 15 };
      mainBall.velocity = velocity;
      balls.push(mainBall); // shotBalls*
      for (let i = 1; i < coefficient.count; i++) {
        balls.push(new Ball({ velocity, delay: i }));
      }
    }
  }

  draw() {
    C.clearRect(0, 0, CANVAS.width, CANVAS.height);
    fps.draw();
    score.draw();
    record.draw();
    topBorder.draw();
    bottomBorder.draw();
    mainBall.draw();
    coefficient.draw();
    bricks.forEach(brick => brick.draw());
    bonuses.forEach(bonus => bonus.draw());
    if (isMouseInBorder && !isBallMoving) pointer.draw(offset);
  }

  render() {
    bonuses.forEach(bonus => bonus.render());
  }

  repoSize() /* re-position and re-size */ {
    SIZES.mainBall.radius = Math.round((CANVAS.width / 100) * 1.3);
    SIZES.border.margin = CANVAS.height / 5;
    SIZES.border.height = CANVAS.width / 125;
    SIZES.brick.margin = CANVAS.width / 120;
    SIZES.brick.width = (CANVAS.width - SIZES.brick.margin * 6) / 7;
    SIZES.brick.height =
      (CANVAS.height -
        (SIZES.border.margin * 2 + SIZES.border.height * 2) -
        SIZES.brick.margin * 8) /
      9;
    this.calcGrid();

    [bottomBorder, topBorder, coefficient, mainBall].forEach(C => C.repoSize()); // "C" for "class"
    record.repoSize({ status: 'record' });
    score.repoSize({ status: 'score' });
    bricks.forEach(brick => brick.repoSize({ grid }));
    bonuses.forEach(bonus => bonus.repoSize({ grid }));
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - mainBall.r
    );
  }

  calcGrid() {
    for (let i = 0; i < 7; i++)
      grid[i] = i * SIZES.brick.width + i * SIZES.brick.margin;
  }

  animate() {
    const rAF = requestAnimationFrame(this.animate);
    offset--;
    this.draw();
    this.render();
    if (isBallMoving)
      shoot({ mainBall, balls, setBalls, coefficient, setIsBallMoving });
  }

  init() {
    this.animate();
    this.calcGrid();
    this.setRound();
    CANVAS.addEventListener('mousemove', game.handleMouseMove);
    CANVAS.addEventListener('click', game.handleClick);
  }
}

const game = new Game();

const handleGameFont = () => {
  WebFont.load({
    google: {
      families: ['Play:700'],
    },
    active() {
      document.querySelector('.pre-load').style.display = 'none';
      game.init();
    },
    inactive() {
      document.querySelector('.pre-load').style.display = 'none';
      alert(
        "Couldn't load game's fonts. Please make sure you have a sustainable internet connection and try again."
      );
      location.reload();
    },
  });
};

const handleResize = () => {
  CANVAS.width = innerWidth;
  CANVAS.height = innerHeight;
  if (!isBallMoving) game.repoSize();
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
