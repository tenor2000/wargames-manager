import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandBox , BasicStatCard, getSchoolFromId, getSpellFromId, getSoldierFromId } from './BasicComponents.jsx';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
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
    const { currentWizard, setCurrentWizard } = useAppContext();
    
    function handleWarbandDashClick(text) {
        setCurrentWizard(null)
    }

    function handleWizardClick(wizard) {
        setCurrentWizard(wizard)
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
            <button onClick={() => handleClick('new-wizard')}>
                + New Wizard
            </button>
            </div>
        </div>
    );
}


function WarbandDash() {
    const { userData } = useAuth();
    const navigate = useNavigate();

    const userWizards = userData.myWizards;

    function handleNewWizardClick() {
        navigate('/new-wizard');

    }
    
    return (
        <div className ='center'>
            <div>
                <h2>Warband Manager</h2>
            </div>
            <div>
                <p>Here you can monitor your warband during gameplay.</p>
                <p>Here are some warband stats:</p>
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
    const { currentWizard } = useAppContext();

    const wizardStats = currentWizard.stats;
    const apprenticeStats = {}
    
    for (const key in wizardStats) {
        if (key === 'move' || key === 'costs' || key === 'shoot') {
            apprenticeStats[key] = wizardStats[key];
        } else if (key === 'armor') {
            apprenticeStats[key] = 10; // + modifiers to be implemented
        } else {
            apprenticeStats[key] = wizardStats[key] - 2;
        }
    }

    wizardStats['class'] = getSchoolFromId(wizardStats.classId).name;
    apprenticeStats['class'] = 'Apprentice';
    apprenticeStats['costs'] = 100;

    return (
        <>
            <div>
                <h2>{currentWizard.name}</h2>
            </div>
            <ExpandBox title={`Wizard`}>
                    <BasicStatCard name={currentWizard.name} stats = {wizardStats}/>
            </ExpandBox>
            <ExpandBox title={`Apprentice`} >
                <BasicStatCard name={currentWizard.apprentice} stats = {apprenticeStats}/>
            </ExpandBox>
            <ExpandBox title={`Spellbook`} className="spellbook">
                <SpellBookBlock/>
            </ExpandBox>
            <ExpandBox title="Hired Soldiers" className="hired-soldiers">
                <HiredSoldiersBlock/>
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

function SpellBookBlock() {
    const { currentWizard } = useAppContext();
    const [ spellViewObj, setSpellViewObj ] = useState('null')

    const primarySpellArr = currentWizard.primarySpellIds
    const alignedSpellArr = currentWizard.alignedSpellIds
    const neutralSpellArr = currentWizard.neutralSpellIds
    const opposedSpellArr = currentWizard.opposedSpellIds

    

    function SpellViewCard() {
        const spellMod = currentWizard.spellModifiers[spellViewObj.id]

        const varCast = spellMod ? <b style={{ color: 'green' }}>{spellViewObj.base_cast + spellMod}</b> : spellViewObj.base_cast;

        return (
            <div>
                <table className="spellbook-table">
                    <tbody>
                        <tr colSpan="3">
                            <th colSpan="3">
                                <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
                            </th>
                        </tr>
                        <tr>
                            <td>{spellViewObj.school}</td>
                            <td>Cast: {varCast}</td>
                            <td>{spellViewObj.category}</td>
                        </tr>
                        <tr className='spellbook-description'>
                            <td colSpan="3">{spellViewObj.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    function MySpellButton({ spellId , schoolModifier = 0}) {
        const { currentWizard } = useAppContext();
        const spellEntry = getSpellFromId(spellId)
        
        if (!spellEntry) {
            return null
        }
    
        function handleSpellViewChange(spellEntry) {
            setSpellViewObj(spellEntry)
        }
    
        let castNum = spellEntry.base_cast + schoolModifier;
        spellId in currentWizard.spellModifiers ? castNum += currentWizard.spellModifiers[spellId] : null;
        if (castNum < spellEntry.base_cast + schoolModifier) {
            castNum = <b style={{ color: 'green' }}>{castNum}</b>
        } else if (castNum > spellEntry.base_cast + schoolModifier) {
            castNum = <b style={{ color: 'red' }}>{castNum}</b>
        }

        return (
    
            <button onClick={() => handleSpellViewChange(spellEntry)} >
                {spellEntry.name} - {castNum}
            </button>
        )
    }

    return (
        <>
            <SpellViewCard spell={spellViewObj}/>
            <div className='spellbutton-container'>
                <h3>Primary: </h3>
                <div>
                    {primarySpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} />
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                <h3>Aligned: </h3> 
                <div>
                    {alignedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={2} />
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                <h3>Neutral: </h3> 
                <div>
                    {neutralSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={4}/>
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                {currentWizard.opposedSpellIds.length > 0 ? <h3>Opposed: </h3> : null}
                <div>
                    {opposedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={6}/>
                    ))}
                </div>
            </div>
        </>
    )
}

function HiredSoldiersBlock() {
    const { currentWizard, refData } = useAppContext();

    const  soldierBlockList = () => {
        const mySoldiersList = currentWizard.soldiers;
        let soldierList = [];
        
        for (const soldierName in mySoldiersList) {
            const soldierId = mySoldiersList[soldierName];
            const soldierEntry = getSoldierFromId(soldierId);
            const soldierStats = soldierEntry.stats
            soldierList.push({name: soldierName, stats: soldierStats})
        }
        return soldierList
    }

    return (
        <>
            {soldierBlockList().map((soldier, index) => (
                    <BasicStatCard key={soldier.name} name={soldier.name} stats={soldier.stats} costs={true} />
                ))}
        </>
    );
}