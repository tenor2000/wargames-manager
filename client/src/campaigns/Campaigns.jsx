import { Box, Button, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, Typography, ListItemButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAlert } from '../contexts/AlertContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'
import { AfterActionView } from './AfterActionReport.jsx';
import { useState, useEffect } from 'react';
import { getMyWizardFromId, getCampaignFromId } from '../helperFuncs/helperFunctions.js';
import { useAppContext } from '../contexts/AppContext.jsx';
import { BattleView } from './BattleView.jsx';
import { CreateNewCampaign } from './CreateNewCampaign.jsx';
import ScenarioCard from '../basicComponents/ScenarioCard.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export function CampaignView() {
  const { refData, currentCampaignData, setCurrentCampaignData, loading, error } = useAppContext();
  const { userData } = useAuth();
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ campaignView, setCampaignView ] = useState(null)
  const navigate = useNavigate();

  const campaignIdParam = searchParams.get('campaignId') || '';

  useEffect(() => {
    if (campaignIdParam) {
        setCurrentCampaignData.campaign({
          campaign: getCampaignFromId(campaignIdParam, userData),
          wizard: getMyWizardFromId(campaignIdParam, userData)
        });
    } else {
        setCurrentCampaignData({campaign: null, wizard: null});
    }
  }, [searchParams, userData]);

  if (loading) {
      return <div>Loading...</div>;
  }
  
  if (error) {
      return <div>Error loading data</div>;
  }

  const handleButton = (type, target=null) => {
    switch (type) {
      case 'campaign':
        setCurrentCampaignData({campaign: target, wizard: getMyWizardFromId(target.wizardId, refData)});
        break;
      case 'base':
        setCurrentCampaignData({campaign: null, wizard: null});
        break;
      case 'newCampaign':
        setCurrentCampaignData({campaign: null, wizard: null});
        navigate('/campaigns/new-campaign');
        break
      default:
        break;
    }
  };

  const handleView = (location) => {
    console.log(location)
    setCurrentCampaignData({...campaign, wizard: getMyWizardFromId(campaign.wizardId, refData)});
    setCampaignView(location);
    location === 'base' ? setCurrentCampaignData({campaign: null, wizard: null}) : null;
  }

  return (
    <>
      {!currentCampaignData.campaign && 
        <Box sx={{width: '100%', textAlign: 'center' }}>
          <h2>Campaign View</h2>
          <p>Coming Soon...</p>
          <p>Things to implement:</p>
          <p>-Manage Campaigns</p>
          <p>-Battle Views</p>
          <Button onClick={() => handleButton('newCampaign')}> + New Campaign</Button>
        </Box>
      }
      {currentCampaignData.campaign &&
        <CampaignDetailsView handleButton={handleButton} handleView={handleView} campaignView={campaignView} />
      }
    </>
  );
}

export function CampaignSideDrawer() {
  const { userData, setUserData } = useAuth();
  const { showAlertDialog } = useAlert();
  const { refData, loading, error, setCurrentCampaignData } = useAppContext();
  const navigate = useNavigate();

  if (loading) {
      return <div>Loading...</div>;
  }
  
  if (error) {
      return <div>Error loading data</div>;
  }

  const handleButton = (type, target=null) => {
    switch (type) {
      case 'campaign':
        setCurrentCampaignData({campaign: target, wizard: getMyWizardFromId(target, refData)});
        break;
      case 'wizard':
        break;
      case 'newCampaign':
        setCurrentCampaignData({campaign: null, wizard: null});
        navigate('/campaigns/new-campaign');
        break
      default:
        break;
    }
  };

  const handleCampaignDeletion = (campaignId) => {
    const confirmText = 'Are you sure you want to delete this campaign?';
    showAlertDialog(confirmText, 'This campaign will be gone forever!').then((confirmed) => {
      if (confirmed) {
        // POST request to hire the apprentice
        const newUserData = {...userData};
        newUserData.myCampaigns = newUserData.myCampaigns.filter(campaign => campaign.id !== campaignId);
        setUserData(newUserData);
        setCurrentCampaignData({campaign: null, wizard: null})
      }
    })
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

  return (
    <>
      <Typography variant="h5" onClick={() => handleButton('base')} style={{cursor: 'pointer'}} >My Campaigns</Typography>
      <Paper elevation={5} sx={{width: '100%'}}>
        <List>
          {campaignList}
          <ListItem disableGutters disablePadding>
            <ListItemButton
              autoFocus
              onClick={() => handleButton('newCampaign')}
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
  const { refData, currentCampaignData } = useAppContext(); 
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

  const isAllComplete = currentCampaignData.campaign.scenarios.every(scenario => scenario.completionStatus === 'complete');

  return (
    <>
      <Box sx={{width: '100%', textAlign: 'center' }}>
          <p>Current Campaign: {currentCampaignData.campaign.name}</p>
          <p>Wizard: {getMyWizardFromId(currentCampaignData.campaign.wizardId, userData).name}</p>
      </Box >

      <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentCampaignData.campaign.scenarios.map(scenario => <ScenarioCard key={scenario.id} scenario={scenario} handleView={handleView} refData={refData}/>)}
      </Box>

      <Box sx={{width: '100%', textAlign: 'center' }}>
        <Button onClick={() => handleButton(null)}>Back</Button>
        <Button disabled={!isAllComplete} onClick={() => handleView('addScenario')}>Add Scenario</Button>
      </Box>

    </>
  );
}