import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandBox, BasicStatCard  } from './BasicComponents.jsx';
import { getSchoolFromId, deriveApprenticeStats, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { SpellBookBlock } from './WarbandSpellbook.jsx';
import { HiredSoldiersBlock, EditSoldiersView, NoSoldierMenu } from './WarbandSoldiers.jsx';
import { ShowPotentialApprentices, EditApprentice } from './WarbandApprentice.jsx';
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
        <ExpandBox key={wizard.id} title={wizard.name} >
            <div className="sidebar-item" onClick={() => handleWizardClick(wizard)}>
                {`${getSchoolFromId(wizard.stats.classId).name} - Level ${wizard.stats.level}`}
            </div>
        </ExpandBox>
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
            <button onClick={() => handleNewWizardClick()}>
                + New Wizard
            </button>
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
                <button onClick={handleNewWizardClick}>Start New Wizard</button>
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
            <ExpandBox title={`Wizard`}>
                <BasicStatCard name={currentWizard.name} stats = {wizardStats}/>
            </ExpandBox>
            <ExpandBox title={`Apprentice`} className='apprentice'>
                {apprenticeStats.status !== 9 && editMode !== 'apprentice' &&
                <BasicStatCard name={apprenticeStats.name} stats = {apprenticeStats} />
                }
                {apprenticeStats.status === 9 && <ShowPotentialApprentices/>}
                {editMode.apprentice && <EditApprentice />}
                {!editMode.apprentice && apprenticeStats.status !== 9 && <button onClick={() => handleEditClick('apprentice')}>Edit Apprentice</button>}
            </ExpandBox>
            <ExpandBox title={`Spellbook`} className="spellbook">
                <SpellBookBlock/>
            </ExpandBox>
            <ExpandBox title="Hired Soldiers" className="hired-soldiers">
                {Object.keys(currentWizard.soldiers).length > 0 && !editMode.soldiers && <HiredSoldiersBlock/>}
                {Object.keys(currentWizard.soldiers).length === 0 && <NoSoldierMenu/>}
                {editMode.soldiers && <EditSoldiersView />}
                {!editMode.soldiers && <button onClick={() => handleEditClick('soldiers')}>Edit Roster</button>}
            </ExpandBox>
            <ExpandBox title="Vault">
                <p>The Vault is where all treasure is stored</p>
                <p>Gold: {currentWizard.gold}</p>
            </ExpandBox>
            <ExpandBox title="Base of Operations">
                <p>Base of Operations Description</p>
            </ExpandBox>
        </>

    );
}