import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, optionsKnob } from "@storybook/addon-knobs";

import LinkLine from "./component";

const directionsObj = {
  Right: 0,
  Up: Math.PI / 2,
  Left: Math.PI,
  Down: Math.PI * 3 / 2,
};

storiesOf('LinkLine', module)
  .addDecorator(withKnobs)
  .add('component', () => {


    const sourceAttachPoint = {
      x: number('sourceX', 200, {}, 'sourceAttachPoint'),
      y: number('sourceY', 200, {}, 'sourceAttachPoint'),
      direction: optionsKnob('sourceDirect', directionsObj, 0, { display: 'select' }, 'sourceAttachPoint')
    };

    const targetAttachPoint = {
      x: number('targetX', 400, {}, 'targetAttachPoint'),
      y: number('targetY', 400, {}, 'targetAttachPoint'),
      direction: optionsKnob('targetDirection', directionsObj, 0, { display: 'select' }, 'targetAttachPoint')
    };

    return (
      <svg width={600} height={600}>
        <circle
          cx={sourceAttachPoint.x}
          cy={sourceAttachPoint.y}
          r={5}
          fill={'transparent'}
          stroke={'black'}
          strokeWidth={1}
          strokeDasharray={[2, 2]}
        />
        <circle
          cx={targetAttachPoint.x}
          cy={targetAttachPoint.y}
          r={5}
          fill={'transparent'}
          stroke={'black'}
          strokeWidth={1}
          strokeDasharray={[2, 2]}
        />
        <LinkLine
          sourceAttachPoint={sourceAttachPoint}
          targetAttachPoint={targetAttachPoint}
        />
      </svg>
    )
  });
