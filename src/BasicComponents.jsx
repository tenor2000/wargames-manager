import { useAppContext } from './AppContext.jsx';
import { useAuth } from './AuthContext.jsx'
import { useState, Fragment, IconButton } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { getStatusFromId, getSpellFromId } from './HelperFunctions.js';
import { Alert } from "@mui/material";


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


export function BasicStatCard({ name, stats, show_costs=false, show_status=true, editMode=false }) {

  const modSign = (stat) => {
    return stat >= 0 ? `+${stat}` : stat;
  }
  
  return (
    <div className="stat-card">
      <table className="stat-block-table">
        <thead>
          <tr>
            <th colSpan="3"><h3>{name} {stats.status !== 1 && show_status ? `(${getStatusFromId(stats.status)})` : ''}</h3></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">{stats.class}</td>
            <td>{show_costs && `${stats.cost > 0 ? `${stats.cost} gc` : 'Free'}`}</td>
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
            <td colSpan="3">
              {stats.itemSlots.map((slot, index) => (
                <p key= {'Item' + index}>Item {index+1}: {slot !== 'none' ? slot : '--'}</p>
              ))}
            </td>
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

export function SimpleSnackbar(message) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}