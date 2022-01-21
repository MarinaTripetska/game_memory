const scene = new Phaser.Scene("Game");

//1.Loading elements
scene.preload = function () {};

//2.Render elements
scene.create = function () {};

const config = {
  type: Phaser.AUTO, //webgl or canvas
  width: 1280,
  height: 720,
  scene: scene,
};

const game = new Phaser.Game(config);
