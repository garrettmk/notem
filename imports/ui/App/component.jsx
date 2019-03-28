import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Typography, Button } from "antd";

import { Nodes } from "../../api/nodes";
import { Links } from "../../api/links";

import InteractiveGraph from "../InteractiveGraph";;
import "./styles.less";


const App = ({ nodes, onNodeUpdated, links, onLinkUpdated }) => {
  const [siderCollapsed, setSiderCollapsed] = React.useState(false);

  const [isDroppingNode, setIsDroppingNode] = React.useState();
  const handleDropNode = ({ position }) => {
    Nodes.insert({
      title: 'New node',
      position
    });
    setIsDroppingNode(false);
  };

  const handleDragNode = ({ _id, ...updates}) => {
    onNodeUpdated && onNodeUpdated(_id, updates);
  };

  const [isDroppingLink, setIsDroppingLink] = React.useState();
  const handleDropLink = ({ sourceId, targetId }) => {
    console.log(sourceId, targetId);
    Links.insert({
      type: 'normal',
      sourceId,
      targetId
    });
    setIsDroppingLink(false);
  };

  return (
    <Layout className={'app-layout'}>
      <Layout.Sider
        collapsible
        collapsed={siderCollapsed}
        onCollapse={collapse => setSiderCollapsed(collapse)}
      >
        <Typography.Text className={'app-title'}>MMapp</Typography.Text>
      </Layout.Sider>
      <Layout className={'content-layout'}>
        <Layout.Header className={'content-header'}>
          <Button onClick={() => setIsDroppingNode(true)}>New Node</Button>
          <Button onClick={() => setIsDroppingLink(true)}>New Link</Button>
        </Layout.Header>
        <Layout.Content className={'layout-content'}>
          <InteractiveGraph
            className={'app-graph'}
            nodes={nodes}
            dropNode={{ isDroppingNode, onDropNode: handleDropNode }}
            dropLink={{ isDroppingLink, onDropLink: handleDropLink }}
            drag={{
              allowDraggingNodes: true,
              onDragNodeEnd: handleDragNode,
            }}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  )
};

export default withTracker(() => {
  Meteor.subscribe('nodes');
  Meteor.subscribe('links');

  return {
    nodes: Nodes.find({}).fetch(),
    onNodeUpdated: (nodeId, updates) => {
      Meteor.call('nodes.update', nodeId, { $set: updates })
    },
    links: Links.find({}).fetch(),
  }
})(App);