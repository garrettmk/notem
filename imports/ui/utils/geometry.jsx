import classNames from "classnames";

export function translatation(deltas) {
  return point => ({
    ...point,
    x: point.x + deltas.dx,
    y: point.y + deltas.dy,
  })
}

export function classed(newClasses) {
  return item => ({
    ...item,
    className: classNames(item.className, newClasses)
  })
}

export function reduceTransforms(item, transforms) {
  return transforms.reduce((newItem, transform) => transform(newItem), {});
}

export function distance(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  return {
    dx,
    dy,
    dr: Math.sqrt(dx**2 + dy**2)
  }
}

export function pointsUp(radians) {
  const normalized = radians % (2 * Math.PI);

  return normalized > Math.PI / 4 && normalized< 3 * Math.PI / 4;
}

export function pointsDown(radians) {
  const normalized = radians % (2 * Math.PI);
  return normalized > 5 * Math.PI / 4 && normalized < 8 * Math.PI / 4;
}

export function pointsLeft(radians) {
  const normalized = radians % (2 * Math.PI);
  return normalized > 3 * Math.PI / 4 && normalized < 5 * Math.PI / 4;
}

export function pointsRight(radians) {
  const normalized = radians % (2 * Math.PI);
  return normalized < Math.PI / 4 || normalized > 7 * Math.PI / 4;
}
