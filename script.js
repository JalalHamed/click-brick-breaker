const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

const colors = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: 'rgb(31, 115, 242, 0.5)',
};

let outOfBorder = true;

// Classes (function constructors with syntax sugar)
class Ball {
  constructor() {
    this.r = 12;
    this.pos = {
      x: canvas.width / 2,
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
  constructor() {
    this.pos = {
      x: 100,
      y: topBorder.pos.y + topBorder.height + 50, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.width = 100;
    this.height = 50;

    this.weight = score.count;
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

    this.endpoint = [];
    this.maxY = 440;
    this.bricks = [brick];
  }

  isColliding() {
    console.log(this.endpoint);
  }

  get calcEndPoint() {
    this.topBorder = topBorder.pos.y + topBorder.height;

    // Calculate slope and y intercept (b)
    this.pointA = [ball.pos.x, ball.pos.y];
    this.pointB = [this.mouseCoords.x, this.mouseCoords.y];
    this.slope =
      (this.pointA[1] - this.pointB[1]) / (this.pointA[0] - this.pointB[0]);
    this.b = this.mouseCoords.y - this.slope * this.mouseCoords.x;
    // Calculate x given the top border as y
    this.x = (this.topBorder - this.b) / this.slope;
    // Calculate y given the canvas width as x
    this.y = canvas.width * this.slope + this.b;

    // At 90 degree, slope is Infinite
    if (this.slope === Infinity) this.endpoint = [ball.pos.x, this.topBorder];
    // Pointer touches top border
    if (this.x > ball.r && this.x < canvas.width)
      this.endpoint = [this.x, this.topBorder];
    // Pointer touches left side of canvas
    if (this.x < ball.r && this.b < this.maxY) this.endpoint = [ball.r, this.b];
    // Pointer touches right side of canvas
    if (this.x > canvas.width - ball.r && this.y < this.maxY)
      this.endpoint = [canvas.width - ball.r, this.y];
    // Surpassing y threshold
    if (this.x < ball.r && this.b > this.maxY)
      this.endpoint = [ball.r, this.maxY];
    if (this.x > canvas.width - ball.r && this.y > this.maxY)
      this.endpoint = [canvas.width - ball.r, this.maxY];

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
    this.coefficient = 1;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + bottomBorder.height + ball.r * 3,
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
      x: canvas.width / 2,
      y: 50,
    };

    this.count = 1; // set and get from localStorage
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = '#000';
    c.textAlign = 'center';
    c.fillText(`RECORD: ${this.count}`, this.pos.x, this.pos.y);
  }
}

class Score {
  constructor() {
    this.pos = {
      x: canvas.width / 2,
      y: 90,
    };

    this.count = 1; // set and get from localStorage
  }

  draw() {
    c.font = '30px play';
    c.fillStyle = '#000';
    c.textAlign = 'center';
    c.fillText(`SCORE: ${this.count}`, this.pos.x, this.pos.y);
  }
}

// Objects
const score = new Score();
const record = new Record();
const topBorder = new Border(200);
const bottomBorder = new Border(canvas.height - 200);
const brick = new Brick();
const ball = new Ball();
const coefficient = new Coefficient();

// Functions
const init = () => {
  clearScreen();
  score.draw();
  record.draw();
  topBorder.draw();
  bottomBorder.draw();
  brick.draw();
  ball.draw(colors.ball);
  coefficient.draw();
};

const clearScreen = () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
};

const handlePointer = e => {
  const pointer = new Pointer(e.x, e.y);

  if (
    e.y > topBorder.pos.y + topBorder.height &&
    e.y < bottomBorder.pos.y - bottomBorder.height - ball.r
    /* && the ball is not moving */
  ) {
    clearScreen();
    init();
    pointer.draw();
    canvas.style.cursor = 'pointer';
    if (outOfBorder) outOfBorder = false;
  } else if (!outOfBorder) {
    clearScreen();
    init();
    canvas.style.cursor = 'auto';
    if (!outOfBorder) outOfBorder = true;
  }
};

const getDistance = (x1, y1, x2, y2) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(xDistance ** 2 + yDistance ** 2);
};

// Event Listeners
addEventListener('load', init);
document.fonts.ready.then(init);
addEventListener('mousemove', handlePointer);
