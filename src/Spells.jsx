import { useAppContext } from './AppContext.jsx';
import { BasicSpellCard, ExpandBox, getSchoolFromId} from './BasicComponents.jsx';
// import './styles/Spells.css';

export function SpellView() {
    const { schoolFilterId, spellViewList} = useAppContext();

    const spellsBySchool = () => {
        let sortedSpells = spellViewList;

        if (schoolFilterId === 0) {
            sortedSpells = spellViewList.slice().sort((a,b) => a.name.localeCompare(b.name));
        }

        return sortedSpells.map(spell => (
            <ExpandBox key={spell.id} title={spell.name}>
                <BasicSpellCard spellId={spell.id} />
            </ExpandBox>
        ))
    }
    const schoolname = getSchoolFromId(schoolFilterId).name;

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
    const { refData, spellViewList, setSpellViewList, setSchoolFilterId } = useAppContext();

    const spellList = refData.spells;
    const magicSchools = refData.schoolsOfMagic;

    function handleSchoolClick(selectedSchoolName) {
        const filteredSpells = spellList.filter(spell => spell.school === selectedSchoolName);
        const newSchoolId = magicSchools.find(school => school.name === selectedSchoolName).id;
        const newSpellList = selectedSchoolName === 'All' ? spellList : filteredSpells;
        setSchoolFilterId(newSchoolId);
        setSpellViewList(newSpellList);
    }

    function handleSearchFilter(text) {
        const filteredSpells = spellList.filter(spell => spell.name.toLowerCase().includes(text.toLowerCase()));
        setSchoolFilterId(0);
        setSpellViewList(filteredSpells);
    }

    const spellSchools = magicSchools.map(school => (
        <li key={school.id} onClick={() => handleSchoolClick(school.name)}>{school.name}</li>
    ))

    return (
        <div className="sidebar-view">
            <h3>Schools of Magic</h3>
            <ul>
                {spellSchools}
            </ul>
            <input type="text" onChange={(e) => handleSearchFilter(e.target.value)} placeholder={'search'}/>
        </div>
    );
}