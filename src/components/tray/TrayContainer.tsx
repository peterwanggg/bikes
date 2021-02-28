import React, { useState, FunctionComponent } from "react";

import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { RoutesResponse } from "../../api/backend";
import RoutesTable from "./RoutesTable";
import FolderContainer from "./folder/FolderContainer";
import { Unit } from "../../types/types";
import { KeyboardArrowDown } from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import Box from "@material-ui/core/Box";
import { amber } from "@material-ui/core/colors";

interface Props {
  fetchedRoutes: RoutesResponse | undefined;
  handleTrayClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },

  amberClosed: {
    color: theme.palette.getContrastText(amber["A400"]),
    backgroundColor: amber["A400"],
    "&:hover": {
      backgroundColor: amber["A700"],
    },
  },
  amberOpen: {
    color: theme.palette.getContrastText(amber["A100"]),
    backgroundColor: amber["A100"],
    "&:hover": {
      backgroundColor: amber["A200"],
    },
  },
}));

const TrayContainer: FunctionComponent<Props> = (props: Props) => {
  const { fetchedRoutes, handleTrayClose } = props;
  if (!fetchedRoutes) {
    return null;
  }

  const classes = useStyles();

  const [folderMenuOpen, setFolderMenuOpen] = useState(true);
  const handleFolderClick = () => setFolderMenuOpen(!folderMenuOpen);
  const folderIcon = folderMenuOpen ? <FolderOpenRoundedIcon /> : <FolderRoundedIcon />;
  const folderClass = folderMenuOpen ? classes.amberOpen : classes.amberClosed;

  return (
    <React.Fragment>
      <Toolbar>
        <Button
          variant="contained"
          color="primary"
          startIcon={folderIcon}
          onClick={handleFolderClick}
          className={folderClass}
        >
          Folders
        </Button>

        <section className={classes.rightToolbar}>
          <IconButton edge="end" onClick={handleTrayClose}>
            <KeyboardArrowDown />
          </IconButton>
        </section>
      </Toolbar>

      <Box display="flex" flexDirection="row">
        <FolderContainer openFolderDrawer={folderMenuOpen} />
        <RoutesTable fetchedRoutes={fetchedRoutes} unit={Unit.Imperial} />
      </Box>
    </React.Fragment>
  );
};

export default TrayContainer;
