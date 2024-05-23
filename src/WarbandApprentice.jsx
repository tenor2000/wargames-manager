import { useAppContext } from './AppContext';
import { getRandomName, deriveApprenticeStats } from './HelperFunctions';
import { BasicStatCard } from './BasicComponents';

export function ShowPotentialApprentices() {
    const { refData, currentWizard, setCurrentWizard } = useAppContext();

    const hireApprentice = (apprenticeName) => {
        const updatedWizard = {...currentWizard}
        updatedWizard.apprentice.name = apprenticeName;
        updatedWizard.apprentice.status = 1;
        setCurrentWizard(updatedWizard)
        console.log('Hired ' + apprenticeName)
    }

    const apprenticeList = (nameList) => {
        let theList = [...nameList]
        let apprenticeList = [];
        for (let x=0; x < 3; x++) {
            const randomName = getRandomName(theList)
            theList = theList.filter((name) => name !== randomName);
            apprenticeList[x] = randomName;
        }
        return apprenticeList
    }

    const apprenticeStats = deriveApprenticeStats(currentWizard.stats, currentWizard.apprentice);

    return (
        <div>
            <h3>You currently do not have an Apprentice.</h3>
            <p>You can hire one from the list below.</p>
            <div className='apprentice-hire-container'>
            {apprenticeList(refData.nameGenerator.apprentice).map((apprenticeName) => 
                <div key= {apprenticeName}>
                    <BasicStatCard name={apprenticeName} stats={apprenticeStats} show_costs={true} show_status={false}/>
                    <button onClick={() => hireApprentice(apprenticeName)} >Hire {apprenticeName}</button>
                </div>
            )}
            </div>
        </div>
    )
}   

export function EditApprentice() {
    const { currentWizard, setCurrentWizard, editMode, setEditMode } = useAppContext();

    const handleCancel = () => {
        const newEditMode = {...editMode};
        newEditMode['apprentice'] = false;
        setEditMode(newEditMode);
    }

    const handleSave = () => {
        const newEditMode = {...editMode};
        newEditMode['apprentice'] = false;
        const updateWizard = {...currentWizard};
        updateWizard.apprentice.status = 1;
        setEditMode(newEditMode);
    }
    return (
        <>
            <h3>Edit Apprentice</h3>
            <button onClick={handleCancel}>Cancel</button>
            <button>Save</button>
        </>
    )
}