const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: 'rgb(31, 115, 242, 0.5)',
};

let out = true;
let round = 1;

class Ball {
  constructor() {
    this.radius = 12;
    this.position = {
      x: innerWidth / 2,
      y: bottomBorder.position.y - this.radius,
    };
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    c.fillStyle = colors.ball;
    c.fill();
    c.strokeStyle = colors.ball;
    c.lineWidth = 1;
    c.stroke();
  }
}

class Border {
  constructor(yPosition) {
    this.yPosition = yPosition;

    this.position = {
      x: 0,
      y: this.yPosition,
    };

    this.width = innerWidth;
    this.height = 5;
  }

  draw() {
    c.fillStyle = '#000';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Brick {
  constructor() {
    this.position = {
      x: 100,
      y: 300, // must be greater than the topBorder and less than the bottomBorder's y position + the borders' heights
    };

    this.width = 100;
    this.height = 50;
  }

  draw() {
    c.fillStyle = colors.brick;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.font = `30px play`;
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(
      round,
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
  }
}

class Pointer {
  constructor(mouseX, mouseY) {
    this.mouseCoords = {
      x: mouseX,
      y: mouseY,
    };

    this.width = 5;
    this.height = innerWidth;
  }

  get calcEndPoint() {
    this.pointA = [ball.position.x, ball.position.y];
    this.pointB = [this.mouseCoords.x, this.mouseCoords.y];
    this.slope =
      (this.pointA[1] - this.pointB[1]) / (this.pointA[0] - this.pointB[0]);
    this.b = this.mouseCoords.y - this.slope * this.mouseCoords.x;
    this.x = (topBorder.position.y + topBorder.height - this.b) / this.slope;
    this.y = innerWidth * this.slope + this.b;
    if (this.slope === Infinity)
      return [ball.position.x, topBorder.position.y + topBorder.height];
    if (this.x > 0 && this.x < innerWidth)
      return [this.x, topBorder.position.y + topBorder.height];
    if (this.x < 0 && this.b < 440) return [0, this.b];
    if (this.x < 0 && this.b > 440) return [0, 440];
    if (this.x > innerWidth && this.y < 440) return [innerWidth, this.y];
    if (this.x > innerWidth && this.y > 440) return [innerWidth, 440];
  }

  draw() {
    c.beginPath();
    c.moveTo(ball.position.x, ball.position.y);
    c.lineTo(...this.calcEndPoint);
    c.closePath();
    c.fill();
    c.strokeStyle = colors.pointer;
    c.lineWidth = 5;
    c.stroke();
  }

  clear() {
    c.clearRect(0, 0, innerWidth, innerHeight);
  }
}

class Coefficient {
  constructor() {
    this.coefficient = 1;

    this.position = {
      x: ball.position.x,
      y: ball.position.y + bottomBorder.height + ball.radius * 3,
    };
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = colors.ball;
    c.textAlign = 'center';
    c.fillText(`x${this.coefficient}`, this.position.x, this.position.y);
  }
}

const topBorder = new Border(200);
const bottomBorder = new Border(innerHeight - 200);
const brick = new Brick();
const ball = new Ball();
const coefficient = new Coefficient();

function paintGame() {
  topBorder.draw();
  bottomBorder.draw();
  brick.draw();
  ball.draw();
  coefficient.draw();
}

paintGame();

addEventListener('mousemove', e => {
  const pointer = new Pointer(e.x, e.y);

  if (
    e.y > topBorder.position.y + topBorder.height &&
    e.y < bottomBorder.position.y - bottomBorder.height - ball.radius
    /* && the ball is not moving */
  ) {
    pointer.clear();
    paintGame();
    pointer.draw();
    canvas.style.cursor = 'pointer';
    if (out) out = false;
  } else {
    pointer.clear();
    paintGame();
    canvas.style.cursor = 'auto';
    if (!out) out = true;
  }
});
