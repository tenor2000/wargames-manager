import { useAppContext } from './AppContext';
import { useAuth } from './AuthContext';
import { getRandomName, deriveApprenticeStats, getSchoolFromId, modSign } from './HelperFunctions';
import { BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from './BasicComponents';
import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';


export function WizardView() {
    const { currentWizard, refData } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const wizardStats = currentWizard.stats;
    wizardStats['class'] = getSchoolFromId(wizardStats.classId, refData).name;

    return (
        <>
        {isPortrait && <BasicStatCard name={currentWizard.name} stats = {wizardStats} refData={refData} showLevel={true} />}
        {!isPortrait && 
            <BasicStatTableHeader show_costs={false} show_status={true} showLevel={true} editMode={true} >
                <BasicStatTableRow name = {currentWizard.name} stats = {wizardStats} refData={refData} show_costs={false} show_status={true} showLevel={true} editMode={true} />
            </BasicStatTableHeader>
        }
        </>
    );
}

export function ApprenticeView() {
    const { currentWizard, setCurrentWizard,editMode, setEditMode, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    
    const wizardStats = currentWizard.stats;
    const apprenticeStats = deriveApprenticeStats(wizardStats, currentWizard.apprentice);
    apprenticeStats.cost = (currentWizard.level-6)*10 + 160;

    const handleEditClick = (editMode) => {
        const newEditMode = {...editMode};
        newEditMode['apprentice'] = true;
        setEditMode(newEditMode);
    }

    const handleRemoval = () => {
        const goodbyeText = currentWizard.apprentice.status === 0 ? `dump ${currentWizard.apprentice.name}'s body in a ditch somewhere`  : `fire your apprentice, ${currentWizard.apprentice.name}`;

        if (window.confirm(`Are you sure you want to ${goodbyeText}?`)) {
            const newUserData = {...userData}
            console.log(userData)
            newUserData.myWizards = userData.myWizards.map(wizard => 
                wizard.id === currentWizard.id ? 
                {...wizard, apprentice: { ...wizard.apprentice, name: '', status: 9, itemSlots: [0,0,0,0] }} : 
                wizard
            );
            
            const updatedWizard = newUserData.myWizards.find(wizard => wizard.id === currentWizard.id);
    
            setCurrentWizard(updatedWizard);
            setUserData(newUserData);
        }
    }

    return (
        <>
            {apprenticeStats.status !== 9 && editMode !== 'apprentice' && 
            <>
                {isPortrait && 
                    <BasicStatCard name={apprenticeStats.name} stats = {apprenticeStats} refData={refData}/>
                }
                {!isPortrait && 
                    <BasicStatTableHeader show_costs={false} show_status={true} showLevel={true} editMode={true} >
                        <BasicStatTableRow name = {apprenticeStats.name} stats = {apprenticeStats} refData={refData} show_costs={false} show_status={true} showLevel={true} editMode={true} />
                    </BasicStatTableHeader>
                }
                <Box>
                    <Button onClick={() => handleEditClick('apprentice')}>Edit</Button>
                    <Button onClick={() => handleRemoval('apprentice')}>{apprenticeStats.status === 0 ? 'Dump' : 'Fire'}</Button>
                </Box>
            </>
            }
            {apprenticeStats.status === 9 && <ShowPotentialApprentices/>}
            {editMode.apprentice && <EditApprentice />}
        </>
    )
}

export function ShowPotentialApprentices() {
    const { refData, currentWizard, setCurrentWizard } = useAppContext();
    const { userData, setUserData } = useAuth();

    const hireApprentice = (apprenticeName, cost) => {
        if (currentWizard.gold < cost) {
            alert(`You do not have enough gold to afford ${apprenticeName}'s services!`);
            return
        }
        // POST request to hire the apprentice
        const newUserData = {...userData}

        newUserData.myWizards = userData.myWizards.map(wizard => 
            wizard.id === currentWizard.id ? 
            {...wizard, apprentice: { ...wizard.apprentice, name: apprenticeName, status: 1 }, gold: wizard.gold - cost} : 
            wizard
        );
        
        const updatedWizard = newUserData.myWizards.find(wizard => wizard.id === currentWizard.id);

        setCurrentWizard(updatedWizard);
        setUserData(newUserData);
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
    const apprenticeCost = (currentWizard.stats.level - 6)*10 + 160;

    return (
        <div>
            <h3>You currently do not have an Apprentice.</h3>
            <p>You can hire one for <b style={{color: 'red'}}>{apprenticeCost} gold</b> from the list below.</p>
            <div className='apprentice-hire-container'>
            {apprenticeList(refData.nameGenerator.apprentice).map((apprenticeName) => 
                <div key= {apprenticeName}>
                    <BasicStatCard name={apprenticeName} stats={apprenticeStats} show_status={false}/>
                    <Button onClick={() => hireApprentice(apprenticeName, apprenticeCost)} >Hire {apprenticeName}</Button>
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
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </>
    )
}