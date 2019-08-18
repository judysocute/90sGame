import 'phaser'
import {speedByLevel} from '../util'
import {w, h, bgColor, title, gameBgInfo, startBtn} from '../env'

export default class GameStart extends Phaser.Scene {
  // 遊戲介紹對話框
  dialog: Phaser.GameObjects.TileSprite
  // 遊戲大標題
  titleImg: Phaser.GameObjects.TileSprite
  // 遊戲背景說明
  info: Phaser.GameObjects.Text
  // 開始遊戲按鈕要
  start: Phaser.GameObjects.Text

  // 背景
  sky: Phaser.GameObjects.TileSprite
  cloud: Phaser.GameObjects.TileSprite
  footer: Phaser.GameObjects.TileSprite
  mountainBack: Phaser.GameObjects.TileSprite
  mountainFront: Phaser.GameObjects.TileSprite
  mountainColl: Phaser.GameObjects.Ellipse // mountain 碰撞位置
  raceway: Phaser.GameObjects.Image
  startLine: Phaser.GameObjects.Image // 起始線
  clock: Phaser.GameObjects.Image // 起始線

  level: number; // 難度

  constructor() {
    super({
      key: 'GameStart'
    })
  }

  init(params): void {
    // TODO
  }
  // 預先載入要用到的資源
  preload(): void {
    this.load.image('dialog', 'src/assets/bg-end@2x.png')
    this.load.image('titleImg', 'src/assets/logo@2x.png')
    
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

    this.cloud = this.add.tileSprite(w / 2, 150, 1300, 185, 'cloud')
    this.cloud.setScale(1)

    this.footer = this.add.tileSprite(w / 2, h - 88, 2560, 340, 'footer')
    this.footer.setScale(.5)


    // -----------------------------------------

    // 起始遊戲說明
    this.dialog = this.add.tileSprite(w / 2, h / 2, 1450, 1205, 'dialog');
    this.dialog.setScale(.65);
    
    // 遊戲大標題 Title
    this.titleImg = this.add.tileSprite(w / 2, 200, 1090, 210, 'titleImg');
    this.titleImg.setScale(.6)

    // 遊戲簡介
    this.info = this.add.text((w / 2) - 230 , 260, gameBgInfo, {
      font: '22px Noto Sans TC',
      fontWeight: 'bold',
      fill: '#6C488B',
      align: 'center'
    })

    // 開始遊戲按鈕
    this.start = this.add.text((w / 2) - 60 , h - 150, startBtn, {
      font: '30px Noto Sans TC',
      fill: '#ffffff',
      fontWeight: 'bold',
      backgroundColor: '#6C488B',
      padding: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
      }
    })
    // this.start = this.add.text((w / 2) - 230 , 260, '開始遊戲2', {
    //   font: '22px Noto Sans TC',
    //   fontWeight: 'bold',
    //   fill: '#6C488B',
    //   align: 'center'
    // })
    this.start.setInteractive();
    this.start.on('pointerdown', () => {
      this.scene.start('GamePlay')
    })

  }
  update(time): void {
    this.footer.tilePositionX += speedByLevel(this.level, 3)
    this.cloud.tilePositionX += speedByLevel(this.level, .5)
    this.mountainBack.tilePositionX += speedByLevel(this.level, .3)
    this.mountainFront.tilePositionX += speedByLevel(this.level, 2.5)
  }
};
