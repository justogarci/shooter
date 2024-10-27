class Boss extends Opponent {
    constructor(game) {
        super(game);
        this.myImage = "assets/boss.png";  // Use boss image
        this.myImageDead = "assets/boss_dead.png";  // Use boss dead image
        this.speed = OPPONENT_SPEED * 2;  // Boss moves twice as fast
        this.image.src = this.myImage;  // Set boss image
    }
}
