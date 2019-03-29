import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Graph from "./component";

storiesOf('NewGraph', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Graph
      width={500}
      height={500}
      nodes={[
        { id: 'node1', position: { x: 150, y: 150 }, text: 'Node One' },
        { id: 'node2', position: { x: 350, y: 350 }, text: 'Node Two' }
      ]}
      links={[
        { id: 'link1', sourceId: 'node1', targetId: 'node2' }
      ]}
      dropNode={{
        isDroppingNode: boolean('dropNode_isDroppingNode'),
        onDropNode: action('onDropNode')
      }}
      dragNode={{
        allowDraggingNodes: boolean('dragNode_allowDraggingNode'),
        onDragNodeEnd: action('onDragNodeEnd')
      }}
    />
  ))