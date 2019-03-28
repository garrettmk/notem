import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { useScreenRect } from "../utils/hooks";

import Graph, { BasicNode, Link } from "../Graph";
import "./styles.less";


const InteractiveGraph = ({ className, nodes, links, dropNode, drag, dropLink, ...otherProps }) => {
  const rootRef = React.createRef();
  const [tempPoint, setTempPoint] = React.useState();

  const createTempPoint = () => {
    const tempPoint = rootRef.current.createSVGPoint();
    setTempPoint(tempPoint);
    return tempPoint;
  };

  const DOMtoSVG = ({ x, y }) => {
    const svg = rootRef.current;
    const point = tempPoint ? tempPoint : createTempPoint();
    point.x = x;
    point.y = y;

    const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
    return {
      x: svgPoint.x,
      y: svgPoint.y
    }
  };

  const [mousePosition, setMousePosition] = React.useState();
  const handleGraphMouseMove = ({ clientX, clientY }) => {
    setMousePosition(DOMtoSVG({
      x: clientX,
      y: clientY,
    }))
  };

  const { isDroppingNode, onDropNode } = dropNode;
  const handleGraphMouseDown = () => {
    if (onDropNode && isDroppingNode) {
      onDropNode({ position: mousePosition });
    }
  };

  const { allowDraggingNodes, onDragNodeEnd } = drag;
  const [draggingNodeId, setDraggingNodeId] = React.useState();
  const handleDragNodeMouseDown = nodeId => {
    if (allowDraggingNodes && !isDroppingNode)
      setDraggingNodeId(nodeId);
  };
  const handleDragNodeMouseUp = nodeId => {
    if (draggingNodeId && mousePosition && onDragNodeEnd) {
      onDragNodeEnd({_id: nodeId, position: mousePosition});
      setDraggingNodeId(null);
    }
  };

  const { isDroppingLink, onDropLink } = dropLink;
  const [dropLinkSourceId, setDropLinkSourceId] = React.useState();
  const [dropLinkTargetId, setDropLinkTargetId] = React.useState();
  const handleDropLinkClick = nodeId => {
    if (!dropLinkSourceId)
      setDropLinkSourceId(nodeId);
    else if (onDropLink) {
      onDropLink({ sourceId: dropLinkSourceId, targetId: nodeId })
      setDropLinkSourceId(null);
      setDropLinkTargetId(null);
    }
  };
  const handleDropLinkMouseEnter = nodeId => {
    if (dropLinkSourceId)
      setDropLinkTargetId(nodeId);
  };
  const handleDropLinkMouseLeave = nodeId => {
      setDropLinkTargetId(null);
  }

  let handleNodeMouseDown = () => undefined;
  let handleNodeMouseUp = () => undefined;
  let handleNodeClick = () => undefined;
  let handleNodeMouseEnter = () => undefined;
  let handleNodeMouseLeave = () => undefined;

  if (!isDroppingNode && !isDroppingLink && allowDraggingNodes) {
    handleNodeMouseDown = handleDragNodeMouseDown;
    handleNodeMouseUp = handleDragNodeMouseUp;
  } else if (!isDroppingNode && isDroppingLink) {
    handleNodeClick = handleDropLinkClick;
    handleNodeMouseEnter = handleDropLinkMouseEnter;
    handleNodeMouseLeave = handleDropLinkMouseLeave;
  }


  return (
    <Graph
      ref={rootRef}
      className={classNames('interactive-graph', className)}
      onMouseMove={handleGraphMouseMove}
      onMouseDown={handleGraphMouseDown}
      {...otherProps}
    >
      {links.map(link => (
        <Link
          geometryId={link._id}
          sourceId={link.sourceId}
          targetId={link.targetId}
        />
      ))}
      {nodes.map(node => (
        <BasicNode
          geometryId={node._id}
          className={classNames('interactive-graph-node', {
            'interactive-graph-node-hoverable': allowDraggingNodes || isDroppingLink
          })}
          text={node.title}
          position={node._id === draggingNodeId && mousePosition
            ? mousePosition
            : node.position
          }
          onMouseDown={() => handleNodeMouseDown(node._id)}
          onMouseUp={() => handleNodeMouseUp(node._id)}
          onClick={() => handleNodeClick(node._id)}
          onMouseEnter={() => handleNodeMouseEnter(node._id)}
          onMouseLeave={() => handleNodeMouseLeave(node._id)}
        />
      ))}
      {isDroppingNode && mousePosition && (
        <BasicNode
          geometryId={'__temp_node'}
          className={'interactive-graph-drop-new-node'}
          position={mousePosition}
          text={'Untitled Node'}
        />
      )}
      {isDroppingLink && dropLinkSourceId && dropLinkTargetId && (
        <Link
          className={'interactive-graph-temp-link'}
          geometryId={'__temp_link'}
          sourceId={dropLinkSourceId}
          targetId={dropLinkTargetId}
        />
      )}
    </Graph>
  )

};

InteractiveGraph.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  })).isRequired,

  links: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.object.isRequired,
    sourceId: PropTypes.object.isRequired,
    targetId: PropTypes.object.isRequired,
  })).isRequired,

  dropNode: PropTypes.shape({
    isDroppingNode: PropTypes.bool,
    onDropNode: PropTypes.func,
  }),

  drag: PropTypes.shape({
    allowDraggingNodes: PropTypes.bool,
    onDragNodeEnd: PropTypes.func,
  }),

  dropLink: PropTypes.shape({
    isDroppingLink: PropTypes.bool,
    onDropLink: PropTypes.func,
  })
};

InteractiveGraph.defaultProps = {
  nodes: [],
  links: [],
  dropNode: {},
  dropLink: {},
  drag: {}
};

export default InteractiveGraph;