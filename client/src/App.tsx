import React, { useState } from "react";
import "./App.css";
import { Button } from "./Components/Controls/Button/button.component";
import { Card } from "./Components/Controls/Card/card.component";
import { SideMenu } from "./Components/Controls/SideMenu/sideMenu.component";
import { useSideMenuState } from "./Hooks/sideMenuState";
import { Header } from "./Components/Header/header.component";
import { LeafMap } from "./Components/Map/map.component";
import { Footer } from "./Components/Footer/footer.component";
import { intersectionService } from "./Services/intersections.service";
import { useMapEvents } from "react-leaflet";
import { LatLng, LatLngLiteral } from "leaflet";
import { Snackbar } from "./Components/Controls/Snackbar/snackbar.component";

function App() {
  const sideMenu = useSideMenuState();
  
  const intersections = intersectionService.getIntersections();
  const [mapLocation, setMapLocation] = useState<LatLngLiteral>(new LatLng(32.013035, 34.774986));
  const [snackbarPop, setSnackbarPop] = useState<boolean>(false);
  
    const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, position: LatLngLiteral) => {
      setMapLocation(position);
    };
  
  const intersectionToggles = intersections.map((i) => {
    return (
      <Button key={i.name} onClick={e => clickHandler(e, i.position)}>
        {i.name}
      </Button>
    );
  });

  return (
    <div className="App">
      <Header>Smartersection</Header>
      <div className="App-body">
        <div className="header-block"></div>
        <div className="container">
          <Snackbar snackbarPopState={[snackbarPop, setSnackbarPop]}>
            <div className="content">Event has been registered for: HIT intersection.</div>
          </Snackbar>
          <Card>
            <h5>Please choose an operating intersection</h5>
            <span>
              Choosing an intersection on the map
              <br />
              will help you monitor it's operation
            </span>
            <br />
            <br />
            <div className="intersections">
              <Card>{intersectionToggles}</Card>
            </div>
          </Card>
          <LeafMap snackbarPopState={[snackbarPop, setSnackbarPop]} mapLocation={mapLocation}>{intersections}</LeafMap>
        </div>
        <div className="header-block"></div>
        <div className="header-block"></div>
      </div>
      <Footer>@Copyright - Igal Khalfin & Itay Halaf</Footer>
      <SideMenu isOpen={sideMenu.isOpen} closeEvent={sideMenu.close}>
        s
      </SideMenu>
    </div>
  );
}

export default App;
