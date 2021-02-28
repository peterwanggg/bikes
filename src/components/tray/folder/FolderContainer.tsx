import React, { FunctionComponent, useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CreateFolderDialog from "./CreateFolderDialog";
import { retrieveAllFolders, RetrieveAllFoldersResponse } from "../../../api/backend";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

interface Props {
  openFolderDrawer: boolean;
}

interface Node {
  name: string;
  children: Node[];
}

// const buildFolderTree = (root: Node, folders: Folder[]): Node => {

//   folders.forEach((folder) => {

//   })
//   // const root = { name: "root", children: [] };

//   return root;
// };

const FolderContainer: FunctionComponent<Props> = (props: Props) => {
  const { openFolderDrawer } = props;
  const classes = useStyles();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = () => setAddDialogOpen(false);

  // const [retrievedFolders, setRetrievedFolders] = useState<RetrieveAllFoldersResponse>();
  const [rootFolder, setRootFolder] = useState<Node>();

  useEffect(() => {
    retrieveAllFolders().then((folders: RetrieveAllFoldersResponse) => {
      // setRootFolder(buildFolderTree(folders.data));
    });
  }, []);

  return (
    <Slide direction="right" in={openFolderDrawer} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="Applications">
            <TreeItem nodeId="2" label="Calendar" />
            <TreeItem nodeId="3" label="Chrome" />
            <TreeItem nodeId="4" label="Webstorm" />
          </TreeItem>
          <TreeItem nodeId="5" label="Documents">
            <TreeItem nodeId="10" label="OSS" />
            <TreeItem nodeId="6" label="Material-UI">
              <TreeItem nodeId="7" label="src">
                <TreeItem nodeId="8" label="index.js" />
                <TreeItem nodeId="9" label="tree-view.js" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeView>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddDialogOpen}
        >
          New Folder
        </Button>
        <CreateFolderDialog open={addDialogOpen} handleClose={handleAddDialogClose} />
      </div>
    </Slide>
  );
};

export default FolderContainer;
