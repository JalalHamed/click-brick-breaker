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
    this.r = 12;
    this.pos = {
      x: innerWidth / 2,
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
}

class Border {
  constructor(ypos) {
    this.ypos = ypos;

    this.pos = {
      x: 0,
      y: this.ypos,
    };

    this.width = innerWidth;
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
      y: 300, // must be greater than the topBorder and less than the bottomBorder's y pos + the borders' heights
    };

    this.width = 100;
    this.height = 50;
  }

  draw() {
    c.fillStyle = colors.brick;
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    c.font = `30px play`;
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(
      round,
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

    this.width = 5;
    this.height = innerWidth;
  }

  get calcEndPoint() {
    this.result = [];
    this.pointA = [ball.pos.x, ball.pos.y];
    this.pointB = [this.mouseCoords.x, this.mouseCoords.y];
    this.slope =
      (this.pointA[1] - this.pointB[1]) / (this.pointA[0] - this.pointB[0]);
    this.b = this.mouseCoords.y - this.slope * this.mouseCoords.x;
    this.x = (topBorder.pos.y + topBorder.height - this.b) / this.slope;
    this.y = innerWidth * this.slope + this.b;

    if (this.slope === Infinity)
      this.result = [ball.pos.x, topBorder.pos.y + topBorder.height];
    if (this.x > 0 && this.x < innerWidth)
      this.result = [this.x, topBorder.pos.y + topBorder.height];
    if (this.x < ball.r && this.b < 440) this.result = [ball.r, this.b];
    if (this.x < ball.r && this.b > 440) this.result = [ball.r, 440];
    if (this.x > innerWidth - ball.r && this.y < 440)
      this.result = [innerWidth - ball.r, this.y];
    if (this.x > innerWidth - ball.r && this.y > 440)
      this.result = [innerWidth - ball.r, 440];

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
    c.clearRect(0, 0, innerWidth, innerHeight);
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

// Functions
const handlePointer = e => {
  const pointer = new Pointer(e.x, e.y);

  if (
    e.y > topBorder.pos.y + topBorder.height &&
    e.y < bottomBorder.pos.y - bottomBorder.height - ball.r
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
};

// Event Listeners
addEventListener('mousemove', handlePointer);
addEventListener('resize', paintGame);
