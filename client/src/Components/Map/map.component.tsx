import {
  MapContainer,
  Popup,
  SVGOverlay,
  SVGOverlayProps,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { Car, Dot, MapProperties } from "./map.models";
import L, {
  LatLng,
  LatLngBounds,
  LatLngBoundsLiteral,
  LatLngLiteral,
} from "leaflet";
import styles from "./map.module.scss";
import { IntersectionMarker } from "./IntersectionMarker/intersectionMarker.component";
import { Ref, useEffect, useRef, useState } from "react";
import "leaflet-routing-machine";
import { Button } from "../Controls/Button/button.component";
import { socketService } from "../../Services/socket.service";

const LeafMap = (props: MapProperties) => {
  const marks = props.children.map((m) => (
    <IntersectionMarker position={m.position} key={m.name}>
      {m.name}
    </IntersectionMarker>
  ));

  const carRef = useRef<L.SVGOverlay>(null);
  const [snackbarPop, setSnackbarPop] = props.snackbarPopState;

  const carSize = 0.0001;
  const carRotation = -90;

  const [carPosition, setCarPosition] = useState({
    curr: {
      lat: 32.012928,
      lng: 34.776425,
    },
    prev: {
      lat: 32.012928,
      lng: 34.776425,
    },
  });

  const [carSteps, setCarSteps] = useState<LatLng[]>([]);
  const [isRed, setIsRed] = useState('Green');
  const [currCarStep, setCurrCarStep] = useState(0);
  const [startDrive, setStartDrive] = useState(false);

  const [bounds, setBounds] = useState([
    [carPosition.curr.lat + carSize, carPosition.curr.lng - carSize],
    [carPosition.curr.lat - carSize, carPosition.curr.lng - 0],
  ]);

  const subStepsNumber = 1850 * 100;
  const subStep = 1 / subStepsNumber;

  const intersectionBounds = [
    [
      props.mapLocation.lat + carSize * 2,
      props.mapLocation.lng + carSize * 2,
    ],
    [
      props.mapLocation.lat - carSize * 2,
      props.mapLocation.lng - carSize * 2,
    ],
  ] as LatLngBoundsLiteral;

  useEffect(() => {
    socketService.connect = () => alert("connected");
    socketService.onMessage = e => {
      console.log(e);
      
      setIsRed(e.toString())
    };
  }, []);

  useEffect(() => {
    if (
      carPosition.curr.lat === carPosition.prev.lat &&
      carPosition.curr.lng === carPosition.prev.lng
    )
      carRef.current?.setBounds(
        new LatLngBounds([
          [carPosition.prev.lat + carSize, carPosition.prev.lng + carSize],
          [carPosition.prev.lat - carSize, carPosition.prev.lng - carSize],
        ] as LatLngBoundsLiteral)
      );

    const lat = carPosition.curr.lat + subStep - carPosition.prev.lat;
    const lng = carPosition.curr.lng + subStep - carPosition.prev.lng;

    const normalizedLat = lat / Math.sqrt(lat ** 2 + lng ** 2);
    const normalizedLng = lng / Math.sqrt(lat ** 2 + lng ** 2);
    let diffLat = normalizedLat * subStep;
    let diffLng = normalizedLng * subStep;
    let i = 0;
    let latSign = carPosition.curr.lat - carPosition.prev.lat >= 0 ? 1 : -1;
    let lngSign = carPosition.curr.lng - carPosition.prev.lng >= 0 ? 1 : -1;
    const interlng = 34.775178;

    while (
      (diffLat + latSign * carPosition.prev.lat) <= carPosition.curr.lat &&
      normalizedLat && ((isRed === 'Green') || ((isRed === 'Red') && interlng <  diffLng + carPosition.prev.lng) || (!isRed))
    ) {
      i++;
      latSign = carPosition.curr.lat - carPosition.prev.lat >= 0 ? 1 : -1;
      lngSign = carPosition.curr.lng - carPosition.prev.lng >= 0 ? 1 : -1;
      
      diffLat += normalizedLat * subStep;
      diffLng += normalizedLng * subStep;

      const currentBounds = [
        [
          carPosition.prev.lat + diffLat + carSize,
          carPosition.prev.lng + diffLng + carSize,
        ],
        [
          carPosition.prev.lat + diffLat - carSize,
          carPosition.prev.lng + diffLng - carSize,
        ],
      ] as LatLngBoundsLiteral;

      const lastIteration =
        diffLat + carPosition.prev.lat > carPosition.curr.lat;

      setTimeout(() => {
        carRef.current?.setBounds(new LatLngBounds(currentBounds));

        if (lastIteration) {
          setCurrCarStep((c) => c + 1);
        }
      }, 10 * i);
    }

    const stopped = (isRed === 'Red') && interlng <  diffLng + carPosition.prev.lng;

    if (stopped) {
      setSnackbarPop(true);
    }
  }, [carPosition]);

  useEffect(() => {
    setCurrCarStep(0);
  }, [carSteps]);

  useEffect(() => {
    let doStep = startDrive ? 1 : 0;

    if (carSteps[currCarStep]) {
      if (startDrive && !carSteps[currCarStep + doStep]) {
        doStep = 0;
      }

      setCarPosition({
        prev: carSteps[currCarStep],
        curr: carSteps[currCarStep + doStep],
      });
    }
  }, [carSteps, startDrive, currCarStep]);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.mapContent}>
        <MapContainer
          style={{ height: "100%" }}
          center={props.mapLocation}
          zoom={20}
          scrollWheelZoom={true}
        >
          <MapSettings position={props.mapLocation} />
          {marks}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SVGOverlay
            attributes={{ stroke: "red" }}
            bounds={bounds as LatLngBoundsLiteral}
            ref={carRef}
          >
            {Dot("green")}
          </SVGOverlay>
          <SVGOverlay
            attributes={{ stroke: "red" }}
            bounds={intersectionBounds}
          >
            {Dot(isRed === 'Red' ? '#ff000060' : '#00ff0060')}
          </SVGOverlay>
          <RoutingMachine mapLocation={props.mapLocation} setCarSteps={setCarSteps} />
        </MapContainer>
      </div>
      <Button onClick={() => setStartDrive(!startDrive)}>
        {startDrive ? "Stop" : "Drive"}
      </Button>
    </div>
  );
};

// Inner component
const MapSettings = (props: { position: LatLngLiteral }) => {
  const map = useMapEvents({
    click(e) {
      map.openPopup(e.latlng.toString(), e.latlng);
    },
    locationfound(e) {},
  });

  useEffect(() => {
    map.flyTo(props.position, 18);
  }, [props.position]);

  return <div style={{ zIndex: 100000 }}>dsfsdfdsf</div>;
};

// Inner component
const createRoutineMachineLayer = (props: any) => {
  const instance = (L as any).Routing.control({
    waypoints: [L.latLng(32.012756, 34.776525), L.latLng(32.013393, 34.772925)],
    addWaypoints: false,
    fitSelectedRoutes: false,
    routeWhileDragging: true,
  });

  instance.on("routeselected", function (e: any) {
    const coord: LatLng[] = e.route.coordinates;
    const distinct = (value: number, index: number, array: number[]) =>
      array.indexOf(value) === index;
    const points = [
      coord.map((c) => c.lat).filter(distinct),
      coord.map((c) => c.lng).filter(distinct),
    ];
    const newPoints = points[0].map((p, i, a) => {
      return new LatLng(points[0][i], points[1][i]);
    })

    const finalPoints: LatLng[] = [];
    const lng = 34.775195;
    const lat = 32.013107;

    newPoints.forEach((p, i, a) => {
      finalPoints.push(p);
      if (p.lat <= lat && p.lng >= lng && newPoints[i + 1].lng <= lng) {
        finalPoints.push(new LatLng(lat, lng));
      }
    })

    props.setCarSteps(finalPoints);
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export { LeafMap };
