import { useAppContext } from "./AppContext";
import { useState } from "react";
import { BasicStatCard } from "./BasicComponents";
import { getRandomName, getSoldierFromId, getStatusFromId } from "./HelperFunctions";

import { Tooltip } from "@mui/material";


const formSoldierStats = (mySoldierArray) => {
    let soldierList = [];
    mySoldierArray.forEach((soldier) => {
        const soldierEntryStats = getSoldierFromId(soldier.classId);
        const soldierStats = {...soldierEntryStats.stats};
        soldierStats.status = soldier.status;
        soldierStats.itemSlots = soldier.itemSlots;
        soldierList.push({name: soldier.name, classId: soldier.classId, stats: soldierStats});
    })
    return soldierList
}
export function HiredSoldiersBlock() {
    const { currentWizard } = useAppContext();

    return (
        <div className='soldier-card-view'>
            {formSoldierStats(currentWizard.soldiers).map((soldier, index) => (
                    <BasicStatCard key={soldier.name} name={soldier.name} stats={soldier.stats} show_costs={true} />
                ))}
        </div>
    );
}

export function EditSoldiersView() {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData} = useAppContext();
    const [ editedWizard, setEditedWizard ] = useState(currentWizard);
    const [ totalEditedCost, setTotalEditedCost ] = useState(0);

    const modSign = (stat) => {
        return stat >= 0 ? `+${stat}` : stat;
      }

    const handleCancel = () => {
        const newEditMode = {...editMode};
        newEditMode['soldiers'] = false;
        setEditMode(newEditMode);
    }

    const handleSave = () => {
        const updateWizard = {...editedWizard};
        if (updateWizard.gold - totalEditedCost < 0) {
            return alert('Not enough gold!')
        }

        updateWizard.gold -= totalEditedCost;
        updateWizard.soldiers.forEach((soldier) => {
            if (soldier.status === 7) {
                soldier.status = 1
            };
        })
        updateWizard.soldiers = updateWizard.soldiers.filter((soldier) => soldier.status !== 8); // 8 = 'For Hire'
        setCurrentWizard(updateWizard);
        const newEditMode = {...editMode};
        newEditMode['soldiers'] = false;
        setEditMode(newEditMode);
    }

    const handleNameChange = (soldier, newName) => {
        const updateWizard = {...editedWizard};

        updateWizard.soldiers = updateWizard.soldiers.map((mySoldier) => {
            if (mySoldier.name === soldier.name) {
                mySoldier.name = newName
            }
            return mySoldier
        })
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
            return <b style={{color: 'green'}}>Hired (${soldier.stats.cost})</b>
        } else {
            return <b style={{color: 'lightblue'}}>{getStatusFromId(soldier.stats.status)}</b>
        }
    }

    const ShowButtonSelection = ({soldier}) => {
        if (soldier.stats.status === 0) {
            return <button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Dump</b></button>
        } else if (soldier.stats.status === 8) {
            return <button onClick={() => handleHire(soldier)}><b style={{color: 'green'}}>${soldier.stats.cost}</b></button>;
        // } else if (soldier.stats.status === 7) {
        //     return <button onClick={() => handleRemove(soldier)}><b style={{color: 'grey'}}>Undo</b></button>;
        } else {
            return <button onClick={() => handleRemove(soldier)}><b style={{color: 'red'}}>Fire</b></button>;
        }
    }

    function ShowClassSelections({soldier}) {
        return (
            <>
                <select 
                    disabled={soldier.stats.status !== 8} 
                    value={soldier.stats.classId} 
                    onChange={(e) => handleClassChange(soldier, e.target.value)}
                    defaultValue={soldier.classId}
                    >
                    {
                        refData.soldiers.map((soldierClass) => {
                            return <option key={soldierClass.id} value={soldierClass.id}>{soldierClass.stats.class}</option>
                        })
                    }
                </select>
            </>
        )
    }

    function getRandomSoldierForHire() {
        const { refData } = useAppContext();
        const soldier = {};
      
        soldier.status = 8; // 8 = 'For Hire'
        soldier.classId = Math.floor(Math.random() * refData.soldiers.length) + 1;
        soldier.name = soldier.classId === 3 ? getRandomName(refData.nameGenerator.animal) : getRandomName(refData.nameGenerator.soldier);
        soldier.itemSlots = ['none'];
      
        return soldier
    }

    // Fill slots with potential hires
    for (let x = editedWizard.soldiers.length; x < 8; x++) {
        editedWizard.soldiers.push(getRandomSoldierForHire());
    }

    return (
        <div className='edit-soldiers-view'>
            <h3>Edit Roster</h3>
            <table className='edit-soldier-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/></th>
                        <th><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/></th>
                        <th><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/></th>
                        <th><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/></th>
                        <th><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/></th>
                        <th><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/></th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {formSoldierStats(editedWizard.soldiers).map((soldier, index) => (
                        <tr key={index}>
                            <td><input type="text" value={soldier.name} onChange={(e) => handleNameChange(soldier, e.target.value)} /></td>
                            <td>{soldier.stats.status === 8 ? <ShowClassSelections soldier={soldier}/> : soldier.stats.class}</td>
                            <td>{soldier.stats.move}</td>
                            <td>{modSign(soldier.stats.fight)}</td>
                            <td>{modSign(soldier.stats.shoot)}</td>
                            <td>{modSign(soldier.stats.will)}</td>
                            <td>{soldier.stats.armor}</td>
                            <td>{soldier.stats.health}</td>
                            <td>
                                <Tooltip title={soldier.stats.notes} placement="top">
                                    <img
                                        src="src/assets/Game-Icons-net/stabbed-note.svg"
                                        className="stat-icon"
                                        alt="Notes Icon"
                                    />
                                </Tooltip>
                            </td>
                            <td><ShowStatus soldier={soldier}/></td>
                            <td><ShowButtonSelection soldier={soldier}/></td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="11">You have <b style={{color:'green'}}>{currentWizard.gold}</b> gold in your vault. This roster change will cost you <b style={{color: 'red'}}>{totalEditedCost}</b> gold.</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}



export function NoSoldierMenu() {
    return (
        <div className='no-soldiers-container center'>
            No Soldier Selected
        </div>
    )
}