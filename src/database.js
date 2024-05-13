const testData = {
    myWizards: [
        {
            id: 1,
            name: 'Ivan the Illusionator',
            apprentice: 'Roy',
            schoolSpells: ['Fool\'s Gold', 'Illusionary Soldier', 'Transpose'],
            alignedSpells: ['Push', 'Heal', 'Wizard Eye'],
            neutralSpells: ['Raise Zombie', 'Leap'],
        },
        {
            id: 2,
            name: 'David the Enchanter',
            apprentice: 'Ted',
            schoolSpells: ['Fool\'s Gold', 'Illusionary Soldier', 'Transpose'],
            alignedSpells: ['Push', 'Heal', 'Wizard Eye'],
            neutralSpells: ['Raise Zombie', 'Leap'],
        },
        {
            id: 3,
            name: 'John the Thaumaturge',
            apprentice: 'Ned',
            schoolSpells: ['Fool\'s Gold', 'Illusionary Soldier', 'Transpose'],
            alignedSpells: ['Push', 'Heal', 'Wizard Eye'],
            neutralSpells: ['Raise Zombie', 'Leap'],
        }
    ],
    spells: [
        {
            id: 101,
            name: 'Crumble',
            school: 'Chronomancer',
            base_cast: 10,
            category: 'line of sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 102,
            name: 'Decay',
            school: 'Chronomancer',
            base_cast: 12,
            category: 'line of sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 201,
            name: 'Call Storm',
            school: 'Elementalist',
            base_cast: 12,
            category: 'line of sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 202,
            name: 'Destructive Sphere',
            school: 'Elementalist',
            base_cast: 12,
            category: 'area of effect',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 301,
            name: 'Animate Construct',
            school: 'Enchanter',
            base_cast: 10,
            category: 'out of game (B)',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 302,
            name: 'Control Construct',
            school: 'Enchanter',
            base_cast: 12,
            category: 'line of sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 401,
            name: 'Beauty',
            school: 'Illusionist',
            base_cast: 10,
            category: 'self only',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 402,
            name: 'Blink',
            school: 'Illusionist',
            base_cast: 12,
            category: 'line of sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
    ],
    schools: [
        {
            id: 0,
            name: 'All',
        },
        {
            id: 1,
            name: 'Chronomancer',
        },
        {
            id: 2,
            name: 'Elementalist',
        },
        {
            id: 3,
            name: 'Enchanter',
        },
        {
            id: 4,
            name: 'Illusionist',
        },
        {
            id: 5,
            name: 'Necromancer',
        },
        {
            id: 6,
            name: 'Sigilist',
        },
        {
            id: 7,
            name: 'Soothsayer',
        },
        {
            id: 8,
            name: 'Summoner',
        },
        {
            id: 9,
            name: 'Thaumaturge',
        },
        {
            id: 10,
            name: 'Witch',
        }
    ]
}

export default testData