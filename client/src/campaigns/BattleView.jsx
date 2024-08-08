import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { deriveApprenticeStats, getCreatureFromId, rollD20, getRandomSpell, getScenarioFromId, getSchoolFromId  } from '../helperFuncs/HelperFunctions.js';
import { formSoldierStats } from '../warbands/WarbandSoldiers.jsx';
import { BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicStatTable.jsx';
import BasicAccordian from '../basicComponents/BasicAccordian.jsx';
import BasicStatCard from '../basicComponents/BasicStatCard.jsx';
import { SpellBookView } from '../warbands/WarbandSpellbook.jsx';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';

export function BattleView({handleView}) {
    const { userData, setUserData } = useAuth();
    const { refData, currentWizard, currentCampaignData,loading, error } = useAppContext();
    
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    
    // if (error) {
    //     return <div>Error loading data</div>;
    // }

    const handleSave = (scenarioId) => {
        let currentScenario = currentCampaignData.campaign.scenarios.find(scenario => scenario.id === scenarioId);
        // currentScenario.

        // POST goes here
        setUserData((prev) => ({ ...prev,  }));
        handleView(null);
    }
    
    return (
        <>
            <h2>Battle View</h2>
            <BasicAccordian title="Roster" >
                {!isPortrait && <RosterTableView refData={refData} currentWizard={currentWizard} />}
                {isPortrait && <RosterCardView refData={refData} currentWizard={currentWizard} />}
            </BasicAccordian>
            <BasicAccordian title="Spell Book" >
                <SpellBookView />
            </BasicAccordian>
            <BasicAccordian title="Creatures" >
                <CreatureRosterBlock />
            </BasicAccordian>
            <BasicAccordian title="Opponent's Warband" >
                <OpponentRosterBlock />
            </BasicAccordian>
            <BasicAccordian title="Toolbox" >
                <ToolBox refData={refData} currentWizard={currentWizard} />
            </BasicAccordian>
            <Box sx={{textAlign: 'center'}}>
                <Button onClick={() => handleSave(null)}>Save</Button>
                <Button onClick={() => handleView('report')}>End Battle</Button>
            </Box>
        </>
    );
}

function RosterTableView({refData, currentWizard}) {

    if (!currentWizard) {
        return <b>You must select a wizard</b>;
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

function RosterCardView({refData, currentCampaignData}) {

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

function CreatureRosterBlock() {
    return "Coming Soon..."
}

function OpponentRosterBlock() {
    return "Coming Soon..."
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

export function BattleViewSideDrawer() {
    const { currentWizard, refData } = useAppContext();
    return (
        <div>
            <CreatureRosterBlock />
            <OpponentRosterBlock />
            <ToolBox refData={refData} currentWizard={currentWizard} />
        </div>
    );
}