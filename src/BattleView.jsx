import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import { useAuth } from './AuthContext.jsx';
import { deriveApprenticeStats, getCreatureFromId, rollD20, getRandomSpell, getScenarioFromId, getSchoolFromId  } from './HelperFunctions.js';
import { formSoldierStats } from './WarbandSoldiers.jsx';
import { BasicAccordian, BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from './BasicComponents.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export function BattleView() {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { refData, currentWizard, loading, error } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }
    
    return (
        <>
            <h2>Battle View</h2>
            <BasicAccordian title="Roster" >
                {!isPortrait && <BattleTable refData={refData} currentWizard={currentWizard} />}
                {isPortrait && <BattleCardView refData={refData} currentWizard={currentWizard} />}
            </BasicAccordian>
            <BasicAccordian title="Spell Book" >
                <SpellBookBlock />
            </BasicAccordian>
            <BasicAccordian title="Toolbox" >
                <ToolBox refData={refData} currentWizard={currentWizard} />
            </BasicAccordian>
        </>
    );
}

function BattleTable({refData, currentWizard}) {

    if (!currentWizard) {
        return null;
    }

    const wizardStats = {...currentWizard};
    wizardStats['class'] = getSchoolFromId(wizardStats.classId, refData).name;

    const apprenticeStats = deriveApprenticeStats(wizardStats, wizardStats.apprentice);
    apprenticeStats.cost = (wizardStats.level-6)*10 + 160;

    const soldierList = formSoldierStats(wizardStats.soldiers, refData);

    return (
        <>
            <BasicStatTableHeader showName={true} showClass={true} showStatus={true} showItemSlots={true} showDamage={true} >
                <BasicStatTableRow statsObj={wizardStats} refData={refData} />
                <BasicStatTableRow statsObj={apprenticeStats} refData={refData} />
                {soldierList.map((soldier, index) => (
                    <BasicStatTableRow key={index} statsObj = {soldier} refData={refData} />
                ))}
            </BasicStatTableHeader>
        </>
    );
}

function BattleCardView({refData, currentWizard}) {

    if (!currentWizard) {
        return null;
    }

    const wizardStats = {...currentWizard};
    wizardStats['class'] = getSchoolFromId(wizardStats.classId, refData).name;

    const apprenticeStats = deriveApprenticeStats(wizardStats, wizardStats.apprentice);
    apprenticeStats.cost = (wizardStats.level-6)*10 + 160;

    const soldierList = formSoldierStats(wizardStats.soldiers, refData);
    
    return (
        <>
            <BasicStatCard statsObj={wizardStats} refData={refData} showStatus={true} showItemSlots={true} battleMode={true}/>
            <BasicStatCard statsObj={apprenticeStats} refData={refData} showStatus={true} showItemSlots={true} battleMode={true}/>
            {soldierList.map((soldier, index) => (
                <BasicStatCard key={index} statsObj = {soldier} refData={refData} showStatus={true} showItemSlots={true} battleMode={true}/>
            ))}
        </>
    );
}

function ToolBox({refData, currentWizard}) {
    const [ viewer, setViewer ] = useState(null);
    const [ rollColor, setRollColor ] = useState(null);

    const handleRoll = () => {
        const roll = rollD20();
        let message;
        let color;
        if (roll === 1) {
            message = `Roll: ${roll}`;
            color = 'red';
        } else if (roll === 20) {
            message = `Roll: ${roll}`;
            color = 'green';
        } else {
            message = `Roll: ${roll}`;
            color = null;
        }
        setViewer(message);
        setRollColor(color);
    }

    const handleRandomEncounter = () => {
        const directions = ['North', 'South', 'East', 'West'];
        const firstRoll = rollD20();
        const secondRoll = rollD20();
        console.log(`Rolls: ${firstRoll}, ${secondRoll}`)
        const encounterLevelTable = refData.randomEncounterTable.find((table) => table.firstRollRange.includes(firstRoll));
        const [ creatureId, creatureNumber ] = encounterLevelTable.rollResults[secondRoll];
        const creature = getCreatureFromId(creatureId, refData).class

        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const message = `Encounter: ${creature} x${creatureNumber} coming from the ${randomDirection}!`;
        setViewer(message);
    }

    const handleSoldierSurvival = () => {
        const roll = rollD20();
        let message;
        const survivalTable = refData.survivalTables.soldierTable
        const result = survivalTable.find((table) => table.rollRange.includes(roll));
        message = `Roll: ${roll}, ${result.name} - ${result.effect}`
        setViewer(message)
    }

    const handleWizardSurvival = () => {
        const firstRoll = rollD20();
        const secondRoll = rollD20();
        let message;
        const survivalTable = refData.survivalTables.wizardTable
        const result = survivalTable.find((table) => table.rollRange.includes(firstRoll));
        if (result.name === 'Permanent Injury') {
            const permInjury = refData.permanentInjuryTable.find((injury) => injury.rollRange.includes(secondRoll));
            message = `Roll: ${firstRoll}, ${result.name}! - Roll: ${secondRoll}, ${permInjury.effect}`;
        } else {
            message = `Roll: ${firstRoll}, ${result.name} - ${result.effect}`;
        }
        setViewer(message);
    }

    const handleRandomGrimoire = () => {
      // This doesn't use the table in the rulebook because its equal randomness
      const spell = getRandomSpell(refData);
      const spellId = spell.id
      const message = `Grimoire: ${spell.name}! Spell ID: ${spellId}`;
      setViewer(message);
    }

    return (
        <>
            <Box className="campaigns-container" sx={{ width: '100%', textAlign: 'center' }}>              
                    {viewer && (
                        <p style={rollColor && { color: rollColor }}>{viewer}</p>
                    )}
                </Box>
            <Box>
                <Button onClick={handleRandomEncounter}>Random Encounter</Button>
                <Button onClick={handleRoll}>Roll a D20</Button>
                <Button onClick={handleSoldierSurvival}>Soldier Survival</Button>
                <Button onClick={handleWizardSurvival}>Wizard Survival</Button>
                <Button onClick={handleRandomGrimoire}>Random Grimoire</Button>
            </Box>
        </>
    );
}