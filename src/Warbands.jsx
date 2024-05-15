import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandBox , BasicStatBlock, BasicSpellBlock, getSchoolName } from './BasicComponents.jsx';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import referenceData from './database.js';
import './styles/Warbands.css';
import { TfiControlShuffle } from 'react-icons/tfi';



export function WarbandView() {
    
    const { currentWizard, setCurrentWarzard } = useAppContext();
    return (
        <div className="warband-view">
            {!currentWizard && <WarbandDash />}
            {currentWizard && <WarbandDetails />}
        </div>
    );
}

export function WarbandSideBar() {
    const { userData } = useAuth();
    const { refData } = useAppContext();
    const { currentWizard, setCurrentWizard } = useAppContext();

    const wizSchoolId = currentWizard ? currentWizard.stats.classId : null;
    const wizSchool = wizSchoolId ? refData.schoolTypes.find(schoolType => schoolType.id === wizSchoolId).name : null;
    
    function handleWarbandDashClick(text) {
        setCurrentWizard(null)
    }

    function handleWizardClick(wizard) {
        setCurrentWizard(wizard)
    }

    const wizardsList = userData.myWizards.map(wizard => (
        <ExpandBox key={wizard.id} title={wizard.name} >
            <div className="sidebar-item" onClick={() => handleWizardClick(wizard)}>
                {`${getSchoolName(wizard.stats.classId, 'wizard')} - Level ${wizard.stats.level}`}
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
            <button onClick={() => handleClick('new-wizard')}>
                + New Wizard
            </button>
            </div>
        </div>
    );
}


function WarbandDash() {
    const { userData } = useAuth();
    const {currentWarband, setCurrentWarband} = useAppContext();

    const userWizards = userData.myWizards;
    
    return (
        <div className ='center'>
            <div>
                <h2>Warband Manager</h2>
            </div>
            <div>
                <p>Here you can monitor your warband during gameplay.</p>
                <p>Here are some warband stats:</p>
                <ul>
                    <li>Total Wizards: {userWizards.length}</li>
                    <li>Total Level Gained: {userWizards.reduce((total, wizard) => total + wizard.stats.level, 0)}</li>
                    <li>Total XP Gained: {userWizards.reduce((total, wizard) => total + wizard.xpGained, 0)}</li>
                    <li>Total Soldiers Lost: {userWizards.reduce((total, wizard) => total + wizard.soldiersLost, 0)}</li>
                </ul>
            </div>
            <div className="button-container center">
                <button>Start New Wizard</button>
            </div>
        </div>
    );
}

function WarbandDetails() {
    const { currentWizard } = useAppContext();

    const wizardStats = currentWizard.stats;
    const apprenticeStats = {}
    
    for (const key in wizardStats) {
        if (key === 'move' || key === 'armor' || key === 'costs') {
            apprenticeStats[key] = wizardStats[key];
        } else {
            apprenticeStats[key] = wizardStats[key] - 2;
        }
    }

    return (
        <div className="center">
            <div>
                <h2>{currentWizard.name}</h2>
            </div>
            <ExpandBox title={`Wizard: ${currentWizard.name}`}>
                    <BasicStatBlock stats = {wizardStats}/>
            </ExpandBox>
            <ExpandBox title={`Apprentice: ${currentWizard.apprentice}`} >
                <BasicStatBlock stats = {apprenticeStats}/>
            </ExpandBox>
            <ExpandBox title={`Spellbook`} >
                <SpellBookBlock/>
            </ExpandBox>
            <ExpandBox title="Hired Soldiers">
                <HiredSoldiers/>
            </ExpandBox>
            <ExpandBox title="Vault">
                <p>{currentWizard.name}</p>
            </ExpandBox>
            <ExpandBox title="Base of Operations">
                <p>{currentWizard.name}</p>
            </ExpandBox>
        </div>

    );
}

function SpellBookBlock() {
    const { currentWizard, refData } = useAppContext();
    const primarySpellArr = currentWizard.primarySpellIds
    const alignedSpellArr = currentWizard.alignedSpellIds
    const neutralSpellArr = currentWizard.neutralSpellIds
    const opposedSpellArr = currentWizard.opposedSpellIds

    return (
        <div className="spellbook-container">
            {primarySpellArr.map((spellId) => (
                <CharSpellBlock key={spellId} spellId={spellId} />
            ))}
            {alignedSpellArr.map((spellId) => (
                <CharSpellBlock key={spellId} spellId={spellId} schoolModifier={2} />
            ))}
            {neutralSpellArr.map((spellId) => (
                <CharSpellBlock key={spellId} spellId={spellId} schoolModifier={4}/>
            ))}
            {opposedSpellArr.map((spellId) => (
                <CharSpellBlock key={spellId} spellId={spellId} schoolModifier={6}/>
            ))}

        </div>
    )
}

function CharSpellBlock({ spellId , schoolModifier = 0}) {
    const { refData } = useAppContext();
    const { currentWizard } = useAppContext();
    const spellRef = refData.spells
    const spellEntry = spellRef.find(spell => spell.id === spellId)
    
    let castNum = spellEntry.base_cast + schoolModifier;
    spellId in currentWizard.spellModifiers ? castNum += currentWizard.spellModifiers[spellId] : null;

    return (
        <ExpandBox title={`${spellEntry.name} - (Cast: ${castNum})`} >
            <p> School: {getSchoolName(spellEntry.id, 'spell')} </p>
            <p> School Modifier: {schoolModifier} </p>
            <p> {spellEntry.description} </p>
        </ExpandBox>
    )
}

function HiredSoldiers() {
    const { currentWizard } = useAppContext();

    const soldierIds = currentWizard.soldiers;
    const soldierRef = referenceData.soldiers;

    const getSoldierStats = (soldierIds, soldierRef) => {
        return soldierIds.map(id => {
            const soldier = soldierRef.find(soldier => soldier.id === id);
            return soldier ? soldier.stats : null;
        });
    };

    const soldierStats = getSoldierStats(soldierIds, soldierRef);

    return (
        <div>
            {soldierStats.map((stats, index) => (
                <BasicStatBlock key={index} stats={stats} costs={true} />
            ))}
        </div>
    );
}


function CreateNewWizard() {
    //WIP
    const { currentWizard, refData } = useAppContext();

    const wizardSchoolId = currentWizard.stats.classId;
    const alignedSchoolsIds = refData.schoolTypes.find(school => school.id === wizardSchoolId).aligned;
    const neutralSchoolsIds = refData.schoolTypes.find(school => school.id === wizardSchoolId).neutral;
    const opposedSchoolsIds = refData.schoolTypes.find(school => school.id === wizardSchoolId).opposed;
    return (
        <div>
            <h2>Create New Wizard</h2>
        </div>
    );
}