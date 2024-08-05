import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useMediaQuery } from '@mui/material';
import { BasicAccordian } from '../basicComponents/BasicComponents.jsx';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../styles/Reference.css';

function BaseReference({sourceFilter}) {
    const { refData } = useAppContext();
    const isPortrait = useMediaQuery('(orientation: portrait) and (max-width: 768px)');

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='locations' ? 'Location' : 'Resource'}</TableCell>
                {type!=='locations' && !isPortrait && <TableCell sx={{textAlign: 'center'}}>Cost</TableCell>}
                {!isPortrait && <TableCell>Effects</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list, type=false}) {
        const filteredList = sourceFilter.includes('All') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={`${item.name}-${item.id}`}>
                {!isPortrait && <TableRow key={`${item.name}-${item.id}-1`} >
                    <TableCell>{item.name}</TableCell>
                    {type!=='locations' && <TableCell sx={{textAlign: 'center'}}>{item.cost}gc</TableCell>}
                    <TableCell>{item.effects}</TableCell>
                    <TableCell>{item.source}</TableCell>
                </TableRow>
                }
                {isPortrait && <TableRow key={`${item.name}-${item.id}-2`} >
                    <TableCell>
                        <BasicAccordian title={type!==false ? item.name : `${item.name} - ${item.cost}gc`} >
                            {item.effects}
                        </BasicAccordian>
                    </TableCell>
                </TableRow>
                }
            </ React.Fragment>
        ))
    }

    return (
        <>
            <BasicAccordian title={'Base Locations'} >
                <Paper className="generic-paper" sx={{ width: isPortrait ? '320px' : '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow type='locations' />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows list={refData.baseLocations} type='locations'/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </BasicAccordian>

            <BasicAccordian title={'Base Resources'} >
                <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow type='resources' />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows list={refData.baseResources} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </BasicAccordian>
        </>
    );
}

export default BaseReference