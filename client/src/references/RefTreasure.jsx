import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { BasicAccordian } from '../basicComponents/BasicComponents.jsx';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function TreasureReference({sourceFilter}) {
    const { refData } = useAppContext();

    // WIP

    // Temp
    return (
        <BasicAccordian title={'Treasure'} >
            <Paper className="generic-paper" sx={{ width: '80%', overflow: 'hidden'}}>
                <p>Coming Soon</p>
            </Paper>
        </BasicAccordian>
    )
    // End Temp
}

export default TreasureReference