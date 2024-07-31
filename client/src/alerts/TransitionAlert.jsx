import React from "react";
import { Box, Collapse, Alert, IconButton, Snackbar } from "@mui/material";
import { useAlert } from "../contexts/AlertContext";
import CloseIcon from '@mui/icons-material/Close';

export function TransitionAlert() {
  const { alerts, hideAlert } = useAlert();

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
  
export default TransitionAlert