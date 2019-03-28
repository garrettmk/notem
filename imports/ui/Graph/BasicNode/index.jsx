import { withGeometry } from "../GeometryContext";
import BasicNode from "./component";

export default withGeometry(({ geometries, handleGeometryUpdated }) => ({
  onGeometryUpdated: handleGeometryUpdated
}))(BasicNode);