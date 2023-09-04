import { MouseEventHandler, ReactNode } from "react";
import { BaseProperties } from "../../../Models/BaseProperties";
import { LatLngLiteral, Map } from "leaflet";

export interface IntersectionMarkerProperties extends BaseProperties {
    position: LatLngLiteral;
    children?: ReactNode;
    labelClickEvent?: () => void;
};

