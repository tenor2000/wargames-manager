import { Box, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Typography, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'
import { AfterActionView } from './AfterActionReport.jsx';
import { useState, useEffect } from 'react';
import { getCreatureFromId, rollD20, getRandomSpell, getScenarioFromId, getSchoolFromId, getMyWizardFromId } from '../helperFuncs/HelperFunctions.js';
import { useAppContext } from '../contexts/AppContext.jsx';
import { BattleView } from './BattleView.jsx';
import { CreateNewCampaign } from './CreateNewCampaign.jsx';
import ScenarioCard from '../basicComponents/ScenarioCard.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export function CampaignView() {
    const { refData, currentWizard, setCurrentWizard, currentCampaign, setCurrentCampaign, loading, error } = useAppContext();
    const { userData } = useAuth();
    const [ campaignView, setCampaignView ] = useState(null)

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const handleView = (location) => {
      console.log(location)
      setCurrentWizard(getMyWizardFromId(currentCampaign.wizardId, userData));
      setCampaignView(location);
      location === 'base' ? setCurrentWizard(null) : null;
    }

    const handleButton = (type, target=null) => {
      switch (type) {
        case 'campaign':
          setCurrentCampaign(target);
          setCurrentWizard(getMyWizardFromId(target, refData));
          break;
        case 'wizard':
          setCurrentWizard(target);
          break;
        case 'newCampaign':
          setCurrentCampaign(null);
          setCurrentWizard(null);
          break
        default:
          break;
      }
    };

    return (
        <>
            {!currentCampaign && 
              <Box sx={{width: '100%', textAlign: 'center' }}>
                  <h2>Campaign View</h2>
                  <p>Coming Soon...</p>
                  <p>Things to implement:</p>
                  <p>-Manage Campaigns</p>
                  <p>-Battle Views</p>
                  <Button onClick={() => handleButton('newCampaign')}> + New Campaign</Button>
              </Box>
            }
            {currentCampaign &&
                <CampaignDetailsView handleButton={handleButton} handleView={handleView} campaignView={campaignView} />
            }
            
        </>
    );
}

export function CampaignSideDrawer() {
    const { userData, setUserData } = useAuth();
    const { refData, loading, error, setCurrentCampaign, setCurrentWizard } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const handleCampaignDeletion = (campaignId) => {
      if (window.confirm('Are you sure you want to DELETE this campaign?')) {
        const newUserData = {...userData};
        newUserData.myCampaigns = newUserData.myCampaigns.filter(campaign => campaign.id !== campaignId);
        setUserData(newUserData);
        setCurrentCampaign(null)
      };
    }

    const campaignList = userData.myCampaigns
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(campaign => (
          <ListItem 
            key={campaign.id}
            secondaryAction={
              <IconButton
                aria-label="delete"
                edge="end"
                size="small"
                onClick={() => handleCampaignDeletion(campaign.id)}
              >
                <DeleteIcon />
              </IconButton> 
            }
            disablePadding
            disableGutters
          >
            <ListItemButton
              onClick={() => handleButton('campaign', campaign)}
            >
              <ListItemText 
                primary={campaign.name} 
                secondary={`${getMyWizardFromId(campaign.wizardId, userData).name}`}
              />
            </ListItemButton>
          </ListItem>
        )
    );
    
    const handleButton = (type, target=null) => {
      switch (type) {
        case 'campaign':
          setCurrentCampaign(target);
          setCurrentWizard(getMyWizardFromId(target.wizardId, userData));
          break;
        // case 'wizard':
        //   setCurrentWizard(target);
        //   break;
        case 'newCampaign':
          console.log('new campaign')
          break
        default:
          setCurrentCampaign(null);
          setCurrentWizard(null);
          break;
      }
    };

    return (
      <>
        <Typography variant="h5" onClick={() => handleButton('base')} style={{cursor: 'pointer'}} >My Campaigns</Typography>
        <Paper elevation={5} sx={{width: '100%'}}>
            <List>
              {campaignList}
              <ListItem disableGutters disablePadding>
                        <ListItemButton
                            autoFocus
                            onClick={() => handleButton('new-wizard')}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add Campaign" />
                        </ListItemButton>
                    </ListItem>
            </List>
          <Button onClick={() => handleButton('newCampaign')}> + New Campaign</Button>
        </Paper>

        <Typography variant="h5" onClick={() => handleButton('base')} style={{cursor: 'pointer'}}>My Tools</Typography>
        <Paper elevation={5} sx={{width: '100%'}}>
          <List>
            <ListItem disableGutters disablePadding>
              <p>Coming Soon...</p>
            </ListItem>
          </List>
          
        </Paper>
      </>
    );
}

function CampaignDetailsView({handleButton, handleView, campaignView}) {
  const { refData, currentCampaign } = useAppContext(); 
  const { userData } = useAuth();

  if (campaignView==='report') {
    return <AfterActionView refData={refData} handleView={handleView}/>
  }

  if (campaignView==='battle') {
    return <BattleView handleView={handleView}/>
  }

  if (campaignView==='new campaign') {
    return <CreateNewCampaign handleView={handleView}/>
  }

  const isAllComplete = currentCampaign.scenarios.every(scenario => scenario.completionStatus === 'complete');

  return (
    <>
      <Box sx={{width: '100%', textAlign: 'center' }}>
          <p>Current Campaign: {currentCampaign.name}</p>
          <p>Wizard: {getMyWizardFromId(currentCampaign.wizardId, userData).name}</p>
      </Box >

      <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentCampaign.scenarios.map(scenario => <ScenarioCard key={scenario.id} scenario={scenario} handleView={handleView} refData={refData}/>)}
      </Box>

      <Box sx={{width: '100%', textAlign: 'center' }}>
        <Button onClick={() => handleButton(null)}>Back</Button>
        <Button disabled={!isAllComplete} onClick={() => handleView('addScenario')}>Add Scenario</Button>
      </Box>

    </>
  );
}