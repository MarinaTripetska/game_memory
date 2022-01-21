const scene = new Phaser.Scene("Game");

//1.Loading elements
scene.preload = function () {
  this.load.image("bg", "../assets/sprites/background.png");
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
};

const config = {
  type: Phaser.AUTO, //webgl or canvas
  width: 1280,
  height: 720,
  scene: scene,
};

const game = new Phaser.Game(config);
