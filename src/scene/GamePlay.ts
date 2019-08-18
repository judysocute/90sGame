import 'phaser'
import {w, h, bgColor, title, gameBgInfo} from '../env'
import {speedByLevel} from '../util'
export default class GamePlay extends Phaser.Scene {
  // 背景
  sky: Phaser.GameObjects.TileSprite
  cloud: Phaser.GameObjects.TileSprite
  footer: Phaser.GameObjects.TileSprite
  footerColl: Phaser.GameObjects.Ellipse // footer 碰撞位置
  mountainBack: Phaser.GameObjects.TileSprite
  mountainFront: Phaser.GameObjects.TileSprite
  mountainColl: Phaser.GameObjects.Ellipse // mountain 碰撞位置
  raceway: Phaser.GameObjects.Image
  startLine: Phaser.GameObjects.Image // 起始線
  clock: Phaser.GameObjects.Image // 起始線
  
  player: Phaser.Physics.Arcade.Sprite // 玩家
  cursors: Phaser.Types.Input.Keyboard.CursorKeys // 鍵盤事件
  
  level: number; // 難度
  timeInt: number = 90; // 時間

  constructor() {
    super({
      key: 'GamePlay'
    })
  }

  init(): void {
    this.level = 1
  }
  
  // 預先載入要用到的資源
  preload(): void {
    this.load.spritesheet('player', 'src/assets/sheetOpt/walkSheet.png', {frameWidth: 167.5, frameHeight: 240});

    // 背景資源
    this.load.image('sky', 'src/assets/sky.png')
    this.load.image('cloud', 'src/assets/cloud.png') // 雲
    this.load.image('mountainBack', 'src/assets/mountainBack.png') // 山 - 後
    this.load.image('mountainFront', 'src/assets/mountainFront.png') // 山 - 前
    this.load.image('raceway', 'src/assets/raceway.png') // 賽道
    this.load.image('startLine', 'src/assets/startLine.png') // 起始線
    this.load.image('footer', 'src/assets/bg-footer@2x.png') // 地板
    this.load.image('clock', 'src/assets/clock.png') // 時鐘
  }
  create(): void {

    // 背景設定
    this.raceway = this.add.image(w / 2, h / 2 + 100, 'raceway')
    this.raceway.setScale(.6)

    this.startLine = this.add.image(150, h / 2 + 180, 'startLine')
    this.startLine.setScale(.6)

    this.sky = this.add.tileSprite(w / 2, 180, 2560, 600, 'sky')
    this.sky.setScale(.6)

    this.mountainBack = this.add.tileSprite(w / 2, 255, 2560, 350, 'mountainBack')
    this.mountainBack.setScale(.6)

    this.mountainFront = this.add.tileSprite(w / 2, 342, 2560, 60, 'mountainFront')
    this.mountainFront.setScale(.6)

    this.mountainColl = this.add.ellipse(w / 2, (h / 2) - 200, 2560, 60);

    this.cloud = this.add.tileSprite(w / 2, 150, 1300, 185, 'cloud')
    this.cloud.setScale(1)
    // -----------------------------------------
    this.player = this.physics.add.sprite(200, h / 2 + 100, 'player')
    this.player.setScale(.6);
    this.player.setSize(155, 230);
    this.player.setOffset(1, 10)
    //設定動畫播放
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 4,
      repeat: -1
    })
    //播放動畫
    this.player.anims.play('run', true);

    this.footer = this.add.tileSprite(w / 2, h - 88, 2560, 340, 'footer')
    this.footer.setScale(.5)
    this.footerColl = this.add.ellipse(w / 2, h - 30, 2560, 75);
    
    this.clock = this.add.image(w - 150, 150, 'clock')
    this.clock.setScale(.6)

    const timeText = this.add.text(w - 197, 105, this.timeInt.toString(), {
      font: '80px Noto Sans TC',
      fill: '#000',
      align: 'right',
      fontWeigth: 'bold'
    })
    
    this.cursors = this.input.keyboard.createCursorKeys(); // 註冊鍵盤事件到變數

    // 碰撞物件
    this.physics.add.existing(this.player);
    this.physics.add.existing(this.footerColl);
    this.physics.add.existing(this.mountainColl);

    this.physics.add.collider(this.player, this.footerColl, () => {
      this.player.y = h - 140
    })
    this.physics.add.collider(this.player, this.mountainColl, () => {
      this.player.y = 295
    })

    const timer = setInterval(() => {
      this.timeInt--
      timeText.text = this.timeInt < 10 ? '0' + this.timeInt.toString(): this.timeInt.toString()
      if (this.timeInt < 80 && this.timeInt > 70) {
        this.level = 2.5
      } else if (this.timeInt < 60 && this.timeInt > 30) {
        this.level = 3.5
      } else if (this.timeInt < 30 && this.timeInt > 0) {
        this.level = 4.5
      } else if (this.timeInt <= 0) {
        this.level = 0
        clearInterval(timer)
      }
    }, 1000)
  }

  update(): void {
    // 背景移動
    this.footer.tilePositionX += speedByLevel(this.level, 3)
    this.cloud.tilePositionX += speedByLevel(this.level, .5)
    this.mountainBack.tilePositionX += speedByLevel(this.level, .3)
    this.mountainFront.tilePositionX += speedByLevel(this.level, 2.5)

    this.startLine.x -= 3

    // 鍵盤事件
    if (this.cursors.left.isDown) {
      // 左
      this.player.x -= 5
    }
    else if (this.cursors.right.isDown) {
      // 右
      this.player.x += 5
    }
    else if (this.cursors.up.isDown) {
      // 上
      this.player.y -= 5
    }
    else if (this.cursors.down.isDown) {
      // 下
      this.player.y += 5
    }
  }
}