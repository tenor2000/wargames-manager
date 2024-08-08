import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { getSpellFromId } from '../helperFuncs/helperFunctions.js';
import { Box, Button } from '@mui/material';
import BasicSpellCard from '../basicComponents/BasicSpellCard.jsx';
import { useMediaQuery } from '@mui/material';

export function SpellBookView() {
    const { currentWizard, refData } = useAppContext();
    const [ spellViewObj, setSpellViewObj ] = useState('null')
    const [ spellSchoolMod, setSpellSchoolMod ] = useState(0)
    const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

    if (!currentWizard) {
        return null
    }

    const primarySpellArr = currentWizard.primarySpellIds;
    const alignedSpellArr = currentWizard.alignedSpellIds;
    const neutralSpellArr = currentWizard.neutralSpellIds;
    const opposedSpellArr = currentWizard.opposedSpellIds;

    function SpellViewCard() {
        const spellMod = currentWizard.spellModifiers[spellViewObj.id]

        const varCast = spellMod ? <b style={{ color: 'green' }}>{spellViewObj.base_cast + spellMod + spellSchoolMod}</b> : spellViewObj.base_cast + spellSchoolMod;

        return (
            <Box>
                <BasicSpellCard spellId={spellViewObj.id} refData={refData} titlebar={true} castnum={varCast} spellSchoolMod={spellSchoolMod}/>
                <Button 
                    sx={{ width: '100%' }} 
                    onClick={() => setSpellViewObj('null')}
                >
                    Close Viewer
                </Button>
            </Box>
        )
    }

    function MySpellButton({ spellId , schoolModifier = 0}) {
        const { currentWizard } = useAppContext();
        const spellEntry = getSpellFromId(spellId, refData)
        
        if (!spellEntry) {
            return null
        }
    
        function handleSpellViewChange(spellEntry) {
            setSpellSchoolMod(schoolModifier)
            setSpellViewObj(spellEntry)
        }

        let castNum = spellEntry.base_cast + schoolModifier;
        spellId in currentWizard.spellModifiers ? castNum += currentWizard.spellModifiers[spellId] : null;
        if (castNum < spellEntry.base_cast + schoolModifier) {
            castNum = <b style={{ color: 'green' }}>{castNum}</b>
        } else if (castNum > spellEntry.base_cast + schoolModifier) {
            castNum = <b style={{ color: 'red' }}>{castNum}</b>
        }

        return (
    
            <Button onClick={() => handleSpellViewChange(spellEntry)} style={{display: 'inline-block'}}>
                {spellEntry.name} ({castNum})
            </Button>
        )
    }

    return (
        <>
            {spellViewObj !== 'null' && <SpellViewCard spell={spellViewObj}/>}
            <Box className='spellbutton-container'>
                <h4>Primary Spells </h4>
                <Box sx={{ display: 'flex', flexDirection: isPortrait ? 'column' : 'row'}}>
                    {primarySpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} />
                    ))}
                </Box>
            </Box>
            <Box className="spellbutton-container">
                <h4>Aligned Spells</h4> 
                <Box sx={{ display: 'flex', flexDirection: isPortrait ? 'column' : 'row'}}>
                    {alignedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={2} />
                    ))}
                </Box>
            </Box>
            <Box className="spellbutton-container">
                <h4>Neutral Spells</h4> 
                <Box sx={{ display: 'flex', flexDirection: isPortrait ? 'column' : 'row'}}>
                    {neutralSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={4}/>
                    ))}
                </Box>
            </Box>
            <Box className="spellbutton-container">
                {currentWizard.opposedSpellIds.length > 0 ? <h4>Opposed Spells </h4> : null}
                <Box sx={{ display: 'flex', flexDirection: isPortrait ? 'column' : 'row'}}>
                    {opposedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={6}/>
                    ))}
                </Box>
            </Box>
        </>
    )
}