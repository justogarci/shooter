class Player extends Character {
    constructor(game) {
        const height = PLAYER_HEIGHT * game.width / 100,
              width = PLAYER_WIDTH * game.width / 100,
              x = game.width / 2 - width / 2,
              y = game.height - height,
              speed = PLAYER_SPEED,
              myImage = PLAYER_PICTURE,
              myImageDead = PLAYER_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.lives = 3;
        this.dead = false;
    }

    update() {
        if (!this.dead) {
            switch (this.game.keyPressed) {
                case KEY_LEFT:
                    if (this.x > this.speed) this.x -= this.speed;
                    break;
                case KEY_RIGHT:
                    if (this.x < this.game.width - this.width - this.speed) this.x += this.speed;
                    break;
                case KEY_SHOOT:
                    this.game.shoot(this); 
                    break;
            }
        }
    }

    collide() {
        if (!this.dead) {
            this.lives--;
            if (this.lives > 0) {
                this.dead = true;
                setTimeout(() => {
                    this.dead = false;
                    this.image.src = this.myImage;
                }, 2000);
            } else {
                this.game.endGame();
            }
            this.game.updateLives();
        }
    }
}
