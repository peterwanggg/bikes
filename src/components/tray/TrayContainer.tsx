import { FunctionComponent } from "react";
import { RoutesResponse } from "../../api/backend";
import RoutesTable from "./RoutesTable";

import { Unit } from "../../types/types";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
}

const TrayContainer: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes } = props;

  if (!fetchedRoutes) {
    return null;
  }

  return <RoutesTable fetchedRoutes={fetchedRoutes} unit={Unit.Imperial} />;
};

export default TrayContainer;
