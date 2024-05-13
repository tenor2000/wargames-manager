import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import testData from './database.js';
import { ExpandBox } from './BasicComponents.jsx';
// import './styles/Spells.css';


export function SpellView() {
    // const [userData, setUserData] = useAuthContext();
    const { schoolId, setSchoolId } = useAppContext();
    const { spellList, setSpellList } = useAppContext();

    const spellsBySchool = () => {
        // must figure way to show spells by alphabetical order when All is used.
        if (schoolId === 0) {
            const newSpellList = [...spellList];
        }

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

    const schoolname = testData.schools[schoolId].name;

    return (
        <>
            <h2>{schoolname} Spells</h2>
            <ul>
                {spellsBySchool()}
            </ul>
        </>
    );
}

export function SpellSideBar() {
    // const [userData, setUserData] = useAuthContext();
    const { spellList, setSpellList, schoolId, setSchoolId } = useAppContext();

    const spellSchools = testData.schools.map(school => (
        <li key={school.id} onClick={() => handleClick(school.name)}>{school.name}</li>
    ))
    function handleClick(schoolname) {
        let newSpellList = testData.spells.filter(
            spell => spell.school === schoolname);

        if (schoolname === 'All') {
            newSpellList = testData.spells
        }
        setSchoolId(testData.schools.findIndex(school => school.name === schoolname))
        setSpellList(newSpellList)
        console.log(schoolname)
    }

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