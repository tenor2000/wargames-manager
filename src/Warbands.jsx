import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicStatCard  } from './BasicComponents.jsx';
import { getSchoolFromId, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { CareerHistory } from './WarbandHistory.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { SoldierRosterBlock, EditSoldiersView } from './WarbandSoldiers.jsx';
import { ApprenticeView, WizardView } from './WarbandWizard.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Warbands.css';


export function WarbandView() {
    const { currentWizard } = useAppContext();
    const { loading, error } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
    return <div>Error loading data</div>;
    }

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
    const { loading, error, currentWizard, setCurrentWizard, setNewWizard, refData, setEditMode } = useAppContext();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const wizardsList = userData.myWizards
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(wizard => (
        <Button key={wizard.id} 
            className="spells-sidebar-item" 
            onClick={() => handleWizardClick(wizard)} 
            style = {{cursor: 'pointer'}}
        >
            {wizard.name} <br></br>
            Level {wizard.level} {getSchoolFromId(wizard.classId, refData).name}
        </Button>
    ));

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

    return (
        <div className="spells-sidebar-view">
            <h3 onClick={handleWarbandDashClick}
                style = {{cursor: 'pointer'}}
            >
                My Wizards
            </h3>

            {wizardsList}

            <div className="button-container center">
            <Divider/>
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
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const navigate = useNavigate();

    const userWizards = userData.myWizards;

    function handleNewWizardClick() {
        const starterWizard = {...refData.templates.wizard};
        starterWizard.name = getRandomName(refData.nameGenerator.wizard);
        setNewWizard(starterWizard);
        navigate('/new-wizard');
    }
    
    return (
        <div className ='center column' style={{width: '100%'}}>
            <div>
                {!isPortrait && <h2>Warband Manager</h2>}
            </div>
            <div>
                <p>Here you can edit, create, and delete your warbands.</p>
                <p>Here are some of your warband statistics:</p>
                <p>Total Wizards: {userWizards.length}</p>
                <p>Total Level Gained: {userWizards.reduce((total, wizard) => total + wizard.level, 0)}</p>
                <p>Total XP Gained: {userWizards.reduce((total, wizard) => total + wizard.xp + wizard.xpSpent, 0)}</p>
                <p>Total Soldiers Lost: {userWizards.reduce((total, wizard) => total + wizard.soldiersLost, 0)}</p>
            </div>
            <div className="button-container center">
                <Button onClick={handleNewWizardClick}>Start New Wizard</Button>
            </div>
        </div>
    );
}

function WarbandDetails() {
    const { currentWizard, editMode, setEditMode, setCurrentWizard, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const isLandscape = useMediaQuery('(max-height: 768px) and (orientation: landscape)');

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
            {!isPortrait && 
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h2>{currentWizard.name}</h2>
                    <Button onClick={handleWizardDeletion}>Retire Wizard</Button>
                </Box>
            }
            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>Wizard</h3>
            </AccordionSummary>
            <AccordionDetails className='center column'>
                <WizardView />
            </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="apprentice-stats" aria-controls="apprentice-stats">
                    <h3>Apprentice</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <ApprenticeView />
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="spell-book" aria-controls="spell-book-info">
                    <h3>Spell Book</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <SpellBookBlock/>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="hired-soldiers" aria-controls="hired-soldiers-info">
                    <h3>Hired Soldiers</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <SoldierRosterBlock/>}
                    {Object.keys(currentWizard.soldiers).length === 0 && !editMode.soldiers && <p>There are no soldiers in {currentWizard.name}'s roster.</p>}
                    {editMode.soldiers && <EditSoldiersView />}
                    {!editMode.soldiers && <Button onClick={() => handleEditClick('soldiers')}>Edit Roster</Button>}
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="vault" aria-controls="vault-info">
                    <h3>Vault</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <p>The Vault is where all treasure is stored</p>
                    <p>Gold: {currentWizard.gold}</p>
                    <p>XP: {currentWizard.xp}</p>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="base-of-operations" aria-controls="base-of-operations-info">
                    <h3>Base of Operations</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <p>Base of Operations Description</p>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="base-of-operations" aria-controls="base-of-operations-info">
                    <h3>Career History</h3>
                </AccordionSummary>
                <AccordionDetails className='center column'>
                    <CareerHistory userData={userData}/>
                </AccordionDetails>
            </Accordion>
            {isPortrait && 
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    
                    <Button onClick={handleWizardDeletion}>Retire Wizard</Button>
                </Box>
            }
        </>

    );
}