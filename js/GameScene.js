class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    //1.Loading elements
    this.load.image("bg", "./assets/sprites/background.png");
    this.load.image("card", "./assets/sprites/card.png");
    this.load.image("card1", "./assets/sprites/card1.png");
    this.load.image("card2", "./assets/sprites/card2.png");
    this.load.image("card3", "./assets/sprites/card3.png");
    this.load.image("card4", "./assets/sprites/card4.png");
    this.load.image("card5", "./assets/sprites/card5.png");
  }

  create() {
    this.createBackground();
    this.createCard();
    this.openedCard = null;
  }

  createBackground() {
    //2.Render elements
    //   this.add.sprite(0, 0, "bg");
    //for adding bg  to the center of canvas:
    //method 1:
    // this.add.sprite(config.width / 2, config.height / 2, "bg"); works, but here we use global object data, not good!
    //mothod 2 (better):
    //   const { width, height } = this.sys.game.config;
    //   this.add.sprite(width / 2, height / 2, "bg");
    //method 3:
    this.add.sprite(0, 0, "bg").setOrigin(0, 0);
  }

  createCard() {
    //add cards:
    this.cards = [];
    const positions = this.getCardPositions();
    //for shufle cards on random positions:
    Phaser.Utils.Array.Shuffle(positions);

    // for (let pos of positions) {
    // this.cards.push(new Card(this, pos));
    //or easier adding:
    //this.add.sprite(pos.x, pos.y, 'card').setOrigin(0,0)
    // }

    //adding cards with images * 2 = 10 cards
    config.cardsId.forEach((id) => {
      for (let i = 0; i < 2; i += 1) {
        this.cards.push(new Card(this, id, positions.pop()));
      }
    });

    this.input.on("gameobjectdown", this.onCardClicked, this);
  }

  onCardClicked(pointer, card) {
    //if taped card was already opened:
    if (card.opened) {
      return false;
    }

    //if taped card in not opened
    if (this.openedCard) {
      //if we have opened card
      console.log(this.openedCard.id);
      if (this.openedCard.id === card.id) {
        //if cards the same - remember it
        this.openedCard = null;
      } else {
        //if cards not the same - close cards
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      //card not opened
      this.openedCard = card;
    }
    card.open();
  }

  getCardPositions() {
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
  }
}
