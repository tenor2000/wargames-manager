import { useState } from 'react';
import { useAppContext } from './AppContext.jsx';
import { modSign, getCreatureFromId } from './HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Reference.css';

export function ReferenceView() {
    const { refData, currRefTable } = useAppContext();

    return (
        <>
            <div className="reference-container center">
                <h2>Reference</h2>
            </div>
            {(currRefTable === 'all' || currRefTable==='soldiers') && <SoldierReference />}
            {(currRefTable === 'all' || currRefTable==='armsandarmor') && <ArmsArmorReference />}
            {(currRefTable === 'all' || currRefTable==='creatures') && <CreatureReference />}
            {(currRefTable === 'all' || currRefTable==='randomencounters') && <RandomEncounterReference />}
            {currRefTable==='base' && <BaseReference />}
            {currRefTable==='vault' && <VaultReference />}
        </>
    );
}

export function ReferenceSideDrawer() {
    const { refData, currRefTable, setCurrRefTable } = useAppContext();

    return (
        <>
            <Box className="sidedrawer-view">
                <h3>Reference Data</h3>
                <Button onClick={() => setCurrRefTable('all')}>All</Button>
                <Button onClick={() => setCurrRefTable('soldiers')}>Soldiers</Button>
                <Button onClick={() => setCurrRefTable('armsandarmor')}>General Arms and Armor</Button>
                <Button onClick={() => setCurrRefTable('creatures')}>Creatures</Button>
                <Button onClick={() => setCurrRefTable('randomencounters')}>Random Encounters</Button>
                <Button onClick={() => setCurrRefTable('base')}>Base Stats</Button>
                <Button onClick={() => setCurrRefTable('vault')}>Vault</Button>
            </Box>
            <Box>
                <h4>Filter</h4>
                <SourceFilter />
            </Box>
        </>
    );
}

function SourceFilter() {
    // WIP
    const { sourceFilter, setSourceFilter } = useAppContext();

    const handleFilterChange = (filterName) => {
        const newFilter = [...sourceFilter];
        if (newFilter.includes(filterName)) {
            newFilter.push(filterName);
        } else {
            newFilter = newFilter.filter((filter) => filter !== filterName);
        }
        setSourceFilter(newFilter);
    }

    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={sourceFilter.includes('all')} onChange={() => handleFilterChange('all')} />} label="All" />
            </FormGroup>
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
                    <table className='reference-table' style={{textAlign: 'center'}}>
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
                <table className='reference-table' style={{textAlign: 'center'}}>
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
                {item.maxRange && <td>{item.maxRange > 0 ? `${item.maxRange}"` : "--"}</td>}
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
                    <table className='reference-table' style={{textAlign: 'center'}}>
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
                <table className='reference-table' style={{textAlign: 'center'}}>
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
        const level1 = refData.randomEncounterTable[0]
        const level2 = refData.randomEncounterTable[1]
        const level3 = refData.randomEncounterTable[2]

        const dataRows = []

        for (let i = 1; i <= 20; i++) {
            let creatureNameL1 = getCreatureFromId(level1.rollResults[i][0]).name
            let creatureNameL2 = getCreatureFromId(level2.rollResults[i][0]).name
            let creatureNameL3 = getCreatureFromId(level3.rollResults[i][0]).name

            const creatureCountL1 = level1.rollResults[i][1] > 1 ? `s (${level1.rollResults[i][1]})` : '';
            const creatureCountL2 = level2.rollResults[i][1] > 1 ? `s (${level2.rollResults[i][1]})` : '';
            const creatureCountL3 = level3.rollResults[i][1] > 1 ? `s (${level3.rollResults[i][1]})` : '';

            creatureNameL1 = creatureNameL1.endsWith('olf') && level1.rollResults[i][1] > 1 ? creatureNameL1.slice(0, -3) + 'olve' : creatureNameL1;
            creatureNameL2 = creatureNameL2.endsWith('olf') && level2.rollResults[i][1] > 1 ? creatureNameL2.slice(0, -3) + 'olve' : creatureNameL2;
            creatureNameL3 = creatureNameL3.endsWith('olf') && level3.rollResults[i][1] > 1 ? creatureNameL3.slice(0, -3) + 'olve' : creatureNameL3;
            
            dataRows.push(
                <tr key={i}>
                    <td>{i}</td>
                    <td>{creatureNameL1}{creatureCountL1}</td>
                    <td>{creatureNameL2}{creatureCountL2}</td>
                    <td>{creatureNameL3}{creatureCountL3}</td>
                </tr>
            )
        }


        return (
            <>
                {dataRows}
            </>
        )
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'Random Encounter Table'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table' style={{textAlign: 'center'}}>
                        <thead>
                            <HeaderRow/>
                        </thead>
                        <tbody>
                            <RenderTableRows />
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}

function CreatureReference() {
    const { refData, sourceFilter } = useAppContext();

    const filteredList = sourceFilter.includes('all') ? refData.creatures : refData.creatures.filter(creature => sourceFilter.includes(creature.source));

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
                    <th>Source</th>
                </tr>
            </>
        );
    };

    function RenderTableRows() {
        return (
            <>
                {filteredList.map((creature, index) => (
                    <tr key={'creature' + index}>
                        <td>{creature.name}</td>
                        <td>{creature.move}</td>
                        <td>{modSign(creature.fight)}</td>
                        <td>{modSign(creature.shoot)}</td>
                        <td>{creature.armor}</td>
                        <td>{modSign(creature.will)}</td>
                        <td>{creature.health}</td>
                        <td>{creature.notes}</td>
                        <td>{creature.source}</td>
                    </tr>
                ))}
            </>
        )
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'Creatures'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <table className='reference-table' style={{textAlign: 'center'}}>
                        <thead>
                            <HeaderRow/>
                        </thead>
                        <tbody>
                            <RenderTableRows />
                        </tbody>
                    </table>
            </AccordionDetails>
        </Accordion>
    </>
    );
}