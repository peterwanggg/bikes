import React, { useState, useEffect, FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, CssBaseline, Drawer, IconButton, Toolbar } from "@material-ui/core";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import { RoutesResponse, fetchRoutes } from "./api/backend";
import MapContainer from "./components/map/MapContainer";
import TrayContainer from "./components/tray/TrayContainer";
import { KeyboardArrowDown } from "@material-ui/icons";

const drawerHeight = 340;
const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //   },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  //   appBarShift: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //     transition: theme.transitions.create(["margin", "width"], {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //   },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
  //   hide: {
  //     display: "none",
  //   },
  drawer: {
    height: drawerHeight,
    flexShrink: 0,
  },
  //   drawerPaper: {
  //     width: drawerWidth,
  //   },
  drawerIcon: {
    display: "flex",
    alignItems: "right",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  //   content: {
  //     flexGrow: 1,
  //     padding: theme.spacing(3),
  //     transition: theme.transitions.create("margin", {
  //       easing: theme.transitions.easing.sharp,
  //       duration: theme.transitions.duration.leavingScreen,
  //     }),
  //     marginLeft: -drawerWidth,
  //   },
  //   contentShift: {
  //     transition: theme.transitions.create("margin", {
  //       easing: theme.transitions.easing.easeOut,
  //       duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     marginLeft: 0,
  //   },
}));

const App: FunctionComponent = () => {
  const classes = useStyles();
  // const theme = useTheme();

  const [fetchedRoutes, setFetchedRoutes] = useState<RoutesResponse>();

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchRoutes(setFetchedRoutes);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <MapContainer fetchedRoutes={fetchedRoutes} />
      <div className={classes.offset} />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit" onClick={handleDrawerOpen}>
            <UnfoldMoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        // className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={open}
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

export default App;
