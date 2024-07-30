function calcEquipmentMods(statsObj, refData) {
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


export default calcEquipmentMods