import React, { useState } from 'react';
import modSign from '../helperFuncs/modSign';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useMediaQuery } from '@mui/material';
import calcEquipmentMods from '../helperFuncs/calcEquipmentMods.js';
import { getStatusFromId, getItemFromId } from '../helperFuncs/HelperFunctions.js';

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