import { useState } from 'react';
import { useAppContext } from './AppContext.jsx';
import { modSign, getCreatureFromId } from './HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from './BasicComponents.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Reference.css';
import { FaLaptopHouse, FaLessThanEqual } from 'react-icons/fa';

export function ReferenceView() {
    const { currRefTable } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const { loading, error } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <>
            { !isPortrait && 
                <div className="reference-container center">
                    <h2>Reference</h2>
                </div>
            }
            {(currRefTable === 'all' || currRefTable==='soldiers') && <SoldierReference />}
            {(currRefTable === 'all' || currRefTable==='armsandarmor') && <ArmsArmorReference />}
            {(currRefTable === 'all' || currRefTable==='creatures') && <CreatureReference />}
            {(currRefTable === 'all' || currRefTable==='randomencounters') && <RandomEncounterReference />}
            {(currRefTable === 'all' || currRefTable==='base') && <BaseReference />}
            {(currRefTable === 'all' || currRefTable==='treasure') && <TreasureReference />}
        </>
    );
}

export function ReferenceSideDrawer() {
    const { refData, currRefTable, setCurrRefTable } = useAppContext();

    return (
        <>
            <Box className="spells-sidebar-view">
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
        let newFilter = [...sourceFilter];
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
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const isLandscape = useMediaQuery('(max-height: 768px) and (orientation: landscape)');

    function RenderSoldierRows({soldierList}) {
        const filteredList = sourceFilter.includes('all') ? soldierList : soldierList.filter(soldier => sourceFilter.includes(soldier.source))
        return filteredList.map(soldier => (
            <BasicStatTableRow 
                key={`soldier-${soldier.id}`} 
                name={false} 
                stats = {soldier.stats} 
                showCosts={true} 
                showStatus={false} 
                showItemSlots={false} 
            />
        ))
    }

    function RenderSoldierCards({soldierList}) {
        return soldierList.map(soldier => (
            <BasicStatCard 
                key={`soldier-${soldier.id}`} 
                name={false}
                stats = {soldier.stats} 
                show_costs={true}
                show_status={false}
                showItemSlots={false}
            />
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
                <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {!isPortrait && 
                        <BasicStatTableHeader
                            name={false}
                            showLevel={false}
                            showStatus={false}
                            showItemSlots={false}
                            showCosts={true}
                            >
                            <RenderSoldierRows soldierList={standardSoldierList} />
                        </BasicStatTableHeader>
                    }
                    {isPortrait && <RenderSoldierCards soldierList={standardSoldierList} />}
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="wizard-stats" aria-controls="wizard-stats">
                <h3>{'Specialist Soldiers'}</h3>
            </AccordionSummary>
                <AccordionDetails sx={isPortrait ? {display: 'flex', flexDirection: 'column', gap: '10px'} : null}>
                    {!isPortrait && 
                        <BasicStatTableHeader
                            name={false}
                            showLevel={false}
                            showStatus={false}
                            showItemSlots={false}
                            showCosts={true}
                        >
                            <RenderSoldierRows soldierList={specialistSoldierList} />
                        </BasicStatTableHeader>
                    }
                    {isPortrait && <RenderSoldierCards soldierList={specialistSoldierList} />}
            </AccordionDetails>
        </Accordion>
    </>
    );
}

function ArmsArmorReference() {
    const { refData, sourceFilter } = useAppContext();
    const isLandscape = useMediaQuery('(max-height: 768px) and (orientation: landscape)');

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='arms' ? 'Weapon' : 'Armor'}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>{type==='arms' ? 'Damage' : 'Armor'} Modifier</TableCell>
                {type==='arms' && <TableCell sx={{textAlign: 'center'}}>Maximum Range</TableCell>}
                <TableCell>Notes</TableCell>
                {!isLandscape && <TableCell>Source</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <TableRow key={`${item.name}-${item.id}`}>
                <TableCell>{item.name}</TableCell>
                {item.damageMod && <TableCell sx={{textAlign: 'center'}}>{modSign(item.damageMod)}</TableCell>}
                {item.armorMod && <TableCell sx={{textAlign: 'center'}}>{modSign(item.armorMod)}</TableCell>}
                {item.maxRange && <TableCell sx={{textAlign: 'center'}}>{item.maxRange > 0 ? `${item.maxRange}"` : "--"}</TableCell>}
                <TableCell>{item.notes}</TableCell>
                {!isLandscape && <TableCell>{item.source}</TableCell>}
            </TableRow>
        ))
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <HeaderRow type='arms' />
                                </TableHead>
                                <TableBody>
                                    <RenderTableRows list={refData.arms} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="armor-stats" aria-controls="armor-stats">
                <h3>{'General Armor'}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow type='armor' />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows list={refData.armor} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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
                <TableRow>
                    <TableCell>First Die Roll</TableCell>
                    <TableCell>1-12</TableCell>
                    <TableCell>13-18</TableCell>
                    <TableCell>19-20</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Second Die Roll</TableCell>
                    <TableCell>Level 1 Encounter</TableCell>
                    <TableCell>Level 2 Encounter</TableCell>
                    <TableCell>Level 3 Encounter</TableCell>
                </TableRow>
            </>
        );
    };

    function RenderTableRows() {
        const level1 = refData.randomEncounterTable[0]
        const level2 = refData.randomEncounterTable[1]
        const level3 = refData.randomEncounterTable[2]

        const dataRows = []

        for (let i = 1; i <= 20; i++) {
            let creatureNameL1 = getCreatureFromId(level1.rollResults[i][0], refData).name
            let creatureNameL2 = getCreatureFromId(level2.rollResults[i][0], refData).name
            let creatureNameL3 = getCreatureFromId(level3.rollResults[i][0], refData).name

            const creatureCountL1 = level1.rollResults[i][1] > 1 ? `s (${level1.rollResults[i][1]})` : '';
            const creatureCountL2 = level2.rollResults[i][1] > 1 ? `s (${level2.rollResults[i][1]})` : '';
            const creatureCountL3 = level3.rollResults[i][1] > 1 ? `s (${level3.rollResults[i][1]})` : '';

            creatureNameL1 = creatureNameL1.endsWith('olf') && level1.rollResults[i][1] > 1 ? creatureNameL1.slice(0, -3) + 'olve' : creatureNameL1;
            creatureNameL2 = creatureNameL2.endsWith('olf') && level2.rollResults[i][1] > 1 ? creatureNameL2.slice(0, -3) + 'olve' : creatureNameL2;
            creatureNameL3 = creatureNameL3.endsWith('olf') && level3.rollResults[i][1] > 1 ? creatureNameL3.slice(0, -3) + 'olve' : creatureNameL3;
            
            dataRows.push(
                <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{creatureNameL1}{creatureCountL1}</TableCell>
                    <TableCell>{creatureNameL2}{creatureCountL2}</TableCell>
                    <TableCell>{creatureNameL3}{creatureCountL3}</TableCell>
                </TableRow>
            )
        }


        return (
            <>
                {dataRows}
            </>
        )
    }

    return (
        
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'Random Encounter Table'}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </AccordionDetails>
        </Accordion>
    );
}

function CreatureReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(orientation: portrait)');

    const alignment = 'center';

    const filteredList = sourceFilter.includes('all') ? refData.creatures : refData.creatures.filter(creature => sourceFilter.includes(creature.source));

    const HeaderRow = () => {
        return (
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/></TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/></TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/></TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/></TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/></TableCell>
                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/></TableCell>
                <TableCell>Notes</TableCell>
                {!isPortrait && <TableCell>Source</TableCell>}
            </TableRow>

        );
    };

    function RenderTableRows() {
        return (
            <>
                {filteredList.map((creature, index) => (
                    <TableRow key={creature + index}>
                        <TableCell>{creature.name}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{creature.move}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{modSign(creature.fight)}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{modSign(creature.shoot)}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{creature.armor}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{modSign(creature.will)}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{creature.health}</TableCell>
                        <TableCell>{creature.notes}</TableCell>
                        {!isPortrait && <TableCell>{creature.source}</TableCell>}
                    </TableRow>
                ))}
            </>
        )
    }

    return (
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'Creatures'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead >
                                    <HeaderRow />
                                </TableHead>
                                <TableBody>
                                    <RenderTableRows />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            </AccordionDetails>
        </Accordion>
    );
}

function BaseReference() {
    const { refData, sourceFilter } = useAppContext();

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='locations' ? 'Locations' : 'Resources'}</TableCell>
                {type!=='locations' && <TableCell sx={{textAlign: 'center'}}>Cost</TableCell>}
                <TableCell>Effects</TableCell>
                <TableCell>Source</TableCell>
            </TableRow>
        );
    };

    function RenderTableRows({list, type=false}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <TableRow key={`${item.name}-${item.id}`}>
                <TableCell>{item.name}</TableCell>
                {type!=='locations' && <TableCell sx={{textAlign: 'center'}}>{item.cost}gc</TableCell>}
                <TableCell>{item.effects}</TableCell>
                <TableCell>{item.source}</TableCell>
            </TableRow>
        ))
    }

    return (
        <>
            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                    <h3>{'Base: Locations'}</h3>
                </AccordionSummary>
                    <AccordionDetails>
                        <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                            <TableContainer sx={{ maxHeight: 640 }}>
                                <Table stickyHeader aria-label="sticky table" size="small">
                                    <TableHead>
                                        <HeaderRow type='locations' />
                                    </TableHead>
                                    <TableBody>
                                        <RenderTableRows list={refData.baseLocations} type='locations'/>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="armor-stats" aria-controls="armor-stats">
                    <h3>{'Base: Resources'}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <HeaderRow type='resources' />
                                </TableHead>
                                <TableBody>
                                    <RenderTableRows list={refData.baseResources} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

function TreasureReference() {
    const { refData, sourceFilter } = useAppContext();

    // Temp
    return (
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'Treasure'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '80%', overflow: 'hidden'}}>
                        <p>Coming Soon</p>
                    </Paper>
            </AccordionDetails>
        </Accordion>
    )
    // End Temp

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='arms' ? 'Weapon' : 'Armor'}</TableCell>
                <TableCell sx={{textAlign: 'center'}}>{type==='arms' ? 'Damage' : 'Armor'} Modifier</TableCell>
                {type==='arms' && <TableCell sx={{textAlign: 'center'}}>Maximum Range</TableCell>}
                <TableCell>Notes</TableCell>
                <TableCell>Source</TableCell>
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <TableRow key={`${item.name}-${item.id}`}>
                <TableCell>{item.name}</TableCell>
                {item.damageMod && <TableCell sx={{textAlign: 'center'}}>{modSign(item.damageMod)}</TableCell>}
                {item.armorMod && <TableCell sx={{textAlign: 'center'}}>{modSign(item.armorMod)}</TableCell>}
                {item.maxRange && <TableCell sx={{textAlign: 'center'}}>{item.maxRange > 0 ? `${item.maxRange}"` : "--"}</TableCell>}
                <TableCell>{item.notes}</TableCell>
                <TableCell>{item.source}</TableCell>
            </TableRow>
        ))
    }

    return (
        <>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="weapon-stats" aria-controls="weapon-stats">
                <h3>{'General Arms'}</h3>
            </AccordionSummary>
                <AccordionDetails>
                    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 640 }}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <HeaderRow type='arms' />
                                </TableHead>
                                <TableBody>
                                    <RenderTableRows list={refData.arms} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
            </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="armor-stats" aria-controls="armor-stats">
                <h3>{'General Armor'}</h3>
            </AccordionSummary>
            <AccordionDetails>
                <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{ maxHeight: 640 }}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <HeaderRow type='armor' />
                            </TableHead>
                            <TableBody>
                                <RenderTableRows list={refData.armor} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </AccordionDetails>
        </Accordion>
    </>
    );
}