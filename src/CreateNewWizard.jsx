import { useAppContext } from './AppContext.jsx';
import { useAuth } from './AuthContext.jsx';
import { useState, useEffect, useNavigate } from 'react';
import { getRandomName, getSchoolFromId, getSchoolFromSpellId } from './BasicComponents.jsx';
import './styles/NewWizard.css';
import { update } from 'firebase/database';
import { SpellSideBar } from './Spells.jsx';


export function NewWizardSideBar() {
  const { newWizard } = useAppContext();
  return (
    <>
      <h3>{newWizard.name}</h3>
    </>
  );
}

export function CreateNewWizard() {
  const { refData, newWizard, setNewWizard } = useAppContext();
  const { userData, setUserData } = useAuth();

  const schoolList = refData.schoolsOfMagic.slice(1).map(school => (
    <option key={school.id} value={school.id}>{school.name}</option>
  ))

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: add validation

    const updatedWizard = { ...newWizard };

    console.log(updatedWizard)

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

    
    const navigate = useNavigate();
    navigate('/warbands');
  }

  function handleCancel() {
    console.log('cancel')
  }

  return (
    <div className="new-wizard-container">
        <h3>Create New Wizard</h3>
        <form>
          <NewWizardEdit />
          {newWizard.stats.classId > 0 && <SpellSelection category='primary'/>}
          {newWizard.stats.classId > 0 && <SpellSelection category='aligned'/>}
          {newWizard.stats.classId > 0 && <SpellSelection category='neutral'/>}
          <section className='button-container center'>
            <button type='button' onClick={handleCancel}>Cancel</button>
            <button type='submit' onClick={handleSubmit}>Submit</button>
          </section>
        </form>
    </div>
  );
}

function NewWizardEdit() {
  const { refData, newWizard, setNewWizard } = useAppContext();

  const handleClassChange = (event) => {
    const selectedClassId = parseInt(event.target.value);
    const updatedWizard = { ...newWizard };
    console.log(updatedWizard)

    updatedWizard.stats.classId = selectedClassId;

    updatedWizard.primarySpellIds = [];
    updatedWizard.alignedSpellIds = [];
    updatedWizard.neutralSpellIds = [];
    
    //add wizard title here

    setNewWizard(updatedWizard);
  }

  const schoolList = refData.schoolsOfMagic.slice(1).map(school => (
    <option key={school.id} value={school.id}>{school.name}</option>
  ))

  return (
    <>
      <section className='center'>
        <label>Name: </label>
        <input type="text" value={newWizard.name} onChange={(e) => setNewWizard({ ...newWizard, name: e.target.value })}/>
        <br />
        <label>Class: </label>
        <select value={newWizard.stats.classId} onChange={handleClassChange}>
          <option value={0}>--</option>
          {schoolList}
        </select>
      </section>
    </>
  );
}

function SpellSelection({category}) {
  const { refData, newWizard, currentWizard, setNewWizard } = useAppContext();
  const [ selectedSpells, setSelectedSpells] = useState([])

  const wizardClassId = newWizard.stats.classId
  const allSpellList = refData.spells;

  let schoolIdArray;
  if (category === 'primary') {
    schoolIdArray = [wizardClassId];
  } else if (category === 'aligned') {
    schoolIdArray = getSchoolFromId(wizardClassId).aligned;
  } else if (category === 'neutral') {
    schoolIdArray = getSchoolFromId(wizardClassId).neutral;
  } else {
    return null;
  }

  let filteredSpells;
  if (category === 'aligned') {
    filteredSpells = schoolIdArray.map(schoolId => 
      allSpellList.filter(spell => getSchoolFromSpellId(spell.id).id === schoolId)
    );
  } else {
    filteredSpells = allSpellList.filter(spell => schoolIdArray.includes(getSchoolFromSpellId(spell.id).id));
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
      <option 
        key={spell.id} 
        value={spell.id} 
        disabled={selectedSpells.includes(spell.id)}
        // will have to figure a way to disable when a school spell is selected to gray out other school spells
        id={`${category}-spell-${index}`}
      >
        {spell.name}
      </option>
      ))
    
    return [<option key="empty" value="" >--</option>, ...spellOptions]
  }

  const spellCountArray = category === 'neutral' ? [1, 2] : [1, 2, 3]
  
  return (
    <section>
      <div className='center'>
        {category==='primary' && <h3>Choose 3 Spells from the {getSchoolFromId(wizardClassId).name} School of Magic</h3>}
        {category==='aligned' && <h3>Choose 3 Spells from Aligned Schools of Magic</h3>}
        {category==='neutral' && <h3>Choose 2 Spells from Neutral Schools of Magic</h3>}
      </div>
      <div className='center'>
        {spellCountArray.map((index) => (
          <div key={index}>
              {category==='primary' && <label>{getSchoolFromId(wizardClassId).name} Spell {index}: </label>}
              {category==='aligned' && <label>{getSchoolFromId(schoolIdArray[index - 1]).name} Spell: </label>}
              {category==='neutral' && <label>Neutral Spell {index}: </label>}
            <select
              value={selectedSpells[index - 1] || ""}
              onChange={(e) => handleSpellSelection(e, index - 1)}
            >
              {category==='primary' && renderSpellOptions(filteredSpells)}
              {category==='aligned' && renderSpellOptions(filteredSpells[index - 1])}
              {category==='neutral' && renderSpellOptions(filteredSpells)}
            </select>
          </div>
        ))}
      </div>
      
    </section>
  );
}