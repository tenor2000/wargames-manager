import { useAppContext } from './AppContext.jsx';
import { useState } from 'react';
import { BasicSpellCard, SearchBar } from './BasicComponents.jsx';
import { getSchoolFromId } from './HelperFunctions.js';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMediaQuery } from '@mui/material';
import './styles/Spells.css';

export function SpellView() {
    const { schoolFilterId, setSchoolFilterId, spellViewList, setSpellViewList, refData} = useAppContext();
    const { loading, error } = useAppContext();
    const [ searchText, setSearchText ] = useState('');
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const isLandscape = useMediaQuery('(max-height: 768px) and (orientation: landscape)');

    if (loading) {
        console.log('Loading...')
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

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
                    <BasicSpellCard spellId={spell.id} titlebar={false} refData={refData}/>
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

    function clearSearch() {
        handleSearchFilter('');
        setSchoolFilterId(0);
        setSearchText('');
    }

    const schoolname = getSchoolFromId(schoolFilterId, refData).name;
 
    return (
        <>
            {!isPortrait && 
                <div className={isLandscape ? 'center row' : 'center column'}>
                    <h2>{schoolname} {schoolname === 'All' ? 'Spells' : 'Spellbook'}</h2>
                    <SearchBar 
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleSearchFilter={handleSearchFilter}
                        clearSearch={clearSearch}
                    />
                </div>
            }
            <div className='spell-list-view'>
                {spellsBySchool()}
            </div>
            {isPortrait && 
                <div className='center'>
                    <SearchBar 
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleSearchFilter={handleSearchFilter}
                        clearSearch={clearSearch}
                    />
                </div>
            }
        </>
    );
}

export function SpellSideDrawer() {
    const { refData, spellViewList, setSpellViewList, setSchoolFilterId } = useAppContext();
    const { loading, error } = useAppContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

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