import React from 'react';
import { getItemFromId } from '../helperFuncs/helperFunctions.js';
import { Box} from "@mui/material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, Tooltip } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export function HealthCounter({statsObj, currentHealth, handleChange}) {
  if (statsObj.status === 0 || statsObj.status === 2) {
    return  <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%' 
              }}
            >
              <b style={{color: 'gray'}}>
                Inactive
              </b>
            </Box>
  }

  let healthColor = 'inherit';
  if (currentHealth === 0) {
    healthColor = 'red';
  } else if (currentHealth === statsObj.statMods ? statsObj.statMods.health + statsObj.health : statsObj.health) {
    healthColor = 'green';
  }

  return (
    <Box sx={{ display: 'flex', gap:0 }}>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleChange('-')}
      >
        <ArrowLeftIcon />
      </IconButton>
      <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                padding: '0px 0px 0px 0px',
              }}
      >
        <b style={{ color: healthColor }}>{currentHealth}</b>
      </Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleChange('+')}

      >
        <ArrowRightIcon />
      </IconButton>
    </ Box>
  )
}