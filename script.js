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
let state = JSON.parse(localStorage.getItem('cbb-state'));
const setState = async data => {
  try {
    await localStorage.setItem('cbb-state', JSON.stringify(data));
    state = JSON.parse(localStorage.getItem('cbb-state'));
  } catch (err) {
    alert(err.message);
  }
};

let outOfBorder = true;
let isBallMoving = false;
let bricks = state?.bricks || [];
let bricksXPositions = [];
let balls = [];
let counter = 0;
let landedBallXPos;

const sizes = {
  _ball: {
    radius: Math.round((canvas.width / 100) * 1.3),
  },
  _border: {
    margin: canvas.height / 5,
    height: canvas.width / 125,
  },
  _brick: {
    margin: canvas.width / 120,
    width: (canvas.width - (canvas.width / 120) * 6) / 7,
    height:
      (canvas.height -
        ((canvas.height / 5) * 2 + (canvas.width / 125) * 2) -
        (canvas.width / 120) * 8) /
      9,
  },
};

const maxY = canvas.height - sizes._border.margin - 75;

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
    this.draw();

    balls.forEach(ball => {
      const delay = ball.delay * ball.r;
      ball.draw(colors.ball);

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

    if (balls.every(ball => ball.velocity.x === 0 && ball.velocity.y === 0)) {
      setState({ ...state, ball: landedBallXPos }).then(() => {
        ball.pos.x = state.ball;
        balls = [];
        counter = 0;
        coefficient.regainCount();
        coefficient.repoSize();
        this.draw();
      });

      isBallMoving = false;
      cancelAnimationFrame(rAF);
    }

    counter++;
  }

  calcBricksPositions() {
    for (let i = 0; i < 7; i++)
      bricksXPositions[i] = i * sizes._brick.width + i * sizes._brick.margin;
  }

  generateBricks() {
    const maxBricks = score.count < 36 ? Math.floor(Math.sqrt(score.count)) : 6; // Gradually increase the maximum number of bricks that can be generated (up to 6, need at least one free space for the green ball)
    const bricksCount = Math.floor(Math.random() * maxBricks) + 1;
    const indexes = [];

    this.calcBricksPositions();

    for (let i = 0; i < bricksCount; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * 7);
      } while (indexes.includes(index));

      // prettier-ignore
      bricks.push(
        new Brick({ bricksXPositions, index, topBorder, sizes, score, c, colors })
      );
      indexes.push(index);
    }
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - bottomBorder.height - ball.r
    );
  }

  draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
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
    this.calcBricksPositions();

    ball.repoSize();
    bottomBorder.repoSize({ _border });
    topBorder.repoSize({ _border });
    record.repoSize({ sizes, status: 'record' });
    score.repoSize({ sizes, status: 'score' });
    coefficient.repoSize();
    bricks.forEach(brick => brick.repoSize({ sizes, bricksXPositions }));

    this.draw();
  }

  handleMouseMove(e) {
    const pointer = new Pointer({ e, c, ball, canvas, sizes, colors, maxY });

    if (this.isInBorder(e.y) && !isBallMoving) {
      this.draw();
      pointer.draw();
      canvas.style.cursor = 'pointer';
      if (outOfBorder) outOfBorder = false;
    } else if (!outOfBorder && !isBallMoving) {
      this.draw();
      canvas.style.cursor = 'auto';
      if (!outOfBorder) outOfBorder = true;
    }
  }

  handleClick(e) {
    if (this.isInBorder(e.y) && !isBallMoving) {
      const y = e.y < maxY ? e.y : maxY;
      isBallMoving = true;
      this.draw();
      canvas.style.cursor = 'auto';
      const angle = Math.atan2(y - ball.pos.y, e.x - ball.pos.x);
      const velocity = { x: Math.cos(angle) * 3, y: Math.sin(angle) * 3 };
      ball.velocity = velocity;
      balls.push(ball);
      for (let i = 1; i < coefficient.count; i++) {
        // prettier-ignore
        balls.push(
          new Ball({ state, sizes, canvas, c, velocity, delay: i })
        );
      }
      this.animate();
    }
  }

  init() {
    this.generateBricks();
    this.draw();
    canvas.addEventListener('mousemove', game.handleMouseMove);
    canvas.addEventListener('click', game.handleClick);
  }
}

const record = new Detail({ canvas, c, sizes, state, status: 'RECORD' });
const score = new Detail({ canvas, c, sizes, state, status: 'SCORE' });
const topBorder = new Border({ status: 'top', sizes, canvas, c });
const bottomBorder = new Border({ status: 'bottom', sizes, canvas, c });
const ball = new Ball({ state, canvas, c, sizes });
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
  if (!isBallMoving) {
    game.repoSize();
  }
};

addEventListener('load', handleGameFont);
addEventListener('resize', handleResize);
