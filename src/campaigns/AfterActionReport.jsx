import { useAuth } from '../contexts/AuthContext.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useEffect, useState } from 'react';
import { getCreatureFromId, getScenarioFromId } from '../helperFuncs/HelperFunctions.js';
import { Box, Button, Checkbox, FormControl, Select, MenuItem, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, useMediaQuery } from '@mui/material';

export function AfterActionView({refData, handleView}) {
  const { userData, setUserData } = useAuth();
  const [ xpGained, setXpGained ] = useState(0);
  const [ basicXPCounts, setBasicXPCounts ] = useState({ spellFailures: 0, spellSuccesses: 0, treasuresSecured: 0, creaturesKilled: 0, wizardParticipation: false });
  const [ scenarioXPCounts, setScenarioXPCounts ] = useState({});
  const [ currentScenario, setCurrentScenario ] = useState(getScenarioFromId(101, refData));

  const basicExperiences = refData.basicXpChart

  useEffect(() => {
    const scenario = getScenarioFromId(101, refData);
    setCurrentScenario(scenario);
  }, []);
  
  const calcXPTotal = () => {
    let total = 0;

    Object.keys(basicXPCounts).forEach((key) => {
      const expObj = basicExperiences.find((exp) => {
        if (exp.category === key) return exp;
      })

      if (!expObj) return "Error: No experience found for " + key

      if (expObj.xpLimit && basicXPCounts[key]*expObj.xpValue > expObj.xpLimit) {
        total += expObj.xpLimit;
        return
      } else if (expObj.type==='checkbox'){
        if (basicXPCounts[key]) total += expObj.xpValue
      } else {
        total += basicXPCounts[key] * expObj.xpValue;
      }

    });
    return total;
  };
  
  const handleBasicXPChange = (e, type) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setBasicXPCounts((prev) => ({
      ...prev,
      [type]: value
    }));
  }

  const handleScenarioXPChange = (e, type) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setScenarioXPCounts((prev) => ({
      ...prev,
      [type]: value
    }));
  }

  const handleButton = (type) => {
    switch (type) {
      case 'continue':
        handleSubmitReport();
        break;
      case 'cancel':

        break;
      default:
        break;
    }
    return null
  }

  const handleSubmitReport = () => {
    const updatedUserData = { ...userData };

    updatedUserData.mywizards = basicXPCounts;
    // updatedUserData.scenarioXPCounts = scenarioXPCounts;
    setUserData(updatedUserData);
  }

  useEffect(() => {
    const total = calcXPTotal();
    setXpGained(total);
  }, [ basicXPCounts ]);

  return (
    <>
      <Box sx={{ textAlign: 'center'}}>
        <h2>{currentScenario.name}</h2>
        <h3>After Action Report</h3>
      </Box>
      <Box sx={{ textAlign: 'center', overflowX: 'auto'}}>
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
              {basicExperiences.map((expObj) => (
                <BasicXpRow key={expObj.id} expObj={expObj} basicXPCounts={basicXPCounts} handleBasicXPChange={handleBasicXPChange} />))
              }

              {/* <ScenarioXPRows scenarioXPCounts={scenarioXPCounts} setScenarioXPCounts={setScenarioXPCounts} handleScenarioXPChange={handleScenarioXPChange} currentScenario={currentScenario}/> */}

              <TableRow>
                <TableCell colSpan={3} >
                <p>* No experience points are gained for casting a spell with a casting number of 6 or less.</p>
                <p>** Up to a maximum of +50 per game. Does not apply to creatures that have a specific experience point reward given in a scenario, nor to creatures specifically created or summoned by a member the wizard's warband.</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
        </TableContainer>
      </Box>
      <Box sx={{ textAlign: 'center'}}>
        <h3>XP Gained: {xpGained <= 300 ? <b style={{color: 'green'}}>{xpGained}</b> : <b style={{color: 'red'}}>300 (Limit Reached)</b>}</h3>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Button onClick={() => handleView('battle')}>Cancel</Button>
          <Button  onClick={() => handleButton('continue')}>Submit</Button>
        </Box>
      </Box>
    </>
  );
}

function BasicXpRow({expObj, basicXPCounts, handleBasicXPChange}) {
  const isPortrait = useMediaQuery('(orientation: portrait) and (max-width: 768px)');
  
  const SelectionType = ({expObj}) => {
    switch (expObj.type) {
      case 'checkbox': {
        return (
          <FormControl sx={{ m: 1, minWidth: 60 }}>
            <Checkbox
              checked={basicXPCounts[expObj.category]}
              onChange={(e) => handleBasicXPChange(e, expObj.category)}
              size="small"
            />
          </FormControl>
        );
      }
      case 'count': {
        return (
          <FormControl sx={{ m: 1, minWidth: 60 }}>
            <Select
              value={basicXPCounts[expObj.category]}
              defaultValue={0}
              onChange={(e) => handleBasicXPChange(e, expObj.category)}
              size="small"
            >
              {[...Array(expObj.numLimit + 1).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
            </Select>
          </FormControl>
        );
      }
      default: {
        return "Error: Data missing..."
      }
    }
  }

  return (
    <>
      <TableRow>
        <TableCell >
          <FormControl sx={{ m: 1, minWidth: 60 }}>
            <SelectionType expObj={expObj} />
          </FormControl>
        </TableCell>
        <TableCell >
          +{expObj.xpValue} xp
        </TableCell>
        <TableCell>
          <p>{!isPortrait ? expObj.description : expObj.shortDesc}</p>
        </TableCell>
      </TableRow>
    </>
  );
}
  
function ScenarioXPRows({ scenarioXPCounts, setScenarioXPCounts, handleScenarioXPChange, currentScenario}) {
  if (!currentScenario) { 
    return (
      <TableRow >
        <TableCell colSpan={3}><h3 style={{color: 'red'}}>Scenario Data Not Found</h3></TableCell>
      </TableRow>
    );
  }

  useEffect(() => {
    let scenarioCounts = {};
    currentScenario.experience.forEach((exp) => {
      scenarioCounts[exp.id] = exp.type === 'checkbox' ? false : 0;
    });
    setScenarioXPCounts(scenarioCounts);
    console.log(scenarioCounts)

  });

  console.log(currentScenario)
  console.log(scenarioXPCounts)

  return (
    <>
      <TableRow >
        <TableCell colSpan={3}>{currentScenario.name}</TableCell>
        <TableCell>XP Gained</TableCell>
        <TableCell>Description</TableCell>
      </TableRow>
      {currentScenario.experience.map((exp) => (
        <TableRow key={exp.id}>
          {exp.type==='checkbox' ?
            <TableCell >
              <FormControl sx={{ m: 1, minWidth: 60 }}>
                <Checkbox 
                  checked={scenarioXPCounts[exp.id]}
                  onChange={(e) => handleScenarioXPChange(e, exp)}
                  size="small"
                />
                </FormControl>
            </TableCell>
          :
            <TableCell >
              <FormControl sx={{ m: 1, minWidth: 60 }}>
                <Select
                  value={scenarioXPCounts[exp.id]}
                  defaultValue={0}
                  onChange={(e) => handleScenarioXPChange(e, exp)}
                  size="small"
                >
                  {[...Array(11).keys()].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
                </Select>
              </FormControl>
            </TableCell>
          }
          <TableCell>+{exp.xp}</TableCell>
          <TableCell>{exp.description}</TableCell>
        </TableRow>
      ))}
    </>
  );
}