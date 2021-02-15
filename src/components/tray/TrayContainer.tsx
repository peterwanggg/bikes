import { FunctionComponent } from "react";
import { RoutesResponse } from "../../api/backend";
import RoutesTable from "./RoutesTable";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
}

const TrayContainer: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes } = props;
  return <RoutesTable fetchedRoutes={fetchedRoutes} />;
};

export default TrayContainer;
