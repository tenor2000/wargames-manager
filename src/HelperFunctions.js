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
  const soldier = refData.soldiers.find(soldier => soldier.id === soldierId);

  if (!soldier) {
    return { name: 'Unknown' }; // Default or fallback value
  }
  
  return { ...soldier };
}

export function getRandomSoldier(refData) {
  const soldier = {name: null, status: 8, classId: null, itemSlots: [0]};
  soldier.classId = parseInt(Math.floor(Math.random() * refData.soldiers.length) + 1, 10);
  soldier.name = soldier.classId === 3 ? getRandomName(refData.nameGenerator.animal) : getRandomName(refData.nameGenerator.soldier);

  return soldier
}

export function getSchoolFromId(schoolId, refData) {
  if (!refData || !refData.schoolsOfMagic) {
    return { name: 'Unknown' };
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
    return { name: 'Unknown' };
  }

  return userData.myWizards.find(wizard => wizard.id === wizardId)
}

export function getSchoolFromSpellId(spellId, refData) {
  if (!refData || !refData.schoolsOfMagic) {
    return { name: 'Unknown' };
  }

  const schoolId = Math.floor(spellId / 100)

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

export function getItemFromId(itemId, refData) {
  if (!refData || !refData.arms && !refData.armor) {
    // console.log(refData)
    // console.log(refData.arms)
    // console.log(refData.armor)
    return { name: 'Unknown' }; 
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

export function rollD20() {
  return Math.floor(Math.random() * 20) + 1
}

export function getRandomSpell(refData) {
  if (!refData || !refData.spells) {
    return { name: 'Unknown' }; 
  }
  return refData.spells[Math.floor(Math.random() * refData.spells.length)]
}

export function getCreatureFromId(creatureId, refData) { 
  if (!refData || !refData.creatures) {
    return { name: 'Unknown Creature with ID ' + creatureId };
  }
  return refData.creatures.find(creature => creature.id === creatureId)
}

export function getScenarioFromId(scenarioId, refData) { 
  if (!refData || !refData.scenarios) {
    return { name: 'Unknown Scenario with ID ' + scenarioId }; 
  }
  return refData.scenarios.find(scenario => scenario.id === scenarioId)
}