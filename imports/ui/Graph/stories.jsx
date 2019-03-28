import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Graph from "./component";
import BasicNode from "./BasicNode";
import Link from "./Link";

storiesOf('Graph', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <Graph
      style={{
        width: 600,
        height: 600,
        border: '1px dashed gray'
      }}
    >
      <BasicNode
        geometryId={'node1'}
        position={{ x: 100, y: 100}}
        text={'Node 1'}
      />
      <BasicNode
        geometryId={'node2'}
        position={{
          x: number('node2_x', 300),
          y: 300
        }}
        text={'Node 2'}
      />
      <Link
        geometryId={'link1'}
        sourceId={'node1'}
        targetId={'node2'}
      />
    </Graph>
  ));