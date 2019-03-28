import React from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";


const GeometryContext = React.createContext({});

export default class GeometryProvider extends React.Component {

  static propTypes = {

  };

  static defaultProps = {

  };

  state = {};

  handleGeometryUpdated = (geometryId, geometry) => {
    const currentGeometry = this.state[geometryId];
    const newGeometry = {
      ...currentGeometry,
      ...geometry
    };

    if (!isEqual(currentGeometry, newGeometry)) {
      console.log('updating geometry for ', geometryId)
      this.setState({
        [geometryId]: newGeometry
      })
    }

  };

  render() {
    const { children } = this.props;

    return (
      <GeometryContext.Provider value={{
        geometries: this.state,
        handleGeometryUpdated: this.handleGeometryUpdated,
      }}>
        {children}
      </GeometryContext.Provider>
    )
  }
}

export function withGeometry(geometryContextToProps = () => undefined) {
  return component =>
    ({ geometryId, ...props }) => (
      <GeometryContext.Consumer>
        {ctx => (
          React.createElement(component, {
            ...geometryContextToProps({
              geometries: ctx.geometries,
              handleGeometryUpdated: geometry => ctx.handleGeometryUpdated(geometryId, geometry)
            }, props),
            ...props
          })
        )}
      </GeometryContext.Consumer>
    )
}