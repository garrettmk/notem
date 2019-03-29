import React from "react";
import classNames from "classnames";
import { distance, pointsDown, pointsLeft, pointsRight, pointsUp } from "../utils/geometry";


const buildLink = ({ id, className, sourceAttachPoints = [], targetAttachPoints = [], otherProps }) => {
  if (!sourceAttachPoints.length || !targetAttachPoints.length)
    return undefined;

  let pointsAndDistances = [];
  sourceAttachPoints.forEach(sourceAttachPoint => {
    targetAttachPoints.forEach(targetAttachPoint => {
      pointsAndDistances.push({
        sourceAttachPoint,
        targetAttachPoint,
        distance: distance(sourceAttachPoint, targetAttachPoint)
      })
    })
  });

  const {
    sourceAttachPoint,
    targetAttachPoint,
    distance: { dx, dy }
  } = pointsAndDistances.sort((a, b) => a.distance.dr - b.distance.dr)[0];

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
      key={id}
      className={classNames('graph-link', className)}
      d={d}
      {...otherProps}
    />
  )
};


export default buildLink;