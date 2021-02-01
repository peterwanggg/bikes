import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import _ from "lodash";

import LOS_ANGELES_CENTER from "./const/la_center";
import * as KEYS from "./const/keys";
import { fetchStravaRoutes } from "./strava/fetchRoutes";
import { Route } from "./types/types";
import { StravaRoute } from "./strava/types";
import Polyline from "./components/Polyline";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

const fitBounds = (map: any, maps: any, routes: Array<Route>) => {
  const bounds = new maps.LatLngBounds();
  for (const route of routes) {
    const path = route.path;
    for (let n = 0; n < path.length; n++) {
      bounds.extend(path[n]);
    }
  }
  map.fitBounds(bounds);
  return true;
};

const App: FunctionComponent = () => {
  const [mapInstance, setMapInstance] = useState();
  const [mapApi, setMapApi] = useState();

  const apiHasLoaded = (map: any, maps: any) => {
    setMapInstance(map);
    setMapApi(maps);
  };

  const [stravaPaths, setStravaPaths] = useState<Array<StravaRoute>>([]);

  useEffect(() => {
    fetchStravaRoutes(
      mapApi,
      KEYS.STRAVA_TOKEN,
      KEYS.STRAVA_ATHLETE_PWANG,
      setStravaPaths
    );
  }, [mapApi]);

  return (
    <Wrapper>
      <GoogleMapReact
        defaultZoom={10}
        defaultCenter={LOS_ANGELES_CENTER}
        bootstrapURLKeys={{
          key: KEYS.GOOGLE_MAPS_API_KEY,
          libraries: ["geometry"],
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
      >
        {!_.isEmpty(stravaPaths) &&
          fitBounds(mapInstance, mapApi, stravaPaths) &&
          stravaPaths.map((route) => {
            const randomColor =
              "#" + Math.floor(Math.random() * 16777215).toString(16);
            return (
              <Polyline
                key={route.path}
                map={mapInstance}
                maps={mapApi}
                encodedPath={route.path}
                color={randomColor}
              />
            );
          })}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default App;
