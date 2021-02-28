import React, { useState, useEffect, FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, CssBaseline, Drawer, IconButton, Toolbar } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import { RetrieveAllRoutesResponse, retrieveAllRoutes } from "./api/backend";
import MapContainer from "./components/map/MapContainer";
import TrayContainer from "./components/tray/TrayContainer";

const drawerHeight = 340;
const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  drawer: {
    height: drawerHeight,
    flexShrink: 0,
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

const App: FunctionComponent = () => {
  const classes = useStyles();
  const [retrievedRoutes, setRetrievedRoutes] = useState<RetrieveAllRoutesResponse>();

  // Tray
  const [openTray, setOpenTray] = useState(true);
  const handleTrayOpen = () => {
    setOpenTray(true);
  };
  const handleTrayClose = () => {
    setOpenTray(false);
  };

  useEffect(() => {
    retrieveAllRoutes().then((routes: RetrieveAllRoutesResponse) => {
      setRetrievedRoutes(routes);
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <MapContainer fetchedRoutes={retrievedRoutes} />
      <div className={classes.offset} />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit" onClick={handleTrayOpen}>
            <UnfoldMoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="persistent" anchor="bottom" open={openTray}>
        <TrayContainer fetchedRoutes={retrievedRoutes} handleTrayClose={handleTrayClose} />
      </Drawer>
    </React.Fragment>
  );
};

export default App;
