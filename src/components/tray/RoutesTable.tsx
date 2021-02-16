import React, { FunctionComponent } from "react";
import convert from "convert-units";
import _ from "lodash";

import { ColDef, DataGrid, ValueFormatterParams } from "@material-ui/data-grid";

import { RoutesResponse } from "../../api/backend";
import { Route, Unit } from "../../types/types";
import numeral from "numeral";

interface Props {
  fetchedRoutes: RoutesResponse;
  unit: Unit;
}
interface TableRow {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  createdAt: number;
  isPrivate: boolean;
}

const columns = (unit: Unit): ColDef[] => [
  { field: "name", headerName: "Name", flex: 1 },
  {
    field: "distance",
    headerName: "Distance",
    width: 150,
    valueFormatter: (params: ValueFormatterParams) =>
      distanceToDisplayString(params.value as number, unit),
  },
  {
    field: "elevation",
    headerName: "Elevation",
    width: 150,
    valueFormatter: (params: ValueFormatterParams) =>
      metricElevationUnit(params.value as number, unit),
  },
  {
    field: "isPrivate",
    headerName: "Private",
    width: 150,
    valueFormatter: (params: ValueFormatterParams) =>
      params.value ? "Private" : "Public",
  },
  {
    field: "createdAt",
    headerName: "Created On",
    width: 150,
    valueFormatter: (params: ValueFormatterParams) =>
      new Date(params.value as number).toLocaleDateString(),
  },
];

const distanceToDisplayString = (distanceInMeters: number, unit: Unit) => {
  const Fmt = "0.0";
  if (unit === Unit.Imperial) {
    return (
      numeral(convert(distanceInMeters).from("m").to("mi")).format(Fmt) + " mi"
    );
  } else {
    return numeral(distanceInMeters / 1000).format(Fmt) + " km";
  }
};

const metricElevationUnit = (elevationGainInMeters: number, unit: Unit) => {
  const Fmt = "0,0";
  if (unit === Unit.Imperial) {
    return (
      numeral(convert(elevationGainInMeters).from("m").to("ft")).format(Fmt) +
      " ft"
    );
  }
  return numeral(elevationGainInMeters).format("0,0") + " m";
};

const responseToRows = (routesResponse: RoutesResponse): Array<TableRow> => {
  return _.flatMap(
    _.values(
      _.mapValues(routesResponse.data, (routes: Array<Route>) => {
        return _.flatMap(routes, (route: Route) => {
          return {
            id: route.id,
            name: route.name,
            distance: route.distanceInMeters,
            elevation: route.elevationGainInMeters,
            createdAt: route.createdAt,
            isPrivate: route.isPrivate,
          };
        });
      })
    )
  );
};

const RoutesTable: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes, unit } = props;
  const rows = responseToRows(fetchedRoutes);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns(unit)}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default RoutesTable;
