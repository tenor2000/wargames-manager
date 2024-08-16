function deriveApprenticeStats(wizStats, apprentice) {
    return {
        name: apprentice.name,
        class: apprentice.class,
        level: wizStats.level - 6,
        move: wizStats.move,
        fight: wizStats.fight - 2,
        shoot: wizStats.shoot,
        armor: apprentice.armor,
        will: wizStats.will - 2,
        health: wizStats.health - 2,
        status: apprentice.status,
        itemSlots: apprentice.itemSlots,
        statMods: apprentice.statMods,
        cost: (wizStats.level - 6) * 10 + 160
    }
}

export default deriveApprenticeStats