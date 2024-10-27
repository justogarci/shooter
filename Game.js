class Game {
    constructor () {
        this.started = false;
        this.ended = false;
        this.keyPressed = undefined;
        this.width = 0;
        this.height = 0;
        this.player = undefined;
        this.playerShots = [];  // Array to hold player shots
        this.opponentShots = [];  // Array to hold opponent shots
        this.opponent = undefined;
        this.xDown = null;
        this.paused = false;
        this.score = 0;  // Initialize score
    }

    start () {
        if (!this.started) {
            window.addEventListener("keydown", (e) => this.checkKey(e, true));
            window.addEventListener("keyup", (e) => this.checkKey(e, false));
            window.addEventListener("touchstart", (e) => this.handleTouchStart(e));
            window.addEventListener("touchmove", (e) => this.handleTouchMove(e));

            document.getElementById("pause").addEventListener("click", () => this.pauseOrResume());
            document.getElementById("reset").addEventListener("click", () => this.resetGame());

            this.started = true;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.player = new Player(this);
            this.opponent = new Opponent(this);

            this.timer = setInterval(() => this.update(), 50);  // Game update loop
        }
    }

    shoot(character) {
        const arrayShots = character instanceof Player ? this.playerShots : this.opponentShots;
        const newShot = new Shot(this, character);  // Create a new shot
        arrayShots.push(newShot);  // Add the shot to the appropriate array (player or opponent)
        document.body.appendChild(newShot.image);  // Add shot's image to the DOM
        if (character instanceof Player) {
            this.keyPressed = undefined;
        }
    }

    update () {
        if (!this.ended) {
            this.player.update();
            if (this.opponent === undefined) {
                this.opponent = new Opponent(this);
            }
            this.opponent.update();  // Move opponent

            this.playerShots.forEach((shot) => shot.update());  // Update player shots
            this.opponentShots.forEach((shot) => shot.update());  // Update opponent shots

            this.checkCollisions();  // Check for collisions
            this.updateScore();
            this.updateLives();
            this.render();
        }
    }

    render () {
        this.player.render();
        if (this.opponent !== undefined) {
            this.opponent.render();
        }

        // Render all shots
        this.playerShots.forEach((shot) => shot.render());
        this.opponentShots.forEach((shot) => shot.render());
    }

    updateScore() {
        document.getElementById('scoreli').innerHTML = `Score: ${this.score}`;
    }

    updateLives() {
        document.getElementById('livesli').innerHTML = `Lives: ${this.player.lives}`;
    }

    removeShot(shot) {
        const shotsArray = shot.type === "PLAYER" ? this.playerShots : this.opponentShots;
        const index = shotsArray.indexOf(shot);
        if (index > -1) {
            shotsArray.splice(index, 1);
        }
    }

    removeOpponent() {
        if (this.opponent) {
            document.body.removeChild(this.opponent.image);
        }
        if (this.opponent instanceof Boss) {
            this.endGame();
        } else {
            this.opponent = new Boss(this);
        }
    }

    endGame() {
        this.ended = true;
        let gameOverImage = (this.opponent instanceof Boss && this.opponent.dead && this.player.lives > 0) ?
            "assets/you_win.png" : GAME_OVER_PICTURE;
        
        let gameOver = new Entity(this, this.width / 2, "auto", this.width / 4, this.height / 4, 0, gameOverImage);
        gameOver.render();
    }

    resetGame() {
        document.location.reload();
    }

    checkKey(event, isKeyDown) {
        if (!isKeyDown) {
            this.keyPressed = undefined;
        } else {
            switch (event.keyCode) {
                case 37:  // Left arrow
                    this.keyPressed = KEY_LEFT;
                    break;
                case 39:  // Right arrow
                    this.keyPressed = KEY_RIGHT;
                    break;
                case 32:  // Spacebar (shoot)
                    this.keyPressed = KEY_SHOOT;
                    break;
                case 27: case 81:  // ESC or Q key (pause)
                    this.pauseOrResume();
                    break;
            }
        }
    }

    handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        this.xDown = firstTouch.clientX;
        this.keyPressed = KEY_SHOOT;
    }

    handleTouchMove(evt) {
        if (!this.xDown) return;

        const xUp = evt.touches[0].clientX;
        const xDiff = this.xDown - xUp;

        if (xDiff > MIN_TOUCHMOVE) {
            this.keyPressed = KEY_LEFT;
        } else if (xDiff < -MIN_TOUCHMOVE) {
            this.keyPressed = KEY_RIGHT;
        } else {
            this.keyPressed = KEY_SHOOT;
        }
        this.xDown = null;
    }

    checkCollisions() {
        let impact = false;

        // Check if opponent shots hit the player
        for (let i = 0; i < this.opponentShots.length; i++) {
            impact = impact || this.hasCollision(this.player, this.opponentShots[i]);
        }
        if (impact || this.hasCollision(this.player, this.opponent)) {
            this.player.collide();
        }

        // Check if player shots hit the opponent
        let killed = false;
        for (let i = 0; i < this.playerShots.length; i++) {
            killed = killed || this.hasCollision(this.opponent, this.playerShots[i]);
        }
        if (killed) {
            this.opponent.collide();
        }
    }

    hasCollision(item1, item2) {
        if (item2 === undefined) return false;

        const b1 = item1.y + item1.height;
        const r1 = item1.x + item1.width;
        const b2 = item2.y + item2.height;
        const r2 = item2.x + item2.width;

        return !(b1 < item2.y || item1.y > b2 || r1 < item2.x || item1.x > r2);
    }

    pauseOrResume() {
        if (this.paused) {
            this.timer = setInterval(() => this.update(), 50);
            document.body.classList.remove('paused');
            this.paused = false;
        } else {
            clearInterval(this.timer);
            document.body.classList.add('paused');
            this.paused = true;
        }
    }
}
