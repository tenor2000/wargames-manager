import React, {useEffect} from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import modSign from '../helperFuncs/modSign.js';
import { useMediaQuery } from '@mui/material';
import BasicAccordian from '../basicComponents/BasicAccordian.jsx';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ArmorReference({sourceFilter}) {
    const { refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    
    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >Armor</TableCell>
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Armor Modifier</TableCell>}
                {!isPortrait && <TableCell>Notes</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
                {isPortrait && <TableCell>Description</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('All') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={item.id}>
                <TableRow key={`${item.id}-main`}>
                    <TableCell rowSpan = {isPortrait ? 2 : 1} sx={{textAlign: 'left'}}>{item.name}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{isPortrait ? `Armor Mod: ${modSign(item.armorMod)}` : modSign(item.armorMod)}</TableCell>
                    {!isPortrait && <TableCell sx={{textAlign: 'left'}}>{item.notes}</TableCell>}
                    {!isPortrait && <TableCell>{item.source}</TableCell>}
                </TableRow>
                {isPortrait && 
                    <TableRow key={`${item.name}-notes`}>
                         <TableCell >{item.notes}</TableCell>
                    </TableRow>}
            </React.Fragment>
        ))
    }
    
    return (
        <BasicAccordian title={'General Armor'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
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
        </BasicAccordian>
    );
}

export default ArmorReference