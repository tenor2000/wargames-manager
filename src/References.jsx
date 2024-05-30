import { useState } from 'react';
import { useAppContext } from './AppContext.jsx';
import { modSign } from './HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Reference.css';

export function ReferenceView() {
    const { refData, currRefTable } = useAppContext();

    return (
        <>
            <div className="reference-container">
                <h1>Reference</h1>
            </div>
            {(currRefTable === 'all' || currRefTable==='soldiers') && <SoldierReference />}
            {(currRefTable === 'all' || currRefTable==='armsandarmor') && <ArmsArmorReference />}
            {(currRefTable === 'all' || currRefTable==='randomencounters') && <RandomEncounterReference />}
            {(currRefTable === 'all' || currRefTable==='creatures') && <CreatureReference />}
            {currRefTable==='base' && <BaseReference />}
            {currRefTable==='vault' && <VaultReference />}
        </>
    );
}

export function ReferenceSideDrawer() {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { refData, currRefTable, setCurrRefTable } = useAppContext();
    
    function handleChangeTableClick(table) {
        setCurrRefTable(table);
    }

    return (
        <>
            <Box className="sidedrawer-view">
                <h3 onClick={() => handleChangeTableClick(null)}
                    style = {{cursor: 'pointer'}}>
                        Reference Data
                </h3>
                <Button onClick={() => handleChangeTableClick('all')}>All</Button>
                <Button onClick={() => handleChangeTableClick('soldiers')}>Soldiers</Button>
                <Button onClick={() => handleChangeTableClick('armsandarmor')}>General Arms and Armor</Button>
                <Button onClick={() => handleChangeTableClick('apprentices')}>Apprentices</Button>
                <Button onClick={() => handleChangeTableClick('spellbook')}>Spellbook</Button>
                <Button onClick={() => handleChangeTableClick('base')}>Base Stats</Button>
                <Button onClick={() => handleChangeTableClick('vault')}>Vault</Button>

                <Box className="button-container center">

                </Box>
            </Box>
            <Box>
                <h4>Filter</h4>
            </Box>
        </>
    );
}

function SoldierReference() {
    const { refData, sourceFilter } = useAppContext();

    const SoldierHeaderRow = () => {
        return (
            <>
                <tr>
                    <th>Soldier</th>
                    <th><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/></th>
                    <th>Notes</th>
                    <th>Cost</th>
                    <th>Source</th>
                </tr>
            </>
        );
    };

    function RenderSoldierList({soldierList}) {
        const filteredList = sourceFilter.includes('all') ? soldierList : soldierList.filter(soldier => sourceFilter.includes(soldier.source))
        return filteredList.map(soldier => (
            <tr key={`soldier-${soldier.id}`}>
                <td>{soldier.stats.class}</td>
                <td>{soldier.stats.move}</td>
                <td>{modSign(soldier.stats.fight)}</td>
                <td>{modSign(soldier.stats.shoot)}</td>
                <td>{soldier.stats.armor}</td>
                <td>{modSign(soldier.stats.will)}</td>
                <td>{soldier.stats.health}</td>
                <td>{soldier.stats.notes}</td>
                <td>{soldier.stats.cost === 0 ? 'Free' : `${soldier.stats.cost} gc`}</td>
                <td>{soldier.source}</td>
            </tr>
        ))
    }

    const standardSoldierList = refData.soldiers.filter(soldier => soldier.type==='Standard')
    const specialistSoldierList = refData.soldiers.filter(soldier => soldier.type==='Specialist')

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>{'Standard Soldiers'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table'>
                        <thead>
                            <SoldierHeaderRow />
                        </thead>
                        <tbody>
                            <RenderSoldierList soldierList={standardSoldierList} />
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>{'Specialist Soldiers'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                <table className='reference-table'>
                    <thead>
                        <SoldierHeaderRow />
                    </thead>
                    <tbody>
                        <RenderSoldierList soldierList={specialistSoldierList} />
                    </tbody>
                </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}

function ArmsArmorReference() {
    const { refData, sourceFilter } = useAppContext();

    const HeaderRow = ({type}) => {
        return (
            <tr>
                <th>{type==='arms' ? 'Weapon' : 'Armor'}</th>
                <th>{type==='arms' ? 'Damage' : 'Armor'} Modifier</th>
                {type==='arms' && <th>Maximum Range</th>}
                <th>Notes</th>
                <th>Source</th>
            </tr>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))
        
        return filteredList.map(item => (
            <tr key={`${item.name}-${item.id}`}>
                <td>{item.name}</td>
                {item.damageMod && <td>{modSign(item.damageMod)}</td>}
                {item.armorMod && <td>{modSign(item.armorMod)}</td>}
                {item.maxRange && <td>{item.maxRange > 0 ? `${item.maxRange}"` : "-"}</td>}
                <td>{item.notes}</td>
                <td>{item.source}</td>
            </tr>
        ))
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table'>
                        <thead>
                            <HeaderRow type='arms'/>
                        </thead>
                        <tbody>
                            <RenderTableRows list={refData.arms}/>
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="armor-stats" aria-controls="armor-stats">
                <h3>{'General Armor'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                <table className='reference-table'>
                    <thead>
                        <HeaderRow list='armor'/>
                    </thead>
                    <tbody>
                        <RenderTableRows list={refData.armor} />
                    </tbody>
                </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}

function RandomEncounterReference() {
    const { refData, sourceFilter } = useAppContext();

    return null

    const HeaderRow = () => {
        return (
            <>
                <tr>
                    <th>First Die Roll</th>
                    <th>1-12</th>
                    <th>13-18</th>
                    <th>19-20</th>
                </tr>
                <tr>
                    <th>Second Die Roll</th>
                    <th>Level 1 Encounter</th>
                    <th>Level 2 Encounter</th>
                    <th>Level 3 Encounter</th>
                </tr>
            </>
        );
    };

    function RenderTableRows() {
        return (
            <>
                <tr>
                    <td>1</td>
                    <td>{refData.encounter[0].level1[0]}</td>
                    <td>{refData.encounter[0].level2[0]}</td>
                    <td>{refData.encounter[0].level3[0]}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>{refData.encounter[0].level1[1]}</td>
                    <td>{refData.encounter[0].level2[1]}</td>
                    <td>{refData.encounter[0].level3[1]}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{refData.encounter[0].level1[2]}</td>
                    <td>{refData.encounter[0].level2[2]}</td>
                    <td>{refData.encounter[0].level3[2]}</td>
                </tr>
            </>
        )
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table'>
                        <thead>
                            <HeaderRow/>
                        </thead>
                        <tbody>
                            <RenderTableRows list={refData.arms}/>
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}

function CreatureReference() {
    const { refData, sourceFilter } = useAppContext();

    return null

    const HeaderRow = () => {
        return (
            <>
                <tr>
                    <th>Creature</th>
                    <th><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/></th>
                    <th><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/></th>
                    <th>Notes</th>
                    <th>Cost</th>
                    <th>Source</th>
                </tr>
            </>
        );
    };

    function RenderTableRows() {
        return (
            <>
                <tr>
                    <td>1</td>
                    <td>{refData.encounter[0].level1[0]}</td>
                    <td>{refData.encounter[0].level2[0]}</td>
                    <td>{refData.encounter[0].level3[0]}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>{refData.encounter[0].level1[1]}</td>
                    <td>{refData.encounter[0].level2[1]}</td>
                    <td>{refData.encounter[0].level3[1]}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>{refData.encounter[0].level1[2]}</td>
                    <td>{refData.encounter[0].level2[2]}</td>
                    <td>{refData.encounter[0].level3[2]}</td>
                </tr>
            </>
        )
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table'>
                        <thead>
                            <HeaderRow/>
                        </thead>
                        <tbody>
                            <RenderTableRows list={refData.arms}/>
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}