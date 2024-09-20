import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useEffect, useState } from 'react';
import ItemSelectionSlots from './ItemSelectionSlots';
import { getRandomName } from '../helperFuncs/helperFunctions';
import deriveApprenticeStats from '../helperFuncs/deriveApprenticeStats';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicStatTable';
import BasicStatCard from '../basicComponents/BasicStatCard';

function ApprenticeView({handleButton}) {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { showAlert, showAlertDialog } = useAlert();
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    
    const apprenticeStats = deriveApprenticeStats(currentWizard, currentWizard.apprentice);

    useEffect(() => {
        setEditedWizard({...currentWizard});
    }, [currentWizard])

    const handleApprenticeButtons = (type) => {
        switch (type) {
            case 'remove':
                const confirmText = currentWizard.apprentice.status === 0 
                    ? `Deposit ${currentWizard.apprentice.name}'s body in a ditch somewhere?` 
                    : `Do you want to fire ${currentWizard.apprentice.name} as your apprentice?`;
                const cancelText = currentWizard.apprentice.status === 0 
                    ? `${currentWizard.apprentice.name}'s body begins to exude an awful smell...` 
                    : `${currentWizard.apprentice.name} breathes a sigh of relief...`;
                const goodbyeText = currentWizard.apprentice.status === 0 
                    ? `You have dumped ${currentWizard.apprentice.name}'s body in a ditch somewhere cold.` 
                    : `Shocked and in disbelief, ${currentWizard.apprentice.name} ${currentWizard.apprentice.status === 2 ? 'hobbles' :'walks'} away sobbing.`;
        
                showAlertDialog('', confirmText).then((confirmed) => {
                    if (confirmed) {
                        showAlert(goodbyeText, 'success');
                        const newUserData = {...userData}
                        newUserData.myWizards = userData.myWizards.map(wizard => 
                            wizard.id === currentWizard.id 
                                ? {...wizard, apprentice: { ...wizard.apprentice, name: '', status: 9, itemSlots: [0,0,0,0] }} 
                                : wizard
                        );

                        const updatedWizard = newUserData.myWizards.find(wizard => wizard.id === currentWizard.id);
                
                        setUserData(newUserData);
                        showAlert(goodbyeText, 'success');

                    } else {
                        showAlert(cancelText, 'info');
                    }
                });
                break;
            case 'save-edit':
                //Need to adjust for apprentice
                setEditMode({...editMode, apprentice: false});
                const updateWizard = {...currentWizard};
                updateWizard.apprentice.status = 1;
                setCurrentWizard(editedWizard);
                const updatedWizards = userData.myWizards.map((wizard) => 
                    wizard.id === editedWizard.id ? editedWizard : wizard
                );
                setUserData({...userData, mywizards: updatedWizards});
                break;
            case 'cancel-edit':
                setEditedWizard({...currentWizard});
                setEditMode({...editMode, 'apprentice': false});
                break;
            default:
                break;
        }
    }

    return (
        <>
            {apprenticeStats.status !== 9 && !editMode.apprentice && 
            <>
                {isPortrait 
                    ?
                        <BasicStatCard statsObj = {apprenticeStats} showLevel={true} showItemSlots={true} showStatus={true} />
                    :
                        <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showItemSlots={true} showStatus={true}>
                            <BasicStatTableRow statsObj = {apprenticeStats} refData={refData}  />
                        </BasicStatTableHeader>
                }
                <Box sx={{width: '100%', textAlign: 'center' }}>
                    <Button onClick={() => handleButton('edit', 'apprentice')}>Edit</Button>
                    <Button onClick={() => handleApprenticeButtons('remove')}>{apprenticeStats.status === 0 ? 'Dump' : 'Fire'}</Button>
                </Box>

            </>
            }
            {apprenticeStats.status === 9 && 
                <ShowPotentialApprentices />
            }
            {apprenticeStats.status !== 9 && editMode.apprentice && 
                <ApprenticeEdit
                    apprenticeStats = {apprenticeStats}
                    handleApprenticeButtons={handleApprenticeButtons} 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData}
                />
            }
        </>
    )
}

function ApprenticeEdit({apprenticeStats, handleApprenticeButtons, editedWizard, setEditedWizard, refData}) {
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    return (
        <>
            <Typography variant='h6' >Edit Apprentice</Typography>
            {isPortrait 
                ? 
                    <BasicStatCard 
                        statsObj = {apprenticeStats} 
                        showItemSlots={true} 
                        showLevel={true} 
                        showStatus={true} 
                        showClass={true}
                    />
                : 
                    <BasicStatTableHeader 
                        showName={true} 
                        showClass={true} 
                        showLevel={true} 
                        showStatus={true} 
                        showItemSlots={true}
                    >
                        <BasicStatTableRow 
                            statsObj = {apprenticeStats} 
                            refData={refData}
                        />
                    </BasicStatTableHeader>
            }
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <ItemSelectionSlots 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData} 
                    includeGeneral={true}
                    character='apprentice'
                />
            </Box>
            <Box sx={{width: '100%', textAlign: 'center' }}>
                <Button onClick={() => handleApprenticeButtons('cancel-edit')}>Cancel</Button>
                <Button onClick={() => handleApprenticeButtons('save-edit')}>Save</Button>
            </Box>
        </>
    )
}

function ShowPotentialApprentices() {
    const { refData, currentWizard } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { showAlert, showAlertDialog } = useAlert();

    // Names keep changing whenever something is clicked, need to fix.

    const hireApprentice = (apprenticeName, cost) => {
        if (currentWizard.gold < cost) {
            showAlert(`You cannot afford to acquire ${apprenticeName}'s services!`);
            return
        }

        const confirmText = `Are you sure you want to hire ${apprenticeName} for ${cost} gc?`

        showAlertDialog('Hiring Apprentice', confirmText).then((confirmed) => {
            if (confirmed) {
                // POST request to hire the apprentice
                const newUserData = {...userData}
                newUserData.myWizards = userData.myWizards.map(wizard => 
                    wizard.id === currentWizard.id 
                        ? 
                            {...wizard, apprentice: { ...wizard.apprentice, name: apprenticeName, status: 1 }, gold: wizard.gold - cost} 
                        : 
                            wizard
                );

                setUserData(newUserData);
            }
        })
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

    const apprenticeStats = deriveApprenticeStats(currentWizard, currentWizard.apprentice);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>You currently do not have an Apprentice.</h3>
            <p>You can hire one for <b style={{color: 'red'}}>{apprenticeStats.cost} gold</b> from the list below.</p>
            <Box className='apprentice-hire-container'>
                {apprenticeList(refData.nameGenerator.apprentice).map((apprenticeName) => {
                    const apprenticeObj = {...apprenticeStats}
                    apprenticeObj.name = apprenticeName;
                    return (
                        <Box key= {apprenticeName} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <BasicStatCard statsObj={apprenticeObj} refData={refData}/>
                            <Button onClick={() => hireApprentice(apprenticeName, apprenticeStats.cost)} >Hire {apprenticeName}</Button>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}  

export default ApprenticeView