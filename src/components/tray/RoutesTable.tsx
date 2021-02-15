import { FunctionComponent } from "react";
import { RoutesResponse } from "../../api/backend";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
}

const RoutesTable: FunctionComponent<Props> = (props: Props) => {
  return null;
};

export default RoutesTable;
