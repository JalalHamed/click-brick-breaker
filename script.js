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

// Classes (function constructors with syntax sugar)
class Ball {
  constructor() {
    this.r = 12;
    this.pos = {
      x: canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }

  draw() {
    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = colors.ball;
    c.fill();
    c.strokeStyle = colors.ball;
    c.lineWidth = 1;
    c.stroke();
  }

  updatePos() {
    this.pos = {
      x: canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
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

  updatePos() {
    this.pos = {
      x: 0,
      y: this.yPos,
    };

    this.width = canvas.width;
    this.height = 5;
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

  updatePos() {
    this.pos = {
      x: 100,
      y: topBorder.pos.y + topBorder.height + 50,
    };
  }
}

class Pointer {
  constructor(mouseX, mouseY) {
    this.mouseCoords = {
      x: mouseX,
      y: mouseY,
    };

    this.maxY = 440;
  }

  get calcEndPoint() {
    this.result = [];

    this.bricks = [];

    this.pointA = [ball.pos.x, ball.pos.y];
    this.pointB = [this.mouseCoords.x, this.mouseCoords.y];
    this.slope =
      (this.pointA[1] - this.pointB[1]) / (this.pointA[0] - this.pointB[0]);
    this.b = this.mouseCoords.y - this.slope * this.mouseCoords.x;
    this.x = (topBorder.pos.y + topBorder.height - this.b) / this.slope;
    this.y = canvas.width * this.slope + this.b;

    if (this.slope === Infinity)
      this.result = [ball.pos.x, topBorder.pos.y + topBorder.height];
    if (this.x > ball.r && this.x < canvas.width)
      this.result = [this.x, topBorder.pos.y + topBorder.height];
    if (this.x < ball.r && this.b < this.maxY) this.result = [ball.r, this.b];
    if (this.x < ball.r && this.b > this.maxY)
      this.result = [ball.r, this.maxY];
    if (this.x > canvas.width - ball.r && this.y < this.maxY)
      this.result = [canvas.width - ball.r, this.y];
    if (this.x > canvas.width - ball.r && this.y > this.maxY)
      this.result = [canvas.width - ball.r, this.maxY];

    return [this.result[0], this.result[1] + ball.r];
  }

  draw() {
    // Dashed path
    c.beginPath();
    c.setLineDash([10, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint);
    c.closePath();
    c.fill();
    c.strokeStyle = colors.pointer;
    c.lineWidth = 5;
    c.stroke();

    // Pointer ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer;
    c.fill();
    c.strokeStyle = colors.pointer;
    c.lineWidth = 1;
    c.stroke();
  }

  clear() {
    c.clearRect(0, 0, canvas.width, canvas.height);
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

  updatePos() {
    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + bottomBorder.height + ball.r * 3,
    };
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

  updatePos() {
    this.pos = {
      x: canvas.width / 2,
      y: 50,
    };
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

  updatePos() {
    this.pos = {
      x: canvas.width / 2,
      y: 90,
    };
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
const drawGame = () => {
  score.draw();
  record.draw();
  topBorder.draw();
  bottomBorder.draw();
  brick.draw();
  ball.draw();
  coefficient.draw();
};

const updatePos = () => {
  score.updatePos();
  record.updatePos();
  ball.updatePos();
  topBorder.updatePos();
  bottomBorder.updatePos();
  brick.updatePos();
  coefficient.updatePos();
};

const handlePointer = e => {
  const pointer = new Pointer(e.x, e.y);

  if (
    e.y > topBorder.pos.y + topBorder.height &&
    e.y < bottomBorder.pos.y - bottomBorder.height - ball.r
    /* && the ball is not moving */
  ) {
    pointer.clear();
    drawGame();
    pointer.draw();
    canvas.style.cursor = 'pointer';
    if (out) out = false;
  } else if (!out) {
    pointer.clear();
    drawGame();
    canvas.style.cursor = 'auto';
    if (!out) out = true;
  }
};

const handleResize = () => {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
  updatePos();
  drawGame();
};

// Event Listeners
addEventListener('load', drawGame);
addEventListener('mousemove', handlePointer);
addEventListener('resize', handleResize);
