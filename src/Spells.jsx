import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import referenceData from './database.js';
import { ExpandBox, getSchoolName } from './BasicComponents.jsx';
// import './styles/Spells.css';

const schoolTypesRef = referenceData.schoolTypes;
const spellListRef = referenceData.spells;


export function SpellView() {
    const { schoolTypeId, setSchoolTypeId } = useAppContext();
    const { spellList, setSpellList } = useAppContext();

    const spellsBySchool = () => {
        // must figure way to show spells by alphabetical order when All is used.

        return spellList.map(spell => (
            <ExpandBox key={spell.id} title={spell.name}>
                <div>
                    <p>Target Number: {spell.base_cast}</p>
                    <p>Category: {spell.category}</p>
                </div>
                <div>
                    Description: {spell.description}
                </div>
            </ExpandBox>
        ))
    }
    const schoolType = schoolTypesRef[schoolTypeId].name;

    return (
        <>
            <h2>{schoolType} Spells</h2>
            <ul>
                {spellsBySchool()}
            </ul>
        </>
    );
}

export function SpellSideBar() {
    const { setSpellList, setSchoolTypeId } = useAppContext();

    function handleSchoolChange(selectedSchoolName) {
        const filteredSpells = spellListRef.filter(spell => spell.school === selectedSchoolName);
        const newSchoolId = schoolTypesRef.findIndex(school => school.name === selectedSchoolName);
        const newSpellList = selectedSchoolName === 'All' ? spellListRef : filteredSpells;
        setSchoolTypeId(newSchoolId);
        setSpellList(newSpellList);
    }

    const spellSchools = schoolTypesRef.map(school => (
        <li key={school.id} onClick={() => handleSchoolChange(school.name)}>{school.name}</li>
    ))

    return (
        <div className="sidebar-view">
            <h3>Schools of Magic</h3>
            <ul>
                {spellSchools}
            </ul>
        </div>
    );
}

function SpellInfo() {
    return (
        <div>
            <h1>Spell Info</h1>
        </div>
    );
}