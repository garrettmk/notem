import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isEqual } from "lodash";

import { useDimensions } from "../../utils/hooks";

import "./styles.less";

const Node = ({ className, node, position, onGeometryUpdated, ...otherProps }) => {
  const [titleRef, titleDimensions] = useDimensions();
  const [box, setBox] = React.useState();
  const [attachPoints, setAttachPoints] = React.useState();
  const _position = position || node.position;

  React.useLayoutEffect(() => {
    if (titleDimensions.width) {
      const _box = {
        width: titleDimensions.width + 32,
        height: titleDimensions.height + 32
      };

      setBox(_box);

      const _attachPoints = [
        { x: _position.x, y: _position.y - _box.height / 2, direction: Math.PI / 2 },       // Top
        { x: _position.x - _box.width / 2, y: _position.y, direction: Math.PI },            // Left,
        { x: _position.x, y: _position.y + _box.height / 2, direction: Math.PI * 3 / 2 },   // Bottom
        { x: _position.x + _box.width / 2, y: _position.y, direction: 0 },                  // Right
      ];

      setAttachPoints(_attachPoints);

      if (!isEqual(box, _box) || !isEqual(attachPoints, _attachPoints))
        onGeometryUpdated(node._id, {
          position: _position,
          box: _box,
          attachPoints: _attachPoints,
        });
    }
  }, [_position, titleDimensions]);

  return (
    <g className={classNames('graph-node', className)} {...otherProps}>
      {box && (
        <rect
          className={'graph-node-box'}
          x={_position.x - box.width / 2}
          y={_position.y - box.height / 2}
          width={box.width}
          height={box.height}
        />
      )}
      <text
        ref={titleRef}
        className={'graph-node-title'}
        x={_position.x}
        y={_position.y}
        textAnchor={'middle'}
        alignmentBaseline={'central'}
      >
        {node.title}
      </text>
    </g>
  )
};

Node.propTypes = {
  node: PropTypes.shape({
    _id: PropTypes.string,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onGeometryUpdated: PropTypes.func,
};


export default Node;