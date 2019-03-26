import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { useDimensions } from "../utils/hooks";

import Node from "./Node";
import Link from "./Link";
import "./styles.less";


class Graph extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    nodes: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }).isRequired
    })).isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      sourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      targetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })).isRequired,
    onUpdateNode: PropTypes.func,
    onUpdateLink: PropTypes.func,
  };

  static defaultProps = {
    nodes: [],
    links: [],
  };

  state = {
    drag: {},
    nodeGeometry: {}
  };

  svg = React.createRef();

  // Update handler

  handleNodeGeometryUpdated = (nodeId, geometry) => {
    this.setState(state => ({
      nodeGeometry: {
        ...state.nodeGeometry,
        [nodeId]: {
          ...state.nodeGeometry[nodeId],
          ...geometry
        }
      }
    }))
  };

  // Drag handlers

  beginDragNode = (nodeId, event) => {
    this.setState({
      drag: {
        nodeId,
        dx: 0,
        dy: 0,
      }
    })
  };

  dragNode = (event) => {
    if (this.state.drag) {
      const { movementX, movementY } = event;
      this.setState(state => ({
        drag: {
          ...state.drag,
          dx: state.drag.dx + movementX,
          dy: state.drag.dy + movementY
        }
      }));
    }
  };

  endDragNode = () => {
    const { nodes, onUpdateNode } = this.props;
    const { drag } = this.state;

    if (onUpdateNode && drag.dx && drag.dy) {
      const node = nodes.find(n => n._id === drag.nodeId);
      onUpdateNode(node._id, {
        position: {
          x: node.position.x + drag.dx,
          y: node.position.y + drag.dy,
        }
      })
    }

    this.setState(state => ({
      drag: {}
    }));
  };

  //

  render() {
    const { className, nodes, links, ...otherProps } = this.props;
    const { drag, nodeGeometry } = this.state;

    return (
      <svg
        className={className}
        ref={this.svg}
        onMouseMove={this.dragNode}
        {...otherProps}
      >
        {links.map(l => {
          const sourceGeometry = nodeGeometry[l.sourceId];
          const targetGeometry = nodeGeometry[l.targetId];

          return <Link key={l._id} {...{ sourceGeometry, targetGeometry }}/>;
        })}

        {nodes.map(n => (
          <Node
            key={n._id}
            className={n._id === drag.nodeId ? 'graph-dragging' : undefined}
            node={n}
            position={n._id === drag.nodeId
              ? { x: n.position.x + drag.dx, y: n.position.y + drag.dy }
              : undefined
            }
            onGeometryUpdated={this.handleNodeGeometryUpdated}
            onMouseDown={e => {e.persist(); this.beginDragNode(n._id, e)}}
            onMouseUp={e => {e.persist(); this.endDragNode(n._id, e)}}
          />
        ))}
      </svg>
    )
  }
}


export default Graph;