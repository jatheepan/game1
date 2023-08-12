import { Bodies, Svg, World } from 'matter-js';

export function select(root: Document, selector: string) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
}

export async function loadSvg(url: string) {
  const res = await fetch(url);
  const raw = await res.text();

  return new window.DOMParser().parseFromString(raw, 'image/svg+xml');
}

export async function usingSvg(url: string, space: World) {
  const root = await loadSvg(url);

  const vertexSets = select(root, 'path').map(path => {
    const vector = Svg.pathToVertices(path, 30);

    return vector;
  });

  const body = Bodies.fromVertices(
    1200 / 2,
    840,
    vertexSets,
    {
      isStatic: true,
      render: { strokeStyle: 'white', lineWidth: 3 },
    },
    false,
  );

  World.add(space, body);
}
