import calcEquipmentMods from '../helperFuncs/calcEquipmentMods.js';
import { getStatusFromId, getItemFromId } from '../helperFuncs/helperFunctions.js';
import modSign from '../helperFuncs/modSign.js';
import { Box, Button } from "@mui/material";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { HealthCounter } from './HealthCounter.jsx';

function BasicStatCard({ 
            statsObj,  
            showCosts=false, 
            showStatus=false, 
            showItemSlots=false, 
            showLevel=false, 
            battleMode=false, 
            editMode=false 
          }) {

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
  const max = ((statsObj.statMods && statsObj.statMods.health) || 0) + statsObj.health;

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

export default BasicStatCard