import { useAppContext } from '../contexts/AppContext.jsx';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../basicComponents/SearchBar.jsx';
import { getSchoolFromId } from '../helperFuncs/helperFunctions.js';
import { Avatar, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, IconButton, Paper, Button, Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import '../styles/Spells.css';
const BasicAccordian = React.lazy(() => import('../basicComponents/BasicAccordian.jsx'));
const BasicSpellCard = React.lazy(() => import('../basicComponents/BasicSpellCard.jsx'));
import { useInView } from 'react-intersection-observer';


// TODO: optimize the rendering of the full spells list. Click handler is slow.


export function SpellView() {
    const { spellViewList, setSpellViewList, refData} = useAppContext();
    const { loading, error } = useAppContext();
    const { ref, inView } = useInView({triggerOnce: true, threshold: 0.1});
    const [ searchText, setSearchText ] = useState('');
    const [ searchParams, setSearchParams ] = useSearchParams();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    const schoolFilterId = searchParams.get('schoolFilterId') || '0';

    const filteredSpells = useMemo(() => {
        if (loading || error || !refData) return [];

        let spells = refData.spells

        if (schoolFilterId !== '0') {
            const schoolName = getSchoolFromId(schoolFilterId, refData).name;
            spells = spells.filter(spell => spell.school === schoolName);
        }

        if (searchText) {
            spells = spells.filter(spell => spell.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        return spells.slice().sort((a, b) => a.name.localeCompare(b.name));
    }, [schoolFilterId, searchText, refData, loading, error]);

    useEffect(() => {
        setSpellViewList(filteredSpells);
    }, [filteredSpells, setSpellViewList]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const schoolname = getSchoolFromId(schoolFilterId, refData).name;

    function handleSearchFilter(text) {
        setSearchText(text);
        setSearchParams({schoolFilterId: 0});
        const spellList = refData.spells;
        const searchedSpells = spellList.filter(spell => spell.name.toLowerCase().includes(text.toLowerCase()));
        setSpellViewList(searchedSpells);
    }

    function clearSearch() {
        handleSearchFilter('');
        setSearchParams({schoolFilterId: 0});
        setSearchText('');
    }
 
    return (
        <Box>
            {!isPortrait && 
                <Box sx={{ textAlign: 'center', marginBottom: '10px'}}>
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
                {filteredSpells.map(spell => (
                    <Box key={spell.id} ref={ref} >
                        {inView ? (
                            <Suspense fallback={<div>Loading...</div>}>
                                <BasicAccordian title={spell.name} >
                                    <BasicSpellCard spellId={spell.id} titlebar={false} refData={refData} />
                                </BasicAccordian>
                            </Suspense>
                        ) : null}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export function SpellSideDrawer() {
    const { refData, setSpellViewList } = useAppContext();
    const { loading, error } = useAppContext();
    const [searchParams, setSearchParams] = useSearchParams();

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const magicSchools = refData.schoolsOfMagic;

    function handleSchoolClick(selectedSchoolName) {
        const newSchoolId = selectedSchoolName === 'All' 
            ? 0 
            : magicSchools.find(school => school.name === selectedSchoolName).id;
        
        setSearchParams({ schoolFilterId: newSchoolId });
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