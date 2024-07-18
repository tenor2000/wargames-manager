import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useState, useEffect } from 'react';
import { getRandomName, deriveApprenticeStats, getSchoolFromId, modSign, getItemFromId } from '../helperFuncs/HelperFunctions';
import { BasicStatCard, BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicComponents';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';


export function WizardView({handleButton}) {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { alert, showAlert, hideAlert } = useAlert();
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});

    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const wizardStats = {...currentWizard};
    wizardStats['class'] = getSchoolFromId(wizardStats.classId, refData).name;

    useEffect(() => {
        setEditedWizard({...wizardStats});
    }, [currentWizard])

    const handleWizardButtons = (type) => {
        switch (type) {
            case 'level':
                return null;
            case 'save-edit':
                setEditMode({...editMode, wizard: false});
                setCurrentWizard(editedWizard);
                const updatedWizards = userData.myWizards.map((wizard) => 
                    wizard.id === editedWizard.id ? editedWizard : wizard
                );
                setUserData({...userData, mywizards: updatedWizards});
                showAlert(`${editedWizard.name} has been updated successfully!`, 'success');
                break;
            case 'cancel-edit':
                setEditedWizard({...wizardStats});
                setEditMode({...editMode, 'wizard': false});
                break;
            default:
                break;
        }
    }

    return (
        
        <>
            {!editMode.wizard &&
                <>
                    {isPortrait && <BasicStatCard statsObj = {wizardStats} showItemSlots={true} showLevel={true} showStatus={true} showClass={true}/>}
                    {!isPortrait && 
                        <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showStatus={true} showItemSlots={true}>
                            <BasicStatTableRow statsObj = {wizardStats} refData={refData}/>
                        </BasicStatTableHeader>
                    }
                    <Box sx={{width: '100%', textAlign: 'center' }}>
                        <p>Total XP Earned: {currentWizard.xp + currentWizard.xpSpent}</p>
                        <p>Current XP: {currentWizard.xp}</p>
                        <p>Current Level: {currentWizard.level}</p>
                    </Box>
                    <Box sx={{width: '100%', textAlign: 'center' }}>
                        <Button onClick={() => handleButton('edit', 'wizard')}>Edit</Button>
                        <Button 
                            disabled={currentWizard.xp < 100} 
                            onClick={handleWizardButtons('level')}
                        >
                            Gain Level
                        </Button>
                    </Box>
                </>
            }
            {editMode.wizard && 
                <WizardEdit 
                    handleWizardButtons={handleWizardButtons} 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData}
                />
            }
        </>
    );
}

function WizardEdit({handleWizardButtons, editedWizard, setEditedWizard, refData}) {
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    return (
        <>
            <Typography variant='h6' >Edit Wizard</Typography>
            {isPortrait && <BasicStatCard statsObj = {editedWizard} showItemSlots={true} showLevel={true} showStatus={true} showClass={true}/>}
            {!isPortrait && 
                <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showStatus={true} showItemSlots={true}>
                    <BasicStatTableRow statsObj = {editedWizard} refData={refData}/>
                </BasicStatTableHeader>
            }
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '250px', border: '1px solid black'}}>
                <Typography variant='h6' >Inventory </Typography>
                <ItemSelectionSlots 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData} 
                    includeGeneral={true}/>
            </Box>
            <Box sx={{width: '100%', textAlign: 'center' }}>
                <Button onClick={() => handleWizardButtons('cancel-edit')}>Cancel</Button>
                <Button onClick={() => handleWizardButtons('save-edit')}>Save</Button>
            </Box>
        </>
    )
}

export function ApprenticeView({handleButton}) {
    const { currentWizard, setCurrentWizard, editMode, setEditMode, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { alert, showAlert, hideAlert } = useAlert();
    const [ editedWizard, setEditedWizard ] = useState({...currentWizard});
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    
    const apprenticeStats = deriveApprenticeStats(currentWizard, currentWizard.apprentice);
    apprenticeStats.cost = (currentWizard.level-6)*10 + 160;

    useEffect(() => {
        setEditedWizard({...currentWizard});
    }, [currentWizard])

    const handleApprenticeButtons = (type) => {
        switch (type) {
            case 'remove':
                //Need to replace with actual AlertDialog
                const goodbyeText = currentWizard.apprentice.status === 0 
                    ? `dump ${currentWizard.apprentice.name}'s body in a ditch somewhere` 
                    : `fire your apprentice, ${currentWizard.apprentice.name}`;

                if (window.confirm(`Are you sure you want to ${goodbyeText}?`)) {
                    const newUserData = {...userData}
                    newUserData.myWizards = userData.myWizards.map(wizard => 
                        wizard.id === currentWizard.id 
                            ? {...wizard, apprentice: { ...wizard.apprentice, name: '', status: 9, itemSlots: [0,0,0,0] }} 
                            : wizard
                    );

                    const updatedWizard = newUserData.myWizards.find(wizard => wizard.id === currentWizard.id);
            
                    setCurrentWizard(updatedWizard);
                    setUserData(newUserData);
                    showAlert(`You ${goodbyeText}, successfully.`, 'success');
                }
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
            {apprenticeStats.status !== 9 && editMode !== 'apprentice' && 
            <>
                {isPortrait && !editMode.apprentice &&
                    <BasicStatCard statsObj = {apprenticeStats} showLevel={true} showItemSlots={true} showStatus={true} />
                }
                {!isPortrait && !editMode.apprentice&& 
                    <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showItemSlots={true} showStatus={true}>
                        <BasicStatTableRow statsObj = {apprenticeStats} refData={refData}  />
                    </BasicStatTableHeader>
                }
                {!editMode.apprentice &&
                    <Box sx={{width: '100%', textAlign: 'center' }}>
                        <Button onClick={() => handleButton('edit', 'apprentice')}>Edit</Button>
                        <Button onClick={() => handleApprenticeButtons('remove')}>{apprenticeStats.status === 0 ? 'Dump' : 'Fire'}</Button>
                    </Box>
                }
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
    const { currentWizard, setCurrentWizard, editMode, setEditMode } = useAppContext();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    return (
        <>
            <Typography variant='h6' >Edit Apprentice</Typography>
            {isPortrait && <BasicStatCard statsObj = {apprenticeStats} showItemSlots={true} showLevel={true} showStatus={true} showClass={true}/>}
            {!isPortrait && 
                <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showStatus={true} showItemSlots={true}>
                    <BasicStatTableRow statsObj = {apprenticeStats} refData={refData}/>
                </BasicStatTableHeader>
            }
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '250px', border: '1px solid black'}}>
                <Typography variant='h6' >Inventory </Typography>
                <ItemSelectionSlots 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData} 
                    includeGeneral={true}
                    target='apprentice'
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
    const { refData, currentWizard, setCurrentWizard } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { alert, showAlert, hideAlert } = useAlert();

    const hireApprentice = (apprenticeName, cost) => {
        if (currentWizard.gold < cost) {
            showAlert(`You cannot afford to acquire ${apprenticeName}'s services!`);
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

    const apprenticeStats = deriveApprenticeStats(currentWizard, currentWizard.apprentice);
    const apprenticeCost = (currentWizard.level - 6)*10 + 160;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h3>You currently do not have an Apprentice.</h3>
            <p>You can hire one for <b style={{color: 'red'}}>{apprenticeCost} gold</b> from the list below.</p>
            <Box className='apprentice-hire-container'>
                {apprenticeList(refData.nameGenerator.apprentice).map((apprenticeName) => {
                    const apprenticeObj = {...apprenticeStats}
                    apprenticeObj.name = apprenticeName;
                    return (
                        <Box key= {apprenticeName} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <BasicStatCard statsObj={apprenticeObj} refData={refData}/>
                            <Button onClick={() => hireApprentice(apprenticeName, apprenticeCost)} >Hire {apprenticeName}</Button>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}   



function ItemSelectionSlots({editedWizard, setEditedWizard, includeGeneral=false, includeVault=false, character='wizard'}) {
    const { refData } = useAppContext();
    let equipList = [];
    if (includeGeneral) {
        equipList = [...equipList, ...refData.arms, ...refData.armor];
    }
    if (includeVault) {
        equipList = [...equipList, ...editedWizard.vaultItems];
    }

    const handleEquipmentChange = (e, index) => {
        //WIP
        switch (character) {
            case 'apprentice':
                character = editedWizard.apprentice;
                break;
            case 'captain':
                // character = editedWizard.captain;
                break;
            default:  
                character = editedWizard;
                break
        }

        //
        const updateEquip = [...editedWizard.itemSlots];
        updateEquip[index] = e.target.value;
        setEditedWizard({ ...editedWizard, itemSlots: updateEquip });
    };

    return editedWizard.itemSlots.map((itemSlotId, index) => {
        const item = getItemFromId(itemSlotId, refData);

        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} key={index}>
                <InputLabel id={`Item ${index + 1}`} >
                    Slot #{index + 1}
                </InputLabel>
                <Select
                    className="TextField"
                    labelId={`Item ${index + 1}`}
                    value={item.id}
                    label={`Item ${index + 1}`}
                    onChange={(e) => handleEquipmentChange(e, index)}
                    size="small"
                    sx={{ padding: 0 }}
                    fullWidth
                >
                    <MenuItem value={0}>--</MenuItem>
                    {
                        equipList.map((itemObj, index) => {
                            if (itemObj.id === 107) { // 107 is the id for the "unarmed" item
                                return null
                            }
                            return (
                                <MenuItem 
                                    key={itemObj.id} 
                                    value={itemObj.id}
                                    disabled={editedWizard.itemSlots.includes(itemObj.id)}
                                >
                                    {getItemFromId(itemObj.id, refData).name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        )
    })
}



function GainLevelView(wizardObj) {
    const improveStat = (stat) => {
        return null
    };

    const improveSpell = (spell) => {
        return null
    };

    const learnSpell = (skill) => {
        return null
    }
    const newWizardObj = {...wizardObj};
    newWizardObj.level += 1;
    
    return (
        <>
            <h3>Gain Level</h3>
        </>
    );
}