import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useMediaQuery } from '@mui/material';
import { BasicAccordian, BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicComponents.jsx';
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