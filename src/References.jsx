import React from 'react';
import { useAppContext } from './AppContext.jsx';
import { modSign, getCreatureFromId } from './HelperFunctions';
import { useNavigate } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import { BasicAccordian, BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from './BasicComponents.jsx';
import { Accordion, AccordionDetails, AccordionSummary, Button, Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Reference.css';

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
            {(currRefTable === 'all' || currRefTable==='armsandarmor') && <ArmsReference />}
            {(currRefTable === 'all' || currRefTable==='armsandarmor') && <ArmorReference />}
            {(currRefTable === 'all' || currRefTable==='creatures') && <CreatureReference />}
            {(currRefTable === 'all' || currRefTable==='randomencounters') && <RandomEncounterReference />}
            {(currRefTable === 'all' || currRefTable==='base') && <BaseReference />}
            {(currRefTable === 'all' || currRefTable==='treasure') && <TreasureReference />}
        </>
    );
}

export function ReferenceSideDrawer() {
    const { refData, currRefTable, setCurrRefTable } = useAppContext();

    // title: refTable
    const refTableObj = {
        'All': 'all', 
        'Soldiers': 'soldiers', 
        'General Arms and Armor': 'armsandarmor', 
        'Creatures': 'creatures', 
        'Random Encounters': 'randomencounters', 
        'Base': 'base', 
        'Vault': 'vault'
    };

    return (
        <>
            <Typography variant="h6">Reference</Typography>
            <Paper elevation={5} sx={{width: '100%', paddingLeft: '10px'}}>
                <List>
                    {Object.entries(refTableObj).map(([title, value]) => (
                        <ListItem 
                            key={value}
                            onClick={() => setCurrRefTable(value)}
                            style = {{cursor: 'pointer'}}
                            sx={{
                                cursor: 'pointer',
                                padding: '5px',
                                transition: 'color 0.3s ease',
                                '&:hover .MuiListItemText-primary': {
                                  color: 'lightblue',
                                },
                            }}
                        >
                            <ListItemText primary={title} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Typography variant="h6">Source Filter</Typography>
            <Paper elevation={5} sx={{paddingLeft: '10px', width: '100%'}}>
                <SourceFilter />
            </Paper>
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

    const standardSoldierList = refData.soldiers.filter(soldier => soldier.type==='Standard')
    const specialistSoldierList = refData.soldiers.filter(soldier => soldier.type==='Specialist')

    function RenderSoldierTable({soldierList}) {
        const filteredList = sourceFilter.includes('all') ? soldierList : soldierList.filter(soldier => sourceFilter.includes(soldier.source))
        return (
            <BasicStatTableHeader
                showClass={true}
                showCosts={true}
                showItemSlots={true}
                showSource={true}
            >
                {filteredList.map(soldier => (
                    <BasicStatTableRow 
                        key={`soldier-${soldier.id}`} 
                        statsObj = {soldier} 
                    />
                ))}
            </BasicStatTableHeader>
        )
    }

    function RenderSoldierCards({soldierList}) {
        const filteredList = sourceFilter.includes('all') ? soldierList : soldierList.filter(soldier => sourceFilter.includes(soldier.source))
        return filteredList.map(soldier => (
            <BasicStatCard 
                key={`soldier-${soldier.id}`} 
                statsObj = {soldier} 
                showCosts={true}
                showItemSlots={true}
            />
        ))
    }

    return (
        <>
        <BasicAccordian title={'Standard Soldiers'} >
            { !isPortrait && <RenderSoldierTable soldierList={standardSoldierList} /> }
            { isPortrait && <RenderSoldierCards soldierList={standardSoldierList} /> }
        </BasicAccordian>

        <BasicAccordian title={'Specialist Soldiers'} >
            { !isPortrait && <RenderSoldierTable soldierList={specialistSoldierList} /> }
            { isPortrait && <RenderSoldierCards soldierList={specialistSoldierList} /> }
        </BasicAccordian>
    </>
    );
}

function ArmsReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const HeaderRow = () => {
        return (
            <TableRow>
                <TableCell>Weapon</TableCell>
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Damage Modifier</TableCell>}
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Maximum Range</TableCell>}
                {!isPortrait && <TableCell>Notes</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
                {isPortrait && <TableCell >Description</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={item.id}>
                <TableRow key={`${item.id}-${item.name}`} sx={{borderBottom: '1px solid #ccc'}}  id={item.id}>
                    <TableCell rowSpan = {isPortrait ? 3 : 1} sx={{textAlign: 'left'}}>{item.name}</TableCell>
                    <TableCell sx={{textAlign: isPortrait ? 'left' : 'center'}}>{isPortrait ? 'Damage Mod: ' : null}{modSign(item.damageMod)}</TableCell>
                    {!isPortrait && <TableCell sx={{textAlign: 'center'}}>{item.maxRange > 0 ? `${item.maxRange}"` : "-"}</TableCell>}
                    {!isPortrait && <TableCell sx={{textAlign: 'left'}}>{item.notes}</TableCell>}
                    {!isPortrait && <TableCell>{item.source}</TableCell>}
                </TableRow>
                {isPortrait && 
                    <>
                        <TableRow key={`${item.id}-${item.name}-Portrait1`}>
                            <TableCell sx={{textAlign: 'left'}}>Range: {item.maxRange > 0 ? `${item.maxRange}"` : "--"}</TableCell>
                        </TableRow>
                        {item.notes &&
                        <TableRow key={`${item.id}-${item.name}-Portrait2`}>
                            <TableCell sx={{textAlign: 'left'}}>{item.notes === '--' ? 'Notes: --' : item.notes}</TableCell>
                        </TableRow>}
                    </>
                }
            </React.Fragment>
        ))
    }

    return (
        <BasicAccordian title={'General Arms'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
                <TableContainer sx={{ maxHeight: 640 }}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <HeaderRow />
                        </TableHead>
                        <TableBody>
                            <RenderTableRows list={refData.arms} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </BasicAccordian>
    );
}

function ArmorReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    
    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >Armor</TableCell>
                {!isPortrait && <TableCell sx={{textAlign: 'center'}}>Armor Modifier</TableCell>}
                {!isPortrait && <TableCell>Notes</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
                {isPortrait && <TableCell>Description</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={item.id}>
                <TableRow key={`${item.id}-main`}>
                    <TableCell rowSpan = {isPortrait ? 2 : 1} sx={{textAlign: 'left'}}>{item.name}</TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{isPortrait ? `Armor Mod: ${modSign(item.armorMod)}` : modSign(item.armorMod)}</TableCell>
                    {!isPortrait && <TableCell sx={{textAlign: 'left'}}>{item.notes}</TableCell>}
                    {!isPortrait && <TableCell>{item.source}</TableCell>}
                </TableRow>
                {isPortrait && 
                    <TableRow key={`${item.name}-notes`}>
                         <TableCell >{item.notes}</TableCell>
                    </TableRow>}
            </React.Fragment>
        ))
    }
    
    return (
        <BasicAccordian title={'General Armor'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
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
        </BasicAccordian>
    );
}

function RandomEncounterReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

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
            let creatureNameL1 = getCreatureFromId(level1.rollResults[i][0], refData).class
            let creatureNameL2 = getCreatureFromId(level2.rollResults[i][0], refData).class
            let creatureNameL3 = getCreatureFromId(level3.rollResults[i][0], refData).class

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
        <BasicAccordian title={'Random Encounter Table'} >
            <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
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
        </BasicAccordian>
    );
}

function CreatureReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(orientation: portrait) and (max-width: 768px)');

    const filteredList = sourceFilter.includes('all') ? refData.creatures : refData.creatures.filter(creature => sourceFilter.includes(creature.source));

    function RenderCreatureCards({ creatureList }) {
        return creatureList.map(creature => (
            <BasicStatCard 
                key={`creature-${creature.id}`} 
                statsObj = {creature} 
            />
        ))
    }

    return (
        <BasicAccordian title={'Creatures'} >
            {!isPortrait && 
                <BasicStatTableHeader
                    showClass={true}
                    showSource={true}
                >
                    {filteredList.map((creature, index) => (
                        <BasicStatTableRow 
                        key={`creature-${creature.id}`}
                        statsObj = {creature}
                        />
                    ))}
                </BasicStatTableHeader>
            }
            {isPortrait && <RenderCreatureCards creatureList={filteredList}/>}
        </BasicAccordian> 
    );
}

function BaseReference() {
    const { refData, sourceFilter } = useAppContext();
    const isPortrait = useMediaQuery('(orientation: portrait) and (max-width: 768px)');

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='locations' ? 'Location' : 'Resource'}</TableCell>
                {type!=='locations' && !isPortrait && <TableCell sx={{textAlign: 'center'}}>Cost</TableCell>}
                {!isPortrait && <TableCell>Effects</TableCell>}
                {!isPortrait && <TableCell>Source</TableCell>}
            </TableRow>
        );
    };

    function RenderTableRows({list, type=false}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))

        return filteredList.map(item => (
            <React.Fragment key={`${item.name}-${item.id}`}>
                {!isPortrait && <TableRow key={`${item.name}-${item.id}-1`} >
                    <TableCell>{item.name}</TableCell>
                    {type!=='locations' && <TableCell sx={{textAlign: 'center'}}>{item.cost}gc</TableCell>}
                    <TableCell>{item.effects}</TableCell>
                    <TableCell>{item.source}</TableCell>
                </TableRow>
                }
                {isPortrait && <TableRow key={`${item.name}-${item.id}-2`} >
                    <TableCell>
                        <BasicAccordian title={type!==false ? item.name : `${item.name} - ${item.cost}gc`} >
                            {item.effects}
                        </BasicAccordian>
                    </TableCell>
                </TableRow>
                }
            </ React.Fragment>
        ))
    }

    return (
        <>
            <BasicAccordian title={'Base Locations'} >
                <Paper className="generic-paper" sx={{ width: isPortrait ? '320px' : '100%', overflow: 'hidden'}}>
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
            </BasicAccordian>

            <BasicAccordian title={'Base Resources'} >
                <Paper className="generic-paper" sx={{ width: isPortrait ? '300px' : '100%', overflow: 'hidden'}}>
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
            </BasicAccordian>
        </>
    );
}

function TreasureReference() {
    const { refData, sourceFilter } = useAppContext();

    // Temp
    return (
        <BasicAccordian title={'Treasure'} >
            <Paper className="generic-paper" sx={{ width: '80%', overflow: 'hidden'}}>
                <p>Coming Soon</p>
            </Paper>
        </BasicAccordian>
    )
    // End Temp

    const HeaderRow = ({type}) => {
        return (
            <TableRow>
                <TableCell >{type==='locations' ? 'Location' : 'Resource'}</TableCell>
            </TableRow>
        );
    };

    function RenderTableRows({list}) {
        const filteredList = sourceFilter.includes('all') ? list : list.filter(item => sourceFilter.includes(item.source))
        return null;

        return filteredList.map(item => (
            <TableRow key={`${item.name}-${item.id}`}>
                <TableCell>{item.name}</TableCell>
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