import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, string, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InteractiveGraph from "./component";


storiesOf('InteractiveGraph', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <InteractiveGraph
      links={[
        { _id: 'link1', sourceId: 'node1', targetId: 'node2' }
      ]}
      nodes={[
        {
          _id: 'node1',
          position: { x: 100, y: 100 },
          title: 'Node1'
        },
        {
          _id: 'node2',
          position: { x: 300, y: 300 },
          title: 'Node2'
        }
      ]}
      style={{
        width: 600,
        height: 600
      }}
      dropNode={{
        isDroppingNode: boolean('dropNode_isDroppingNode', false),
        onDropNode: action('onDropNode')
      }}
      drag={{
        allowDraggingNodes: boolean('drag_allowDraggingNodes', false),
        onDragNodeEnd: action('onDragNodeEnd'),
      }}
      dropLink={{
        isDroppingLink: boolean('dropLink_isDroppingLink', false),
        onDropLink: action('onDropLink')
      }}
    />
  ));