const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight;
canvas.width = innerWidth;

const ballColor = '#1f73f2';
const brickColor = '#ef4921';

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
    c.fillStyle = ballColor;
    c.fill();
    c.strokeStyle = ballColor;
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
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Brick {
  constructor() {
    this.position = {
      x: 100,
      // must be greater than the topBorder and less than
      // the bottomBorder's y position + the borders' heights
      y: 300,
    };

    this.width = 100;
    this.height = 50;
  }

  draw() {
    c.fillStyle = brickColor;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.font = `30px sans`;
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
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };

    this.width = innerWidth;
    this.height = 5;
  }

  draw() {}
}

const topBorder = new Border(200);
const bottomBorder = new Border(innerHeight - 200);
const brick = new Brick();
const ball = new Ball();
const pointer = new Pointer();

topBorder.draw();
bottomBorder.draw();
brick.draw();
ball.draw();
pointer.draw();
