import React, { FunctionComponent } from "react";
import convert from "convert-units";

import { AddIcon } from "@material-ui/data-grid";

import { RetrieveAllRoutesResponse } from "../../api/backend";
import { Route, Unit } from "../../types/types";
import numeral from "numeral";
import Button from "@material-ui/core/Button";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";

interface Props {
  fetchedRoutes: RetrieveAllRoutesResponse;
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

const columns = (unit: Unit): MUIDataTableColumnDef[] => [
  {
    name: "name",
    label: "Name",
    // flex: 1
  },
  {
    name: "distance",
    label: "Distance",
    options: {
      setCellProps: () => ({ style: { minWidth: "150px", maxWidth: "150px" } }),
      customBodyRender: (value) => distanceToDisplayString(value as number, unit),
    },
    //   width: 150,
    //   valueFormatter: (params: ValueFormatterParams) =>
    //     distanceToDisplayString(params.value as number, unit),
  },
  {
    name: "elevation",
    label: "Elevation",
    // width: 150,
    options: {
      setCellProps: () => ({ style: { minWidth: "150px", maxWidth: "150px" } }),
      customBodyRender: (value) => metricElevationUnit(value as number, unit),
    },
    //   valueFormatter: (params: ValueFormatterParams) =>
    //     metricElevationUnit(params.value as number, unit),
  },
  {
    name: "isPrivate",
    label: "Private",
    options: {
      setCellProps: () => ({ style: { minWidth: "150px", maxWidth: "150px" } }),
      customBodyRender: (value) => (value ? "Private" : "Public"),
    },
    // width: 150,
    // valueFormatter: (params: ValueFormatterParams) =>
    //   params.value ? "Private" : "Public",
  },
  {
    name: "createdAt",
    label: "Created On",
    options: {
      setCellProps: () => ({ style: { minWidth: "150px", maxWidth: "150px" } }),
      customBodyRender: (value) => new Date(value as number).toLocaleDateString(),
    },
    // width: 150,
    // valueFormatter: (params: ValueFormatterParams) =>
    //   new Date(params.value as number).toLocaleDateString(),
  },
];

const distanceToDisplayString = (distanceInMeters: number, unit: Unit) => {
  const Fmt = "0.0";
  if (unit === Unit.Imperial) {
    return numeral(convert(distanceInMeters).from("m").to("mi")).format(Fmt) + " mi";
  } else {
    return numeral(distanceInMeters / 1000).format(Fmt) + " km";
  }
};

const metricElevationUnit = (elevationGainInMeters: number, unit: Unit) => {
  const Fmt = "0,0";
  if (unit === Unit.Imperial) {
    return numeral(convert(elevationGainInMeters).from("m").to("ft")).format(Fmt) + " ft";
  }
  return numeral(elevationGainInMeters).format("0,0") + " m";
};

const responseToRows = (routesResponse: RetrieveAllRoutesResponse): Array<TableRow> => {
  return routesResponse.data.map((route: Route) => {
    return {
      id: route.id,
      name: route.name,
      distance: route.distanceInMeters,
      elevation: route.elevationGainInMeters,
      createdAt: route.createdAt,
      isPrivate: route.isPrivate,
    };
  });
};

const RoutesTable: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes, unit } = props;
  const rows = responseToRows(fetchedRoutes);
  const addRouteButton = (
    <Button variant="contained" color="primary" startIcon={<AddIcon />}>
      Add to folder
    </Button>
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <MUIDataTable
        data={rows}
        title={""}
        columns={columns(unit)}
        options={{ rowsPerPage: 5 }}
        // checkboxSelection
        // components={{ Footer: addRouteButton }}
      />
    </div>
  );
};

export default RoutesTable;
