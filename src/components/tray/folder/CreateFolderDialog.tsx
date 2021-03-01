import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleFolderNameChange = (nameEvent: {
    currentTarget: { value: React.SetStateAction<string> };
  }) => {
    setFolderName(nameEvent.currentTarget.value);
  };

  const handleCreateFolder = () => {
    setButtonDisabled(true);
    const createFolderRequest = {
      name: folderName,
    };
    createFolder(createFolderRequest)
      .then(() => handleClose())
      .then(() => setButtonDisabled(false));
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create a new folder</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          Some text...
        </DialogContentText> */}
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Folder name"
          fullWidth
          onChange={handleFolderNameChange}
          value={folderName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={buttonDisabled} onClick={handleCreateFolder} color="primary">
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderDialog;
