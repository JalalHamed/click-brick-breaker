export default class FPS {
  constructor(props) {
    this.props = props;
    this.lastRun = performance.now();
  }

  get calcFps() {
    let delta = (performance.now() - this.lastRun) / 1000;
    this.lastRun = performance.now();
    return 1 / delta;
  }

  draw() {
    const { c, canvas } = this.props;

    c.fillStyle = 'Black';
    c.font = '1rem Arial';
    c.fillText(Math.floor(this.calcFps) + ' fps', canvas.width - 35, 20);
  }
}
