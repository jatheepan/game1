import 'pathseg';
import polyDecomp from 'poly-decomp';
import {
  World,
  Engine,
  Mouse,
  MouseConstraint,
  Runner,
  Render,
  Common,
} from 'matter-js';

Common.setDecomp(polyDecomp);

import './style.css';

const engine = Engine.create();

const gamespace = engine.world;

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const render = Render.create({
  canvas,
  engine,
  options: {
    width: 1200,
    height: 900,
    wireframes: false,
    hasBounds: true,
  },
});

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const mouse = Mouse.create(render.canvas);

const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.2,
  },
});

render.mouse = mouse;

World.add(gamespace, mouseConstraint);

export { render, runner, gamespace, engine };
