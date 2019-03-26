import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as d3 from "d3";

import { distance, pointsUp, pointsDown, pointsLeft, pointsRight } from "../../utils/geometry";

import "./styles.less";


const Link = ({ className, sourceGeometry, targetGeometry, ...otherProps }) => {

  if (!sourceGeometry.attachPoints || !sourceGeometry.attachPoints.length
    || !targetGeometry.attachPoints || !targetGeometry.attachPoints.length)
    return null;

  let pointsAndDistances = [];
  sourceGeometry.attachPoints.forEach(sourcePoint => {
    targetGeometry.attachPoints.forEach(targetPoint => {
      pointsAndDistances.push({
        sourcePoint,
        targetPoint,
        distance: distance(sourcePoint, targetPoint)
      })
    })
  });

  const attachPoint = pointsAndDistances.sort((a, b) => a.distance - b.distance)[0];
  const { sourcePoint, targetPoint } = attachPoint;

  const link = {
    start: { x: sourcePoint.x, y: sourcePoint.y },
    end: { x: targetPoint.x, y: targetPoint.y },
  };

  const dx = link.end.x - link.start.x;
  const dy = link.end.y - link.start.y;

  if (pointsRight(sourcePoint.direction))
    link.cp1 = {
      x: link.start.x + Math.abs(dx / 2),
      y: link.start.y
    };

  if (pointsUp(sourcePoint.direction))
    link.cp1 = {
      x: link.start.x,
      y: link.start.y - Math.abs(dy / 2)
    };

  if (pointsLeft(sourcePoint.direction))
    link.cp1 = {
      x: link.start.x - Math.abs(dx / 2),
      y: link.start.y
    };

  if (pointsDown(sourcePoint.direction))
    link.cp1 = {
      x: link.start.x,
      y: link.start.y + Math.abs(dy / 2),
    };

  if (pointsRight(targetPoint.direction))
    link.cp2 = {
      x: link.end.x + Math.abs(dx / 2),
      y: link.end.y
    };

  if (pointsUp(targetPoint.direction))
    link.cp2 = {
      x: link.end.x,
      y: link.end.y - Math.abs(dy / 2)
    };

  if (pointsLeft(targetPoint.direction))
    link.cp2 = {
      x: link.end.x - Math.abs(dx / 2),
      y: link.end.y
    };

  if (pointsDown(targetPoint.direction))
    link.cp2 = {
      x: link.end.x,
      y: link.end.y + Math.abs(dy / 2)
    };

  const d = `
    M ${link.start.x} ${link.start.y}
    C ${link.cp1.x} ${link.cp1.y} ${link.cp2.x} ${link.cp2.y} ${link.end.x} ${link.end.y}
  `;

  return (
    <path className={classNames('graph-node-link', className)} d={d} {...otherProps}/>
  )
};

Link.propTypes = {
  sourceGeometry: PropTypes.shape({
    attachPoints: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }))
  }).isRequired,

  targetGeometry: PropTypes.shape({
    attachPoints: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }))
  })
};

Link.defaultProps = {
  sourceGeometry: {},
  targetGeometry: {}
};

export default Link;