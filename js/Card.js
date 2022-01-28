class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, id, position) {
    super(scene, position.x, position.y, "card");
    this.scene = scene;
    this.id = id;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.setInteractive();
    this.opened = false;

    // this.on("pointerdown", this.open, this);
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
