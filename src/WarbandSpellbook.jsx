import { useState } from 'react';
import { useAppContext } from './AppContext.jsx';
import { getSpellFromId } from './HelperFunctions.js';

export function SpellBookBlock() {
    const { currentWizard } = useAppContext();
    const [ spellViewObj, setSpellViewObj ] = useState('null')
    const [ spellSchoolMod, setSpellSchoolMod ] = useState(0)

    const primarySpellArr = currentWizard.primarySpellIds
    const alignedSpellArr = currentWizard.alignedSpellIds
    const neutralSpellArr = currentWizard.neutralSpellIds
    const opposedSpellArr = currentWizard.opposedSpellIds

    

    function SpellViewCard() {
        const spellMod = currentWizard.spellModifiers[spellViewObj.id]

        const varCast = spellMod ? <b style={{ color: 'green' }}>{spellViewObj.base_cast + spellMod + spellSchoolMod}</b> : spellViewObj.base_cast + spellSchoolMod;

        return (
            <div>
                <table className="spellbook-table">
                    <tbody>
                        <tr colSpan="4">
                            <th colSpan="4">
                                <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
                            </th>
                        </tr>
                        <tr>
                            <td>{spellViewObj.school}</td>
                            <td>Cast Number: {varCast}</td>
                            <td>Base Cast: {spellViewObj.base_cast}</td>
                            <td>{spellViewObj.category}</td>
                        </tr>
                        <tr className='spellbook-description'>
                            <td colSpan="4">{spellViewObj.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    function MySpellButton({ spellId , schoolModifier = 0}) {
        const { currentWizard } = useAppContext();
        const spellEntry = getSpellFromId(spellId)
        
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
    
            <button onClick={() => handleSpellViewChange(spellEntry)} >
                {spellEntry.name} - {castNum}
            </button>
        )
    }

    return (
        <>
            {spellViewObj !== 'null' && <SpellViewCard spell={spellViewObj}/>}
            <div className='spellbutton-container'>
                <h3>Primary: </h3>
                <div>
                    {primarySpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} />
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                <h3>Aligned: </h3> 
                <div>
                    {alignedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={2} />
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                <h3>Neutral: </h3> 
                <div>
                    {neutralSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={4}/>
                    ))}
                </div>
            </div>
            <div className="spellbutton-container">
                {currentWizard.opposedSpellIds.length > 0 ? <h3>Opposed: </h3> : null}
                <div>
                    {opposedSpellArr.map((spellId) => (
                        <MySpellButton key={spellId} spellId={spellId} schoolModifier={6}/>
                    ))}
                </div>
            </div>
        </>
    )
}