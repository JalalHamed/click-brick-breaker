import Ball from './modules/ball.js';
import Border from './modules/border.js';
import Brick from './modules/brick.js';
import Pointer from './modules/pointer.js';
import Coefficient from './modules/coefficient.js';
import Detail from './modules/detail.js';

const colors = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: { line: 'rgb(31, 115, 242, 0.5)', ball: 'rgb(143, 185, 248)' },
};

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

// LocalStorage
const state = JSON.parse(localStorage.getItem('cbb-state'));

let outOfBorder = true;
let clicked = false;
let bricks = state?.bricks || [];
let bricksXPositions = [];
let balls = [];
let counter = 0;

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
    this.animate = this.animate.bind(this);
    this.init = this.init.bind(this);
  }

  animate() {
    const rAF = requestAnimationFrame(this.animate);
    this.clearAndRedraw();
    balls.forEach(ball => {
      const delay = ball.delay * ball.r * 2;
      ball.draw();
      if (counter > delay) ball.update();
      if (counter === delay) coefficient.count--;
      if (ball.pos.y < topBorder.pos.y + topBorder.height + ball.r) {
        cancelAnimationFrame(rAF);
        clicked = false;
      }
    });
    counter++;
  }

  calcBricksPositions() {
    for (let i = 0; i < 7; i++)
      bricksXPositions[i] = i * brickWidth + i * brickMargin;
  }

  generateBricks() {
    let maxBricks = score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the green ball)
    let bricksCount = Math.floor(Math.random() * maxBricks) + 1;
    let indexes = [];

    this.calcBricksPositions();

    for (let i = 0; i < bricksCount; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * 7);
      } while (indexes.includes(index));

      // prettier-ignore
      bricks.push(
        new Brick({ bricksXPositions, index, topBorder, brickWidth, brickHeight, score, c, colors, borderMargin, borderHeight })
      );
      indexes.push(index);
    }

    bricks.forEach(brick => {
      brick.draw();
    });
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - bottomBorder.height - ball.r
    );
  }

  clearAndRedraw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    this.draw();
  }

  draw() {
    score.draw();
    record.draw();
    topBorder.draw();
    bottomBorder.draw();
    ball.draw(colors.ball, c);
    coefficient.draw();
    bricks.forEach(brick => {
      brick.draw();
    });
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

    ball.repoSize();
    bottomBorder.repoSize({ canvas, borderHeight });
    topBorder.repoSize({ canvas, borderHeight });
    record.repoSize();
    score.repoSize();
    coefficient.repoSize();
    bricks.forEach(brick => {
      brick.repoSize({
        brickWidth,
        brickHeight,
        bricksXPositions,
      });
    });

    this.draw();
  }

  handleMouseMove(e) {
    // prettier-ignore
    const pointer = new Pointer({ mouseX: e.x, mouseY: e.y, c, ball, topBorder, canvas, bottomBorder, colors });

    if (this.isInBorder(e.y)) {
      this.clearAndRedraw();
      pointer.draw();
      canvas.style.cursor = 'pointer';
      if (outOfBorder) outOfBorder = false;
    } else if (!outOfBorder) {
      canvas.style.cursor = 'auto';
      if (!outOfBorder) outOfBorder = true;
    }
  }

  handleClick(e) {
    if (this.isInBorder(e.y) && !clicked) {
      clicked = true;
      this.clearAndRedraw();
      canvas.style.cursor = 'auto';
      ball.velocity = { x: 1, y: -1 };
      balls.push(ball);
      for (let i = 1; i < coefficient.count; i++) {
        balls.push(
          new Ball({
            state,
            bottomBorder,
            canvas,
            c,
            velocity: { x: 1, y: -1 },
            delay: i,
          })
        );
      }
      this.animate();
    }
  }

  init() {
    this.draw();
    this.generateBricks();
    canvas.addEventListener('mousemove', game.handleMouseMove);
    canvas.addEventListener('click', game.handleClick);
  }
}

// prettier-ignore
const record = new Detail({ c, canvas, y: brickHeight * 1.5, title: 'RECORD', count: state?.record, repoY: brickHeight * 1.5 });
// prettier-ignore
const score = new Detail({ c, canvas, y: record.pos.y + brickHeight, title: 'SCORE', count: state?.record, repoY: record.pos.y + brickHeight });
// prettier-ignore
const topBorder = new Border({ status: 'top', borderMargin, borderHeight, canvas, c });
// prettier-ignore
const bottomBorder = new Border({ status: 'bottom', borderMargin, borderHeight, canvas, c });
const ball = new Ball({ state, bottomBorder, canvas, c });
// prettier-ignore
const coefficient = new Coefficient({ state, ball, bottomBorder, c, brickHeight, colors });
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
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  game.repoSize();
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
