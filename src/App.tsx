import React, { useState, useEffect, FunctionComponent } from "react";

import { RoutesResponse, fetchRoutes } from "./api/backend";

import MapContainer from "./components/map/MapContainer";

const App: FunctionComponent = () => {
  const [fetchedRoutes, setFetchedRoutes] = useState<RoutesResponse>();

  useEffect(() => {
    fetchRoutes(setFetchedRoutes);
  });

  return <MapContainer fetchedRoutes={fetchedRoutes} />;
};

export default App;
