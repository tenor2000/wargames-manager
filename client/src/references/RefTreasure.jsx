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

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='locations' ? 'Location' : 'Resource'}</TableCell>
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('All') ? list : list.filter(item => sourceFilter.includes(item.source))
        return null;

        return filteredList.map(item => (
            <TableRow key={`${item.name}-${item.id}`}>
                <TableCell>{item.name}</TableCell>
            </TableRow>
        ))
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <HeaderRow type='arms' />
                                </TableHead>
                                <TableBody>
                                    <RenderTableRows list={refData.arms} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="armor-stats" aria-controls="armor-stats">
                <h3>{'General Armor'}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow type='armor' />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows list={refData.armor} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </AccordionDetails>
        </Accordion>
    </>
    );
}

export default TreasureReference