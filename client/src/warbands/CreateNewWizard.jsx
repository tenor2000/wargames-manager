import { useAppContext } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchoolFromId, getSchoolFromSpellId, getRandomName, getSpellFromId } from '../helperFuncs/helperFunctions.js';
import '../styles/NewWizard.css';
import { update } from 'firebase/database';
import { Paper, Typography, useMediaQuery } from '@mui/material';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';



export function NewWizardSideDrawer() {
  const { loading, error, newWizard, refData } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
    return <div>Error loading data</div>;
    }

    const schoolName = getSchoolFromId(newWizard.classId, refData).name;

  return (
    <>
      <Typography variant="h6">Building New Wizard...</Typography>
      <Paper elevation={5} sx={{ p: 2, w: '100%', textAlign: 'left' }}>
        <p>Wizard Name: {newWizard.name}</p>
        <p>School: {schoolName === 'All' ? '' : schoolName}</p>
      </Paper>

      <Typography variant="h5">Spells</Typography>
      <Paper elevation={5} sx={{ p: 2, w: '100%', textAlign: 'left' }}>
        <p>Primary Spells:</p>
        <ol>
          {newWizard.primarySpellIds.map(spellId => <li key={spellId}>{getSpellFromId(spellId, refData).name}</li>)}
        </ol>
        <p>Secondary Spells:</p>
        <ol>
          {newWizard.alignedSpellIds.map(spellId => <li key={spellId}>{getSpellFromId(spellId, refData).name}</li>)}
        </ol>
        <p>Neutral Spells:</p>
        <ol>
          {newWizard.neutralSpellIds.map(spellId => <li key={spellId}>{getSpellFromId(spellId, refData).name}</li>)}
        </ol> 
      </Paper>
    </>
  );
}

export function CreateNewWizard() {
  const { refData, setCurrentWizard, newWizard, setNewWizard } = useAppContext();
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();
  const { loading, error } = useAppContext();

  //for form validation
  const [errors, setErrors] = useState({});
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading data</div>;
  }

  function validateForm() {
    const newErrors = {};
    if (!newWizard.name ||newWizard.name.trim() =='') {
      newErrors.name = 'Name is required';
    }
    if (newWizard.name.length > 20) {
      newErrors.name = 'Name is too long. Limit of 20 characters.';
    }
    if (userData.myWizards.some(wizard => wizard.name.toLowerCase() === newWizard.name.toLowerCase())) {
      newErrors.name = 'Name already exists';
    }
    if (newWizard.schoolId === 0) {
      newErrors.schoolId = 'School is required';
    }
    if (newWizard.primarySpellIds.length !== 3) {
      newErrors.primarySpells = 'You must select 3 primary spells';
    }
  
    if (newWizard.alignedSpellIds.length !== 3) {
      newErrors.alignedSpells = 'You must select 3 aligned spells';
    }
  
    if (newWizard.neutralSpellIds.length !== 2) {
      newErrors.neutralSpells = 'You must select 2 neutral spells';
    }

    if (getSchoolFromSpellId(newWizard.neutralSpellIds[0], refData) === getSchoolFromSpellId(newWizard.neutralSpellIds[1], refData)) {
      newErrors.neutralSpells = 'Neutral spells must be from different schools';
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form Submitted")
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors)
      setErrors(validationErrors);
      return;
    }

    const updatedWizard = { ...newWizard };

    let currWizList = userData.myWizards;

    // Find the next available ID
    let highestId = 0;
    currWizList.forEach(wizard => {
      if (wizard.id > highestId) {
        highestId = wizard.id;
      }
    });

    let newId = highestId + 1;
    for (let i = 1; i <= highestId; i++) {
      if (!currWizList.some(wizard => wizard.id === i)) {
        newId = i;
        break;
      }
    }

    updatedWizard.id = newId;

    // Add the updated wizard to the list of wizards, will need to be a POST in future
    currWizList.push(updatedWizard);
    const updatedUserData = { ...userData, myWizards: currWizList };
    setUserData(updatedUserData);
    setCurrentWizard(updatedWizard);
    console.log('navigating to warbands')
    navigate('/warbands');
  }

  function handleCancel() {
    navigate('/warbands');
    setNewWizard(refData.templates.wizard);
    setErrors({});
    setUserData({ ...userData });
    setCurrentWizard(null);
    console.log('cancel')
  }

  return (
    <div className="new-wizard-container">
        <h3>Create New Wizard</h3>
        <form onSubmit={handleSubmit} className='new-wizard-form'>
          <NewWizardEdit refData={refData} newWizard={newWizard} setNewWizard={setNewWizard} />
          {errors.name && <div className="error"><b style={{color: 'red'}}>{errors.name}</b></div>}
          {errors.schoolId && <div className="error"><b style={{color: 'red'}}>{errors.schoolId}</b></div>}
          {newWizard.classId > 0 && <SpellSelection category='primary' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          {errors.primarySpells && <div className="error"><b style={{color: 'red'}}>{errors.primarySpells}</b></div>}
          {newWizard.classId > 0 && <SpellSelection category='aligned' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          {errors.alignedSpells && <div className="error"><b style={{color: 'red'}}>{errors.alignedSpells}</b></div>}
          {newWizard.classId > 0 && <SpellSelection category='neutral' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          {errors.neutralSpells && <div className="error"><b style={{color: 'red'}}>{errors.neutralSpells}</b></div>}
          <section className='button-container center'>
            <Button type='button' onClick={handleCancel}>Cancel</Button>
            <Button disabled={!newWizard.classId} type='submit'>Submit</Button>
          </section>
        </form>
    </div>
  );
}

function NewWizardEdit({refData, newWizard, setNewWizard}) {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  const handleClassChange = (event) => {
    console.log(event.target)
    const selectedClassId = parseInt(event.target.value);
    const updatedWizard = { ...newWizard };

    updatedWizard.classId = selectedClassId;

    updatedWizard.primarySpellIds = [];
    updatedWizard.alignedSpellIds = [];
    updatedWizard.neutralSpellIds = [];

    setNewWizard(updatedWizard);
  }

  const schoolList = refData.schoolsOfMagic.slice(1).map(school => (
    <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
  ))

  return (
    <>
      <section className='new-wizard-form' >
        <Box sx={{ display: 'flex', 
                  flexDirection: isPortrait ? 'column' : 'row',
                  alignItems: 'row', 
                  minWidth: 120, 
                  mt: 2, 
                  gap: 2 }}
        >
          <TextField 
            className='TextField'
            id="name" 
            label="Name" 
            value={newWizard.name} 
            onChange={(e) => setNewWizard({ ...newWizard, name: e.target.value })}
            size= "small"
            required
            fullWidth
          />
          <FormControl fullWidth sx={{ gap: 2, minWidth: 120}}>
            <InputLabel id="class-label" >Class</InputLabel>
            <Select
              className='TextField'
              labelId="class-label"
              id="class-select"
              value={newWizard.classId}
              label="Class"
              onChange={handleClassChange}
              size= "small"
              inputProps={{ maxLength: 20 }}
            >
              <MenuItem key={0} value={0}>--</MenuItem>
              {schoolList}
            </Select>
          </FormControl>
        </Box>
      </section>
    </>
  );
}

function SpellSelection({category, newWizard, setNewWizard}) {
  const { refData } = useAppContext();
  const [ selectedSpells, setSelectedSpells] = useState([])
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  const wizardClassId = newWizard.classId
  const allSpellList = refData.spells;

  let schoolIdArray;
  if (category === 'primary') {
    schoolIdArray = [wizardClassId];
  } else if (category === 'aligned') {
    schoolIdArray = getSchoolFromId(wizardClassId, refData).aligned;
  } else if (category === 'neutral') {
    schoolIdArray = getSchoolFromId(wizardClassId, refData).neutral;
  } else {
    return null;
  }

  let filteredSpells;
  if (category === 'aligned') {
    filteredSpells = schoolIdArray.map(schoolId => 
      allSpellList.filter(spell => getSchoolFromSpellId(spell.id, refData).id === schoolId)
    );
  } else {
    filteredSpells = allSpellList.filter(spell => schoolIdArray.includes(getSchoolFromSpellId(spell.id, refData).id));
  }


  const handleSpellSelection = (e, index) => {
    const selectedSpell = parseInt(e.target.value)
    const newSelectedSpells = [...selectedSpells];
    newSelectedSpells[index] = selectedSpell;
    const updatedWizard = { ...newWizard };
    if (category === 'primary') {
      updatedWizard.primarySpellIds = newSelectedSpells
    } else if (category === 'aligned') {
      updatedWizard.alignedSpellIds = newSelectedSpells
    } else if (category === 'neutral') {
      updatedWizard.neutralSpellIds = newSelectedSpells
    }
    setSelectedSpells(newSelectedSpells)
    setNewWizard(updatedWizard);
  }

  const renderSpellOptions = (spellList) => {

    if (!spellList || spellList.length === 0) return null

    const spellConflict = newWizard.neutralSpellIds

    const spellOptions = spellList.map((spell, index) => {
      return (
        <MenuItem 
          key={spell.id} 
          value={spell.id} 
          disabled={selectedSpells.includes(spell.id)}
          // will have to figure a way to disable when a school spell is selected to gray out other school spells
          id={`spell-${category}`}
        >
          {spell.name}
        </MenuItem>
      )
    }
  )

    return spellOptions
  }

  const spellCountArray = category === 'neutral' ? [1, 2] : [1, 2, 3]
  
  return (
    <section>
      {!isPortrait &&
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {category==='primary' && <h3>Choose 3 Spells from the {getSchoolFromId(wizardClassId, refData).name} School of Magic</h3>}
          {category==='aligned' && <h3>Choose 3 Spells from Aligned Schools of Magic</h3>}
          {category==='neutral' && <h3>Choose 2 Spells from Different Neutral Schools of Magic</h3>}
        </Box>
      }
      {isPortrait && 
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          {category==='primary' && <h3>Choose 3 {getSchoolFromId(wizardClassId, refData).name} Spells</h3>}
          {category==='aligned' && <h3>Choose 3 Aligned Spells</h3>}
          {category==='neutral' && <h3>Choose 2 Neutral Spells</h3>}
        </Box>
      }
      <Box className='center' sx={{ mt: 2, gap: 2, ...(isPortrait && {display: 'flex', flexDirection: 'column' })}}>
        {spellCountArray.map((index) => (
          <Box key={index} sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
                {category==='primary' && <InputLabel id="spell-primary">{getSchoolFromId(wizardClassId, refData).name}</InputLabel>}
                {category==='aligned' && <InputLabel id="spell-aligned">{getSchoolFromId(schoolIdArray[index - 1], refData).name}</InputLabel>}
                {category==='neutral' && <InputLabel id="spell-neutral">Neutral </InputLabel>}
              <Select
                labelId={`spell-${category}`}
                value={selectedSpells[index - 1] || ""}
                onChange={(e) => handleSpellSelection(e, index - 1)}
                label={category}
                size= "small"
                sx={{ backgroundColor: 'black', color: 'white' }}
              >
                {category==='primary' && renderSpellOptions(filteredSpells)}
                {category==='aligned' && renderSpellOptions(filteredSpells[index - 1])}
                {category==='neutral' && renderSpellOptions(filteredSpells)}
              </Select>
            </FormControl >
        </Box>
        ))}
      </Box>
    </section>
  );
}

