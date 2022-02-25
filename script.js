'use strict';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: 'rgb(31, 115, 242, 0.5)',
};

// LocalStorage
let state = JSON.parse(localStorage.getItem('cbb-state'));
/*
Information to maintain in localStorage
- score
- record
- coefficient
- ball position
- bricks positions and wights
- green balls positions
*/

// Classes (function constructors with syntax sugar)
class Ball {
  constructor() {
    this.r = 12;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }

  draw(color) {
    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
  }
}

class Border {
  constructor(yPos) {
    this.yPos = yPos;

    this.pos = {
      x: 0,
      y: this.yPos,
    };

    this.width = canvas.width;
    this.height = 5;
  }

  draw() {
    c.fillStyle = '#000';
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}

class Brick {
  constructor(xPos) {
    this.topBorderHeight = topBorder.pos.y + topBorder.height;

    this.width = 100;
    this.height = 50;

    this.pos = {
      x: xPos,
      y: this.topBorderHeight + this.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.weight = score.count;

    this.endpoint = [];
  }

  draw() {
    c.fillStyle = colors.brick;
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    c.font = `30px play`;
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(
      this.weight,
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2
    );
  }
}

class Pointer {
  constructor(mouseX, mouseY) {
    this.mouseCoords = {
      x: mouseX,
      y: mouseY,
    };
  }

  isColliding() {
    // console.log(this.endpoint);
  }

  get calcEndPoint() {
    const topBorderHeight = topBorder.pos.y + topBorder.height;
    const maxY = 440;

    // Calculate slope and y intercept (b)
    const pointA = [ball.pos.x, ball.pos.y];
    const pointB = [this.mouseCoords.x, this.mouseCoords.y];
    const slope = (pointA[1] - pointB[1]) / (pointA[0] - pointB[0]);
    const b = this.mouseCoords.y - slope * this.mouseCoords.x;
    // Calculate x given the top border as y
    const x = (topBorderHeight - b) / slope;
    // Calculate y given the canvas width as x
    const y = canvas.width * slope + b;

    // At 90 degree, slope is Infinite
    if (slope === Infinity) this.endpoint = [ball.pos.x, topBorderHeight];
    // Pointer touches top border
    if (x > 0 && x < canvas.width) this.endpoint = [x, topBorderHeight];
    // Pointer touches left side of canvas
    if (x < ball.r && b < maxY) this.endpoint = [ball.r, b];
    // Pointer touches right side of canvas
    if (x > canvas.width - ball.r && y < maxY)
      this.endpoint = [canvas.width - ball.r, y];
    // Pointer touches top left corner of the border
    if (x > 0 && x < ball.r) this.endpoint = [ball.r, topBorderHeight];
    // Pointer touches top right corner of the border
    if (x > canvas.width - ball.r && x < canvas.width)
      this.endpoint = [canvas.width - ball.r, topBorderHeight];
    // Surpassing y threshold
    if (x < ball.r && b > maxY) this.endpoint = [ball.r, maxY];
    if (x > canvas.width - ball.r && y > maxY)
      this.endpoint = [canvas.width - ball.r, maxY];

    // Change end point on bricks
    this.isColliding();

    return [this.endpoint[0], this.endpoint[1] + ball.r];
  }

  draw() {
    // Dashed path
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint);
    c.strokeStyle = colors.pointer;
    c.lineWidth = 5;
    c.stroke();

    // Pointer ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer;
    c.fill();
  }
}

class Coefficient {
  constructor() {
    this.coefficient = state?.coefficient || 1;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + bottomBorder.height + ball.r * 3.5,
    };
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = colors.ball;
    c.textAlign = 'center';
    c.fillText(`x${this.coefficient}`, this.pos.x, this.pos.y);
  }
}

class Record {
  constructor() {
    this.pos = {
      x: canvas.width / 2 + 75,
      y: 50,
    };

    this.count = state?.record || 1;
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`RECORD: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }
}

class Score {
  constructor() {
    this.pos = {
      x: canvas.width / 2 + 75,
      y: 90,
    };

    this.count = state?.score || 1;
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`SCORE: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }
}

class Game {
  constructor() {
    this.outOfBorder = true;

    this.draw = this.draw.bind(this);
    this.handlePointer = this.handlePointer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  draw() {
    this.clear();
    score.draw();
    record.draw();
    topBorder.draw();
    bottomBorder.draw();
    ball.draw(colors.ball);
    coefficient.draw();
  }

  clear() {
    c.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawInBorder() {
    this.clearInBorder();
    ball.draw(colors.ball);
  }

  clearInBorder() {
    c.clearRect(
      0,
      topBorder.pos.y + topBorder.height,
      canvas.width,
      bottomBorder.pos.y - bottomBorder.height - topBorder.pos.y
    );
  }

  isInBorder(y) {
    return (
      y > topBorder.pos.y + topBorder.height &&
      y < bottomBorder.pos.y - bottomBorder.height - ball.r
      // && the ball is not moving
    );
  }

  newRound() {
    const randomInt = Math.trunc(Math.random() * 5) + 1;
    const bricks = [];
    for (let i = 0; i < randomInt; i++) {
      bricks.push(new Brick(Math.random() * canvas.width));
    }
    bricks.forEach(brick => {
      brick.draw();
    });
  }

  animate() {
    // start refreshing page with 60fps rate
    const rAF = requestAnimationFrame(animate);
    // shoot the ball(s), change bricks weights and everything
    // bring all the bricks 1 row down and add new ones on top
    this.newRound();
    // if no bricks hit the bottom border, add to score
    score.addOne();
    // if score > record, add to record
    // stop refreshing page
    cancelAnimationFrame(rAF);
  }

  reset() {
    localStorage.clear();
    this.draw();
  }

  handlePointer(e) {
    const pointer = new Pointer(e.x, e.y);

    if (this.isInBorder(e.y)) {
      this.drawInBorder();
      pointer.draw();
      canvas.style.cursor = 'pointer';
      if (this.outOfBorder) this.outOfBorder = false;
    } else if (!this.outOfBorder) {
      this.drawInBorder();
      canvas.style.cursor = 'auto';
      if (!this.outOfBorder) this.outOfBorder = true;
    }
  }

  handleClick(e) {
    if (this.isInBorder(e.y)) {
      // animate();
    }
  }
}

// Objects
const score = new Score();
const record = new Record();
const topBorder = new Border(200);
const bottomBorder = new Border(canvas.height - 200);
const ball = new Ball();
const coefficient = new Coefficient();
const game = new Game();

// Event Listeners
addEventListener('load', game.draw);
game.draw();
addEventListener('mousemove', game.handlePointer);
addEventListener('click', game.handleClick);
