import * as Phaser from 'phaser';
import wheelImage from './images/wheel1.png';
import ballImage from './images/ball.png';

export default class MainScene extends Phaser.Scene {
  wheelMatter: any;
  preload() {
    this.load.image('wheel', ballImage);
  }

  // create() {
  //   // Create a Matter.js world
  //   const world = this.matter.world;
  //
  //   // Create a Matter.js box
  //   const box = this.matter.add.rectangle(400, 100, 80, 80);
  //
  //   // Create a Phaser sprite tied to the Matter.js body
  //   // Add a ground platform using a static Matter.js rectangle
  //   const ground = this.matter.add.rectangle(400, 500, 800, 20, { isStatic: true });
  // }

  create() {
    const ceilingMatter = this.matter.bodies.rectangle(400, 0, 800, 20, {
      isStatic: true,
      friction: 1000
    });
    const floorMatter = this.matter.bodies.rectangle(400, 590, 800, 20, {
      isStatic: true,
      friction: 1000
    });
    const wheelMatter = this.matter.bodies.circle(0, 0, 42);

    wheelMatter.restitution  = 1;
    wheelMatter.friction = 1000;

    this.wheelMatter = wheelMatter;
    this.matter.world.add(wheelMatter);
    this.matter.world.add(floorMatter);
    this.matter.world.add(ceilingMatter);

    const wheelPhaser = this.add.image(0, 0, 'wheel').setScale(0.2);

    const gameOb = this.matter.add.gameObject(wheelPhaser, wheelMatter);
    console.log(gameOb);
    this.cameras.main.setBounds(0, 0, wheelPhaser.displayWidth, wheelPhaser.displayHeight);
    this.cameras.main.startFollow(gameOb);

  }

  update() {
    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.right.isDown) {
      this.matter.applyForce(this.wheelMatter, {
        x: 0.005, y: 0
      });
    }
    if (cursors.left.isDown) {
      this.matter.applyForce(this.wheelMatter, {
        x: -0.005, y: 0
      });
    }
    if (cursors.up.isDown) {
      this.matter.applyForce(this.wheelMatter, {
        x: 0, y: -0.005
      });
    }
    if (cursors.down.isDown) {
      this.matter.applyForce(this.wheelMatter, {
        x: 0, y: 0.005
      });
    }
  }

}
