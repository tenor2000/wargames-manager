import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicStatCard, BasicAccordian } from './BasicComponents.jsx';
import { getSchoolFromId, getRandomName } from './HelperFunctions.js';
import { useAuth } from './AuthContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { CareerHistoryView } from './WarbandHistory.jsx';
import { SpellBookView } from './WarbandSpellbook.jsx';
import { SoldierRosterView } from './WarbandSoldiers.jsx';
import { ApprenticeView, WizardView } from './WarbandWizard.jsx';
import { BaseView } from './WarbandBase.jsx';
import { VaultView } from './WarbandVault.jsx';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar, IconButton, Paper, Button, Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles/Warbands.css';


export function WarbandView() {
    const { userData } = useAuth();
    const { currentWizard, setNewWizard } = useAppContext();
    const { loading, error, refData } = useAppContext();
    const navigate = useNavigate();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const userWizards = userData.myWizards;

    function handleNewWizardClick() {
        const newName = getRandomName(refData.nameGenerator.wizard);
        console.log(newName)
        const updatedWizards = { ...refData.templates.wizard, name: newName };
        setNewWizard(updatedWizards);
        navigate('/new-wizard');
    }

    return (
        <>
            {!currentWizard && 
                <Box sx={{width: '100%', textAlign: 'center' }}>
                    <Box>
                        {!isPortrait && <h2>Warband Manager</h2>}
                    </Box>
                    <Box>
                        <p>Here you can edit, create, and delete your warbands.</p>
                        <p>Here are some of your warband statistics:</p>
                        <p>Total Wizards: {userWizards.length}</p>
                        <p>Total Level Gained: {userWizards.reduce((total, wizard) => total + wizard.level, 0)}</p>
                        <p>Total XP Gained: {userWizards.reduce((total, wizard) => total + wizard.xp + wizard.xpSpent, 0)}</p>
                        <p>Total Soldiers Lost: {userWizards.reduce((total, wizard) => total + wizard.soldiersLost, 0)}</p>
                    </Box>
                    <Box>
                        <Button onClick={handleNewWizardClick}>Start New Wizard</Button>
                    </Box>
                </Box>
            }
            {currentWizard && <WarbandDetails />}
        </>
    );
}

export function WarbandSideDrawer() {
    const { userData, setUserData } = useAuth();
    const navigate = useNavigate();
    const { loading, error, currentWizard, setCurrentWizard, setNewWizard, refData, setEditMode } = useAppContext();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const wizardsList = userData.myWizards
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(wizard => (
            <ListItem
                key={wizard.id} 
                onClick={() => handleButton('wizard', wizard)} 
                style = {{cursor: 'pointer'}}
                sx={{padding: '5px'}}
                secondaryAction={
                    <IconButton
                        aria-label="delete"
                        edge="end"
                        size="small"
                        onClick={() => handleButton('wizard-delete', wizard.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar >
                      <img src={'src/assets/Game-Icons-net/wizard-face.svg'} alt={wizard.name} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={wizard.name}
                    secondary={getSchoolFromId(wizard.classId, refData).name}
                />
            </ListItem>
        )
    );

    function handleButton(type, target=null) {
        switch (type) {
            case 'wizard':
                setEditMode({wizards: false, apprentice: false, spellbook: false, soldier: false, vault: false, base: false});
                setCurrentWizard(target)
                break;
            case 'new-wizard':
                const newName = getRandomName(refData.nameGenerator.wizard);
                const updatedWizards = { ...refData.templates.wizard, name: newName };
                setNewWizard(updatedWizards);
                navigate('/new-wizard');
                break
            case 'delete-wizard':
                if (window.confirm('Are you sure you want to \'retire\' this wizard?')) {
                    const newUserData = {...userData};
                    newUserData.myWizards = newUserData.myWizards.filter(wizard => wizard.id !== target);
                    setUserData(newUserData);
                    setCurrentWizard(null)
                };
                break
            default:
                setCurrentWizard(null)
                break;
        }
    }

    return (
        <>
            <Typography 
                onClick={handleButton}
                variant="h5"
                sx={{cursor: 'pointer'}}
            >
                My Wizards
            </Typography>
            <Paper 
                elevation={5} 
                sx={{width: '100%'}}
            >
                <List>
                    {wizardsList}
                </List>
                <Box className="button-container center">
                    <Button onClick={() => handleButton('new-wizard')}>
                        + New Wizard
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

function WarbandDetails() {
    const { currentWizard, editMode, setEditMode, setCurrentWizard, refData } = useAppContext();
    const { userData, setUserData } = useAuth();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const handleButton = (type, target=null) => {
        switch (type) {
            case 'edit':
                const newEditMode = {...editMode};
                newEditMode[target] = true;
                setEditMode(newEditMode);;
                break;
            case 'retire':
                if (window.confirm('Are you sure you want to \'retire\' this wizard?')) {
                    const newUserData = {...userData};
                    newUserData.myWizards = newUserData.myWizards.filter(wizard => wizard.id !== currentWizard.id);
                    setUserData(newUserData);
                    setCurrentWizard(null)
                };
                break;
            default:
                break;
        }
    }

    const getWizardHonorific = () => {
        const school = getSchoolFromId(currentWizard.classId, refData);
        const honorific = school.nicknames[Math.floor(Math.random() * school.nicknames.length)];
        return `the ${honorific}`;
    }

    const categories = {
        'Wizard': <WizardView handleButton={handleButton}/>,
        'Apprentice': <ApprenticeView handleButton={handleButton}/>,
        'Spell Book': <SpellBookView />,
        'Soldiers': <SoldierRosterView handleButton={handleButton}/>,
        'Vault': <VaultView />,
        'Base of Operations': <BaseView />,
        'Career History': <CareerHistoryView />
    }

    return (
        <>
            {!isPortrait && 
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                    <Typography variant="h4">{currentWizard.name} {getWizardHonorific()}</Typography>
                </Box>
            }
            
            {Object.keys(categories).map((key, index) => (
                <BasicAccordian key={index} title={key} >
                    {categories[key]}
                </BasicAccordian>
            ))}

            <Box sx={{ textAlign: 'center' }}>
                <Button onClick={() => handleButton('retire')}>Retire Wizard</Button>
            </Box>
        </>
    );
}