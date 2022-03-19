// Classes
import FPS from './modules/classes/fps.js';
import Detail from './modules/classes/detail.js';
import Border from './modules/classes/border.js';
import Ball from './modules/classes/ball.js';
import Bonus from './modules/classes/bonus.js';
import Brick from './modules/classes/brick.js';
import Pointer from './modules/classes/pointer.js';
import Coefficient from './modules/classes/coefficient.js';
// Utils
import { colors, getSizes, findIndex } from './modules/utils.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

let state = JSON.parse(localStorage.getItem('cbb-state'));

const sizes = getSizes(canvas);
const maxY = canvas.height - sizes._border.margin - 75;
const setState = data => {
  localStorage.setItem('cbb-state', JSON.stringify(data));
  state = JSON.parse(localStorage.getItem('cbb-state'));
};

let isMouseInBorder = false;
let isBallMoving = false;
let bricks = state?.bricks || [];
let bonuses = state?.bonuses || [];
let grid = [];
let balls = [];
let indexes = [];
let counter = 0;
let offset = 0;
let landedBallXPos, pointer;

const runOffsetCounter = () => {
  offset--;
  if (offset === -25) offset = 0;
};

const shootBalls = () => {
  balls.forEach(ball => {
    const delay = ball.delay * ball.r;
    ball.draw();

    if (counter > delay) ball.update();
    if (counter === delay) coefficient.decreaseCount();

    if (ball.pos.x - ball.r <= 0 || ball.pos.x + ball.r >= canvas.width)
      ball.velocity.x = -ball.velocity.x;
    if (ball.pos.y <= topBorder.pos.y + topBorder.height + ball.r) {
      ball.velocity.y = -ball.velocity.y;
    }
    if (ball.pos.y > bottomBorder.pos.y - ball.r) {
      ball.velocity.x = 0;
      ball.velocity.y = 0;
      landedBallXPos = ball.pos.x;
      ball.pos.y = bottomBorder.pos.y - ball.r;
    }
  });

  counter++;

  if (balls.every(ball => ball.velocity.x === 0 && ball.velocity.y === 0)) {
    setState({ ...state, ball: landedBallXPos });
    ball.pos.x = landedBallXPos;
    coefficient.regainCount();
    coefficient.repoSize();
    balls = [];
    counter = 0;
    isBallMoving = false;
  }
};

class Game {
  constructor() {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  setRound() {
    // Generate bricks
    const maxBricks = score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the bonus ball)
    const bricksCount = Math.floor(Math.random() * maxBricks) + 1;

    for (let i = 0; i < bricksCount; i++) {
      let index = findIndex(indexes);
      indexes.push(index);
      // prettier-ignore
      bricks.push(
        new Brick({ grid, index, topBorder, sizes, score, c, colors })
      );
    }

    // Generate bonus ball
    let index = findIndex(indexes);
    bonuses.push(new Bonus({ state, canvas, c, sizes, colors, grid, index }));
  }

  handleMouseMove(e) {
    if (!isBallMoving) {
      if (this.isInBorder(e.y)) {
        pointer = new Pointer({ e, c, ball, canvas, sizes, colors, maxY });
        canvas.style.cursor = 'pointer';
        if (!isMouseInBorder) isMouseInBorder = true;
      } else {
        canvas.style.cursor = 'auto';
        if (isMouseInBorder) isMouseInBorder = false;
      }
    }
  }

  handleClick(e) {
    if (this.isInBorder(e.y) && !isBallMoving) {
      isBallMoving = true;
      isMouseInBorder = false;
      canvas.style.cursor = 'auto';
      const y = e.y < maxY ? e.y : maxY;
      const angle = Math.atan2(y - ball.pos.y, e.x - ball.pos.x);
      const velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
      ball.velocity = velocity;
      balls.push(ball);
      for (let i = 1; i < coefficient.count; i++) {
        // prettier-ignore
        balls.push(
          new Ball({ state, colors, sizes, canvas, c, velocity, delay: i })
        );
      }
    }
  }

  draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    fps.draw();
    score.draw();
    record.draw();
    topBorder.draw();
    bottomBorder.draw();
    ball.draw();
    coefficient.draw();
    bricks.forEach(brick => brick.draw());
    bonuses.forEach(bonus => bonus.draw());
    if (isMouseInBorder && !isBallMoving) pointer.draw(offset);
  }

  repoSize() /* re-position and re-size */ {
    const { _border, _brick, _ball } = sizes;
    _ball.radius = Math.round((canvas.width / 100) * 1.3);
    _border.margin = canvas.height / 5;
    _border.height = canvas.width / 125;
    _brick.margin = canvas.width / 120;
    _brick.width = (canvas.width - _brick.margin * 6) / 7;
    _brick.height =
      (canvas.height -
        (_border.margin * 2 + _border.height * 2) -
        _brick.margin * 8) /
      9;
    this.calcGrid();

    bottomBorder.repoSize({ _border });
    topBorder.repoSize({ _border });
    ball.repoSize();
    record.repoSize({ sizes, status: 'record' });
    score.repoSize({ sizes, status: 'score' });
    coefficient.repoSize();
    bricks.forEach(brick => brick.repoSize({ sizes, grid }));
    bonuses.forEach(bonus => bonus.repoSize({ sizes, grid }));
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - bottomBorder.height - ball.r
    );
  }

  calcGrid() {
    for (let i = 0; i < 7; i++)
      grid[i] = i * sizes._brick.width + i * sizes._brick.margin;
  }

  animate() {
    const rAF = requestAnimationFrame(this.animate);
    runOffsetCounter();
    this.draw();
    if (isBallMoving) shootBalls();
  }

  init() {
    this.animate();
    this.calcGrid();
    this.setRound();
    canvas.addEventListener('mousemove', game.handleMouseMove);
    canvas.addEventListener('click', game.handleClick);
  }
}

const fps = new FPS({ c, canvas });
const record = new Detail({ canvas, c, sizes, state, status: 'RECORD' });
const score = new Detail({ canvas, c, sizes, state, status: 'SCORE' });
const topBorder = new Border({ status: 'top', sizes, canvas, c });
const bottomBorder = new Border({ status: 'bottom', sizes, canvas, c });
const ball = new Ball({ state, canvas, c, sizes, colors });
const coefficient = new Coefficient({ state, ball, sizes, c, colors });
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
  if (!isBallMoving) game.repoSize();
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
