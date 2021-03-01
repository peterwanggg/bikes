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
import {
  FolderIncludes,
  retrieveAllFolders,
  RetrieveAllFoldersResponse,
} from "../../../api/backend";
import _ from "lodash";
import { Folder } from "../../../types/types";

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
  id: string;
  name: string;
  children: { [id: string]: Node };
}

const buildRootNodes = (folders: Folder[]): Node[] => {
  const folderNodeMap = _.fromPairs(
    _.map(folders, (folder) => {
      return [
        folder.id.toString(),
        {
          folder: folder,
          node: { id: folder.id.toString(), name: folder.name, children: {} } as Node,
        },
      ];
    })
  );

  return _.map(folderNodeMap, (value) => {
    const { folder, node } = value;

    // build child connections
    folder.childPaths.forEach((childPath) => {
      const childId = childPath.childFolderId.toString();
      const childNode = folderNodeMap[childId].node;
      node.children[childId] = childNode;
    });

    // Only return top level
    if (folder.folderDepth === 0) {
      return node;
    }
    return null;
  }).filter((node) => node !== null) as Node[];
};

const renderTree = (nodes: Node) => (
  <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
    {!_.isEmpty(nodes.children)
      ? _.map(nodes.children, (node) => renderTree(node))
      : null}
  </TreeItem>
);

const FolderContainer: FunctionComponent<Props> = (props: Props) => {
  const { openFolderDrawer } = props;
  const classes = useStyles();

  const [rootNodes, setRootNodes] = useState<Node[]>([]);

  const refreshRootNodes = async () =>
    retrieveAllFolders([FolderIncludes.childPaths]).then(
      (resp: RetrieveAllFoldersResponse) => {
        const rootNodes = buildRootNodes(resp.data);
        setRootNodes(rootNodes);
      }
    );

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogClose = async () => {
    await refreshRootNodes();
    setAddDialogOpen(false);
  };

  useEffect(() => {
    refreshRootNodes();
  }, []);

  const topNodes = rootNodes.map((rootNode) => renderTree(rootNode));

  return (
    <Slide direction="right" in={openFolderDrawer} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {topNodes}
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
