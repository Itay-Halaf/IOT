import { MouseEventHandler, ReactNode } from "react";
import { BaseProperties } from "../../Models/BaseProperties";
import { LatLngLiteral } from "leaflet";

export interface MapProperties extends BaseProperties {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: { name: string; position: LatLngLiteral }[];
  mapLocation: LatLngLiteral;
  snackbarPopState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const Car = (deg: number) =>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256">
      <g style={{transform: `translate(${-parseFloat(Math.sin(Math.PI / 180 * deg * 4).toFixed(10)) * 256}px, ${-parseFloat(Math.sin(Math.PI / 180 * deg).toFixed(10)) * 256}px)`}}>
        <path style={{transform: `rotate(${deg}deg)`}} fill="#000000" d="M105.2,10.3C88.5,13.2,76,25.6,73.1,42.1c-0.6,3.3-0.7,8.4-0.7,24.7v20.6l-2.9,1c-7.9,2.6-14,9.7-15.8,17.9c-1.1,5.2-2,4.8,9,4.8h9.6l0.1,51.2c0.1,50.7,0.2,51.3,1.2,54.8c4,14.1,13.7,23.8,27.7,27.9c3.7,1.1,4.1,1.1,26.6,1.1c22.2,0,22.9,0,26.5-1c14.3-4.1,24.2-14.2,28-28.5c0.8-2.7,0.8-7.8,0.9-54.2l0.2-51.2h9.7h9.7l-0.3-2.3c-1.4-9.8-7.4-17.4-16.2-20.4l-2.9-1V67.3c0-11.6-0.2-21.8-0.5-23.9c-2.1-15.3-12.8-27.6-28.2-32.2c-3.4-1-4.2-1.1-25.4-1.2C117.3,10,106.4,10.1,105.2,10.3z M143.9,73.6c9.3,1.3,18.2,3.9,24.3,6.9c1.6,0.8,2.9,1.5,3,1.6c0,0-2,6.6-4.7,14.6l-4.8,14.5l-1.7-0.3c-15.5-2.6-48.6-2.6-64.1,0l-1.7,0.3l-4.8-14.5c-2.6-7.9-4.7-14.5-4.7-14.6c0.1-0.1,1.5-0.8,3-1.6c8-4,19.1-6.6,32.7-7.8C124.5,72.4,139.1,72.9,143.9,73.6z M107.5,177.8c13.4,1.2,34.9,0.9,48.5-0.8c2.1-0.3,4.2-0.5,4.8-0.5c0.9,0,1.5,1.3,5.7,13.8c2.5,7.6,4.7,14.1,4.8,14.4c0.3,0.8-7.5,4.4-12.8,6c-10,2.9-18.6,4-30.4,4c-11.9,0-20.4-1.1-30.4-4c-5.3-1.6-13.1-5.2-12.8-6c0.1-0.3,2.3-6.8,4.9-14.5l4.6-13.8l2.9,0.3C98.6,176.9,103.3,177.4,107.5,177.8z"/>
      </g>
    </svg>

export const Dot = (color: string) =>
    <svg version="1.1" color={color} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 256 256">
      <circle style={{zIndex: '300 !important'}}  cx="50" cy="40" r="40" strokeWidth="5px" stroke="lightgray" fill="currentcolor"></circle>
    </svg>