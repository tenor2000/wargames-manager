import { useAppContext } from './AppContext.jsx';
import { useAuth } from './AuthContext.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchoolFromId, getSchoolFromSpellId, getRandomName } from './HelperFunctions.js';
import './styles/NewWizard.css';
import { update } from 'firebase/database';
import { useMediaQuery } from '@mui/material';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Box } from '@mui/material';



export function NewWizardSideDrawer() {
  const { loading, error } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
      }
    
    if (error) {
    return <div>Error loading data</div>;
    }
  return (
    <>
      <h3>Building New Wizard...</h3>
    </>
  );
}

export function CreateNewWizard() {
  const { refData, newWizard, setNewWizard } = useAppContext();
  const { userData, setUserData } = useAuth();
  const navigate = useNavigate();
  const { loading, error } = useAppContext();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading data</div>;
  }

  const schoolList = refData.schoolsOfMagic.slice(1).map(school => (
    <option key={school.id} value={school.id}>{school.name}</option>
  ))

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: add validation
    // TODO: add error handling
  

    const updatedWizard = { ...newWizard };

    let currWizList = userData.myWizards;

    // Find the highest ID used so far
    let highestId = 0;
    currWizList.forEach(wizard => {
      if (wizard.id > highestId) {
        highestId = wizard.id;
      }
    });

    // Find the first available ID after any gaps
    let newId = highestId + 1;
    for (let i = 1; i <= highestId; i++) {
      if (!currWizList.some(wizard => wizard.id === i)) {
        newId = i;
        break;
      }
    }

    // Assign the new ID to the updated wizard
    updatedWizard.id = newId;

    // Add the updated wizard to the list of wizards
    currWizList.push(updatedWizard);
    const updatedUserData = { ...userData, myWizards: currWizList };
    setUserData(updatedUserData);

    navigate('/warbands');
  }

  function handleCancel() {
    console.log('cancel')
  }

  return (
    <div className="new-wizard-container">
        <h3>Create New Wizard</h3>
        <form onSubmit={handleSubmit} className='new-wizard-form'>
          <NewWizardEdit newWizard={newWizard} setNewWizard={setNewWizard} />
          {newWizard.classId > 0 && <SpellSelection category='primary' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          {newWizard.classId > 0 && <SpellSelection category='aligned' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          {newWizard.classId > 0 && <SpellSelection category='neutral' newWizard={newWizard} setNewWizard={setNewWizard}/>}
          <section className='button-container center'>
            <Button type='cancel' onClick={handleCancel}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </section>
        </form>
    </div>
  );
}

function NewWizardEdit() {
  const { refData, newWizard, setNewWizard } = useAppContext();
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  const handleClassChange = (event) => {
    const selectedClassId = parseInt(event.target.value);
    const updatedWizard = { ...newWizard };
    console.log(updatedWizard)

    updatedWizard.classId = selectedClassId;

    updatedWizard.primarySpellIds = [];
    updatedWizard.alignedSpellIds = [];
    updatedWizard.neutralSpellIds = [];
    
    //add wizard title here

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
            required
            id="name" 
            label="Name" 
            value={newWizard.name} 
            onChange={(e) => setNewWizard({ ...newWizard, name: e.target.value })}
            size= "small"
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
            >
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

    const spellOptions = spellList.map((spell, index) => (
      <MenuItem 
        key={spell.id} 
        value={spell.id} 
        disabled={selectedSpells.includes(spell.id)}
        // will have to figure a way to disable when a school spell is selected to gray out other school spells
        id={`spell-${category}`}
      >
        {spell.name}
      </MenuItem>
    ))

    return spellOptions
  }

  const spellCountArray = category === 'neutral' ? [1, 2] : [1, 2, 3]
  
  return (
    <section>
      {!isPortrait &&
        <Box className='center' sx={{ mt: 2 }}>
          {category==='primary' && <h3>Choose 3 Spells from the {getSchoolFromId(wizardClassId, refData).name} School of Magic</h3>}
          {category==='aligned' && <h3>Choose 3 Spells from Aligned Schools of Magic</h3>}
          {category==='neutral' && <h3>Choose 2 Spells from Neutral Schools of Magic</h3>}
        </Box>
      }
      {isPortrait && 
        <Box className='center' sx={{ mt: 2 }}>
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