import { configure } from "@storybook/react";
import "antd/dist/antd.less";

function loadStories () {
  const req = require.context('../imports/ui', true, /stories.jsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);