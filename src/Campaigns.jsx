import { Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'
import { AfterActionView } from './AfterActionReport.jsx';
import { useState, useEffect } from 'react';
import { getCreatureFromId, rollD20, getRandomSpell, getScenarioFromId, getSchoolFromId, getMyWizardFromId } from './HelperFunctions.js';
import { useAppContext } from './AppContext.jsx';
import { BattleView } from './BattleView.jsx';
import { CreateNewCampaign } from './CreateNewCampaign.jsx';


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
      location === null ? setCurrentWizard(null) : null;
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
    const { userData } = useAuth();
    const { refData, loading, error, setCurrentCampaign, setCurrentWizard } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const campaignList = userData.myCampaigns
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(campaign => (
        <Button key={campaign.id} 
            onClick={() => handleButton('campaign', campaign)} 
            style = {{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}
        >
            <h3>{campaign.name}</h3>
            ({getMyWizardFromId(campaign.wizardId, userData).name})
        </Button>
    ));
    
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
            <Box sx={{width: '100%', textAlign: 'left'}}>
                <h3 onClick={() => handleButton('null')} style={{cursor: 'pointer'}}>My Campaigns</h3>
                {campaignList}
                <Button onClick={() => handleButton('newCampaign')}> + New Campaign</Button>
            </Box>
            <Box sx={{width: '100%', textAlign: 'left'}}>
                <h3>Tools</h3>
                <p>Coming Soon...</p>
            </Box>

            

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


  return (
    <>
      <Box sx={{width: '100%', textAlign: 'center' }}>
          <p>Current Campaign: {currentCampaign.name}</p>
          <p>Wizard: {getMyWizardFromId(currentCampaign.wizardId, userData).name}</p>
      </Box >
      <ScenarioCards currentCampaign={currentCampaign} handleView={handleView}/>

      <Box sx={{width: '100%', textAlign: 'center' }}>
        <Button onClick={() => handleButton(null)}>Back</Button>
        <Button onClick={() => handleButton('new campaign')}> + New Campaign</Button>
      </Box>

    </>
  );
}

function ScenarioCards({currentCampaign, handleView}) {
  const { refData } = useAppContext();

  const showCompletionStatus = (scenario) => {
    switch (scenario.completionStatus) {
      case ('complete'):
        return <b style={{color: 'green'}}>Complete</b>
      case ('in progress'):
        return <b style={{color: 'gray'}}>In Progress</b>
      case ('incomplete'):
        return <b style={{color: 'red'}}>Incomplete</b>
      default:
        return <b style={{color: 'darkred'}}>Unknown Error</b>
    }
  }

  const showButtonChoices = (scenario) => {
    switch (scenario.completionStatus) {
      case ('complete'):
        return <Button onClick={() => handleView('report')}>View Report</Button>
      case ('in progress'):
        return (
          <>
            <Button onClick={() => handleView(null)}>Delete</Button>
            <Button onClick={() => handleView('battle')}>Continue</Button>
          </>
        )
      case ('incomplete'):
        return (
          <>
            <Button onClick={() => handleView(null)}>Delete</Button>
            <Button onClick={() => handleView('battle')}>Start</Button>
          </>
        )
      default:
        return <b style={{color: 'darkred'}}>Unknown Error</b>
    }
  }
    
  function ScenarioCard({scenario}) {
    const scenarioInfoObj = getScenarioFromId(scenario.scenarioId, refData)

    return (
      <Paper sx={{display: 'flex', flexDirection: 'column', width: '300px', height : '350px', textAlign: 'center', border: '2px solid black', margin: '10px', padding: '10px'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'center', justifyContent: 'center', borderBottom: '2px solid black', flex: 1 }}>
          <h3>{scenarioInfoObj.name}</h3>
          <p>Image goes here</p>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', textAlign: 'center', flex: 1}}>
          <Box>
            <p>Status: {showCompletionStatus(scenario)}</p>
            <p>Setup Requirements: {scenarioInfoObj.requirements}</p>
          </Box>
          <Box sx={{width: '100%', textAlign: 'center' }}>
            {showButtonChoices(scenario)}
          </Box>
        </Box>
      </Paper >
    )
  }

  const isAllComplete = currentCampaign.scenarios.every(scenario => scenario.isComplete)

  return (
    <>
      <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
        {currentCampaign.scenarios.map(scenario => <ScenarioCard key={scenario.id} scenario={scenario}/>)}
      </Box>
      {isAllComplete && 
        <Button onClick={() => handleView('add scenario')}>+ Scenario</Button>
      }
    </>
  );
}