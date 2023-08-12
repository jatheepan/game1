// w@ts-ncheck

import './style.css';
import Matter, {
  World,
  Engine,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner,
  Render,
} from 'matter-js';

// Canvas setup
let canvas = document.getElementById('world');
const width = window.innerWidth;
const height = window.innerHeight;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

function percentX(percent: number) {
  return Math.round((percent / 100) * width);
}

function percentY(percent: number) {
  return Math.round((percent / 100) * height);
}
// End Canvas

// Setup Engine, World, Runner and Render
let engine = Engine.create();
let world = engine.world;
let runner = Runner.create();
let render = Render.create({
  element: canvas!,
  engine: engine,
  options: {
    wireframes: false,
    showBounds: true,
    hasBounds: true,
    width: 800,
    height: 600,
    background: '#FFFFFF',
    showDebug: true,
  },
});
Runner.run(runner, engine);
Render.run(render);
// End Setup

// Add walls
World.add(world, [
  //Walls
  Bodies.rectangle(0, 0, percentX(width), 50, { isStatic: true }),
  Bodies.rectangle(0, 0, 50, percentX(height), { isStatic: true }),
  Bodies.rectangle(0, percentY(100), percentX(width), 50, {
    isStatic: true,
  }),
  Bodies.rectangle(percentX(100), percentY(100), 50, percentX(height), {
    isStatic: true,
  }),
]);
// End Walls

// Gravity
engine.world.gravity.y = 0.4;

// Bodies
const mouseBody = Matter.Bodies.circle(10, 30, 40, {
  render: {
    fillStyle: 'red',
  },
});
World.add(world, [mouseBody]);

// Setup mouse constraints
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: {
      visible: false,
    },
  },
});

Matter.World.add(world, mouseConstraint);

mouseConstraint.body = mouseBody;
// Constraints to mouse
let con = Matter.Constraint.create({
  pointA: mouse.position,

  bodyB: mouseBody,
  render: {
    visible: false,
  },
});

Matter.World.add(world, con);
render.mouse = mouse;
