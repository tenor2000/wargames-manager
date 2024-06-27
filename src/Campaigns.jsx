import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'
import { AfterActionView } from './AfterActionReport.jsx';
import { useState, useEffect } from 'react';
import { getCreatureFromId, rollD20, getRandomSpell, getScenarioFromId, getSchoolFromId } from './HelperFunctions.js';
import { useAppContext } from './AppContext.jsx';
import { BattleView } from './BattleView.jsx';
import { Checkbox,Select, MenuItem, FormControl, FormGroup, FormLabel, InputLabel, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export function CampaignView() {
    const { refData, currentWizard, loading, error } = useAppContext();
    const navigate = useNavigate();
    const [ campaignView, setCampaignView ] = useState(null)

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const handleView = (location) => {
        setCampaignView(location);
    }

    if (campaignView==='report') {
      return <AfterActionView refData={refData} handleView={handleView}/>
    }

    if (campaignView==='battle') {
      return <BattleView handleView={handleView}/>
    }

    return (
        <>
            {!currentWizard && 
              <Box sx={{width: '100%', textAlign: 'center' }}>
                  <h2>Campaign View</h2>
                  <p>Coming Soon...</p>
                  <p>Things to implement:</p>
                  <p>-Manage Campaigns</p>
                  <p>-Battle Views</p>
                  <p>Level Up System</p>
              </Box>
            }
            {currentWizard && 
              <Box sx={{width: '100%', textAlign: 'center' }}>
                <Button onClick={() => handleView('battle')}>Start Battle</Button>
              </Box>
            }

            {/* <BattleView refData={refData} /> */}
            {/* <AfterActionView refData={refData}/> */}
            
        </>
    );
}

export function CampaignSideDrawer() {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const { refData, loading, error, setCurrentWizard } = useAppContext();

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
        <Button key={wizard.id} 
            className="spells-sidebar-item" 
            onClick={() => handleWizardClick(wizard)} 
            style = {{cursor: 'pointer'}}
        >
            {wizard.name} <br></br>
            Level {wizard.level} {getSchoolFromId(wizard.classId, refData).name}
        </Button>
    ));
    
    const handleNewCampaign = () => {
        navigate('/newcampaign');
    };

    const handleWizardClick = (wizard) => {
        setCurrentWizard(wizard);
    };

    return (
        <>
            <Box sx={{width: '100%', textAlign: 'center'}}>
                <h3>My Wizards</h3>
                {wizardsList}
            </Box>
            <Box sx={{width: '100%', textAlign: 'center'}}>
                <h3>Tools</h3>
                <p>Coming Soon...</p>
            </Box>
            <Box sx={{width: '100%', textAlign: 'center'}}>
                <h3>Campaigns</h3>
                <p>Coming Soon...</p>
            </Box>

            <Button onClick={handleNewCampaign}>New Campaign</Button>

        </>
    );
}

