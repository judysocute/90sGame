import "phaser";
import StartScene from './scene/StartScene'
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#000",
  scene: [StartScene]
};
export class StarfallGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new StarfallGame(config);
};