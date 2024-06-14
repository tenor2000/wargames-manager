import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'
import { useState, useEffect } from 'react';
import { getCreatureFromId, rollD20, getRandomSpell } from './HelperFunctions.js';
import { useAppContext } from './AppContext.jsx';
import { Checkbox,Select, MenuItem, FormControl, FormGroup, FormLabel, InputLabel, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TbRuler2, TbRuler3 } from 'react-icons/tb';

export function CampaignView() {
    const { refData } = useAppContext();

    return (
        <>
            <Box className="campaigns-container" sx={{width: '100%', textAlign: 'center' }}>
                <h2>Campaign View</h2>
                <p>Coming Soon...</p>
                <p>Things to implement:</p>
                <p>-Manage Campaigns</p>
                <p>-Battle Views</p>
                <p>Level Up System</p>
            </Box>

            <BattleView refData={refData} />
            <AfterActionView />
            
        </>
    );
}

export function CampaignSideDrawer() {
    const navigate = useNavigate();
    
    const handleNewCampaign = () => {
        navigate('/newcampaign');
    };

    return (
        <>
            <div>
                <h2>Campaign SideBar</h2>
            </div>
            <Button>Create New Campaign</Button>
        </>
    );
}

function BattleView({refData}) {
    const [ viewer, setViewer ] = useState(null);
    const [ rollColor, setRollColor ] = useState(null);

    const handleRoll = () => {
        const roll = rollD20();
        let message;
        let color;
        if (roll === 1) {
            message = `Roll: ${roll}`;
            color = 'red';
        } else if (roll === 20) {
            message = `Roll: ${roll}`;
            color = 'green';
        } else {
            message = `Roll: ${roll}`;
            color = null;
        }
        setViewer(message);
        setRollColor(color);
    }

    const handleRandomEncounter = () => {
        const directions = ['North', 'South', 'East', 'West'];
        const firstRoll = rollD20();
        const secondRoll = rollD20();
        console.log(`Rolls: ${firstRoll}, ${secondRoll}`)
        const encounterLevelTable = refData.randomEncounterTable.find((table) => table.firstRollRange.includes(firstRoll));
        const [ creatureId, creatureNumber ] = encounterLevelTable.rollResults[secondRoll];
        const creature = getCreatureFromId(creatureId, refData).name

        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const message = `Encounter: ${creature} x${creatureNumber} coming from the ${randomDirection}!`;
        setViewer(message);
    }

    const handleSoldierSurvival = () => {
        const roll = rollD20();
        let message;
        const survivalTable = refData.survivalTables.soldierTable
        const result = survivalTable.find((table) => table.rollRange.includes(roll));
        message = `Roll: ${roll}, ${result.name} - ${result.effect}`
        setViewer(message)
    }

    const handleWizardSurvival = () => {
        const firstRoll = rollD20();
        const secondRoll = rollD20();
        let message;
        const survivalTable = refData.survivalTables.wizardTable
        const result = survivalTable.find((table) => table.rollRange.includes(firstRoll));
        if (result.name === 'Permanent Injury') {
            const permInjury = refData.permanentInjuryTable.find((injury) => injury.rollRange.includes(secondRoll));
            message = `Roll: ${firstRoll}, ${result.name}! - Roll: ${secondRoll}, ${permInjury.effect}`;
        } else {
            message = `Roll: ${firstRoll}, ${result.name} - ${result.effect}`;
        }
        setViewer(message);
    }

    const handleRandomGrimoire = () => {
      // This doesn't use the table in the rulebook because it's just random
      const spell = getRandomSpell(refData);
      const spellId = spell.id
      const message = `Grimoire: ${spell.name}! Spell ID: ${spellId}`;
      setViewer(message);
    }
    
    return (
        <>
            <h2>Battle View</h2>
            <Box className="campaigns-container" sx={{width: 600, textAlign: 'center' }}>              
                {viewer && (
                    <p style={rollColor && { color: rollColor }}>{viewer}</p>
                )}
            </Box>
            <Box>
              <Button onClick={handleRandomEncounter}>Random Encounter</Button>
                <Button onClick={handleRoll}>Roll a D20</Button>
                <Button onClick={handleSoldierSurvival}>Soldier Survival</Button>
                <Button onClick={handleWizardSurvival}>Wizard Survival</Button>
                <Button onClick={handleRandomGrimoire}>Random Grimoire</Button>
            </Box>

            
        </>
    );
}

function AfterActionView() {
  const { userData } = useAuth();
  const [ xpGained, setXpGained ] = useState(0);
  const [ basicXPCounts, setBasicXPCounts ] = useState({ spellFailure: 0, spellSuccess: 0, treasureFound: 0, creaturesKilled: 0, wizardParticipated: false });
  
  const calcXPTotal = () => {
    const { spellFailure, spellSuccess, treasureFound, creaturesKilled, wizardParticipated } = basicXPCounts;
    let total = 0;
    total += spellFailure * 5;
    total += spellSuccess * 10;
    total += treasureFound * 40;
    total += creaturesKilled * 5;
    if (wizardParticipated) total += 40;
    return total;
  };

  const handleChange = (e, type) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setBasicXPCounts((prev) => ({
      ...prev,
      [type]: value
    }));
  }

  useEffect(() => {
    const total = calcXPTotal();
    setXpGained(total);
  }, [ basicXPCounts ]);
  
  
  return (
    <>
      <h2>After Battle Report</h2>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Experience</TableCell>
                <TableCell>Achievement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell >
                  <FormControl sx={{ m: 1, minWidth: 60 }}>
                    <Checkbox 
                      checked={basicXPCounts.wizardParticipated}
                      onChange={(e) => handleChange(e, 'wizardParticipated')}
                      size="small"
                    />
                    </FormControl>
                </TableCell>
                <TableCell >
                  +40 xp
                </TableCell>
                <TableCell>
                  <p>For each game in which the wizard participates.</p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell >
                  <FormControl sx={{ m: 1, minWidth: 60 }}>
                    <Select
                      value={basicXPCounts.spellFailure}
                      defaultValue={0}
                      onChange={(e) => handleChange(e, 'spellFailure')}
                      size="small"
                    >
                      {[...Array(21).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell >
                  +5 xp
                </TableCell>
                <TableCell>
                <p>For each failed attempt to cast a spell that results in either the wizard or apprentice suffering damage.</p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell >
                  <FormControl sx={{ m: 1, minWidth: 60 }}>
                    <Select
                      value={basicXPCounts.spellSuccess}
                      defaultValue={0}
                      onChange={(e) => handleChange(e, 'spellSuccess')}
                      size="small"
                    >
                      {[...Array(21).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell >
                  +10 xp
                </TableCell>
                <TableCell>
                  <p>For each spell successfully cast by either the wizard or apprentice.*</p>
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell >
                  <FormControl sx={{ m: 1, minWidth: 60 }}>
                    <Select
                      value={basicXPCounts.treasureFound}
                      defaultValue={0}
                      onChange={(e) => handleChange(e, 'treasureFound')}
                      size="small"
                    >
                      {[...Array(6).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell >
                  +40 xp
                </TableCell>
                <TableCell>
                  <p>For each treasure token secured by the wizard or their warband.</p>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell >
                  <FormControl sx={{ m: 1, minWidth: 60 }}>
                    <Select
                      value={basicXPCounts.creaturesKilled}
                      defaultValue={0}
                      onChange={(e) => handleChange(e, 'creaturesKilled')}
                      size="small"
                    >
                      {[...Array(21).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell >
                  +5 xp
                </TableCell>
                <TableCell>
                  <p>For each uncontrolled creature killed by the wizard or their warband.**</p>
                </TableCell>
              </TableRow>

              <ScenarioXPTable setXpGained={setXpGained} />

              <TableRow>
                <TableCell colSpan={3} >
                <p>* No experience points are gained for casting a spell with a casting number of 6 or less.</p>
                <p>** Up to a maximum of +50 per game. Does not apply to creatures that have a specific experience point reward given in a scenario, nor to creatures specifically created or summoned by a member the wizard's warband.</p>
                </TableCell>
              </TableRow>

              

            </TableBody>
          </Table>
          
        </TableContainer>
        
      <h3>XP Gained: {xpGained <= 300 ? <b style={{color: 'green'}}>{xpGained}</b> : <b style={{color: 'red'}}>300 (Limit Reached)</b>}</h3>
    </>
  );
}

function ScenarioXPTable(setXpGained, refData) {

  return (
    <TableRow >
      <TableCell colSpan={3}><h3 style={{color: 'red'}}>Reserved for Scenario Specific XP</h3></TableCell>
    </TableRow>
  );
}