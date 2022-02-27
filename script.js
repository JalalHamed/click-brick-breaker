'use strict';

// repoSize: re-position and re-size

(function ClickBrickBreakerGame() {
  const colors = {
    ball: 'rgb(31, 115, 242)',
    brick: 'rgb(239, 73, 33)',
    pointer: 'rgb(31, 115, 242, 0.5)',
  };

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');

  canvas.height = innerHeight;
  canvas.width = innerWidth;

  let borderMargin = 200;
  let borderHeight = canvas.width / 125;
  let brickMargin = canvas.width / 120;
  let brickWidth = (canvas.width - brickMargin * 6) / 7;
  let brickHeight =
    (canvas.height - (borderMargin * 2 + borderHeight * 2) - brickMargin * 8) /
    9;

  // LocalStorage
  const state = JSON.parse(localStorage.getItem('cbb-state'));

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

    repoSize() {
      this.pos = {
        x: state?.ball || canvas.width / 2,
        y: bottomBorder.pos.y - this.r,
      };
    }
  }

  class Border {
    constructor(yPos) {
      this.pos = {
        x: 0,
        y: yPos,
      };

      this.width = canvas.width;
      this.height = borderHeight;
    }

    draw() {
      this.width = canvas.width;
      c.fillStyle = '#000';
      c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    }

    repoSize() {
      this.width = canvas.width;
      this.height = borderHeight;
    }
  }

  class Brick {
    constructor(xPos) {
      this.topBorderHeight = topBorder.pos.y + topBorder.height;

      this.width = brickWidth;
      this.height = brickHeight;

      this.pos = {
        x: xPos,
        y: this.topBorderHeight + this.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
      };

      this.weight = score.count;
    }

    draw() {
      c.fillStyle = colors.brick;
      c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
      c.font = `${this.height / 2}px play`;
      c.fillStyle = '#fff';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(
        this.weight,
        this.pos.x + this.width / 2,
        this.pos.y + this.height / 2
      );
    }

    repoSize() {
      this.width = canvas.width / 7;
      this.height = (canvas.height - (borderMargin * 2 + borderHeight * 2)) / 9;
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
      const maxY = 440; // Must be relevant to the canvas height and not static

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

    repoSize() {
      this.pos = {
        x: ball.pos.x,
        y: ball.pos.y + bottomBorder.height + ball.r * 3.5,
      };
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

    repoSize() {
      this.pos = {
        ...this.pos,
        x: canvas.width / 2 + 75,
      };
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

    repoSize() {
      this.pos = {
        ...this.pos,
        x: canvas.width / 2 + 75,
      };
    }
  }

  class Game {
    constructor() {
      this.outOfBorder = true;
      this.bricks = state?.bricks || [];
      this.xPositions = [];

      // Bindings
      this.draw = this.draw.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.init = this.init.bind(this);
    }

    draw() {
      score.draw();
      record.draw();
      topBorder.draw();
      bottomBorder.draw();
      ball.draw(colors.ball);
      coefficient.draw();
      // this.newRound();
    }

    drawBricks() {
      this.bricks.forEach(brick => {
        brick.draw();
      });
    }

    drawInBorder() {
      this.clearInBorder();
      this.drawBricks();
      ball.draw(colors.ball);
    }

    repoSize() {
      borderHeight = canvas.width / 125;
      brickMargin = canvas.width / 120;
      brickWidth = (canvas.width - brickMargin * 6) / 7;
      brickHeight =
        (canvas.height -
          (borderMargin * 2 + borderHeight * 2) -
          brickMargin * 8) /
        9;
      ball.repoSize();
      bottomBorder.repoSize();
      topBorder.repoSize();
      record.repoSize();
      score.repoSize();
      coefficient.repoSize();
      this.draw();
      this.drawBricks();
    }

    isInBorder(y) {
      return (
        y > topBorder.pos.y + topBorder.height &&
        y < bottomBorder.pos.y - bottomBorder.height - ball.r
        // && the ball is not moving
      );
    }

    calcBricksPositions() {
      for (let i = 0; i < 7; i++)
        this.xPositions.push(i * brickWidth + i * brickMargin);
    }

    generateBricks() {
      let maxBricks = score.count < 49 ? Math.floor(Math.sqrt(score.count)) : 7; // Gradually increase the maximum number of bricks that can be generated (up to 7)
      let bricksCount = Math.floor(Math.random() * maxBricks) + 1;
      let rndInts = [];

      for (let i = 0; i < bricksCount; i++) {
        let rndInt = Math.floor(Math.random() * 7);
        while (rndInts.includes(rndInt)) {
          rndInt = Math.floor(Math.random() * 7);
        }
        rndInts.push(rndInt);
        this.bricks.push(new Brick(this.xPositions[rndInt]));
      }
      this.drawBricks();
    }

    newRound() {
      // foreach brick, add a certain number to it's y pos
    }

    animate() {
      // start refreshing page with 60fps rate
      const rAF = requestAnimationFrame(animate);
      // shoot the ball(s), change bricks weights and everything
      // bring all the bricks 1 row down and add new ones on top
      this.newRound();
      // if no brick hit the bottom border, add to score and generate new bricks
      score.addOne();
      this.generateBricks();
      // if score > record, add to record
      if (score.count > record.count) record.addOne();
      // stop refreshing page
      cancelAnimationFrame(rAF);
    }

    reset() {
      localStorage.clear();
      this.draw();
    }

    clearInBorder() {
      c.clearRect(
        0,
        borderMargin + topBorder.height,
        canvas.width,
        bottomBorder.pos.y - bottomBorder.height - borderMargin
      );
    }

    handleMouseMove(e) {
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

    handleResize() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      this.repoSize();
    }

    init() {
      this.draw();
      this.calcBricksPositions();
      this.generateBricks();
      canvas.addEventListener('mousemove', game.handleMouseMove);
      canvas.addEventListener('click', game.handleClick);
    }
  }

  const score = new Score();
  const record = new Record();
  const topBorder = new Border(borderMargin);
  const bottomBorder = new Border(canvas.height - borderMargin);
  const ball = new Ball();
  const coefficient = new Coefficient();
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
        alert(
          "Couldn't load game's fonts. Please make sure you are using a modern web browser and also you have a sustainable internet connection and then try again."
        );
      },
    });
  };

  addEventListener('load', handleGameFont);
  addEventListener('resize', game.handleResize);
})();
