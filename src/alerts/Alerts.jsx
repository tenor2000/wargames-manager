import React, { useEffect }from "react";
import { Box, Collapse, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from "@mui/material";
import { useAlert } from "../contexts/AlertContext";
import CloseIcon from '@mui/icons-material/Close';


export function AlertDialog() {
    const { alertDialog, hideAlert } = useAlert();

    const handleCancel = () => {
        hideAlert();
        return false
    }

    const handleOk = () => {
        hideAlert();
        return true
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
                <Button onClick={handleOk}>ok</Button>
            </DialogActions>
        </Dialog>
    );
}

export function TransitionAlert() {
  const { alert, showAlert, hideAlert } = useAlert();

  return (
    <Snackbar
      open={alert.open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={() => hideAlert()}
      TransitionComponent={Collapse}
      autoHideDuration={6000}
    >
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              hideAlert();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={alert.severity}
        sx={{ mb: 2 }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
