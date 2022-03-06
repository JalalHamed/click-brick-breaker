export default class Brick {
  constructor(props) {
    this.props = props;
    const { xPos, topBorder, brickWidth, brickHeight, score } = props;

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
    const { c, colors } = this.props;

    c.fillStyle = colors.brick;
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    c.font = `1.5rem play`;
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
    const { canvas, borderMargin, borderHeight } = this.props;

    this.width = canvas.width / 7;
    this.height = (canvas.height - (borderMargin * 2 + borderHeight * 2)) / 9;
  }
}
