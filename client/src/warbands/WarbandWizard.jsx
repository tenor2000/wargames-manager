import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useAlert } from '../contexts/AlertContext';
import { useState, useEffect } from 'react';
import { getRandomName, getSchoolFromId } from '../helperFuncs/helperFunctions';
import { BasicStatTableHeader, BasicStatTableRow } from '../basicComponents/BasicStatTable';
import BasicStatCard from '../basicComponents/BasicStatCard';
import { Button, Box, Typography } from '@mui/material';
import ItemSelectionSlots from './ItemSelectionSlots';
import deriveApprenticeStats from '../helperFuncs/deriveApprenticeStats';
import { useMediaQuery } from '@mui/material';


function WizardView({handleButton}) {
    const { currentWizard, editMode, setEditMode, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const { showAlert } = useAlert();
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
                // This will need to make a POST request to the server
                setEditMode({...editMode, wizard: false});
                const updatedWizards = userData.myWizards.map((wizard) => 
                    wizard.id === editedWizard.id ? editedWizard : wizard
                );
                setUserData(prev => ({...prev, myWizards: updatedWizards}));
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
            {editMode.wizard 
                ?
                    <WizardEdit 
                        handleWizardButtons={handleWizardButtons} 
                        editedWizard={editedWizard} 
                        setEditedWizard={setEditedWizard} 
                        refData={refData}
                    />
                :
                    <>
                        {isPortrait
                            ? 
                                <BasicStatCard 
                                    statsObj = {wizardStats}   
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
                                        statsObj = {wizardStats} 
                                        refData={refData}
                                    />
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
        </>
    );
}

function WizardEdit({handleWizardButtons, editedWizard, setEditedWizard, refData}) {
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    return (
        <>
            <Typography variant='h6' >Edit Wizard</Typography>
            {isPortrait 
                ? 
                    <BasicStatCard statsObj = {editedWizard} showItemSlots={true} showLevel={true} showStatus={true} showClass={true}/>
                : 
                    <BasicStatTableHeader showName={true} showClass={true} showLevel={true} showStatus={true} showItemSlots={true}>
                        <BasicStatTableRow statsObj = {editedWizard} refData={refData}/>
                    </BasicStatTableHeader>
            }
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <ItemSelectionSlots 
                    editedWizard={editedWizard} 
                    setEditedWizard={setEditedWizard} 
                    refData={refData} 
                    includeGeneral={true}
                />
            </Box>
            <Box sx={{width: '100%', textAlign: 'center' }}>
                <Button onClick={() => handleWizardButtons('cancel-edit')}>Cancel</Button>
                <Button onClick={() => handleWizardButtons('save-edit')}>Save</Button>
            </Box>
        </>
    )
}

function GainLevelView({wizardObj}) {
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

export default WizardView