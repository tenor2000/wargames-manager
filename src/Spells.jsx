import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext.jsx';
import testData from './database.js';
// import './styles/Spells.css';


export function SpellView() {
    // const [userData, setUserData] = useAuthContext();
    const { schoolId, setSchoolId } = useAppContext();
    const { spellList, setSpellList } = useAppContext();

    const spellsFromSchool = () => {
        return spellList.map(spell => (
            <li key={spell.id}>{spell.name}</li>
        ))
    }

    const schoolname = testData.schools.find(school => school.id === schoolId).name

    return (
        <>
            <h3>{schoolname} Spells</h3>
            <ul>
                {spellsFromSchool()}
            </ul>
        </>
    );
}

export function SpellSideBar() {
    // const [userData, setUserData] = useAuthContext();
    const { spellList, setSpellList } = useAppContext();

    const spellSchools = testData.schools.map(school => (
        <li key={school.id} onClick={() => handleClick(school.name)}>{school.name}</li>
    ))
    function handleClick(schoolname) {
        let spellSchoolList = testData.spells.filter(
            spell => spell.school === schoolname);

        if (schoolname === 'All') {
            spellSchoolList = testData.spells
        }
        
        setSpellList(spellSchoolList)
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