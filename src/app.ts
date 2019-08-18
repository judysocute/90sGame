import 'phaser'
import {w, h, bgColor, title} from './env'
import GameStart from './scene/GameStart'
import GamePlay from './scene/GamePlay'
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  title: title,
  width: w,
  height: h,
  parent: "game",
  backgroundColor: bgColor,
  scene: [GameStart, GamePlay]
};
export class StarfallGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new StarfallGame(config);
};