import React, {useEffect} from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { modSign, getCreatureFromId } from '../helperFuncs/HelperFunctions.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import { BasicAccordian, BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicComponents.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import '../styles/Reference.css';

function CreatureReference({sourceFilter}) {
    const { refData } = useAppContext();
    const isPortrait = useMediaQuery('(orientation: portrait) and (max-width: 768px)');

    const filteredList = sourceFilter.includes('All') ? refData.creatures : refData.creatures.filter(creature => sourceFilter.includes(creature.source));

    function RenderCreatureCards({ creatureList }) {
        return creatureList.map(creature => (
            <BasicStatCard 
                key={`creature-${creature.id}`} 
                statsObj = {creature} 
            />
        ))
    }

    return (
        <BasicAccordian title={'Creatures'} >
            {!isPortrait && 
                <BasicStatTableHeader
                    showClass={true}
                    showSource={true}
                >
                    {filteredList.map((creature, index) => (
                        <BasicStatTableRow 
                        key={`creature-${creature.id}`}
                        statsObj = {creature}
                        />
                    ))}
                </BasicStatTableHeader>
            }
            {isPortrait && <RenderCreatureCards creatureList={filteredList}/>}
        </BasicAccordian> 
    );
}

export default CreatureReference