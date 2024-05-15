import { useAppContext } from './AppContext.jsx';
import { useState } from 'react';
import { MenuWizard } from './CreateNewWizard.jsx';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';


export function ExpandBox({title, children, className}) {
    const [expanded, setExpanded] = useState(false);
  
    className ? className = className : className = '';
  
    const toggleExpanded = () => {
      setExpanded(!expanded);
    };
  
    return (
      <div className={`${className} expandable-container`}>
        <div 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}
        >
          <h3>{title}</h3>
          <div onClick={toggleExpanded} >{expanded ? <MdExpandMore size={30}/> : <MdExpandLess size={30} />}</div>
        </div>
        {expanded && (<div className={`${className}-container`}>
          {children}
          
        </div>
          )}
      </div>
    );
  }

export function BasicStatBlock( {stats, costs=false} ) {
    return (
        <table className="stat-block-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Move</th>
                    <th>Fight</th>
                    <th>Shoot</th>
                    <th>Will</th>
                    <th>Armor</th>
                    <th>Health</th>
                    {costs && <th>Cost</th>}
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{stats.class}</td>
                    <td>{stats.move}</td>
                    <td>{stats.fight}</td>
                    <td>{stats.shoot}</td>
                    <td>{stats.will}</td>
                    <td>{stats.armor}</td>
                    <td>{stats.health}</td>
                    {costs && <td>{stats.cost}</td>}
                    <td>{stats.notes}</td>
                </tr>
            </tbody>
        </table>
    )

}

export function getSchoolName(idnum, type='spell') {
    const { refData } = useAppContext();
    const magicSchools = refData.schoolTypes
    let schoolId
    if (type === 'spell') {
        schoolId = Math.floor(idnum / 100)
    } else if (type === 'wizard') {
        schoolId = idnum
    }
    const schoolEntry = magicSchools.find(school => school.id === schoolId)
    
    return schoolEntry ? schoolEntry.name : null;

}

export function BasicSpellBlock({ spellId , schoolModifier = 0, usage='reference'}) {
    const { refData } = useAppContext();
    const { currentWizard } = useAppContext();
    const spellRef = refData.spells
    const spellEntry = spellRef.find(spell => spell.id === spellId)
    
    let castNum = spellEntry.base_cast + schoolModifier;
    schoolModifier === 0 ? null : castNum += schoolModifier;
    spellId in currentWizard.spellModifiers ? castNum += currentWizard.spellModifiers[spellId] : null;

    return (
        <ExpandBox title={`${spellEntry.name} - (Cast: ${castNum})`} >
            <p> {spellEntry.description} </p>
            <p> School: {getSchoolName(spellEntry.id, 'spell')} </p>
            <p> School Modifier: {schoolModifier} </p>
        </ExpandBox>
    )
}