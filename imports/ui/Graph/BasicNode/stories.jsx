import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import BasicNode from "./component";


storiesOf('BasicNode', module)
  .addDecorator(withKnobs)
  .add('component', () => (
    <svg width={500} height={500}>
      <BasicNode
        position={{
          x: number('position_x', 100),
          y: number('position_y', 100)
        }}
        text={text('text', 'BasicNode')}
        onGeometryUpdated={action('onGeometryUpdated')}
      />
    </svg>
  ));