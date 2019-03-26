import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import * as d3 from "d3";

import { distance } from "../../utils/geometry";

import LinkLine from "../LinkLine";
import "./styles.less";


const Link = ({ className, sourceGeometry, targetGeometry, ...otherProps }) => {

  if (!sourceGeometry.attachPoints || !sourceGeometry.attachPoints.length
    || !targetGeometry.attachPoints || !targetGeometry.attachPoints.length)
    return null;

  let pointsAndDistances = [];
  sourceGeometry.attachPoints.forEach(sourceAttachPoint => {
    targetGeometry.attachPoints.forEach(targetAttachPoint => {
      pointsAndDistances.push({
        sourceAttachPoint,
        targetAttachPoint,
        distance: distance(sourceAttachPoint, targetAttachPoint).dr
      })
    })
  });

  const { sourceAttachPoint, targetAttachPoint } = pointsAndDistances.sort((a, b) => a.distance - b.distance)[0];;

  return (
    <LinkLine {...{ className, sourceAttachPoint, targetAttachPoint, ...otherProps }} />
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