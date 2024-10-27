class Boss extends Opponent {
    constructor(game) {
        super(game);
        this.myImage = "assets/boss.png";  
        this.myImageDead = "assets/boss_dead.png";  
        this.speed = OPPONENT_SPEED * 2;  
        this.image.src = this.myImage;  
    }
}
