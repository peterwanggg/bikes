import React, { useState, FunctionComponent } from "react";

import { Drawer, IconButton } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import { RoutesResponse } from "../../api/backend";
import RoutesTable from "./RoutesTable";
import { Unit } from "../../types/types";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  drawerIcon: {
    display: "flex",
    alignItems: "right",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const TrayContainer: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes } = props;
  if (!fetchedRoutes) {
    return null;
  }
  const classes = useStyles();
  const [openFolderDrawer, setOpenFolderDrawer] = useState(true);
  const handleFolderOpen = () => {
    setOpenFolderDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenFolderDrawer(false);
  };

  return (
    <React.Fragment>
      <RoutesTable fetchedRoutes={fetchedRoutes} unit={Unit.Imperial} />
      <IconButton edge="end" color="inherit" onClick={handleFolderOpen}>
        <UnfoldMoreIcon />
      </IconButton>
      <Drawer
        // className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={openFolderDrawer}
      >
        <div className={classes.drawerIcon}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowDown />
          </IconButton>
        </div>
        <TrayContainer fetchedRoutes={fetchedRoutes} />
      </Drawer>
    </React.Fragment>
  );
};

export default TrayContainer;
