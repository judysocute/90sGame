import {w, h, bgColor, title, gameBgInfo} from '../env'
import 'phaser'

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
  footer: Phaser.GameObjects.TileSprite

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

    this.load.image('footer', 'src/assets/bg-footer@2x.png')
  }
  create(): void {
    // 背景設定
    this.footer = this.add.tileSprite(w / 2, h - 88, 2560, 350, 'footer')
    this.footer.setScale(.5)

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
    this.start = this.add.text((w / 2) - 60 , h - 150, '開始遊戲', {
      font: '30px Noto Sans TC',
      fill: '#fff',
      backgroundColor: '#6C488B',
      padding: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
      }
    })
    this.start.setInteractive();
    this.start.on('pointerdown', () => {
      this.scene.start('gamePlay')
    })

  }
  update(time): void {
    this.footer.tilePositionX += 3
  }
};
