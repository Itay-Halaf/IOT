import { Marker, Popup, useMapEvents } from "react-leaflet";
import { IntersectionMarkerProperties } from "./intersectionMarker.models";
import styles from "./intersectionMarker.module.scss";
import { useState } from "react";
import { LatLngLiteral } from "leaflet";

const IntersectionMarker = (props: IntersectionMarkerProperties) => {
  const [position, setPosition] = useState<LatLngLiteral>(props.position);

  return (
    <Marker position={position}>
      <Popup>{props.children}</Popup>
    </Marker>
  );
};

export { IntersectionMarker };
