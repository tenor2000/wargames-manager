import { useAppContext } from "./AppContext";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { BasicStatCard } from "./BasicComponents";
import { getRandomName, getSoldierFromId, getStatusFromId, modSign } from "./HelperFunctions";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

import { Box, Tooltip, TextField, Button, Snackbar } from "@mui/material";


const formSoldierStats = (mySoldierArray, refData) => {
    let soldierList = [];
    mySoldierArray.forEach((soldier) => {
        const soldierEntryStats = getSoldierFromId(soldier.classId, refData);
        const soldierStats = {...soldierEntryStats.stats};
        soldierStats.status = soldier.status;
        soldierStats.itemSlots = soldier.itemSlots;
        soldierList.push({name: soldier.name, classId: soldier.classId, stats: soldierStats});
    })
    return soldierList
}
export function SoldierRosterBlock() {
    const { currentWizard, refData } = useAppContext();

    return (
        <div className='soldier-card-view'>
            {formSoldierStats(currentWizard.soldiers, refData).map((soldier, index) => (
                    <BasicStatCard key={soldier.name} name={soldier.name} stats={soldier.stats} refData={refData}show_costs={true} />
                ))}
        </div>
    );
}

export function EditSoldiersView() {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData} = useAppContext();
    const { userData, setUserData } = useAuth();
    const [ totalEditedCost, setTotalEditedCost ] = useState(0);
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});
    const [ notesOpen, setNotesOpen ] = useState(false);

    const handleCancel = () => {
        const newEditMode = {...editMode};
        newEditMode['soldiers'] = false;
        const updateWizard = {...currentWizard};
        console.log(currentWizard.soldiers)
        console.log(editedWizard.soldiers)
        // setCurrentWizard({...currentWizard});
        setEditMode(newEditMode);
    }

    const handleSave = () => {
        const updateWizard = {...editedWizard};
        if (updateWizard.gold - totalEditedCost < 0) {
            alert('Not enough gold')
            return
        }

        // POST request to update the soldier roster
        updateWizard.soldiers.forEach((soldier) => {
            if (soldier.status === 7) { // 7 = 'Hired'
                soldier.status = 1
            };
        })
        updateWizard.soldiers = updateWizard.soldiers.filter((soldier) => soldier.status !== 8); // 8 = 'For Hire'
        const newEditMode = {...editMode};
        newEditMode['soldiers'] = false;
        setEditMode(newEditMode);

        const newUserData = {...userData}

        newUserData.myWizards = userData.myWizards.map(wizard => 
            wizard.id === currentWizard.id ? 
            {...wizard, soldiers: updateWizard.soldiers, gold: wizard.gold - totalEditedCost} : 
            wizard
        );
        
        const updatedWizard = newUserData.myWizards.find(wizard => wizard.id === currentWizard.id);

        setCurrentWizard(updatedWizard);
        setUserData(newUserData);
    }

    const handleNameChange = (index, newName) => {
        const updateWizard = {...editedWizard};
        updateWizard.soldiers[index].name = newName
        setEditedWizard(updateWizard)
    }

    const handleClassChange = (soldier, newClassId) => {
        const updateWizard = {...editedWizard};
        updateWizard.soldiers = updateWizard.soldiers.map((mySoldier) => {
            if (mySoldier.name === soldier.name) {
                mySoldier.classId = newClassId
            }
            return mySoldier
        })
        setEditedWizard(updateWizard)
    }

    const handleRemove = (removedSoldier) => {
        const goodbyeText = removedSoldier.stats.status === 0 ? `You have dumped ${removedSoldier.name} in a ditch somewhere.` : `${removedSoldier.name} walks away in disbelief as tears runs down their face.`;
        const confirmText = `Are you sure you want to remove ${removedSoldier.name}?`;

        if (window.confirm(confirmText)) {
            console.log(goodbyeText);
            if (removedSoldier.stats.status === 7) { // 7 = 'Hired'
                const newBalanceAmount = totalEditedCost - removedSoldier.stats.cost;
                setTotalEditedCost(newBalanceAmount);
            }
            const updateWizard = {...editedWizard};
            updateWizard.soldiers = updateWizard.soldiers.filter((soldier) => soldier.name !== removedSoldier.name);
            setEditedWizard(updateWizard)
        }
    }

    const handleHire = (hiredSoldier) => {
        const updateWizard = {...editedWizard};
        const soldierToBeHired = updateWizard.soldiers.find(soldier => soldier.name === hiredSoldier.name);
        soldierToBeHired.status = 7; // 7 = 'Hired'
        const newBalanceAmount = totalEditedCost + hiredSoldier.stats.cost;
        setTotalEditedCost(newBalanceAmount);
        setEditedWizard(updateWizard)
    }

    const ShowStatus = ({soldier}) => {
        if (soldier.stats.status === 0) {
            return <b style={{color: 'red'}}>Dead</b>
        } else if (soldier.stats.status === 2) {
            return <b style={{color: 'gray'}}>Badly Injured</b>
        } else if (soldier.stats.status === 8) {
            return <b style={{color: 'green'}}>For Hire</b>
        } else if (soldier.stats.status === 7) {
            return <b style={{color: 'green'}}>Hired</b>
        } else {
            return <b style={{color: 'lightblue'}}>{getStatusFromId(soldier.stats.status, refData)}</b>
        }
    }

    const ShowCost = ({soldier}) => {
        if (soldier.stats.status === 7) {
            return <b style={{color: 'red'}}>{soldier.stats.cost === 0 ? 'Free' : `$${soldier.stats.cost}`}</b>
        } else if (soldier.stats.status === 8) {
            return <b style={{color: 'green'}}>{soldier.stats.cost === 0 ? 'Free' : `$${soldier.stats.cost}`}</b>
        } else {
            return <b>--</b>
        }
    }

    const ShowAction = ({soldier}) => {
        if (soldier.stats.status === 0) {
            return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Dump</b></Button>
        } else if (soldier.stats.status === 8) {
            return <Button onClick={() => handleHire(soldier)}><b style={{color: 'green'}}>Hire</b></Button>;
        } else if (soldier.stats.status === 7) {
            return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'grey'}}>Remove</b></Button>;
        } else {
            return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Fire</b></Button>;
        }
    }

    function ShowClassSelections({soldier}) {

        return (
            <>
                <select 
                    disabled={soldier.stats.status !== 8} // 8 = 'For Hire'
                    value={soldier.stats.classId} 
                    onChange={(e) => handleClassChange(soldier, e.target.value)}
                    defaultValue={soldier.classId}
                    >
                    {
                        refData.soldiers.map((soldierClass) => (
                            <option key={soldierClass.id} value={soldierClass.id}>{soldierClass.stats.class}</option>
                        ))
                    }
                </select>
            </>
        )
    }

    function getRandomSoldierForHire() {
        const soldier = {};
      
        soldier.status = 8; // 8 = 'For Hire'
        soldier.classId = Math.floor(Math.random() * refData.soldiers.length) + 1;
        soldier.name = soldier.classId === 3 ? getRandomName(refData.nameGenerator.animal) : getRandomName(refData.nameGenerator.soldier);
        soldier.itemSlots = [0];
      
        return soldier
    }

    function ResourceTally() {
        const specialSoldierList = editedWizard.soldiers.filter(soldier => getSoldierFromId(soldier.classId, refData).type === 'Specialist' && soldier.status !== 8);
        const totalSpecialsRecruited = specialSoldierList.length;
        
        return (
            <>
                Cost / Current Gold: {totalEditedCost > currentWizard.gold ? <b style={{color: 'red'}}>{totalEditedCost}</b> : <b style={{color: 'green'}}>{totalEditedCost}</b>} / <b>{currentWizard.gold}</b>
                <br />
                Specialists Recruited: {totalSpecialsRecruited > 4 ? <b style={{color: 'red'}}>{totalSpecialsRecruited}</b> : <b style={{color: 'green'}}>{totalSpecialsRecruited}</b>} / 4 Allowed
            </>
        )
    }
    
    for (let x = editedWizard.soldiers.length; x < 8; x++) {
        editedWizard.soldiers.push(getRandomSoldierForHire());
    }

    return (
        <Box>
            <h3>Edit Roster</h3>
            <Paper className='generic-paper' sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/></TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/></TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/></TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/></TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/></TableCell>
                                <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/></TableCell>
                                <TableCell>Notes</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formSoldierStats(editedWizard.soldiers, refData).map((soldier, index) => {
                                return (
                                <TableRow key={`soldier-${index}`}>
                                    <TableCell>
                                        <TextField
                                            value={soldier.name} 
                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                            variant='standard' 
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    color: 'white', 
                                                    fontSize: '16px', 
                                                    fontWeight: 'bold', 
                                                    minWidth: '100px',
                                                    width: '10vw',
                                                }
                                            }}
                                            />
                                    </TableCell>
                                    <TableCell>{soldier.stats.status === 8 ? <ShowClassSelections soldier={soldier}/> : soldier.stats.class}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{soldier.stats.move}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.stats.fight)}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.stats.shoot)}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{soldier.stats.armor}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.stats.will)}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{soldier.stats.health}</TableCell>
                                    <TableCell>
                                        <Tooltip title={soldier.stats.notes} placement="top">
                                            <img
                                                src="src/assets/Game-Icons-net/stabbed-note.svg"
                                                className="stat-icon"
                                                alt="Notes Icon"
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell><ShowStatus soldier={soldier} /></TableCell>
                                    <TableCell><ShowCost soldier={soldier} /></TableCell>
                                    <TableCell><ShowAction soldier={soldier} /></TableCell>
                                </TableRow>
                                )}
                            )}
                            <TableRow>
                                <TableCell colSpan="12" sx={{textAlign: 'center'}}>
                                    <ResourceTally/>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan="12" sx={{textAlign: 'center'}}>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleSave}>Save</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
        
    )
}