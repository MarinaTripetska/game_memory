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
    this.start();
  }

  start() {
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.initCards();
  }

  initCards() {
    const positions = this.getCardPositions();

    this.cards.forEach((card) => {
      const position = positions.pop();
      card.close();
      card.setPosition(position.x, position.y);
    });
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

    //adding cards with images * 2 = 10 cards
    config.cardsId.forEach((id) => {
      for (let i = 0; i < 2; i += 1) {
        this.cards.push(new Card(this, id));
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
      //if we have already opened card:
      if (this.openedCard.id === card.id) {
        //if cards the same - remember it
        //and don't cloth both of them
        this.openedCard = null;
        this.openedCardsCount += 1;
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
    //we we have opened all card's couple
    if (this.openedCardsCount === this.cards.length / 2) {
      this.start();
    }
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
    //for shufle cards on random positions:
    return Phaser.Utils.Array.Shuffle(positions);
  }
}
