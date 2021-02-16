import React, { useState, FunctionComponent } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import _ from "lodash";

import LOS_ANGELES_CENTER from "../../const/la_center";
import * as KEYS from "../../const/keys";
import { RoutesResponse } from "../../api/backend";
import { Route } from "../../types/types";
import Polyline from "../../components/Polyline";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
}

const Wrapper = styled.main`
  width: 100%;
  height: calc(100% - 64px);
`;

const fitBounds = (map: any, maps: any, routesResponse: RoutesResponse) => {
  const bounds = new maps.LatLngBounds();
  for (const [, routes] of Object.entries(routesResponse.data)) {
    for (const route of routes) {
      const path = route.path;
      for (let n = 0; n < path.length; n++) {
        bounds.extend(path[n]);
      }
    }
  }
  map.fitBounds(bounds);
  return true;
};

const MapContainer: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes } = props;
  const [mapInstance, setMapInstance] = useState();
  const [mapApi, setMapApi] = useState();

  const apiHasLoaded = (map: any, maps: any) => {
    setMapInstance(map);
    setMapApi(maps);
  };

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
        {fetchedRoutes &&
          fitBounds(mapInstance, mapApi, fetchedRoutes) &&
          _.values(
            _.mapValues(fetchedRoutes.data, (routes: Array<Route>) => {
              return _.flatMap(routes, (route: Route) => {
                return (
                  <Polyline
                    key={route.path}
                    map={mapInstance}
                    maps={mapApi}
                    encodedPath={route.path}
                    color={route.color}
                  />
                );
              });
            })
          )}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default MapContainer;
