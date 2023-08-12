import * as Phaser from 'phaser';
import { Types } from 'phaser';
import objectMap from './images/objectmap.png';
import player1 from './images/player1.png';
import map from './map.json';

export default class MainScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap | undefined;
  player: Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  floorLayer: Phaser.Tilemaps.TilemapLayer | undefined;

  preload() {
    this.load.image('tiles', objectMap);
    this.load.tilemapTiledJSON('map', map);
    this.load.spritesheet('player1', player1, {
      frameWidth: 96,
      frameHeight: 96,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: 'map',
      tileWidth: 48,
      tileHeight: 48,
    });

    const tileset = map.addTilesetImage('objects', 'tiles');
    const backgroundLayer = map.createLayer('background', tileset, 0, 0);
    this.floorLayer = map.createLayer('floor', tileset, 0, 0);
    this.floorLayer.setCollisionByExclusion([-1]);
    this.player = this.physics.add.sprite(120, 130, 'player1');
    this.player.setBounce(0.2);
    this.createAnimations();
    this.player.setCollideWorldBounds(true);
    // this.player.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.floorLayer!);
  }

  update() {
    console.log(this.player!.body.touching);

    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.right.isDown) {
      this.player!.setVelocityX(160);
      this.player!.anims.play('right', true);
    } else if (cursors.left.isDown) {
      this.player!.setVelocityX(-160);
      this.player!.anims.play('left', true);
    } else {
      this.player!.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.player!.setVelocityY(-460);
    }
  }

  createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'player1', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player1', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
