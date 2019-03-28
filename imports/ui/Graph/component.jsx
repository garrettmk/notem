import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import GeometryProvider from "./GeometryContext";
import "./styles.less";


const Graph = React.forwardRef(({ className, children, ...otherProps}, ref) => (
  <GeometryProvider>
    <svg ref={ref} className={classNames('graph', className)} {...otherProps}>
      {children}
    </svg>
  </GeometryProvider>
));

Graph.propTypes = {
  className: PropTypes.string,
};

export default Graph;