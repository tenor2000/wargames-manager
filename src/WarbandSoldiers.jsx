import { useAppContext } from "./AppContext";
import { BasicStatCard, getSoldierFromId } from "./BasicComponents";

export function HiredSoldiersBlock() {
    const { currentWizard } = useAppContext();

    const  soldierBlockList = () => {
        const mySoldiersList = currentWizard.soldiers;
        let soldierList = [];
        
        for (const soldierName in mySoldiersList) {
            const soldierId = mySoldiersList[soldierName].classId;
            const soldierEntry = getSoldierFromId(soldierId);
            const soldierStats = {...soldierEntry.stats};
            soldierStats.status = mySoldiersList[soldierName].status;
            soldierStats.itemSlots = mySoldiersList[soldierName].itemSlots;
            soldierList.push({name: soldierName, stats: soldierStats});
        }
        return soldierList
    }

    return (
        <>
            {soldierBlockList().map((soldier, index) => (
                    <BasicStatCard key={soldier.name} name={soldier.name} stats={soldier.stats} show_costs={true} />
                ))}
        </>
    );
}

export function EditSoldiers({ editMode, setEditMode }) {
    const { currentWizard, setCurrentWizard } = useAppContext();

    const handleCancel = () => {
        const newEditMode = {...editMode};
        newEditMode['soldiers'] = false;
        setEditMode(newEditMode);
    }

    return (
        <>
            <h3>Edit Soldiers</h3>
            <button onClick={handleCancel}>Cancel</button>
            <button>Save</button>
        </>
    )
}

export function NoSoldierMenu() {
    return (
        <div className='no-soldiers-container center'>
            No Soldier Selected
        </div>
    )
}