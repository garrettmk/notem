import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Graph from "./component";


storiesOf('Graph', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Graph
      style={{
        width: 600,
        height: 600,
        border: '1px dashed gray'
      }}
      nodes={[
        {
          _id: '1',
          position: { x: 50, y: 50 },
          title: 'This is a node.'
        },
        {
          _id: '2',
          position: { x: 200, y: 200 },
          title: 'Another node'
        }
      ]}
      links={[
        { id: 1, sourceId: 1, targetId: 2, }
      ]}
      onUpdateNode={action('onUpdateNode')}
      onUpdateLink={action('onUpdateLink')}
    />
  ));