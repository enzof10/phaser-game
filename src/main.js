function preload() {
    this.load.image("sky", "assets/sky.png")
    this.load.image("platform", "assets/platform.png")
    this.load.image("star", "assets/star.png")
    this.load.image("bomb", "assets/bomb.png")
    this.load.image("bomb", "assets/bomb.png")
    this.load.spritesheet("dude", "assets/dude.png",
        {
            frameWidth: 32,
            frameHeight: 48
        })
}
function create() {
    this.add.image(400, 300, "sky")
    this.add.image(400, 300, "platform")
    this.add.image(200, 600, "dude")
}
const update = () => {

}
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload,
        create,
        update
    }
}

let game = new Phaser.Game(config)