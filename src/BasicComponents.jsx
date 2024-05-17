import { useAppContext } from './AppContext.jsx';
import { useAuth } from './AuthContext.jsx'
import { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';


export function ExpandBox({title, children, className=''}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`expandable-container ${expanded ? 'expanded' : ''}`}>
      <div className="expand-box-header" onClick={toggleExpanded}
        style={{ 
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h3>{title}</h3>
        <div>
          {expanded ? <MdExpandMore size={30}/> : <MdExpandLess size={30} />}
        </div>
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

export function getSpellFromId(spellId) {
  const { refData } = useAppContext();
 
  return refData.spells.find(spell => spell.id === spellId)
}

export function getSoldierFromId(soldierId) {
  const { refData } = useAppContext();
 
  return refData.soldiers.find(soldier => soldier.id === soldierId)
}

export function getSchoolFromId(schoolId) {
  const { refData } = useAppContext();

  return refData.schoolsOfMagic.find(school => school.id === schoolId)
}

export function getMyWizardFromId(wizardId) {
  const { userData } = useAuth()

  return userData.myWizards.find(wizard => wizard.id === wizardId)
}


export function BasicStatCard({ name, stats, costs=false }) {
  const modSign = (stat) => {
    return stat >= 0 ? `+${stat}` : stat;
  }
  
  return (
    <div className="stat-card">
      <table className="stat-block-table">
        <thead>
          <tr>
            <th colspan="3"><h3>{name}</h3></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">{stats.class}</td>
            <td>{costs && `${stats.cost > 0 ? `${stats.cost} gp` : 'Free'}`}</td>
          </tr>
          <tr>
            <td><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move Icon'/>{stats.move}</td>
            <td><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight Icon'/>{modSign(stats.fight)}</td>
            <td><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot Icon'/>{modSign(stats.shoot)}</td>
          </tr>
          <tr>
            <td><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will Icon'/>{modSign(stats.will)}</td>
            <td><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor Icon'/>{stats.armor}</td>
            <td><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Fight Icon'/>{stats.health}</td>
          </tr>
          <tr>
            <td colSpan="3">Item: {stats.item ? stats.item : '--'}</td>
          </tr>
          <tr>
            <td colSpan="3">{stats.notes}</td>
          </tr>
        </tbody>
      </table>
    
    </div>
  )
}

export function BasicSpellCard({spellId}) {
  const spellViewObj = getSpellFromId(spellId)

  return (
    <div>
      <table className="spellbook-table">
        <thead>
          <tr colSpan="3">
            <th colSpan="3">
              <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{spellViewObj.school}</td>
            <td>Base Cast: {spellViewObj.base_cast}</td>
            <td>{spellViewObj.category}</td>
          </tr>
          <tr className='spellbook-description'>
            <td colSpan="3">{spellViewObj.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}