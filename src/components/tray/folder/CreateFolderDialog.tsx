import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { FunctionComponent, useState } from "react";
import { createFolder } from "../../../api/backend";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateFolderDialog: FunctionComponent<Props> = (props: Props) => {
  const { open, handleClose } = props;
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (nameEvent: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setFolderName(nameEvent.currentTarget.value);
  };

  const handleCreateFolder = () => {
    const createFolderRequest = {
      name: folderName,
    };
    createFolder(createFolderRequest).then(() => handleClose());
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates
          occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          fullWidth
          onChange={handleFolderNameChange}
          value={folderName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateFolder} color="primary">
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// const createFolder =

export default CreateFolderDialog;
