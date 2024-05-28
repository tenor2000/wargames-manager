import { useAppContext } from './AppContext.jsx';
import { BasicSpellCard, ExpandBox } from './BasicComponents.jsx';
import { getSchoolFromId } from './HelperFunctions.js';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './styles/Spells.css';

export function SpellView() {
    const { schoolFilterId, setSchoolFilterId, spellViewList, setSpellViewList, refData} = useAppContext();
    

    const spellsBySchool = () => {
        let sortedSpells = spellViewList;

        if (schoolFilterId === 0) {
            sortedSpells = spellViewList.slice().sort((a,b) => a.name.localeCompare(b.name));
        }

        return sortedSpells.map(spell => (
            <Accordion key={spell.id} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} id="spell-summary" aria-controls="spell-details">
                    <h3>{spell.name}</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <BasicSpellCard spellId={spell.id} />
                </AccordionDetails>
            </Accordion>
        ))
    }
    function handleSearchFilter(text) {
        const spellList = refData.spells;
        const filteredSpells = spellList.filter(spell => spell.name.toLowerCase().includes(text.toLowerCase()));
        setSchoolFilterId(0);
        setSpellViewList(filteredSpells);
    }

    const schoolname = getSchoolFromId(schoolFilterId).name;

    return (
        <>
            <div className='center'>
                <h2>{schoolname} {schoolname==='All' ? 'Spells' : 'Spellbook'}</h2>
            </div>
            <input onChange={(e) => handleSearchFilter(e.target.value)} className="search-bar" placeholder="Search..."/>
            <div>
            {spellsBySchool()}
            </div>
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


    const spellSchools = magicSchools.map(school => (
        <Button key={school.id} onClick={() => handleSchoolClick(school.name)}>{school.name}</Button>
    ))

    return (
        <div className="spells-sidebar-view">
            <h3>Schools of Magic</h3>
            
            <div className="spells-sidebar-item">
                {spellSchools}
            </div>


        </div>
    );
}