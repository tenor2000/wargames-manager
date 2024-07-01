import { useAppContext } from "./AppContext";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import { BasicStatCard, BasicStatTableHeader, BasicStatTableRow, DisplayStatus } from "./BasicComponents";
import { getSoldierFromId, getRandomSoldier, getStatusFromId, modSign, getItemFromId } from "./HelperFunctions";
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Box, Tooltip, TextField, Button, Snackbar } from "@mui/material";


export const formSoldierStats = (mySoldierArray, refData) => {
    let soldierList = [];
    mySoldierArray.forEach((soldier) => {

        const soldierObj = getSoldierFromId(soldier.classId, refData);

        if (soldierObj) {
            soldierObj.status = soldier.status;
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

export function SoldierRosterBlock() {
    const { currentWizard, refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (currentWizard.soldiers.length === 0) {
        return null;
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
        </>
    );
}

export function EditSoldiersView() {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData} = useAppContext();
    const { userData, setUserData } = useAuth();
    const [ totalEditedCost, setTotalEditedCost ] = useState(0);
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});

    useEffect(() => {
        setTotalEditedCost(0);
        setEditedWizard({...currentWizard});
    }, [currentWizard])

    const handleCancel = () => {
        //WIP
        // const newEditMode = {...editMode};
        // newEditMode['soldiers'] = false;
        // const updateWizard = {...currentWizard};
        // console.log(currentWizard.soldiers)
        // console.log(editedWizard.soldiers)
        // setCurrentWizard({...currentWizard});
        // setEditMode(newEditMode);

        const newEditMode = { ...editMode };
        newEditMode['soldiers'] = false;
        setCurrentWizard({ ...currentWizard });
        setEditMode(newEditMode);
    }

    const handleSave = () => {
        const updateWizard = {...editedWizard};
        if (updateWizard.gold - totalEditedCost < 0) {
            alert('Not enough gold')
            return
        }
        const totalSpecialists = editedWizard.soldiers.filter(soldier => getSoldierFromId(soldier.classId, refData).type === 'Specialist' && soldier.status !== 8);
        if (totalSpecialists.length > 4) {
            alert('Too many specialists')
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

    const handleRemove = (removedSoldier) => {
        const goodbyeText = removedSoldier.status === 0 ? `You have dumped ${removedSoldier.name} in a ditch somewhere.` : `${removedSoldier.name} walks away in disbelief as tears runs down their face.`;
        const confirmText = `Are you sure you want to remove ${removedSoldier.name}?`;

        if (window.confirm(confirmText)) {
            console.log(goodbyeText);
            if (removedSoldier.status === 7) { // 7 = 'Hired'
                const newBalanceAmount = totalEditedCost - removedSoldier.cost;
                setTotalEditedCost(newBalanceAmount);
            }
            // const updateWizard = {...editedWizard};
            // updateWizard.soldiers = updateWizard.soldiers.filter((soldier) => soldier.name !== removedSoldier.name);
            // setEditedWizard(updateWizard)

            const updatedSoldiers = editedWizard.soldiers.filter((soldier) => soldier.name !== removedSoldier.name);
            setEditedWizard({ ...editedWizard, soldiers: updatedSoldiers });
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