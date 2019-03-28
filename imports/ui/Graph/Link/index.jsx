import { withGeometry } from "../GeometryContext";
import Link from "./component";

const itemGeometryToProps = ({ geometries }, { sourceId, targetId }) => {
  const source = geometries[sourceId];
  const target = geometries[targetId];

  return {
    sourceAttachPoints: source ? source.attachPoints : undefined,
    targetAttachPoints: target ? target.attachPoints : undefined,
  }
};

export default withGeometry(itemGeometryToProps)(Link);