export default class Brick {
  constructor(props) {
    this.props = props;
    const { bricksXPositions, index, topBorder, sizes, score } = props;

    const topBorderHeight = topBorder.pos.y + topBorder.height;

    const { width, height } = sizes.brick;
    this.width = width;
    this.height = height;

    this.pos = {
      x: bricksXPositions[index],
      y: topBorderHeight + this.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
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

  repoSize({ brick, bricksXPositions }) {
    this.width = brick.width;
    this.height = brick.height;

    this.pos = {
      ...this.pos,
      x: bricksXPositions[this.props.index],
    };
  }
}
