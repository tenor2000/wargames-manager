import { useAppContext } from "../contexts/AppContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useAlert } from "../contexts/AlertContext.jsx";
import { useState, useEffect } from "react";
import { BasicStatCard, BasicStatTableHeader, BasicStatTableRow, DisplayStatus } from "../basicComponents/BasicComponents.jsx";
import { getSoldierFromId, getRandomSoldier, getStatusFromId, modSign, getItemFromId } from "../helperFuncs/HelperFunctions.js";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Box, Tooltip, TextField, Button, Snackbar } from "@mui/material";


export const formSoldierStats = (mySoldierArray, refData) => {
    let soldierList = [];
    mySoldierArray.forEach((soldier) => {

        const soldierObj = getSoldierFromId(soldier.classId, refData);

        if (soldierObj) {
            soldierObj.status = soldier.status;
            soldierObj.statMods = {
                move: 0,
                fight: 0,
                shoot: 0,
                armor: 0,
                will: 0,
                health: 0
            }
            if (soldier.itemSlots) { 
                soldierObj.itemSlots = [...soldierObj.permItemSlots, ...soldier.itemSlots] 
            } else {
                soldierObj.itemSlots = [...soldierObj.permItemSlots]
            }
            soldierObj.name = soldier.name;
            soldierList.push(soldierObj);
        }
    })
    return soldierList
}

export function SoldierRosterView({handleButton}) {
    const { currentWizard, editMode, refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (currentWizard.soldiers.length === 0 && !editMode.soldiers) {
        return (
            <>
                <p>There are no soldiers in {currentWizard.name}'s roster.</p>
                <Button onClick={() => handleButton('edit', 'soldiers')}>Hire Soldiers</Button>
            </>
        )
    }

    if (editMode.soldiers) {
        return (
                <EditSoldiersView />
        )
    }

    const soldierList = formSoldierStats(currentWizard.soldiers, refData);

    return (
        <>
            
            {isPortrait &&
            <div className='soldier-card-view'>
                {soldierList.map((soldier, index) => (
                        <BasicStatCard key={index} statsObj={soldier} refData={refData} showStatus={true} showItemSlots={true} />
                    ))}
            </div>
            }
            {!isPortrait && 
                <BasicStatTableHeader showName={true} showClass={true} showStatus={true} showItemSlots={true}>
                    {soldierList.map((soldier, index) => (
                        <BasicStatTableRow key={index} statsObj = {soldier} refData={refData} />
                    ))}
                </BasicStatTableHeader>
            }
            {!editMode.soldiers && <Button onClick={() => handleButton('edit', 'soldiers')}>Edit Roster</Button>}
        </>
    );
}

export function EditSoldiersView({alertObj, setAlertObj}) {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData} = useAppContext();
    const { userData, setUserData } = useAuth();
    const { showAlertDialog, showAlert } = useAlert();
    const [ totalEditedCost, setTotalEditedCost ] = useState(0);
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});

    useEffect(() => {
        setTotalEditedCost(0);
        setEditedWizard({...currentWizard});
    }, [currentWizard])

    const handleCancel = () => {
        const newEditMode = { ...editMode };
        newEditMode['soldiers'] = false;
        setCurrentWizard({ ...currentWizard });
        setEditMode(newEditMode);
    }

    const handleSave = () => {
        const updateWizard = {...editedWizard};
        if (updateWizard.gold - totalEditedCost < 0) {
            showAlert('You do not have enough gold to pay for this roster', 'error')
            return
        }
        const totalSpecialists = editedWizard.soldiers.filter(soldier => getSoldierFromId(soldier.classId, refData).type === 'Specialist' && soldier.status !== 8);
        if (totalSpecialists.length > 4) {
            showAlert('You have recruited too many specialists', 'error')
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
        showAlert('Soldier roster updated', 'success');
        setCurrentWizard(updatedWizard);
        setUserData(newUserData);
    }

    const handleNameChange = (index, newName) => {
        const updatedSoldiers = editedWizard.soldiers.map((soldier, i) => {
            if (i === index) {
                return { ...soldier, name: newName };
            }
            return soldier;
        });
        setEditedWizard({ ...editedWizard, soldiers: updatedSoldiers });
    }

    const handleClassChange = (soldier, newClassId) => {
        const updatedSoldiers = editedWizard.soldiers.map((mySoldier) => {
            if (mySoldier.name === soldier.name) {
                return { ...mySoldier, classId: parseInt(newClassId) };
            }
            return mySoldier;
        });
        setEditedWizard({ ...editedWizard, soldiers: updatedSoldiers });

    }

    const handleRemove = async (removedSoldier) => {
        const confirmText = removedSoldier.status === 0 
            ? `Deposit ${removedSoldier.name}'s body in a ditch somewhere?` 
            : `Do you want to fire ${removedSoldier.name} from the team?`;
        const cancelText = removedSoldier.status === 0 
            ? `${removedSoldier.name}'s body begins to exude an awful smell...` 
            : `${removedSoldier.name} breathes a sigh of relief...`;
        const goodbyeText = removedSoldier.status === 0 
            ? `You have dumped ${removedSoldier.name}'s body in a ditch somewhere cold.` 
            : `Shocked and in disbelief, ${removedSoldier.name} ${removedSoldier.status === 2 ? 'hobbles' :'runs'} away sobbing.`;
        
        const confirmed = await showAlertDialog('', confirmText);
        if (confirmed) {
            showAlert(goodbyeText, 'success');
            if (removedSoldier.status === 7) {
                // 7 = 'Hired'
                const newBalanceAmount = totalEditedCost - removedSoldier.cost;
                setTotalEditedCost(newBalanceAmount);
            }

            const updatedSoldiers = editedWizard.soldiers.filter((soldier) => soldier.name !== removedSoldier.name);
            setEditedWizard({ ...editedWizard, soldiers: updatedSoldiers });

        } else {
            showAlert(cancelText, 'info');
        }
    }

    const handleHire = (hiredSoldier) => {
        const updateWizard = {...editedWizard};
        const soldierToBeHired = updateWizard.soldiers.find(soldier => soldier.name === hiredSoldier.name);
        soldierToBeHired.status = 7; // 7 = 'Hired'
        const newBalanceAmount = totalEditedCost + hiredSoldier.cost;
        setTotalEditedCost(newBalanceAmount);
        setEditedWizard(updateWizard)
    }

    const ShowCost = ({soldier}) => {
        switch (soldier.status) {
            case 7: // 7 = 'Hired'
                return <b style={{color: 'red'}}>{soldier.cost === 0 ? 'Free' : `${soldier.cost}gc`}</b>
            case 8: // 8 = 'For Hire'
                return <b style={{color: 'green'}}>{soldier.cost === 0 ? 'Free' : `${soldier.cost}gc`}</b>
            default:
                return <b>--</b>
        }
    }

    const ShowAction = ({soldier}) => {
        switch (soldier.status) {
            case 0: // 0 = 'Dead'
                return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Dump</b></Button>
            case 7: // 7 = 'Hired'
                return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'grey'}}>Remove</b></Button>;
            case 8: // 8 = 'For Hire'
                return <Button onClick={() => handleHire(soldier)}><b style={{color: 'green'}}>Hire</b></Button>;
            default:
                return <Button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Fire</b></Button>;
        }
    }

    function ShowClassSelections({soldier}) {
        const handleChange = (e) => {
            handleClassChange(soldier, e.target.value);
        };

        return (
            <>
                <select 
                    disabled={soldier.status !== 8} // 8 = 'For Hire'
                    onChange={handleChange}
                    value={soldier.id}
                >
                    {
                        refData.soldiers.map((soldierClass) => (
                            <option key={soldierClass.id} value={soldierClass.id}>{soldierClass.class}</option>
                        ))
                    }
                </select>
            </>
        )
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
    
    let soldierRoster = [...editedWizard.soldiers];
    for (let x = soldierRoster.length; x < 8; x++) {
        soldierRoster.push(getRandomSoldier(refData));
    }
    if (editedWizard.soldiers.length < 8) {
        setEditedWizard({ ...editedWizard, soldiers: soldierRoster });
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3>Edit Roster</h3>
                <BasicStatTableHeader 
                    showName={true} 
                    showClass={true} 
                    showStatus={true} 
                    showItemSlots={true}
                    showCosts={true}
                    editMode={true}
                    cloning={false}
                >
                    {formSoldierStats(editedWizard.soldiers, refData).map((soldier, index) => {
                        let items = []
                        soldier.itemSlots.forEach((itemId) => {
                            const item = getItemFromId(itemId, refData)
                            if (item) {
                                items.push(getItemFromId(itemId, refData).name)
                            }
                        })
                        
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
                                <TableCell>{soldier.status === 8 ? <ShowClassSelections soldier={soldier} soldierRoster={soldierRoster}/> : soldier.class}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{soldier.move}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.fight)}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.shoot)}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{soldier.armor}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{modSign(soldier.will)}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{soldier.health}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>
                                    {items.length > 0 ?
                                        <Tooltip title={items.join(', ')}>
                                            <img
                                                src="src/assets/Game-Icons-net/stabbed-note.svg"
                                                className="stat-icon"
                                                alt="Notes Icon"
                                            />
                                        </Tooltip>
                                        :
                                        '--'
                                    }   
                                </TableCell>
                                <TableCell>
                                    {soldier.notes ?
                                        <Tooltip title={soldier.notes ? soldier.notes : '--'} placement="top">
                                            <img
                                                src="src/assets/Game-Icons-net/stabbed-note.svg"
                                                className="stat-icon"
                                                alt="Notes Icon"
                                            />
                                        </Tooltip>
                                        :
                                        '--'
                                    }
                                </TableCell>
                                <TableCell><DisplayStatus statsObj={soldier} refData={refData} /></TableCell>
                                <TableCell><ShowCost soldier={soldier} /></TableCell>
                                <TableCell><ShowAction soldier={soldier} /></TableCell>
                            </TableRow>
                        )}
                    )}
                    <TableRow>
                        <TableCell colSpan="13" sx={{textAlign: 'center'}}>
                            <ResourceTally/>
                        </TableCell>
                    </TableRow>
                </BasicStatTableHeader>
            </Box>
            <Box sx={{textAlign: 'center'}}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </Box>
        </>
    )
}