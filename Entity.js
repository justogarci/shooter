class Entity {
    constructor(game, width, height, x, y, speed, myImage) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.myImage = myImage;
        this.image = new Image();
        this.image.src = this.myImage;
        this.image.className = this.constructor.name;
        this.image.style.position = "absolute";
        this.image.style.height = this.height === "auto" ? "auto" : `${this.height}px`;
        this.image.style.width = this.width === "auto" ? "auto" : `${this.width}px`;
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
        document.body.appendChild(this.image);
    }

    render () {
        this.image.style.top = `${this.y}px`;
        this.image.style.left = `${this.x}px`;
    }

    remove() {
        document.body.removeChild(this.image);
    }
}
