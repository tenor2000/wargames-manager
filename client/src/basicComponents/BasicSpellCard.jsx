import React from 'react';
import { getSpellFromId } from '../helperFuncs/HelperFunctions.js';
import { useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function BasicSpellCard({spellId, refData, titlebar=true, castnum=false, spellSchoolMod=false}) {
  const spellViewObj = getSpellFromId(spellId, refData)
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  if (isPortrait) {
    return (
      <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <Table >
          <TableHead >
              {titlebar && 
                <TableRow>
                <TableCell colSpan={castnum ? 4 : 3} sx={{ textAlign: 'center'}}>
                  <h2>{spellViewObj.name}</h2>
                </TableCell>
              </TableRow>}
              {!titlebar &&
                <TableRow>
                  <TableCell colSpan={castnum ? 4 : 3} sx={{ textAlign: 'center'}}>
                    <h3>School: {spellViewObj.school}</h3>
                  </TableCell>
                </TableRow>
              }
          </TableHead>
          <TableBody sx={{ '& td': { textAlign: 'center', flex: 1 } }}>
            <TableRow>
              {titlebar && <TableCell sx={{ width: '50%' }}>{spellViewObj.school}</TableCell>}
              {!castnum && <TableCell sx={{ width: '50%'}}>Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>}
              <TableCell sx={{ width: '50%' }}>{spellViewObj.category}</TableCell>
            </TableRow>
            {castnum && 
              <TableRow>
                <TableCell sx={{ width: '50%' }}>Cast Number: {castnum}</TableCell>
                <TableCell sx={{ width: '50%' }}>Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>
              </TableRow>
            }
            <TableRow>
              <TableCell colSpan={castnum ? 2 : 3}>{spellViewObj.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <Table size='small' >
        <TableHead >
          {titlebar && 
            <TableRow>
              <TableCell sx={{ textAlign: 'center', width: '25%'}}>
                <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', width: '75%'}}>Description</TableCell>
            </TableRow>
          }
          {!titlebar && 
            <TableRow>
              <TableCell sx={{ textAlign: 'center', width: '25%'}}></TableCell>
              <TableCell sx={{ textAlign: 'center', width: '75%'}}>Description</TableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody sx={{ '& td': { textAlign: 'left'} }}>
          <TableRow>
            <TableCell sx={{ width: '25%' }}>School: {spellViewObj.school}</TableCell>
            <TableCell rowSpan={4} sx={{ width: '75%' }}>{spellViewObj.description}</TableCell>
          </TableRow>
          {castnum && 
            <TableRow>
              <TableCell >Cast Number: {castnum}</TableCell>
            </TableRow>
          }
          <TableRow>
            <TableCell >Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >Category: {spellViewObj.category}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default BasicSpellCard