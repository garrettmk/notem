import React from "react";
import classNames from "classnames";
import { calculateRenderedTextSize } from "../utils/geometry";


const buildNode = ({ id, className, position, text, ...otherProps }) => {
  const textSize = calculateRenderedTextSize(text, {'class': 'graph-node-title'});
  const padding = 16;
  const { x, y } = position;

  const box = {
    x: x - textSize.width / 2 - padding,
    y: y - textSize.height / 2 - padding,
    width: textSize.width + 2 * padding,
    height: textSize.height + 2 * padding,
  };

  const attachPoints = [
    { x: x + box.width / 2, y, direction: 0 },                    // Right
    { x, y: y - box.height / 2, direction: Math.PI / 2 },         // Top
    { x: x - box.width / 2, y, direction: Math.PI },              // Left
    { x, y: y + box.height / 2, direction: Math.PI * 3 / 2 }      // Bottom
  ];

  const element = (
    <g key={id} className={classNames('graph-node', className)} {...otherProps}>
      <rect className={'graph-node-box'} {...box}/>
      <text
        className={'graph-node-title'}
        textAnchor={'middle'}
        alignmentBaseline={'central'}
        x={x}
        y={y}
      >
        {text}
      </text>
    </g>
  );

  return {
    element,
    box,
    attachPoints
  }
};

export default buildNode;