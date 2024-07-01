import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicStatCard, BasicAccordian } from './BasicComponents.jsx';
import { getSchoolFromId, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { CareerHistory } from './WarbandHistory.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { SoldierRosterBlock, EditSoldiersView } from './WarbandSoldiers.jsx';
import { ApprenticeView, WizardView } from './WarbandWizard.jsx';
import { BaseView } from './WarbandBase.jsx';
import { VaultView } from './WarbandVault.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Warbands.css';


export function WarbandView() {
    const { userData } = useAuth();
    const { currentWizard, setNewWizard } = useAppContext();
    const { loading, error, refData } = useAppContext();
    const navigate = useNavigate();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
    return <div>Error loading data</div>;
    }

    const userWizards = userData.myWizards;

    function handleNewWizardClick() {
        const newName = getRandomName(refData.nameGenerator.wizard);
        console.log(newName)
        const updatedWizards = { ...refData.templates.wizard, name: newName };
        setNewWizard(updatedWizards);
        navigate('/new-wizard');
    }

    return (
        <>
            {!currentWizard && 
                <>
                    <Box className ='center column' style={{width: '100%'}}>
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
                    </Box>
                </>}
            {currentWizard && <WarbandDetails />}
        </>
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
        const newName = getRandomName(refData.nameGenerator.wizard);
        console.log(newName)
        const updatedWizards = { ...refData.templates.wizard, name: newName };
        setNewWizard(updatedWizards);
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

            <BasicAccordian title={'Wizard'} >
                <WizardView />
            </BasicAccordian>

            <BasicAccordian title={'Apprentice'} >
                <ApprenticeView />
            </BasicAccordian>

            <BasicAccordian title={'Spell Book'} >
                <SpellBookBlock />
            </BasicAccordian>

            <BasicAccordian title={'Soldiers'} >
                {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <SoldierRosterBlock/>}
                {Object.keys(currentWizard.soldiers).length === 0 && !editMode.soldiers && <p>There are no soldiers in {currentWizard.name}'s roster.</p>}
                {editMode.soldiers && <EditSoldiersView />}
                {!editMode.soldiers && <Button onClick={() => handleEditClick('soldiers')}>Edit Roster</Button>}
            </BasicAccordian>

            <BasicAccordian title={'Vault'} >
                <VaultView />
            </BasicAccordian>

            <BasicAccordian title={'Base of Operations'} >
                <BaseView />
            </BasicAccordian>

            <BasicAccordian title={'Career History'} >
                <CareerHistory userData={userData} />
            </BasicAccordian>

            {isPortrait && 
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    
                    <Button onClick={handleWizardDeletion}>Retire Wizard</Button>
                </Box>
            }
        </>

    );
}