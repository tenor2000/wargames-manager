import React, {useEffect} from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useSearchParams } from 'react-router-dom';
import { Typography, useMediaQuery } from '@mui/material';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material';
import SoldierReference from './RefSoldier.jsx';
import CreatureReference from './RefCreature.jsx';
import ArmsReference from './RefArms.jsx';
import ArmorReference from './RefArmor.jsx';
import RandomEncounterReference from './RefEncounters.jsx';
import BaseReference from './RefBase.jsx';
import TreasureReference from './RefTreasure.jsx';
import '../styles/Reference.css';


export function ReferenceView() {
    const [searchParams, setSearchParams] = useSearchParams();
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
    const { loading, error } = useAppContext();

    useEffect(() => {
        const referenceType = searchParams.get('referenceType') || 'all';
        const filter = searchParams.get('filter') || 'All';
    
        if (!searchParams.has('referenceType') || !searchParams.has('filter')) {
          setSearchParams({ referenceType, filter });
        }
    }, [searchParams, setSearchParams]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error loading data</div>;
    }

    const referenceType = searchParams.get('referenceType') || 'all';
    const sourceFilter = searchParams.get('filter') || '';

    return (
        <>
            { !isPortrait && 
                <div className="reference-container center">
                    <h2>Reference Tables</h2>
                </div>
            }
            {(referenceType === 'all' || referenceType==='soldiers') && <SoldierReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='armsandarmor') && <ArmsReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='armsandarmor') && <ArmorReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='creatures') && <CreatureReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='randomencounters') && <RandomEncounterReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='base') && <BaseReference sourceFilter={sourceFilter}/>}
            {(referenceType === 'all' || referenceType==='treasure') && <TreasureReference sourceFilter={sourceFilter}/>}
        </>
    );
}

export function ReferenceSideDrawer() {
    const { refData } = useAppContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const refTableObj = {
        'All': 'all', 
        'Soldiers': 'soldiers', 
        'General Arms and Armor': 'armsandarmor', 
        'Creatures': 'creatures', 
        'Random Encounters': 'randomencounters', 
        'Base': 'base', 
        'Vault': 'vault'
    };

    const handleRefTableChange = (value) => {
        setSearchParams(prev => ({...prev, referenceType: value}));
    };

    const TypeFilter = () => {
        return (
            <List>
                {Object.entries(refTableObj).map(([title, value]) => (
                    <ListItem 
                        key={value}
                        disablePadding
                        disableGutters
                    >
                        <ListItemButton
                            onClick={() => handleRefTableChange(value)}>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        );
    }

    return (
        <>
            <Typography variant="h6">Reference</Typography>
            <Paper elevation={5} sx={{width: '100%', paddingLeft: '10px'}}>
                <TypeFilter />
            </Paper>
            <Typography variant="h6">Source Filter</Typography>
            <Paper elevation={5} sx={{paddingLeft: '10px', width: '100%'}}>
                <SourceFilter />
            </Paper>
        </>
    );
}

function SourceFilter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilters = searchParams.get('filter') ? searchParams.get('filter').split(',') : [];

    //make this filter more dynamic
    const filters = ['All', 'Core Rulebook', 'Test Filter Source'];
    const isAllSelected = currentFilters.includes('All');

    useEffect(() => {
        if (!searchParams.get('filter')) {
            setSearchParams({ ...Object.fromEntries(searchParams.entries()), filter: 'all' });
        }
    }, [searchParams, setSearchParams]);

    const handleFilterChange = (filterName) => {
        let newFilter = [...currentFilters];
        
        if (filterName === 'All') {
            newFilter = ['All'];
        } else {
            if (newFilter.includes('All')) {
                newFilter = [filterName];
            } else {
                if (newFilter.includes(filterName)) {
                    newFilter = newFilter.filter(filter => filter !== filterName);
                } else {
                    newFilter.push(filterName);
                }
            }
        }
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), filter: newFilter.join(',') });
    }

    return (
        <FormGroup>
            {filters.map(filter => (
                <FormControlLabel 
                    key={filter}
                    control={
                        <Checkbox
                            checked={isAllSelected ? filter === 'All' : currentFilters.includes(filter)}
                            onChange={() => handleFilterChange(filter)}
                        />
                    }
                    label={filter}
                />
            ))}
        </FormGroup>
    );
}









