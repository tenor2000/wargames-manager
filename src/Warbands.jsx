import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandBox, BasicStatCard  } from './BasicComponents.jsx';
import { getSchoolFromId, deriveApprenticeStats, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { HiredSoldiersBlock, EditSoldiersView } from './WarbandSoldiers.jsx';
import { ShowPotentialApprentices, EditApprentice } from './WarbandApprentice.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Warbands.css';


export function WarbandView() {
    const { currentWizard, setCurrentWarzard } = useAppContext();

    return (
        <div className="warband-view center">
            {!currentWizard && <WarbandDash />}
            {currentWizard && <WarbandDetails />}
        </div>
    );
}

export function WarbandSideBar() {
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
        // <ExpandBox key={wizard.id} title={wizard.name} >
        //     <div className="sidebar-item" onClick={() => handleWizardClick(wizard)}>
        //         {`${getSchoolFromId(wizard.stats.classId).name} - Level ${wizard.stats.level}`}
        //     </div>
        // </ExpandBox>

        <Accordion key={wizard.id} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-summary" aria-controls="wizard-details">
                <h3>{wizard.name}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <div className="sidebar-item" onClick={() => handleWizardClick(wizard)}>
                    {`${getSchoolFromId(wizard.stats.classId).name} - Level ${wizard.stats.level}`}
                </div>
            </AccordionDetails>
        </Accordion>
    ))

    return (
        <div className="sidebar-view">
            <h3 onClick={() => handleWarbandDashClick()}
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
        <div className ='center'>
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
    const { currentWizard, editMode, setEditMode } = useAppContext();

    const wizardStats = currentWizard.stats;
    const apprenticeStats = deriveApprenticeStats(wizardStats, currentWizard.apprentice);

    wizardStats['class'] = getSchoolFromId(wizardStats.classId).name;

    function handleEditClick(section) {
        const newEditMode = {...editMode};
        newEditMode[section] = true;
        setEditMode(newEditMode);
    }

    return (
        <>
            <div>
                <h2>{currentWizard.name}</h2>
            </div>
            {/* <ExpandBox title={`Wizard`}>
                <BasicStatCard name={currentWizard.name} stats = {wizardStats}/>
            </ExpandBox> */}
            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>{'Wizard'}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <BasicStatCard name={currentWizard.name} stats = {wizardStats}/>
            </AccordionDetails>
            </Accordion>
            
            {/* <ExpandBox title={`Apprentice`} className='apprentice'>
                {apprenticeStats.status !== 9 && editMode !== 'apprentice' &&
                <BasicStatCard name={apprenticeStats.name} stats = {apprenticeStats} />
                }
                {apprenticeStats.status === 9 && <ShowPotentialApprentices/>}
                {editMode.apprentice && <EditApprentice />}
                {!editMode.apprentice && apprenticeStats.status !== 9 && <Button onClick={() => handleEditClick('apprentice')}>Edit Apprentice</Button>}
            </ExpandBox> */}

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="apprentice-stats" aria-controls="apprentice-stats">
                    <h3>{'Apprentice'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    {apprenticeStats.status !== 9 && editMode !== 'apprentice' &&
                        <BasicStatCard name={apprenticeStats.name} stats = {apprenticeStats} />
                    }
                    {apprenticeStats.status === 9 && <ShowPotentialApprentices/>}
                    {editMode.apprentice && <EditApprentice />}
                </AccordionDetails>
            </Accordion>

            {/* <ExpandBox title={`Spellbook`} className="spellbook">
                <SpellBookBlock/>
            </ExpandBox> */}

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="spell-book" aria-controls="spell-book-info">
                    <h3>{'Spell Book'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <SpellBookBlock/>
                </AccordionDetails>
            </Accordion>

            {/* <ExpandBox title="Hired Soldiers" className="hired-soldiers">
                {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <HiredSoldiersBlock/>}
                {Object.keys(currentWizard.soldiers).length === 0 && <NoSoldierMenu/>}
                {editMode.soldiers && <EditSoldiersView />}
                {!editMode.soldiers && <Button onClick={() => handleEditClick('soldiers')}>Edit Roster</Button>}
            </ExpandBox> */}

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="hired-soldiers" aria-controls="hired-soldiers-info">
                    <h3>{'Hired Soldiers'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <HiredSoldiersBlock/>}
                    {Object.keys(currentWizard.soldiers).length === 0 && <p>There are no soldiers in {currentWizard.name}'s roster.</p>}
                    {editMode.soldiers && <EditSoldiersView />}
                    {!editMode.soldiers && <Button onClick={() => handleEditClick('soldiers')}>Edit Roster</Button>}
                </AccordionDetails>
            </Accordion>

            {/* <ExpandBox title="Vault">
                <p>The Vault is where all treasure is stored</p>
                <p>Gold: {currentWizard.gold}</p>
            </ExpandBox> */}

            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="vault" aria-controls="vault-info">
                    <h3>{'Vault'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <p>The Vault is where all treasure is stored</p>
                    <p>Gold: {currentWizard.gold}</p>
                </AccordionDetails>
            </Accordion>

            {/* <ExpandBox title="Base of Operations">
                <p>Base of Operations Description</p>
            </ExpandBox> */}


            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="base-of-operations" aria-controls="base-of-operations-info">
                    <h3>{'Base of Operations'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <p>Base of Operations Description</p>
                </AccordionDetails>
            </Accordion>
        </>

    );
}