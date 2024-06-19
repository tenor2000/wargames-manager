import React from 'react';
import { useState, Fragment } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { getStatusFromId, getSpellFromId, getItemFromId, modSign } from './HelperFunctions.js';
import { Box, TextField, InputAdornment, Button, useMediaQuery } from "@mui/material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { TbRuler2Off } from 'react-icons/tb';


// ExpandBox is deprecated
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


export function BasicStatCard({ statsObj, refData, showCosts=false, showStatus=false, showItemSlots=false, showLevel=false, editMode=false }) {  
  const ShowStatus = ({soldier}) => {
    let statusColor;
    if (soldier.status === 0) {
        statusColor= 'red';
    } else if (soldier.status === 2) {
        statusColor = 'gray';
    } else if (soldier.status === 8) {
        statusColor = 'green';
    } else if (soldier.status === 7) {
        statusColor = 'darkgreen';
    } else {
        statusColor = 'lightblue'
    }
    return <b style={{color: statusColor}}>{getStatusFromId(soldier.status, refData)}</b>
}
  
  return (
    <div className="stat-card">
      <Paper className="generic-paper" sx={{ '& table': { width: '100%' }, display: 'flex', flexDirection: 'column', alignItems : 'center', overflow: 'hidden'}}>
        <TableContainer>
          <Table className="stat-block-card">
            {statsObj.name &&
              <TableHead >
                <TableRow>
                  <TableCell colSpan={3} sx={{textAlign: 'center'}}>
                    <h3>
                      {statsObj.name} {statsObj.status !== 1 && showStatus &&  (
                        <>
                          {' ('}
                          <ShowStatus soldier={statsObj}/>
                          {')'} 
                        </>
                      )}
                    </h3>
                  </TableCell>
                </TableRow>
              </TableHead>
            }
            {!statsObj.name &&
              <TableHead >
                <TableRow>
                  <TableCell colSpan={2} sx={{textAlign: 'left'}}>
                    <h3>{statsObj.class ? statsObj.class : ''} {statsObj.status !== 1 && showStatus ? `(${getStatusFromId(statsObj.status, refData)})` : ''}</h3>
                  </TableCell>
                  <TableCell>
                    {showCosts && `${statsObj.cost > 0 ? `${statsObj.cost} gc` : 'Free'}`}
                  </TableCell>
                </TableRow>
              </TableHead>
            }
            <TableBody >
              {statsObj.name && <TableRow>
                <TableCell colSpan="2" sx={{textAlign: 'left'}}>{statsObj.class}</TableCell>
                  {!showLevel &&<TableCell>{showCosts && `${statsObj.cost > 0 ? `${statsObj.cost} gc` : 'Free'}`}</TableCell>}
                  {showLevel && <TableCell>Level {statsObj.level}</TableCell>}
              </TableRow>}
              <TableRow>
                <TableCell><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move'/>{statsObj.move}</TableCell>
                <TableCell><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight'/>{modSign(statsObj.fight)}</TableCell>
                <TableCell><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot'/>{modSign(statsObj.shoot)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor'/>{statsObj.armor}</TableCell>
                <TableCell><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will'/>{modSign(statsObj.will)}</TableCell>
                <TableCell><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Health'/>{statsObj.health}</TableCell>
              </TableRow>
              {showItemSlots && 
                <TableRow>
                  <TableCell colSpan={3} sx={{textAlign: 'left'}}>
                    <h4>Slot items:</h4>
                    {statsObj.itemSlots.map((itemId, index) => (
                      <p key= {'Item' + index}>{itemId !== 0 ? getItemFromId(itemId, refData).name : ''}</p>
                    ))}
                  </TableCell>
                </TableRow>
              }
              <TableRow>
                <TableCell colSpan={3}>{statsObj.notes}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer >
      </Paper>
    </div>
  )
}

export function BasicStatTableHeader({children, showName=false, showClass = false, showCosts=false, showStatus=false, showItemSlots=false, showLevel=false, showSource=false, showCurrentHealth=false }) {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        showName,
        showClass,
        showCosts,
        showStatus,
        showItemSlots,
        showLevel,
        showSource,
        showCurrentHealth
      });
    }
    return child;
  })
  return (
    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead >
            <TableRow>
              {showName && <TableCell>Name</TableCell>}
              {showClass && <TableCell>Class</TableCell>}
              {showLevel && <TableCell>Level</TableCell>}
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Health'/></TableCell>
              {showItemSlots && <TableCell>Items</TableCell>}
              <TableCell>Notes</TableCell>
              {showStatus && <TableCell>Status</TableCell>}
              {showCosts && <TableCell>Cost</TableCell>}
              {!isPortrait && showSource && <TableCell>Source</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {clonedChildren}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export function BasicStatTableRow({statsObj, refData, showName, showCosts, showStatus, showItemSlots, showLevel, showSource, showClass, showCurrentHealth }) {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  
  const displayStatus = () => {
    if (statsObj.status === 0) {
        return <b style={{color: 'red'}}>Dead</b>
    } else if (statsObj.status === 2) {
        return <b style={{color: 'gray'}}>Badly Injured</b>
    } else if (statsObj.status === 8) {
        return <b style={{color: 'green'}}>For Hire</b>
    } else if (statsObj.status === 7) {
        return <b style={{color: 'green'}}>Hired</b>
    } else {
        return <b style={{color: 'lightblue'}}>{getStatusFromId(statsObj.status, refData)}</b>
    }
  }

  const displayHealth = () => {
    if (statsObj.currentHealth === 0) {
        return <b style={{color: 'red'}}>Dead</b>
    } else {
        return statsObj.currentHealth
    }
  }

  return (
    <TableRow>
      {showName && <TableCell>{statsObj.name}</TableCell>}
      {showClass && <TableCell>{statsObj.class}</TableCell>}
      {showLevel && <TableCell>{statsObj.level}</TableCell>}
      <TableCell sx={{textAlign: 'center'}}>{statsObj.move}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.fight)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.shoot)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{statsObj.armor}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.will)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{statsObj.health}</TableCell>
      {showItemSlots && 
        <TableCell sx={{textAlign: 'left'}}>
          {statsObj.itemSlots.map((itemId, index) => (
            <p key= {'Item' + index}>{itemId !== 0 ? getItemFromId(itemId, refData).name : ''}</p>
          ))}
        </TableCell>
      }
      <TableCell>{statsObj.notes}</TableCell>
      {showStatus && <TableCell>{displayStatus()}</TableCell>}
      {showCosts && <TableCell>{showCosts && `${statsObj.cost > 0 ? `${statsObj.cost} gc` : 'Free'}`}</TableCell>}
      {!isPortrait && showSource && <TableCell>{statsObj.source}</TableCell>}
    </TableRow>
  )
}

export function OLDBasicStatTableRow({name, stats, refData, showCosts=false, showStatus=true, showItemSlots=true, showLevel=false, showSource=false, showClass = true,editMode=false }) {
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');
  
  const ShowStatus = () => {

    if (stats.status === 0) {
        return <b style={{color: 'red'}}>Dead</b>
    } else if (stats.status === 2) {
        return <b style={{color: 'gray'}}>Badly Injured</b>
    } else if (stats.status === 8) {
        return <b style={{color: 'green'}}>For Hire</b>
    } else if (stats.status === 7) {
        return <b style={{color: 'green'}}>Hired</b>
    } else {
        return <b style={{color: 'lightblue'}}>{getStatusFromId(stats.status, refData)}</b>
    }
  }

  return (
    <TableRow>
      {name && <TableCell>{name}</TableCell>}
      {showClass && <TableCell>{stats.class}</TableCell>}
      {showLevel && <TableCell>{stats.level}</TableCell>}
      <TableCell sx={{textAlign: 'center'}}>{stats.move}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(stats.fight)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(stats.shoot)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{stats.armor}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(stats.will)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{stats.health}</TableCell>
      {showItemSlots && 
        <TableCell sx={{textAlign: 'left'}}>
          {stats.itemSlots.map((itemId, index) => (
            <p key= {'Item' + index}>{itemId !== 0 ? getItemFromId(itemId, refData).name : ''}</p>
          ))}
        </TableCell>
      }
      <TableCell>{stats.notes}</TableCell>
      {showStatus && <TableCell>{ShowStatus(stats)}</TableCell>}
      {showCosts && <TableCell>{showCosts && `${stats.cost > 0 ? `${stats.cost} gc` : 'Free'}`}</TableCell>}
      {!isPortrait && showSource && <TableCell>{stats.source}</TableCell>}
    </TableRow>
  )
}

export function BasicSpellCard({spellId, refData, titlebar=true, castnum=false, spellSchoolMod=false}) {
  const spellViewObj = getSpellFromId(spellId, refData)

  return (
    <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <Table >
        <TableHead >
            {titlebar && 
            <TableRow>
             <TableCell colSpan={castnum ? 4 : 3} sx={{ textAlign: 'center'}}>
              <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
            </TableCell>
          </TableRow>}
        </TableHead>
        <TableBody sx={{ '& td': { textAlign: 'center' } }}>
          <TableRow>
            <TableCell>{spellViewObj.school}</TableCell>
            {castnum && <TableCell>Cast Number: {castnum}</TableCell>}
            <TableCell>Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>
            <TableCell>{spellViewObj.category}</TableCell>
          </TableRow>
          <TableRow className='spellbook-description'>
            <TableCell colSpan={castnum ? 4 : 3}>{spellViewObj.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export function SearchBar({ searchText, setSearchText, handleSearchFilter, clearSearch }) {
  const handleChange = (e) => {
      const text = e.target.value;
      setSearchText(text);
      handleSearchFilter(text);
  };

  return (
      <TextField
          id="search-bar"
          className="search-bar-root"
          value={searchText}
          onChange={handleChange}
          variant="outlined"
          InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'white' }}/></InputAdornment>,
              endAdornment: (
                  <InputAdornment position="end">
                      <IconButton onClick={clearSearch}>
                          <CancelIcon />
                      </IconButton>
                  </InputAdornment>
              ),
          }}
      />
  );
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
