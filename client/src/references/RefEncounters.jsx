import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { getCreatureFromId } from '../helperFuncs/HelperFunctions.js';
import {  useMediaQuery } from '@mui/material';
import { BasicAccordian } from '../basicComponents/BasicComponents.jsx';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../styles/Reference.css';

function RandomEncounterReference({sourceFilter}) {
    const { refData  } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const HeaderRow = () => {
        return (
            <>
                <TableRow>
                    <TableCell>First Die Roll</TableCell>
                    <TableCell>1-12</TableCell>
                    <TableCell>13-18</TableCell>
                    <TableCell>19-20</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Second Die Roll</TableCell>
                    <TableCell>Level 1 Encounter</TableCell>
                    <TableCell>Level 2 Encounter</TableCell>
                    <TableCell>Level 3 Encounter</TableCell>
                </TableRow>
            </>
        );
    };

    function RenderTableRows() {
        const level1 = refData.randomEncounterTable[0]
        const level2 = refData.randomEncounterTable[1]
        const level3 = refData.randomEncounterTable[2]

        const dataRows = []

        for (let i = 1; i <= 20; i++) {
            let creatureNameL1 = getCreatureFromId(level1.rollResults[i][0], refData).class
            let creatureNameL2 = getCreatureFromId(level2.rollResults[i][0], refData).class
            let creatureNameL3 = getCreatureFromId(level3.rollResults[i][0], refData).class

            const creatureCountL1 = level1.rollResults[i][1] > 1 ? `s (${level1.rollResults[i][1]})` : '';
            const creatureCountL2 = level2.rollResults[i][1] > 1 ? `s (${level2.rollResults[i][1]})` : '';
            const creatureCountL3 = level3.rollResults[i][1] > 1 ? `s (${level3.rollResults[i][1]})` : '';

            creatureNameL1 = creatureNameL1.endsWith('olf') && level1.rollResults[i][1] > 1 ? creatureNameL1.slice(0, -3) + 'olve' : creatureNameL1;
            creatureNameL2 = creatureNameL2.endsWith('olf') && level2.rollResults[i][1] > 1 ? creatureNameL2.slice(0, -3) + 'olve' : creatureNameL2;
            creatureNameL3 = creatureNameL3.endsWith('olf') && level3.rollResults[i][1] > 1 ? creatureNameL3.slice(0, -3) + 'olve' : creatureNameL3;
            
            dataRows.push(
                <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{creatureNameL1}{creatureCountL1}</TableCell>
                    <TableCell>{creatureNameL2}{creatureCountL2}</TableCell>
                    <TableCell>{creatureNameL3}{creatureCountL3}</TableCell>
                </TableRow>
            )
        }

        return (
            <>
                {dataRows}
            </>
        )
    }

    return (
        <BasicAccordian title={'Random Encounter Table'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <HeaderRow />
                        </TableHead>
                        <TableBody>
                            <RenderTableRows />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </BasicAccordian>
    );
}

export default RandomEncounterReference