class Opponent extends Character {
    constructor(game) {
        const height = OPPONENT_HEIGHT * game.width / 100,
              width = OPPONENT_WIDTH * game.width / 100,
              x = getRandomNumber(game.width - width / 2),
              y = 0,
              speed = OPPONENT_SPEED,
              myImage = OPPONENT_PICTURE,
              myImageDead = OPPONENT_PICTURE_DEAD;

        super(game, width, height, x, y, speed, myImage, myImageDead);
        this.direction = "R";  

        
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    update() {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;  
            if (this.y > this.game.height) {
                this.y = 0;  
            }

           
            if (this.direction === "R") {
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.direction = "L";
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.direction = "R";
            }
        }
    }

    shoot() {
        if (!this.dead && !this.game.ended) {
            this.game.shoot(this);  

            
            setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
        }
    }

    collide() {
        if (!this.dead) {
            this.game.score += 1;
            this.game.updateScore();  
            setTimeout(() => this.game.removeOpponent(), 2000);
            super.collide();
        }
    }
}
