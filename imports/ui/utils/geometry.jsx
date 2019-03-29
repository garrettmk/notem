import ReactDOMServer from "react-dom/server";
import classNames from "classnames";


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

function getScratchSVG() {
  let currentSVG = document.getElementById('scratch-svg');
  if (!currentSVG) {
    currentSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    currentSVG.id = 'scratch-svg';
    currentSVG.style.position = 'absolute';
    currentSVG.style.top = -1000;
    currentSVG.style.left = -1000;
    document.body.appendChild(currentSVG);
  }

  return currentSVG;
}

export function calculateRenderedTextSize(text, attrs = {}) {

  const elem = document.createElementNS('http://www.w3.org/2000/svg','text');
  Object.keys(attrs).forEach(key => elem.setAttribute(key, attrs[key]));

  const textNode = document.createTextNode(text);
  elem.appendChild(textNode);

  const svg = getScratchSVG();
  svg.appendChild(elem);

  const rect = elem.getBoundingClientRect();
  svg.removeChild(elem);

  return {
    width: rect.width,
    height: rect.height,
  };
}