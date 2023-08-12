import { Bodies, World } from 'matter-js';

import { engine, gamespace } from './mainfile';

import landImage from './svg/land.svg';

import { usingSvg } from './utils';

usingSvg(landImage, gamespace);

const ball = Bodies.circle(300, 0, 50, {});
ball.restitution = 0.8;

World.add(engine.world, ball);
