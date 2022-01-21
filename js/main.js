const scene = new Phaser.Scene("Game");

//1.Loading elements
scene.preload = function () {
  this.load.image("bg", "../assets/sprites/background.png");
  this.load.image("card", "../assets/sprites/card.png");
};

//2.Render elements
scene.create = function () {
  //   this.add.sprite(0, 0, "bg");
  //for adding bg  to the center of canvas:
  //method 1:
  // this.add.sprite(config.width / 2, config.height / 2, "bg"); works, but here we use global object data, not good!
  //mothod 2 (better):
  //   const { width, height } = this.sys.game.config;
  //   this.add.sprite(width / 2, height / 2, "bg");
  //method 3:
  this.add.sprite(0, 0, "bg").setOrigin(0, 0);

  //add cards:
  const positions = this.getCardPositions();
  for (let pos of positions) {
    this.add.sprite(pos.x, pos.y, "card").setOrigin(0, 0);
  }
};

scene.getCardPositions = function () {
  const positions = [];
  const cardTexture = this.textures.get("card").getSourceImage();
  const cardWidth = cardTexture.width + 4;
  const cardHeight = cardTexture.height + 4;
  const ofsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2;
  const ofsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2;

  for (let row = 0; row < config.rows; row += 1) {
    for (let col = 0; col < config.cols; col += 1) {
      positions.push({
        x: ofsetX + col * cardWidth,
        y: ofsetY + row * cardHeight,
      });
    }
  }

  return positions;
};

const config = {
  type: Phaser.AUTO, //webgl or canvas
  width: 1280,
  height: 720,
  rows: 2,
  cols: 5,
  scene: scene,
};

const game = new Phaser.Game(config);
