/**
 * Shot of a Character. Inherits from the Entity class
 */
class Shot extends Entity {
    /**
    * Initializes a shot
    * @param game 
     * @param character
    */

    constructor (game, character) {
        const width = SHOT_WIDTH * game.width / 100;
        const height = SHOT_HEIGHT * game.width / 100;
        const x = character.x + character.width / 2 - width / 2;
        const y = character.y + character.height - character.height / 2;
        const speed = SHOT_SPEED;
        const myImage = character instanceof Player ? SHOT_PICTURE_PLAYER : SHOT_PICTURE_OPPONENT;
        super(game, width, height, x, y, speed, myImage);
        this.type = character instanceof Player ? "PLAYER" : "ENEMY";
    }
    /**
     * Update the position attributes of the shot
     */
    update () {
        if (this.type === "PLAYER") {
            this.y = this.y - this.speed;
        } else {
            this.y = this.y + this.speed; 
        }
        if (this.y < 0 || this.y > this.game.height) {
            this.game.removeShot(this);
            document.body.removeChild(this.image);
        }
    }
}