import React, { useEffect }from "react";
import { Box, Collapse, Alert, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from "@mui/material";
import { useAlert } from "../contexts/AlertContext";
import CloseIcon from '@mui/icons-material/Close';


export function DialogAlert() {
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

export function TransitionAlert() {
  const { alerts, showAlerts, hideAlert } = useAlert();

  return (
    <Box>
      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => hideAlert(alert.id)}
          TransitionComponent={Collapse}
          autoHideDuration={6000}
          sx={{ mt: index * 8 }}
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  hideAlert(alert.id);
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
      ))}
    </ Box>
    );
}
