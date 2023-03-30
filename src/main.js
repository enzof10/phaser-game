
/*** @type {import("../types/phaser")} */
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    },
}

let scoreText;
let score = 0
let game = new Phaser.Game(config)
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
    let platform = this.physics.add.staticGroup();

    platform.create(400, 568, "platform").setScale(2).refreshBody()
    platform.create(600, 400, "platform")
    platform.create(50, 250, "platform")
    platform.create(750, 220, "platform")

    player = this.physics.add.sprite(100, 450, 'dude')
    player.setCollideWorldBounds(true)
    player.setBounce(0.2)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 15,
    })


    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 15,
        repeat: -1
    })
    this.physics.add.collider(player, platform)
    cursors = this.input.keyboard.createCursorKeys()

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70, stepY: Math.random() * 10 }
    })
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    this.physics.add.collider(stars, platform)
    this.physics.add.overlap(stars, player, collectStar, null, true)

    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000',
    })

}



function update() {


    if (cursors.left.isDown) {
        player.setVelocityX(-160)
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(160)
        player.anims.play('right', true)
    } else {
        player.setVelocityX(0)
        player.anims.play('turn', true)
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330)
    }

}

function collectStar(player, star) {
    star.disableBody(true, true)
    score += 10
    scoreText.setText('score: '+ score)

}
