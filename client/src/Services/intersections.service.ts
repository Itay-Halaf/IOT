import { LatLngLiteral } from "leaflet";

const intersectionService = {
  getIntersections: () => {
    return [
      {
        name: "HIT",
        position: {
          lat: 32.013035, 
          lng: 34.774986,
        } as LatLngLiteral,
      },
      {
        name: "Bilu",
        position: {
          lat: 31.870888,
          lng: 34.819506,
        } as LatLngLiteral,
      },
    ];
  },
};

export { intersectionService };
