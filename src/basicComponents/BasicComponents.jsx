import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useState, Fragment } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { getStatusFromId, getSpellFromId, getItemFromId, modSign } from '../helperFuncs/HelperFunctions.js';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, InputAdornment, Button, useMediaQuery } from "@mui/material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


export function BasicStatCard({ 
                    statsObj,  
                    showCosts=false, 
                    showStatus=false, 
                    showItemSlots=false, 
                    showLevel=false, 
                    battleMode=false, 
                    editMode=false }) {
  const { refData } = useAppContext();
  const [ fullCard, setFullCard ] = useState(!battleMode);
  const [ currentHealth, setCurrentHealth ] = useState(statsObj.health);

  // mainly used for references page, combines permanent items for soldiers with their one slot
  let items = [];
  if (!statsObj.itemSlots && statsObj.permItemSlots) {
    items = [...statsObj.permItemSlots];
  } else if (statsObj.itemSlots) {
    items = [...statsObj.itemSlots];
  }
  // end

  const StatsLine = () => {
    
    calcEquipmentMods(statsObj, refData);

    return (
      <>
        <TableRow>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move'/> 
              {statsObj.statMods ? statsObj.statMods.move + statsObj.move : statsObj.move}
            </Box>
          </TableCell>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight'/> 
              {modSign(statsObj.statMods ? statsObj.statMods.fight + statsObj.fight : statsObj.fight)}
            </Box>
          </TableCell>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot'/> 
              {modSign(statsObj.statMods ? statsObj.statMods.shoot + statsObj.shoot : statsObj.shoot)}
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor'/>
              {statsObj.statMods ? statsObj.statMods.armor + statsObj.armor : statsObj.armor}
            </Box>
          </TableCell>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will'/>
              {modSign(statsObj.statMods ? statsObj.statMods.will + statsObj.will : statsObj.will)}
            </Box>
          </TableCell>
          <TableCell sx={{ width: '33%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Health'/> 
              {statsObj.statMods ? statsObj.statMods.health + statsObj.health : statsObj.health}
            </Box>
          </TableCell>
        </TableRow>
      </>
    );
  }

  function handleChange(type) {
    const max = statsObj.statMods.health ? statsObj.statMods.health + statsObj.health : statsObj.health

    if (type === '-') {
      if (currentHealth > 0) {
        setCurrentHealth(currentHealth - 1);
      }
    } else if (type === '+') {
      if (currentHealth < max) {
        setCurrentHealth(currentHealth + 1);
      }
    }
  }
  
  return (
    <div className="stat-card">
      <Paper className="generic-paper" sx={{ '& table': { width: '100%' }, display: 'flex', flexDirection: 'column', alignItems : 'center', overflow: 'hidden'}}>
        <TableContainer>
          <Table className="stat-block-card" size='small'>
            {statsObj.name &&
              <TableHead >
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <h3>
                          {statsObj.name} {statsObj.status !== 1 && showStatus && (
                            <>
                              {' ('}
                              <DisplayStatus statsObj={statsObj} refData={refData} />
                              {')'}
                            </>
                          )}
                        </h3>
                      </Box>
                      {battleMode && (
                        <Button onClick={() => setFullCard(!fullCard)} sx={{ justifyContent:'right' }}>
                          {fullCard ? <MdExpandLess size= "2em"/> : <MdExpandMore size="2em"/>}
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
            }
            {!statsObj.name &&
              <TableHead >
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: showCosts ? 'space-between' : 'center' }}>
                    <h3>{statsObj.class ? statsObj.class : ''} {statsObj.status !== 1 && showStatus ? `(${getStatusFromId(statsObj.status, refData)})` : ''}</h3>
                    {showCosts && 
                      <span>
                        {statsObj.cost > 0 ? `${statsObj.cost} gc` : 'Free'}
                      </span>
                    }
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
            }
            <TableBody >
              {statsObj.name && 
                <TableRow>
                  <TableCell colSpan={showLevel ? 2 : 3} sx={{textAlign: 'left'}}>
                    {!battleMode && statsObj.class}
                    {battleMode && 
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        {statsObj.class}
                        <HealthCounter statsObj={statsObj} currentHealth={currentHealth} handleChange={handleChange} />
                      </Box>
                    }
                  </TableCell>
                  {!showLevel && showCosts &&
                    <TableCell>{statsObj.cost > 0 ? `${statsObj.cost} gc` : 'Free'}</TableCell>
                  }
                  {showLevel && 
                    <TableCell>Level {statsObj.level > 0 ? statsObj.level : 0}</TableCell>
                  }
                </TableRow>
              }
              {fullCard &&
                <>
                  <StatsLine />
                  { showItemSlots && items.length > 0 &&
                    <TableRow>
                      <TableCell colSpan={3} sx={{textAlign: 'center'}}>
                        <p>
                          {items
                            .map((itemId) => itemId !== 0 ? getItemFromId(itemId, refData).name : null)
                            .filter(itemName => itemName !== null)
                            .join(', ')}
                        </p>
                      </TableCell>
                    </TableRow>
                  }
                  { statsObj.notes &&
                    <TableRow>
                      <TableCell colSpan={3}>{statsObj.notes}</TableCell>
                    </TableRow>
                  }
                </>
              } 
            </TableBody>
          </Table>
        </TableContainer >
      </Paper>
    </div>
  )
}

export function BasicStatTableHeader({children, showName=false, showClass = false, showCosts=false, showStatus=false, showItemSlots=false, showLevel=false, showSource=false, showDamage=false, editMode=false, cloning=true }) {
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('name');
  const isLandscape = useMediaQuery('(max-width: 768px) and (orientation: landscape)');
  
  if (showSource) {
    if (isLandscape) {
      showSource = false;
    }
  }
  
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
        showDamage,
        editMode
      });
    }
    return child;
  })

  // const handleRequestSort = (property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

    // data needs to be defined maybe thorugh a useState outside of this function to coordinate the tablerows
  // const sortedData = data.sort((a, b) => {
  //   if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
  //   if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
  //   return 0;
  // });

  return (
    <Paper className="generic-paper" sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead >
            <TableRow>
              {showName && 
                <TableCell sx={{textAlign: 'left'}}>
                  {/* <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  > */}
                    Name
                  {/* </TableSortLabel> */}
                </TableCell>}
              {showClass && 
                <TableCell sx={{textAlign: 'left'}}>
                  {/* <TableSortLabel
                    active={orderBy === 'class'}
                    direction={orderBy === 'class' ? order : 'asc'}
                    onClick={() => handleRequestSort('class')}
                  > */}
                    Class
                  {/* </TableSortLabel> */}
                </TableCell>}
              {showLevel && <TableCell sx={{textAlign: 'center'}}>Level</TableCell>}
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will'/></TableCell>
              <TableCell sx={{textAlign: 'center'}}><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Health'/></TableCell>
              {showItemSlots && <TableCell sx={{textAlign: 'left'}}>Items</TableCell>}
              <TableCell>Notes</TableCell>
              {showStatus && <TableCell sx={{textAlign: 'left'}}>Status</TableCell>}
              {showCosts && <TableCell sx={{textAlign: 'left'}}>Cost</TableCell>}
              {showSource && <TableCell sx={{textAlign: 'left'}}>Source</TableCell>}
              {editMode && <TableCell sx={{textAlign: 'left'}}>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {cloning ? clonedChildren: children}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}



export function BasicStatTableRow({statsObj, showName, showCosts, showStatus, showItemSlots, showLevel, showSource, showClass, showDamage, editMode }) {
  const { refData } = useAppContext();
  const [ currentHealth, setCurrentHealth ] = useState(statsObj.health);
  
  function handleChange(type, max=statsObj.health) {
    if (type === '-') {
      if (currentHealth > 0) {
        setCurrentHealth(currentHealth - 1);
      }
    } else if (type === '+') {
      if (currentHealth < max) {
        setCurrentHealth(currentHealth + 1);
      }
    }
  }
  // used in references page
  let items = [];
  if (!statsObj.itemSlots && statsObj.permItemSlots) {
    items = [...statsObj.permItemSlots];
  } else if (statsObj.itemSlots) {
    items = [...statsObj.itemSlots];
  }

  calcEquipmentMods(statsObj, refData);

  return (
    <TableRow>
      {showName && <TableCell sx={{textAlign: 'left'}}>{statsObj.name}</TableCell>}
      {showClass && <TableCell sx={{textAlign: 'left'}}>{statsObj.class}</TableCell>}
      {showLevel && <TableCell sx={{textAlign: 'center'}}>{statsObj.level > 0 ? statsObj.level : 0}</TableCell>}
      <TableCell sx={{textAlign: 'center'}}>{statsObj.move + (statsObj.statMods ? statsObj.statMods.move : 0)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.fight + (statsObj.statMods ? statsObj.statMods.fight : 0))}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.shoot + (statsObj.statMods ? statsObj.statMods.shoot : 0))}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{statsObj.armor + (statsObj.statMods ? statsObj.statMods.armor : 0)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.will + (statsObj.statMods ? statsObj.statMods.will : 0))}</TableCell>
      {!showDamage && <TableCell sx={{textAlign: 'center'}}>{statsObj.health + (statsObj.statMods ? statsObj.statMods.health : 0)}</TableCell>}
      {showDamage && <TableCell sx={{textAlign: 'center'}}><HealthCounter statsObj={statsObj} currentHealth={currentHealth} handleChange={handleChange}/></TableCell>}
      {showItemSlots && 
        <TableCell sx={{textAlign: 'left'}}>
          <p>
            { 
              items
                .map((itemId) => itemId !== 0 ? getItemFromId(itemId, refData).name : null)
                .filter(itemName => itemName !== null)
                .join(', ')
            }
          </p>
        </TableCell>
        
      }
      <TableCell sx={{textAlign: showItemSlots && statsObj.notes ? 'center' :'left'}}>
        {showItemSlots && statsObj.notes ?
          <Tooltip title={statsObj.notes}>
            <img
                src="src/assets/Game-Icons-net/stabbed-note.svg"
                className="stat-icon"
                alt="Notes Icon"
            />
          </Tooltip> :
        statsObj.notes}
      </TableCell>
      {showStatus && <TableCell><DisplayStatus statsObj={statsObj} refData={refData} /></TableCell>}
      {showCosts && <TableCell>{showCosts && `${statsObj.cost > 0 ? `${statsObj.cost}gc` : 'Free'}`}</TableCell>}
      {showSource && <TableCell>{statsObj.source}</TableCell>}
    </TableRow>
  )
}

export function BasicSpellCard({spellId, refData, titlebar=true, castnum=false, spellSchoolMod=false}) {
  const spellViewObj = getSpellFromId(spellId, refData)
  const isPortrait = useMediaQuery('(max-width: 768px) and (orientation: portrait)');

  if (isPortrait) {
    return (
      <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        <Table >
          <TableHead >
              {titlebar && 
                <TableRow>
                <TableCell colSpan={castnum ? 4 : 3} sx={{ textAlign: 'center'}}>
                  <h2>{spellViewObj.name}</h2>
                </TableCell>
              </TableRow>}
              {!titlebar &&
                <TableRow>
                  <TableCell colSpan={castnum ? 4 : 3} sx={{ textAlign: 'center'}}>
                    <h3>School: {spellViewObj.school}</h3>
                  </TableCell>
                </TableRow>
              }
          </TableHead>
          <TableBody sx={{ '& td': { textAlign: 'center', flex: 1 } }}>
            <TableRow>
              {titlebar && <TableCell sx={{ width: '50%' }}>{spellViewObj.school}</TableCell>}
              {!castnum && <TableCell sx={{ width: '50%'}}>Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>}
              <TableCell sx={{ width: '50%' }}>{spellViewObj.category}</TableCell>
            </TableRow>
            {castnum && 
              <TableRow>
                <TableCell sx={{ width: '50%' }}>Cast Number: {castnum}</TableCell>
                <TableCell sx={{ width: '50%' }}>Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>
              </TableRow>
            }
            <TableRow>
              <TableCell colSpan={castnum ? 2 : 3}>{spellViewObj.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <Table size='small' >
        <TableHead >
          {titlebar && 
            <TableRow>
              <TableCell sx={{ textAlign: 'center', width: '25%'}}>
                <h2>{spellViewObj.name ? spellViewObj.name : '--'}</h2>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', width: '75%'}}>Description</TableCell>
            </TableRow>
          }
          {!titlebar && 
            <TableRow>
              <TableCell sx={{ textAlign: 'center', width: '25%'}}></TableCell>
              <TableCell sx={{ textAlign: 'center', width: '75%'}}>Description</TableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody sx={{ '& td': { textAlign: 'left'} }}>
          <TableRow>
            <TableCell sx={{ width: '25%' }}>School: {spellViewObj.school}</TableCell>
            <TableCell rowSpan={4} sx={{ width: '75%' }}>{spellViewObj.description}</TableCell>
          </TableRow>
          {castnum && 
            <TableRow>
              <TableCell >Cast Number: {castnum}</TableCell>
            </TableRow>
          }
          <TableRow>
            <TableCell >Base Cast: {spellViewObj.base_cast} {spellSchoolMod ? `(+${spellSchoolMod})` : ''}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell >Category: {spellViewObj.category}</TableCell>
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


export function BasicAccordian({title, children}) {
  return (
    <Accordion sx={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', color: 'white' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }}/>} aria-controls={`${title}-info`}>
          <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
          {children}
      </AccordionDetails>
    </Accordion>
  )
}

export function HealthCounter({statsObj, currentHealth, handleChange}) {
  if (statsObj.status === 0 || statsObj.status === 2) {
    return  <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%' 
              }}
            >
              <b style={{color: 'gray'}}>
                Inactive
              </b>
            </Box>
  }

  let healthColor = 'inherit';
  if (currentHealth === 0) {
    healthColor = 'red';
  } else if (currentHealth === statsObj.statMods ? statsObj.statMods.health + statsObj.health : statsObj.health) {
    healthColor = 'green';
  }

  return (
    <Box sx={{ display: 'flex', gap:0 }}>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleChange('-')}
      >
        <ArrowLeftIcon />
      </IconButton>
      <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%',
                padding: '0px 0px 0px 0px',
              }}
      >
        <b style={{ color: healthColor }}>{currentHealth}</b>
      </Box>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleChange('+')}

      >
        <ArrowRightIcon />
      </IconButton>
    </ Box>
  )
}

export function DisplayStatus({ statsObj, refData }) {
  if (statsObj.status === 0) {
      return <b style={{color: 'red'}}>Dead</b>
  } else if (statsObj.status === 2) {
      return <b style={{color: 'gray'}}>Badly Injured</b>
  } else if (statsObj.status === 8) {
      return <b style={{color: 'green'}}>For Hire</b>
  } else if (statsObj.status === 7) {
      return <b style={{color: 'darkgreen'}}>Hired</b>
  } else {
      return <b style={{color: 'lightblue'}}>{getStatusFromId(statsObj.status, refData)}</b>
  }
}

export function calcEquipmentMods(statsObj, refData) {
  if (statsObj.statMods) {
    // reset to 0s
    for (let key in statsObj.statMods) {
      if (statsObj.statMods.hasOwnProperty(key)) {
        statsObj.statMods[key] = 0;
      }
    }

    // calculate mods
    statsObj.itemSlots.forEach((itemId) => {
      const itemObj = getItemFromId(itemId, refData);
      if (itemObj.moveMod) {
        statsObj.statMods.move += itemObj.moveMod;
      }
      if (itemObj.armorMod) {
        statsObj.statMods.armor += itemObj.armorMod;
      }
      if (itemObj.fightMod) {
        statsObj.statMods.fight += itemObj.fightMod;
      }
      if (itemObj.shootMod) {
        statsObj.statMods.shoot += itemObj.shootMod;
      }
      if (itemObj.willMod) {
        statsObj.statMods.will += itemObj.willMod;
      }
      if (itemObj.healthMod) {
        statsObj.statMods.health += itemObj.healthMod;
      }
    })
  }
}