import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { distance, pointsDown, pointsLeft, pointsRight, pointsUp } from "../../utils/geometry";

import "./styles.less";


const LinkLine = ({ className, sourceAttachPoint, targetAttachPoint, ...otherProps }) => {
  const { dx, dy } = distance(sourceAttachPoint, targetAttachPoint);
  let sourceControlPt, targetControlPt;

  if (pointsRight(sourceAttachPoint.direction))
    sourceControlPt = {
      x: sourceAttachPoint.x + Math.abs(dx / 2),
      y: sourceAttachPoint.y
    };
  else if (pointsUp(sourceAttachPoint.direction))
    sourceControlPt = {
      x: sourceAttachPoint.x,
      y: sourceAttachPoint.y - Math.abs(dy / 2)
    };
  else if (pointsLeft(sourceAttachPoint.direction))
    sourceControlPt = {
      x: sourceAttachPoint.x - Math.abs(dx / 2),
      y: sourceAttachPoint.y
    };
  else if (pointsDown(sourceAttachPoint.direction))
    sourceControlPt = {
      x: sourceAttachPoint.x,
      y: sourceAttachPoint.y + Math.abs(dy / 2)
    };

  if (pointsRight(targetAttachPoint.direction))
    targetControlPt = {
      x: targetAttachPoint.x + Math.abs(dx / 2),
      y: targetAttachPoint.y
    };
  else if (pointsUp(targetAttachPoint.direction))
    targetControlPt = {
      x: targetAttachPoint.x,
      y: targetAttachPoint.y - Math.abs(dy / 2)
    };
  else if (pointsLeft(targetAttachPoint.direction))
    targetControlPt = {
      x: targetAttachPoint.x - Math.abs(dx / 2),
      y: targetAttachPoint.y
    };
  else if (pointsDown(targetAttachPoint.direction))
    targetControlPt = {
      x: targetAttachPoint.x,
      y: targetAttachPoint.y + Math.abs(dy / 2)
    };

  const d = `
    M ${sourceAttachPoint.x} ${sourceAttachPoint.y}
    C ${sourceControlPt.x} ${sourceControlPt.y} ${targetControlPt.x} ${targetControlPt.y} ${targetAttachPoint.x} ${targetAttachPoint.y}
  `;

  return (
    <path
      className={classNames('graph-link-line', className)}
      d={d}
      {...otherProps}
    />
  )

};

LinkLine.propTypes = {
  className: PropTypes.string,
  sourceAttachPoint: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    direction: PropTypes.number,
  }).isRequired,
  targetAttachPoint: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    direction: PropTypes.number,
  }).isRequired
};

export default LinkLine;