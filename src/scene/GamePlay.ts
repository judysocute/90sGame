import 'phaser'
export default class GamePlay extends Phaser.Scene {
  player: Phaser.Physics.Arcade.Sprite
  constructor() {
    super({
      key: 'GamePlay'
    })
  }

  // 預先載入要用到的資源
  preload(): void {
    this.load.spritesheet('player', '/src/assets/Group362@2x.png')
  }
}