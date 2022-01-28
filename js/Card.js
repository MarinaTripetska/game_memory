class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, id) {
    super(scene, 0, 0, "card");
    this.scene = scene;
    this.id = id;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.setInteractive();
    this.opened = false;
  }

  open() {
    this.opened = true;
    this.setTexture("card" + this.id);
  }
  close() {
    this.setTexture("card");
    this.opened = false;
  }
}
