import React from 'react';
import { useAppContext } from './AppContext.jsx';
import { useState, Fragment } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { getStatusFromId, getSpellFromId, getItemFromId, modSign } from './HelperFunctions.js';
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
    return (
      <>
        <TableRow>
          <TableCell sx={{ width: '33%' }}><img src='src/assets/Game-Icons-net/move.svg' className="stat-icon" alt='Move'/>{statsObj.move}</TableCell>
          <TableCell sx={{ width: '33%' }}><img src='src/assets/Game-Icons-net/axe-sword.svg' className="stat-icon" alt='Fight'/>{modSign(statsObj.fight)}</TableCell>
          <TableCell sx={{ width: '33%' }}><img src='src/assets/Game-Icons-net/high-shot.svg' className="stat-icon" alt='Shoot'/>{modSign(statsObj.shoot)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><img src='src/assets/Game-Icons-net/abdominal-armor.svg' className="stat-icon" alt='Armor'/>{statsObj.armor}</TableCell>
          <TableCell><img src='src/assets/Game-Icons-net/brain.svg' className="stat-icon" alt='Will'/>{modSign(statsObj.will)}</TableCell>
          <TableCell><img src='src/assets/Game-Icons-net/health-normal.svg' className="stat-icon" alt='Health'/>{statsObj.health}</TableCell>
        </TableRow>
      </>
    );
  }

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
                    <TableCell>Level {statsObj.level}</TableCell>
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
                <TableCell>
                  {/* <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  > */}
                    Name
                  {/* </TableSortLabel> */}
                </TableCell>}
              {showClass && 
                <TableCell>
                  {/* <TableSortLabel
                    active={orderBy === 'class'}
                    direction={orderBy === 'class' ? order : 'asc'}
                    onClick={() => handleRequestSort('class')}
                  > */}
                    Class
                  {/* </TableSortLabel> */}
                </TableCell>}
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
              {showSource && <TableCell>Source</TableCell>}
              {editMode && <TableCell>Action</TableCell>}
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

  return (
    <TableRow>
      {showName && <TableCell sx={{textAlign: 'left'}}>{statsObj.name}</TableCell>}
      {showClass && <TableCell sx={{textAlign: 'left'}}>{statsObj.class}</TableCell>}
      {showLevel && <TableCell>{statsObj.level}</TableCell>}
      <TableCell sx={{textAlign: 'center'}}>{statsObj.move}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.fight)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.shoot)}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{statsObj.armor}</TableCell>
      <TableCell sx={{textAlign: 'center'}}>{modSign(statsObj.will)}</TableCell>
      {!showDamage && <TableCell sx={{textAlign: 'center'}}>{statsObj.health}</TableCell>}
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
                justifyContent: 'right', 
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
  } else if (currentHealth === statsObj.health) {
    healthColor = 'green';
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
                justifyContent: 'right', 
                width: '100%' 
              }}
      >
        <b style={{ color: healthColor}}>{currentHealth}</b>
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