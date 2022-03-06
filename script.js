import Ball from './modules/classes/ball.js';
import Border from './modules/classes/border.js';
import Brick from './modules/classes/brick.js';
import Pointer from './modules/classes/pointer.js';
import Coefficient from './modules/classes/coefficient.js';
import Record from './modules/classes/record.js';
import Score from './modules/classes/score.js';
import animate from './modules/animate.js';

const colors = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: 'rgb(31, 115, 242, 0.5)',
};

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

// LocalStorage
const state = JSON.parse(localStorage.getItem('cbb-state'));

let outOfBorder = true;
let bricks = state?.bricks || [];
let xPositions = [];

let borderMargin = canvas.height / 5;
let borderHeight = canvas.width / 125;
let brickMargin = canvas.width / 120;
let brickWidth = (canvas.width - brickMargin * 6) / 7;
let brickHeight =
  (canvas.height - (borderMargin * 2 + borderHeight * 2) - brickMargin * 8) / 9;

class Game {
  constructor() {
    // Bindings
    this.draw = this.draw.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.init = this.init.bind(this);
  }

  calcBricksPositions() {
    for (let i = 0; i < 7; i++)
      xPositions[i] = i * brickWidth + i * brickMargin;
  }

  generateBricks() {
    let maxBricks = score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the green ball)
    let bricksCount = Math.floor(Math.random() * maxBricks) + 1;
    let indexes = [];

    this.calcBricksPositions();

    // Generate bricks
    for (let i = 0; i < bricksCount; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * 7);
      } while (indexes.includes(index));

      bricks.push(
        new Brick({
          xPositions,
          index,
          topBorder,
          brickWidth,
          brickHeight,
          score,
          c,
          colors,
          borderMargin,
          borderHeight,
        })
      );
      indexes.push(index);
    }

    this.drawBricks();
  }

  newRound() {
    // foreach brick, add a certain number to it's y pos
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - bottomBorder.height - ball.r
      // && the ball is not moving
    );
  }

  clearInBorder() {
    c.clearRect(
      0,
      borderMargin + topBorder.height,
      canvas.width,
      bottomBorder.pos.y - bottomBorder.height - borderMargin
    );
  }

  reset() {
    localStorage.clear();
    this.draw();
  }

  draw() {
    score.draw();
    record.draw();
    topBorder.draw();
    bottomBorder.draw();
    ball.draw(colors.ball, c);
    coefficient.draw();
    // this.newRound();
  }

  drawBricks() {
    bricks.forEach(brick => {
      brick.draw();
    });
  }

  drawInBorder() {
    this.drawBricks();
    ball.draw(colors.ball, c);
  }

  repoSize() /* re-position and re-size */ {
    borderMargin = canvas.height / 5;
    borderHeight = canvas.width / 125;
    brickMargin = canvas.width / 120;
    brickWidth = (canvas.width - brickMargin * 6) / 7;
    brickHeight =
      (canvas.height -
        (borderMargin * 2 + borderHeight * 2) -
        brickMargin * 8) /
      9;
    this.calcBricksPositions();

    const bricksRepoSize = () => {
      bricks.forEach(brick => {
        brick.repoSize({
          brickWidth,
          brickHeight,
          xPositions,
        });
      });
    };

    ball.repoSize();
    bottomBorder.repoSize({ canvas, borderHeight });
    topBorder.repoSize({ canvas, borderHeight });
    record.repoSize();
    score.repoSize();
    coefficient.repoSize();
    bricksRepoSize();
    this.draw();
    this.drawBricks();
  }

  handleMouseMove(e) {
    const pointer = new Pointer({
      mouseX: e.x,
      mouseY: e.y,
      c,
      ball,
      topBorder,
      canvas,
      bottomBorder,
      colors,
    });

    if (this.isInBorder(e.y)) {
      this.clearInBorder();
      this.drawInBorder();
      pointer.draw();
      canvas.style.cursor = 'pointer';
      if (outOfBorder) outOfBorder = false;
    } else if (!outOfBorder) {
      this.clearInBorder();
      this.drawInBorder();
      canvas.style.cursor = 'auto';
      if (!outOfBorder) outOfBorder = true;
    }
  }

  handleClick(e) {
    if (
      this.isInBorder(e.y)
      // && ball is not moving already
    ) {
      animate();
    }
  }

  handleResize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    this.repoSize();
  }

  init() {
    this.draw();
    this.generateBricks();
    canvas.addEventListener('mousemove', game.handleMouseMove);
    canvas.addEventListener('click', game.handleClick);
  }
}

const record = new Record({ canvas, state, c, brickHeight });
const score = new Score({ canvas, state, c, brickHeight, record });
const topBorder = new Border({
  status: 'top',
  borderMargin,
  borderHeight,
  canvas,
  c,
});
const bottomBorder = new Border({
  status: 'bottom',
  borderMargin,
  borderHeight,
  canvas,
  c,
});
const ball = new Ball({ state, bottomBorder, canvas, c });
const coefficient = new Coefficient({
  state,
  ball,
  bottomBorder,
  c,
  brickHeight,
  colors,
});
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
        "Couldn't load game's fonts. Please make sure you are using a modern web browser and also you have a sustainable internet connection and then try again."
      );
    },
  });
};

addEventListener('load', handleGameFont);
addEventListener('resize', game.handleResize);
