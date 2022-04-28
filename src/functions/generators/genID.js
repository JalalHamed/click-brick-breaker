const ids = {
  projectiles: 1,
  bonuses: 1,
  bricks: 1,
};

const genID = status => {
  switch (status) {
    case 'projectile':
      return ids.projectiles++;
    case 'bonus':
      return ids.bonuses++;
    case 'brick':
      return ids.bricks++;
    default:
      return;
  }
};

export default genID;
