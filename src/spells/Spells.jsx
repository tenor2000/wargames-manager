import { useAppContext } from '../contexts/AppContext.jsx';
import { useState } from 'react';
import { BasicAccordian, BasicSpellCard, SearchBar } from '../basicComponents/BasicComponents.jsx';
import { getSchoolFromId } from '../helperFuncs/HelperFunctions.js';
import { Avatar, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, IconButton, Paper, Button, Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import '../styles/Spells.css';

export function SpellView() {
    const { schoolFilterId, setSchoolFilterId, spellViewList, setSpellViewList, refData} = useAppContext();
    const { loading, error } = useAppContext();
    const [ searchText, setSearchText ] = useState('');
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (loading) {
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
            <BasicAccordian key={spell.id} title={spell.name} >
                <BasicSpellCard spellId={spell.id} titlebar={false} refData={refData} />
            </BasicAccordian>
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
        <Box>
            {!isPortrait && 
                <Box sx={{ textAlign: 'center'}}>
                    <h2>{schoolname} {schoolname === 'All' ? 'Spells' : 'Spellbook'}</h2>
                    <SearchBar 
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleSearchFilter={handleSearchFilter}
                        clearSearch={clearSearch}
                    />
                </Box>
            }
            {isPortrait && 
                <Box sx={{ textAlign: 'center'}}>
                    <SearchBar 
                        searchText={searchText}
                        setSearchText={setSearchText}
                        handleSearchFilter={handleSearchFilter}
                        clearSearch={clearSearch}
                    />
                </Box>
            }
            <Box>
                {spellsBySchool()}
            </Box>
        </Box>
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


    const spellSchoolsList = magicSchools.map(school => (
        <ListItem 
            key={school.id}
            disablePadding
            disableGutters
        >
            <ListItemButton
                onClick={() => handleSchoolClick(school.name)}
                disableGutters
            >
                <ListItemAvatar>
                    <Avatar sx={{ width: 25, height: 25 }}>
                        <img src={'src/assets/Game-Icons-net/wizard-face.svg'} alt={school.name} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={school.name}
                />
            </ListItemButton>
        </ListItem>
    ))

    return (
        <>
            <Typography variant="h5">
                Schools of Magic
            </Typography>
            <Paper elevation={5} sx={{width: '100%', paddingLeft: '5px'}}>
                <List >
                    {spellSchoolsList}
                </List>
            </Paper>
        </>
    );
}