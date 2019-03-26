import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Typography, Button } from "antd";

import { Nodes } from "../../api/nodes";

import Graph from "../Graph";
import "./styles.less";


const App = ({ nodes, onUpdateNode }) => {
  const [siderCollapsed, setSiderCollapsed] = React.useState(false);

  const handleCreateNode = () => {
    Nodes.insert({
      title: 'New node',
      position: {
        x: 100,
        y: 100
      }
    })
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
          <Button onClick={handleCreateNode}>New Node</Button>
        </Layout.Header>
        <Layout.Content>
          <Graph
            className={'app-graph'}
            {...{ nodes, onUpdateNode }}
          />
        </Layout.Content>
      </Layout>
    </Layout>
  )
};

export default withTracker(() => {
  Meteor.subscribe('nodes');

  return {
    nodes: Nodes.find({}).fetch(),
    onUpdateNode: (nodeId, updates) => {
      console.log(nodeId, updates);
      Meteor.call('nodes.update', nodeId, { $set: updates })
    }
  }
})(App);