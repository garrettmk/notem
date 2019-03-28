import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useDimensions } from "../../utils/hooks";
import "./styles.less";


const BasicNode = ({ className, position, text, onGeometryUpdated, ...otherProps }) => {
  const [titleRef, titleDimensions] = useDimensions([text]);

  const padding = 16;
  const { x, y } = position;
  const boxWidth = titleDimensions ? titleDimensions.width: 16;
  const boxHeight = titleDimensions ? titleDimensions.height : 16;
  const box = {
    x: x - boxWidth / 2 - padding,
    y: y - boxHeight / 2 - padding,
    width: boxWidth + 2 * padding,
    height: boxHeight + 2 * padding
  };

  React.useLayoutEffect(() => {
    if (onGeometryUpdated)
      onGeometryUpdated({
        attachPoints: [
          { x: x, y: y - box.height / 2, direction: Math.PI / 2 },       // Top
          { x: x - box.width / 2, y: y, direction: Math.PI },            // Left,
          { x: x, y: y + box.height / 2, direction: Math.PI * 3 / 2 },   // Bottom
          { x: x + box.width / 2, y: y, direction: 0 },                  // Right
        ]
      })
  }, [box.x, box.y, box.width, box.height]);

  return (
    <g className={classNames('graph-node', className)} {...otherProps}>
      <rect className={'graph-node-box'} {...box} />
      <text
        ref={titleRef}
        className={'graph-node-title'}
        x={x}
        y={y}
        textAnchor={'middle'}
        alignmentBaseline={'central'}
      >
        {text}
      </text>
    </g>
  )
};

BasicNode.propTypes = {
  className: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  onGeometryUpdated: PropTypes.func,
};

export default BasicNode;