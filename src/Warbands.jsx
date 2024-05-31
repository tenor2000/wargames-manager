import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandBox, BasicStatCard  } from './BasicComponents.jsx';
import { getSchoolFromId, deriveApprenticeStats, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { SoldierRosterBlock, EditSoldiersView } from './WarbandSoldiers.jsx';
import { ApprenticeView } from './WarbandApprentice.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Warbands.css';


export function WarbandView() {
    const { currentWizard, setCurrentWizard } = useAppContext();

    return (
        <div className="warband-view">
            {!currentWizard && <WarbandDash />}
            {currentWizard && <WarbandDetails />}
        </div>
    );
}

export function WarbandSideDrawer() {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { currentWizard, setCurrentWizard, setNewWizard, refData, setEditMode } = useAppContext();
    
    function handleWarbandDashClick() {
        setCurrentWizard(null)
    }

    function handleWizardClick(wizard) {
        setEditMode({wizards: false, apprentice: false, spellbook: false, soldier: false, vault: false, base: false});
        setCurrentWizard(wizard)
    }

    function handleNewWizardClick() {

        setNewWizard(refData.templates.wizard);
        navigate('/new-wizard');
    }

    const wizardsList = userData.myWizards.map(wizard => (
        <div key={wizard.id} className="sidedrawer-item" onClick={() => handleWizardClick(wizard)}>
            {wizard.name} <br/> 
            {getSchoolFromId(wizard.stats.classId).name} - Level {wizard.stats.level}
        </div>
    ))

    return (
        <div className="sidedrawer-view">
            <h3 onClick={handleWarbandDashClick}
                style = {{cursor: 'pointer'}}>
                    My Wizards
            </h3>
            <ul>
                {wizardsList}
            </ul>
            <div className="button-container center">
            <Button onClick={() => handleNewWizardClick()}>
                + New Wizard
            </Button>
            </div>
        </div>
    );
}


function WarbandDash() {
    const { userData } = useAuth();
    const { setNewWizard, refData } = useAppContext();
    const navigate = useNavigate();

    const userWizards = userData.myWizards;

    function handleNewWizardClick() {
        const starterWizard = {...refData.templates.wizard};
        starterWizard.name = getRandomName(refData.nameGenerator.wizard);
        setNewWizard(starterWizard);
        navigate('/new-wizard');
    }
    
    return (
        <div className ='center column'>
            <div>
                <h2>Warband Manager</h2>
            </div>
            <div>
                <p>Here you can edit, create, and delete your warbands.</p>
                <p>Here are some of your warband statistics:</p>
                <p>Total Wizards: {userWizards.length}</p>
                <p>Total Level Gained: {userWizards.reduce((total, wizard) => total + wizard.stats.level, 0)}</p>
                <p>Total XP Gained: {userWizards.reduce((total, wizard) => total + wizard.xpGained, 0)}</p>
                <p>Total Soldiers Lost: {userWizards.reduce((total, wizard) => total + wizard.soldiersLost, 0)}</p>
            </div>
            <div className="button-container center">
                <Button onClick={handleNewWizardClick}>Start New Wizard</Button>
            </div>
        </div>
    );
}

function WarbandDetails() {
    const { currentWizard, editMode, setEditMode, setCurrentWizard } = useAppContext();
    const { userData, setUserData } = useAuth();

    const wizardStats = currentWizard.stats;

    wizardStats['class'] = getSchoolFromId(wizardStats.classId).name;

    function handleEditClick(section) {
        const newEditMode = {...editMode};
        newEditMode[section] = true;
        setEditMode(newEditMode);
    }

    function handleWizardDeletion() {
        if (window.confirm('Are you sure you want to \'retire\' this wizard?')) {
            const newUserData = {...userData};
            newUserData.myWizards = newUserData.myWizards.filter(wizard => wizard.id !== currentWizard.id);
            setUserData(newUserData);
            setCurrentWizard(null)
        };
    }

    return (
        <>
            <Box>
                <h2>{currentWizard.name}</h2>
                <Button onClick={handleWizardDeletion}>Retire Wizard</Button>
            </Box>
            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>{'Wizard'}</h3>
            </AccordionSummary>
            <AccordionDetails className='center column'>
                <BasicStatCard name={currentWizard.name} stats = {wizardStats}/>
            </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="apprentice-stats" aria-controls="apprentice-stats">
                    <h3>{'Apprentice'}</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <ApprenticeView />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="spell-book" aria-controls="spell-book-info">
                    <h3>{'Spell Book'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <SpellBookBlock/>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="hired-soldiers" aria-controls="hired-soldiers-info">
                    <h3>{'Hired Soldiers'}</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <SoldierRosterBlock/>}
                    {Object.keys(currentWizard.soldiers).length === 0 && <p>There are no soldiers in {currentWizard.name}'s roster.</p>}
                    {editMode.soldiers && <EditSoldiersView />}
                    {!editMode.soldiers && <Button onClick={() => handleEditClick('soldiers')}>Edit Roster</Button>}
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="vault" aria-controls="vault-info">
                    <h3>{'Vault'}</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <p>The Vault is where all treasure is stored</p>
                    <p>Gold: {currentWizard.gold}</p>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="base-of-operations" aria-controls="base-of-operations-info">
                    <h3>{'Base of Operations'}</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <p>Base of Operations Description</p>
                </AccordionDetails>
            </Accordion>
        </>

    );
}