"use client";

import { useSearchContext } from "@/app/manage/users/layout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogBox = ({ isDialogOpen, closeDialog, confirmDelete }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ typography: "body1", color: "#CD211D" }} id="alert-dialog-title">
        {"Confirm Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ typography: "body2" }} id="alert-dialog-description">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
