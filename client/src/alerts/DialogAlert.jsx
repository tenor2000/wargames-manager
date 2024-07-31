import React, { useEffect } from "react";
import { Box, Collapse, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from "@mui/material";
import { useAlert } from "../contexts/AlertContext";
import CloseIcon from '@mui/icons-material/Close';


function DialogAlert() {
    const { alertDialog, hideDialogAlert } = useAlert();

    const handleCancel = () => {
      alertDialog.resolve(false)
      hideDialogAlert();
    }

    const handleOk = () => {
      alertDialog.resolve(true)
      hideDialogAlert();
    }
    
    return (
        <Dialog
            open={alertDialog.open}
            onClose={handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{alertDialog.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {alertDialog.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>cancel</Button>
                <Button onClick={handleOk} autoFocus>ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogAlert