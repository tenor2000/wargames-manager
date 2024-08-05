import React, {useEffect} from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { modSign, getCreatureFromId } from '../helperFuncs/HelperFunctions.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import { BasicAccordian, BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicComponents.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/Reference.css';

function ArmsReference({sourceFilter}) {
    const { refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const HeaderRow = () => {
        return (
            <TableRow>
                <TableCell>Weapon</TableCell>
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Damage Modifier</TableCell>}
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Maximum Range</TableCell>}
                {!isPortrait && <TableCell>Notes</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
                {isPortrait && <TableCell >Description</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('All') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={item.id}>
                <TableRow key={`${item.id}-${item.name}`} sx={{borderBottom: '1px solid #ccc'}}  id={item.id}>
                    <TableCell rowSpan = {isPortrait ? 3 : 1} sx={{textAlign: 'left'}}>{item.name}</TableCell>
                    <TableCell sx={{textAlign: isPortrait ? 'left' : 'center'}}>{isPortrait ? 'Damage Mod: ' : null}{modSign(item.damageMod)}</TableCell>
                    {!isPortrait && <TableCell sx={{textAlign: 'center'}}>{item.maxRange > 0 ? `${item.maxRange}"` : "-"}</TableCell>}
                    {!isPortrait && <TableCell sx={{textAlign: 'left'}}>{item.notes}</TableCell>}
                    {!isPortrait && <TableCell>{item.source}</TableCell>}
                </TableRow>
                {isPortrait && 
                    <>
                        <TableRow key={`${item.id}-${item.name}-Portrait1`}>
                            <TableCell sx={{textAlign: 'left'}}>Range: {item.maxRange > 0 ? `${item.maxRange}"` : "--"}</TableCell>
                        </TableRow>
                        {item.notes &&
                        <TableRow key={`${item.id}-${item.name}-Portrait2`}>
                            <TableCell sx={{textAlign: 'left'}}>{item.notes === '--' ? 'Notes: --' : item.notes}</TableCell>
                        </TableRow>}
                    </>
                }
            </React.Fragment>
        ))
    }

    return (
        <BasicAccordian title={'General Arms'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <HeaderRow />
                        </TableHead>
                        <TableBody>
                            <RenderTableRows list={refData.arms} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </BasicAccordian>
    );
}

export default ArmsReference