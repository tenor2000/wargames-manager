import { useAppContext } from './AppContext';
import { useAuth } from './AuthContext';

export function getSpellFromId(spellId, refData) {
  if (!refData || !refData.schoolsOfMagic) {
    return { name: 'Unknown' }; // Default or fallback value
  }
   
  return refData.spells.find(spell => spell.id === spellId)
}
  
export function getSoldierFromId(soldierId, refData) {
  if (!refData || !refData.soldiers) {
    return { name: 'Unknown' }; // Default or fallback value
  }
  soldierId = parseInt(soldierId);
  
  return refData.soldiers.find(soldier => soldier.id === soldierId)
}

export function getSchoolFromId(schoolId, refData) {
  if (!refData || !refData.schoolsOfMagic) {
    return { name: 'Unknown' }; // Default or fallback value
  }

  try {
    schoolId = parseInt(schoolId);
  } catch (error) {
    console.error("Error parsing schoolId:", error);
    return null;
  }

  return refData.schoolsOfMagic.find(school => school.id === schoolId)
}

export function getMyWizardFromId(wizardId, userData) {
  if (!userData || !userData.myWizards) {
    return { name: 'Unknown' }; // Default or fallback value
  }

  return userData.myWizards.find(wizard => wizard.id === wizardId)
}

export function getSchoolFromSpellId(spellId, refData) {
  if (!refData || !refData.schoolsOfMagic) {
    return { name: 'Unknown' }; // Default or fallback value
  }

  const schoolId = Math.floor(spellId / 100)
  console.schoolId

  return refData.schoolsOfMagic.find(school => school.id === schoolId)
}

export const getRandomName = (nameList) => {
  return nameList[Math.floor(Math.random() * nameList.length)];
}

export function deriveApprenticeStats(wizStats, apprentice) {
  return {
    name: apprentice.name,
    class: apprentice.class,
    move: wizStats.move,
    fight: wizStats.fight - 2,
    shoot: wizStats.shoot,
    armor: apprentice.armor,
    will: wizStats.will - 2,
    health: wizStats.health - 2,
    status: apprentice.status,
    itemSlots: apprentice.itemSlots,
    statMods: apprentice.statMods,
    cost: apprentice.cost,
  }
}

export function getStatusFromId(statusId, refData) {
  if (!refData || !refData.statuses) {
    return 'Unknown'; // Default or fallback value
  }

  statusId = parseInt(statusId);

  return refData.statuses[statusId]
}

export const modSign = (stat) => {
  return stat >= 0 ? `+${stat}` : stat;
}

export function getCreatureFromId(creatureId, refData) {
  if (!refData || !refData.creatures) {
    return { name: 'Unknown' }; // Default or fallback value
  }
  return refData.creatures.find(creature => creature.id === creatureId)
}

export function getItemFromId(itemId, refData) {
  if (!refData || !refData.arms && !refData.armor) {
    return { name: 'Unknown' }; // Default or fallback value
  }
  let refList

  if (itemId > 100 && itemId < 200) {
    refList = refData.arms
  } else if (itemId > 200 && itemId < 300) {
    refList = refData.armor
  } else {
    return null
  }

  return refList.find(item => item.id === itemId)
}