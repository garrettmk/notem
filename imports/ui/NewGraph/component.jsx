import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import buildNode from "./buildNodes";
import buildLink from "./buildLinks";
import "./styles.less";


const Graph = ({ className, nodes, links, dropNode, dragNode, ...otherProps }) => {
  const rootRef = React.createRef();

  // Convert DOM coordinates (i.e. from a mouse event) to SVG coordinates
  const [tempPoint, setTempPoint] = React.useState();
  const DOMtoSVG = ({ x, y }) => {
    const svg = rootRef.current;
    let point = tempPoint;
    if (!point) {
      point = svg.createSVGPoint();
      setTempPoint(point);
    }

    point.x = x;
    point.y = y;

    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    return {
      x: svgPoint.x,
      y: svgPoint.y
    }
  };

  // Track the current mouse position in SVG coordinates
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const handleGraphMouseMove = ({ clientX, clientY }) =>
    setMousePosition(DOMtoSVG({ x: clientX, y: clientY }));

  // Handlers used when dropping a node
  const { isDroppingNode, onDropNode } = dropNode;
  const handleGraphMouseDown = () => {
    if (onDropNode && isDroppingNode)
      onDropNode({ position: mousePosition });
  };

  // Handlers used for dragging nodes
  const { allowDraggingNodes, onDragNodeEnd } = dragNode;
  const [draggingNodeId, setDraggingNodeId] = React.useState();
  const handleDragNodeMouseDown = nodeId => {
    setDraggingNodeId(nodeId);
  };
  const handleDragNodeMouseUp = nodeId => {
    if (mousePosition && onDragNodeEnd) {
      onDragNodeEnd({ id: nodeId, position: mousePosition });
      setDraggingNodeId(null);
    }
  };

  // Build the graph elements
  const nodeElements = [], nodeAttachPoints = [], linkElements = [];
  let nodeEventHandlers = () => undefined;
  if (isDroppingNode)
    nodeEventHandlers = () => {};
  else if (allowDraggingNodes)
    nodeEventHandlers = nodeId => ({
      onMouseDown: () => handleDragNodeMouseDown(nodeId),
      onMouseUp: () => handleDragNodeMouseUp(nodeId)
    });

  nodes.forEach(node => {
    const { element, box, attachPoints } = buildNode({
      ...node,
      className: classNames(node.className, { 'graph-node-dragging': node.id === draggingNodeId }),
      position: node.id === draggingNodeId ? mousePosition : node.position,
      ...nodeEventHandlers(node.id)
    });
    nodeElements.push(element);
    nodeAttachPoints.push({ id: node.id, attachPoints });
  });

  links.forEach(link => {
    const sourceAttachPoints = (nodeAttachPoints.find(ap => ap.id === link.sourceId) || {}).attachPoints;
    const targetAttachPoints = (nodeAttachPoints.find(ap => ap.id === link.targetId) || {}).attachPoints;

    linkElements.push(buildLink({
      id: link.id,
      sourceAttachPoints,
      targetAttachPoints
    }))
  });

  return (
    <svg
      ref={rootRef}
      className={classNames('graph', className)}
      onMouseMove={handleGraphMouseMove}
      onMouseDown={handleGraphMouseDown}
      {...otherProps}
    >
      {linkElements}
      {nodeElements}
      {isDroppingNode && (
        buildNode({
          id: '__temp_node',
          position: mousePosition,
          text: 'New Node'
        }).element
      )}
    </svg>
  )
};

Graph.propTypes = {
  className: PropTypes.string,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  })),
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    sourceId: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
  })).isRequired,
  dropNode: PropTypes.shape({
    isDroppingNode: PropTypes.bool,
    onDropNode: PropTypes.func,
  }),
  dragNode: PropTypes.shape({
    allowDraggingNodes: PropTypes.bool,
    onDragNodeEnd: PropTypes.func,
  })
};

Graph.defaultProps = {
  nodes: [],
  links: [],
  dropNode: {},
  dragNode: {}
};

export default Graph;