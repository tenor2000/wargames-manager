// Eventually will be server side database
// This is just for local testing
// userData from useAuth()
export const userInfoData = {
    myWizards: [
        {
            id: "Be93523XM",
            name: 'Tim',
            classId: 4,
            level: 0,
            health: 14,
            currentHealth: 14,
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 4,
            cost: 0,
            status: 1,
            itemSlots: [101, 0, 0, 0, 0],
            statMods: {
                move: 0,
                fight: 0,
                shoot: 0,
                armor: 0,
                will: 0,
                health: 0
            },
            gold: 400,
            apprentice: {
                name: "Jim",
                class: 'Apprentice',
                status: 1,
                armor: 10,
                itemSlots: [101, 202, 0, 0],
                statMods: {
                    move: 0,
                    fight: 0,
                    shoot: 0,
                    armor: 0,
                    will: 0,
                    health: 0
                },
                cost: 100, // It actually calculated (level-6)*10 + 160
            },
            primarySpellIds: [401, 402, 403],
            alignedSpellIds: [601, 701, 901],
            neutralSpellIds: [101, 301],
            opposedSpellIds: [],
            spellModifiers: {
                401: -1,
            },
            soldiers: [
                {name: 'Julius', status: 1, classId: 1, itemSlots: [0]},
                {name: 'Adam', status: 0, classId: 1, itemSlots: [0]},
                {name: 'Roger', status: 1, classId: 2, itemSlots: [0]},
                {name: 'Todd', status: 2, classId: 2, itemSlots: [0]},
                {name: 'Jeff', status: 1, classId: 4, itemSlots: [0]},
                {name: 'Hank', status: 1, classId: 7, itemSlots: [0]},
                {name: 'George', status: 1, classId: 5, itemSlots: [0]},
                {name: 'Clyde', status: 1, classId: 6, itemSlots: [0]},
            ],
            soldiersLost: 0,
            xp: 0,
            xpSpent: 0,
            vaultItems: [],
            base: 1001,
            currentScenario: null,
            careerHistory: []
        },
        {
            id: "CR9GoS59M",
            name: 'Dave',
            classId: 3,
            level: 4,
            health: 14,
            currentHealth: 14,
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 4,
            cost: 0,
            status: 1,
            itemSlots: [105, 0, 0, 0, 0],
            statMods: {
                move: 0,
                fight: 0,
                shoot: 0,
                armor: 0,
                will: 0,
                health: 0
            },
            gold: 400,
            apprentice: {
                name: "Ted",
                class: 'Apprentice',
                status: 1,
                armor: 10,
                itemSlots: [101, 0, 0, 0],
                statMods: {
                    move: 0,
                    fight: 0,
                    shoot: 0,
                    armor: 0,
                    will: 0,
                    health: 0
                },
                cost: 100,
            },
            primarySpellIds: [301, 302, 303],
            alignedSpellIds: [1001, 601, 201],
            neutralSpellIds: [501, 901],
            opposedSpellIds: [],
            spellModifiers: {
                301: -1
            },
            soldiers: [
                {name: 'Fred', status: 1, classId: 1, itemSlots: [101]},
                {name: 'Sally', status: 0, classId: 1, itemSlots: [0]},
                {name: 'Jimmy', status: 1, classId: 2, itemSlots: [0]},
                {name: 'Ned', status: 2, classId: 2, itemSlots: [0]},
                {name: 'Sue', status: 1, classId: 3, itemSlots: [0]},
                {name: 'Bill', status: 1, classId: 4, itemSlots: [0]},
                {name: 'Joe', status: 1, classId: 7, itemSlots: [0]},
                {name: 'Jack', status: 1, classId: 6, itemSlots: [0]},
            ],
            soldiersLost: 0,
            xp: 400,
            xpSpent: 200,
            vaultItems: [],
            base: 1004,
            currentScenario: null,
            careerHistory: []
        },
        {
            id: "NJ4Go52QS",
            name: 'Homer',
            classId: 10,
            level: 0,
            health: 14,
            currentHealth: 14,
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 4,
            cost: 0,
            status: 1,
            itemSlots: [101, 0, 0, 0, 0],
            statMods: {
                move: 0,
                fight: 0,
                shoot: 0,
                armor: 0,
                will: 0,
                health: 0
            },
            gold: 400,
            apprentice: {
                name: "",
                class: 'Apprentice',
                status: 9,
                armor: 10,
                itemSlots: [0, 0, 0, 0],
                statMods: {
                    move: 0,
                    fight: 0,
                    shoot: 0,
                    armor: 0,
                    will: 0,
                    health: 0
                },
                cost: 100,
            },
            primarySpellIds: [1001, 1002, 1003],
            alignedSpellIds: [301, 501, 802],
            neutralSpellIds: [101, 201],
            opposedSpellIds: [],
            spellModifiers: {

            },
            soldiers: [

            ],
            soldiersLost: 0,
            xp: 0,
            xpSpent: 0,
            vaultItems: [],
            base: 1003,
            currentScenario: null,
            careerHistory: []
        },
    ],
    myCampaigns: [
        {
            id: 1,
            name: 'Return of the Wizard',
            wizardId: "Be93523XM",
            scenarios: [
                { 
                    id: 1, 
                    scenarioId: 101, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'complete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
                { 
                    id: 2, 
                    scenarioId: 102, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'complete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
                { 
                    id: 3, 
                    scenarioId: 103, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'incomplete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
            ],
        },
        {
            id: 2,
            name: 'Frozen Throne',
            wizardId: "CR9GoS59M",
            scenarios: [
                { 
                    id: 1,
                    scenarioId: 106, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'complete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
                { 
                    id: 2, 
                    scenarioId: 107, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'complete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
                { 
                    id: 3, 
                    scenarioId: 108, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'in progress',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
                { 
                    id: 4, 
                    scenarioId: 109, 
                    opponents: [{ playerId: 1 }],
                    completionStatus: 'incomplete',
                    createDate: '2023-04-01T00:00:00.000Z',
                    completeDate: '2023-04-08T00:00:00.000Z'
                },
            ],
        }
    ],
    myRecord: {
        wins: 0,
        losses: 0,
    },
    myPreferences: {
        theme: 'dark',
    }
}





// referenceData is deprecated and no longer in use. 
export const referenceData = {
    arms: [
        {
            id: 101,
            name: 'Dagger',
            damageMod: -1,
            maxRange: '--',
            notes: 'First dagger does not take up an item slot.',
            source: 'Core Rulebook'
        },
        {
            id: 102,
            name: 'Hand Weapon',
            damageMod: '--',
            maxRange: '--',
            notes: '--',
            source: 'Core Rulebook'
        },
        {
            id: 103,
            name: 'Two-Handed Weapon',
            damageMod: 2,
            maxRange: '--',
            notes: 'Takes up two item slots.',
            source: 'Core Rulebook'
        },
        {
            id: 104,
            name: 'Staff',
            damageMod: -1,
            maxRange: '--',
            notes: '-1 damage modifier to opponent in hand-to-hand combat',
            source: 'Core Rulebook'
        },
        {
            id: 105,
            name: 'Bow',
            damageMod: '--',
            maxRange: 24,
            notes: 'Load and fire as a single action; must have a quiver',
            source: 'Core Rulebook'
        },
        {
            id: 106,
            name: 'Crossbow',
            damageMod: 2,
            maxRange: 24,
            notes: 'Load and fire as separate actions; may reload in place of movement; must have a quiver',
            source: 'Core Rulebook'
        },
        {
            id: 107,
            name: 'Unarmed',
            damageMod: -2,
            maxRange: '--',
            notes: '-2 Fight.',
            source: 'Core Rulebook'
        }
    ],
    armor: [
        {
            id: 201,
            name: 'Shield',
            armorMod: 1,
            notes: 'May not be carried with a two-handed weapon or staff',
            source: 'Core Rulebook'
        },
        {
            id: 202,
            name: 'Light Armor',
            armorMod: 1,
            notes: '--',
            source: 'Core Rulebook'
        },
        {
            id: 203,
            name: 'Heavy Armor',
            armorMod: 2,
            notes: '-1 Move',
            source: 'Core Rulebook'
        }
    ],
    baseLocations: [
        {
            id: 1001, 
            name: 'Inn',
            effects: 'This old inn has plenty of room to house soldiers and their gear. The wizard may keep an extra soldier in their warband. This soldier can be a specialist. However, this extra soldier cannot be used in a game and must remain in the base. Even with an inn, a wizard is still limited to eight soldiers in a game, with a maximum of four specialists. The wizard may change which soldier is left in the inn each game, which is useful if a soldier must miss a game due to injury.',
            source: 'Core Rulebook'
        },
        {
            id: 1002, 
            name: 'Temple',
            effects: 'The ruins of this once-holy building still project an aura of calm. Spellcasters receive a +3 bonus to any castings of Miraculous Cure. Furthermore, roll a die after each game: on a 16+ they gain a free potion of healing (page 91).',
            source: 'Core Rulebook'
        },
        {
            id: 1003, 
            name: 'Crypt',
            effects: 'It\'s not the most comfortable place to sleep, but it is full of \'supplies\'. Spellcasters receive a +2 bonus on all Raise Zombie and Animate Skull spells, regardless if the spell is cast during a game or Out of Game.',
            source: 'Core Rulebook'
        },
        {
            id: 1004, 
            name: 'Tower',
            effects: 'This half-ruined spire allows the wizard to get closer to the heavens and to clear their mind. The tower grants a +2 bonus to all Casting Rolls for Reveal Secret and Awareness.',
            source: 'Core Rulebook'
        },
        {
            id: 1005, 
            name: 'Treasury',
            effects: 'This treasury has remained relatively untouched and many of its vaults are still sealed. After each game, the warband may attempt to open a vault. Roll one die. If the result is 2-16 add that many gold crowns to the warband\'s treasury. If a 17-18 is rolled, add 100gc to that number. If a 19-20 is rolled, the warband finds a treasure - determine the nature of this treasure in the same way as rolling for a treasure token secured during a game.',
            source: 'Core Rulebook'
        },
        {
            id: 1006, 
            name: 'Brewery',
            effects: 'There is still some life left in those old casks, and the warband takes full advantage. All soldiers start each game with +1 Will. Furthermore, the warband gains an additional 20gc after each game through the sale of excess stock.',
            source: 'Core Rulebook'
        },
        {
            id: 1007, 
            name: 'Library',
            effects: 'This is one of the many libraries scattered throughout the city. The volumes contained within this one have fallen to the ravages of weather and time. A few valuable texts have survived, however. After each game the warband may roll one die. On a 15-18, they find a random scroll. On a 19-20 they discover a random grimoire.',
            source: 'Core Rulebook'
        },
        {
            id: 1008, 
            name: 'Laboratory',
            effects: 'A mostly intact residence of a wizard from long ago. It is still filled with their notes and experiments. A wizard gains 20 experience points after each game from what they learn in the house. This does not count against the 300 experience point maximum for each game.',
            source: 'Core Rulebook'
        }
    ],
    baseResources: [
        {
            id: 2001,
            name: 'Kennel',
            effects: 'Allows a wizard to keep one war hound or wolf (Animal Companion) in their warband above their normal soldier limit. Thus, a wizard may bring eight soldiers plus one war hound/wolf to each game.',
            cost: 400,
            source: 'Core Rulebook'
        }
        
    ],
    creatures: [
        {
            id: 1,
            name: 'Bear',
            type: 'Animal',
            move: 6,
            fight: 4,
            shoot: 0,
            will: 0,
            armor: 12,
            health: 14,
            notes: 'Animal, Large, Strong',
            source: 'Core Rulebook'
        },
        {
            id: 2,
            name: 'Boar',
            type: 'Animal',
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 12,
            will: 2,
            health: 8,
            notes: 'Animal, Bounty (10gc), Horns (technically, tusks)',
            source: 'Core Rulebook'
        },
        {    
            id: 3,
            name: 'Giant Rat',
            type: 'Animal',
            move: 6,
            fight: 0,
            shoot: 0,
            armor: 6,
            will: 0,
            health: 1,
            notes: 'Animal, Pack Hunter',
            source: 'Core Rulebook'
        },
        {
            id: 4,
            name: 'Ice Spider',
            type: 'Animal',
            move: 6,
            fight: 1,
            shoot: 0,
            armor: 8,
            will: 0,
            health: 4,
            notes: 'Animal, Expert Climber, Poison',
            source: 'Core Rulebook'
        },
        {
            id: 5,
            name: 'Ice Toad',
            type: 'Animal',
            move: 4,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 0,
            health: 5,
            notes: 'Amphibious, Animal, Powerful',
            source: 'Core Rulebook'
        },
        {
            id: 6,
            name: 'Snow Leopard',
            type: 'Animal',
            move: 8,
            fight: 3,
            shoot: 0,
            armor: 10,
            will: 2,
            health: 10,
            notes: 'Animal, Expert Climber',
            source: 'Core Rulebook'
        },
        {
            id: 7,
            name: 'White Gorilla',
            type: 'Animal',
            move: 6,
            fight: 4,
            shoot: 0,
            armor: 12,
            will: 8,
            health: 14,
            notes: 'Animal, Strong',
            source: 'Core Rulebook'
        },
        {
            id: 8,
            name: 'Wild Dog',
            type: 'Animal',
            move: 8,
            fight: 0,
            shoot: 0,
            armor: 8,
            will: 0,
            health: 4,
            notes: 'Animal, Pack Hunter',
            source: 'Core Rulebook'
        },
        {
            id: 9,
            name: 'Wolf',
            type: 'Animal',
            move: 8,
            fight: 1,
            shoot: 0,
            armor: 10,
            will: 0,
            health: 6,
            notes: 'Animal, Pack Hunter',
            source: 'Core Rulebook'
        },
        {
            id: 10,
            name: 'Small Construct',
            type: 'Construct',
            move: 6,
            fight: 1,
            shoot: 0,
            armor: 11,
            will: 0,
            health: 10,
            notes: 'Construct',
            source: 'Core Rulebook'
        },
        {
            id: 11,
            name: 'Medium Construct',
            type: 'Construct',
            move: 5,
            fight: 3,
            shoot: 0,
            armor: 12,
            will: 0,
            health: 12,
            notes: 'Construct',
            source: 'Core Rulebook'
        },
        {
            id: 12,
            name: 'Large Construct',
            type: 'Construct',
            move: 4,
            fight: 4,
            shoot: 0,
            armor: 13,
            will: 0,
            health: 14,
            notes: 'Construct, Large, Strong',
            source: 'Core Rulebook'
        },
        {
            id: 13,
            name: 'Imp',
            type: 'Demon',
            move: 6,
            fight: 1,
            shoot: 0,
            armor: 10,
            will: 4,
            health: 6,
            notes: 'Demon',
            source: 'Core Rulebook'
        },
        {
            id: 14,
            name: 'Minor Demon',
            type: 'Demon',
            move: 6,
            fight: 3,
            shoot: 0,
            armor: 11,
            will: 4,
            health: 12,
            notes: 'Demon',
            source: 'Core Rulebook'
        },
        {
            id: 15,
            name: 'Major Demon',
            type: 'Demon',
            move: 6,
            fight: 5,
            shoot: 0,
            armor: 12,
            will: 6,
            health: 15,
            notes: 'Demon, Large, Strong, True Sight',
            source: 'Core Rulebook'
        },
        {
            id: 16,
            name: 'Frost Giant',
            type: 'Misc',
            move: 6,
            fight: 5,
            shoot: 0,
            armor: 15,
            will: 4,
            health: 25,
            notes: 'Elemental Resistance (2), Large, Strong',
            source: 'Core Rulebook'
        },
        {
            id: 17,
            name: 'Giant Worm',
            type: 'Misc',
            move: 7,
            fight: 4,
            shoot: 0,
            armor: 10,
            will: 5,
            health: 20,
            notes: 'Burrowing, Large',
            source: 'Core Rulebook'
        },
        {
            id: 18,
            name: 'Snow Troll',
            type: 'Misc',
            move: 4,
            fight: 4,
            shoot: 0,
            armor: 14,
            will: 2,
            health: 16,
            notes: 'Large, Strong',
            source: 'Core Rulebook'
        },
        {
            id: 19,
            name: 'Werewolf',
            type: 'Misc',
            move: 7,
            fight: 4,
            shoot: 0,
            armor: 11,
            will: 5,
            health: 12,
            notes: 'Bounty (20gc), Expert Climber',
            source: 'Core Rulebook'
        },
        {
            id: 20,
            name: 'Armoured Skeleton',
            type: 'Undead',
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 12,
            will: 0,
            health: 1,
            notes: 'Pack Hunter, Undead',
            source: 'Core Rulebook'
        },
        {
            id: 21,
            name: 'Animated Skull',
            type: 'Undead',
            move: 3,
            fight: 0,
            shoot: 0,
            armor: 10,
            will: -2,
            health: 1,
            notes: 'Levitate, Undead',
            source: 'Core Rulebook'
        },
        {
            id: 22,
            name: 'Ghoul',
            type: 'Undead',
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 2,
            health: 10,
            notes: 'Undead',
            source: 'Core Rulebook'
        },
        {
            id: 23,
            name: 'Skeleton',
            type: 'Undead',
            move: 6,
            fight: 1,
            shoot: 0,
            armor: 10,
            will: 0,
            health: 1,
            notes: 'Undead',
            source: 'Core Rulebook'
        },
        {
            id: 24,
            name: 'Skeleton Archer',
            type: 'Undead',
            move: 6,
            fight: 0,
            shoot: 0,
            armor: 10,
            will: 0,
            health: 1,
            notes: 'Undead, Bow',
            source: 'Core Rulebook'
        },
        {
            id: 25,
            name: 'Vampire',
            type: 'Undead',
            move: 7,
            fight: 4,
            shoot: 0,
            armor: 12,
            will: 5,
            health: 14,
            notes: 'Immune to Normal Weapons, Magic Attack, Mind Lock, True Sight, Undead',
            source: 'Core Rulebook'
        },
        {
            id: 26,
            name: 'Wraith',
            type: 'Undead',
            move: 6,
            fight: 2,
            shoot: 0,
            armor: 10,
            will: 3,
            health: 6,
            notes: 'Energy Drain, Ethereal, Immune to Normal Weapons, Magic Attack, Undead',
            source: 'Core Rulebook'
        },
        {
            id: 27,
            name: 'Zombie',
            type: 'Undead',
            move: 4,
            fight: 1,
            shoot: 0,
            armor: 12,
            will: 0,
            health: 6,
            notes: 'Undead',
            source: 'Core Rulebook'
        }
    ],
    randomEncounterTable: [
        {
            id: 1,
            name: 'Level 1 Encounter',
            source: 'Core Rulebook',
            rollResults: [
                [/*id, amount*/], // 0 is always empty
                [23, 1], //skeleton
                [23, 2], //skeleton
                [20, 1], //armoured skeleton
                [27, 1], //zombie
                [27, 2], //zombie
                [22, 1], //ghoul
                [1, 1], //bear
                [2, 1], //boar
                [3, 1], //Giant Rat
                [3, 2], //Giant Rat
                [3, 4], //Giant Rat
                [4, 1], //Ice Spider
                [6, 1], //Snow Leopard
                [8, 1], //Wild Dog
                [8, 2], //Wild Dog
                [9, 1], //Wolf
                [9, 2], //Wolf
                [10, 1], //Small Construct
                [13, 1], //imp
                [5, 1] //ice toad
            ]
        },
        {
            id: 2,
            name: 'Level 2 Encounter',
            source: 'Core Rulebook',
            rollResults: [
                [/*creature id, amount*/],
                [20, 2], //armoured skeleton
                [22, 1], //ghoul
                [22, 2], //ghoul
                [26, 1], //wraith
                [1, 1], //bear
                [1, 1], //bear
                [2, 1], //boar
                [2, 1], //boar
                [4, 1], //ice spiders
                [4, 2], //ice spiders
                [6, 1], //Snow Leopard
                [7, 1], //white gorilla
                [9, 2], //wolf
                [11, 1], //medium construct
                [14, 1], //minor demon
                [5, 1], //ice toad
                [5, 2], //ice toad
                [18, 1], //snow troll
                [17, 1], //giant worm
                [19, 1] //werewolf
            ]
        },
        {
            id: 3,
            name: 'Level 3 Encounter',
            source: 'Core Rulebook',
            rollResults: [
                [/*creature id, amount*/],
                [20, 3], //armoured skeleton
                [22, 1], //ghoul
                [22, 2], //ghoul
                [22, 2], //ghoul
                [26, 1], //wraith
                [26, 1], //wraith
                [25, 1], //vampire
                [7, 1], //white gorilla
                [7, 1], //white gorilla
                [12, 1], //large construct
                [12, 1], //large construct
                [14, 1], //minor demon
                [14, 1], //minor demon
                [16, 1], //frost giant
                [18, 1], //snow troll
                [18, 1], //snow troll
                [18, 2], //snow troll
                [19, 1], //werewolf
                [17, 1], //Giant Worm
                [17, 1] //Giant Worm
            ]
        }
    ],
    spells: [
        {
            id: 101,
            name: 'Crumble',
            school: 'Chronomancer',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 102,
            name: 'Decay',
            school: 'Chronomancer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The spellcaster selects and attacks a target\'s weapon, causing it to decay and fall apart, rendering it useless for the rest of the game. This spell has no effect on magic weapons (even those only temporarily enchanted). This spell has no effect on creatures (unless they are specifically identified as being equipped with a weapon from the General Arms and Armor List)..'
        },
        {
            id: 103,
            name: 'Fast Act',
            school: 'Chronomancer',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'The target figure will act first next turn, in a special phase before either player\'s wizard phase. If this spell is cast multiple times in the same turn, all figures so affected will act in this special phase, starting with the last figure to have had Fast Act cast upon it, and concluding with the first.'
        },{
            id: 104,
            name: 'Fleet Feet',
            school: 'Chronomancer',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'Target receives +2 Move for the rest of the game. Multiple castings of Fleet Feet on the same target have no effect.'
        },
        {
            id: 105,
            name: 'Petrify',
            school: 'Chronomancer',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target figure must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it receives no actions in its next activation. Furthermore, the figure suffers -3 Fight (to a minimum of +0) and may not have Leap cast upon it until after it makes its next move action. Large creatures receive +8 to their Will Roll to resist this spell.'
        },
        {
            id: 106,
            name: 'Slow',
            school: 'Chronomancer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target is reduced to a maximum of one action per activation (which can be any action, it does not have to be movement). It may make an Will Roll verses the Casting Roll at the end of each of its activations. If successful the spell is cancelled.'
        },
        {
            id: 107,
            name: 'Time Store',
            school: 'Chronomancer',
            base_cast: 14,
            category: 'Self Only',
            description: 'The spellcaster captures a fragment of their own present to save for future use. To cast this spell, the spellcaster must be able to take two actions during their activation. They must spend the first action casting Time Store. If successful, the second action is lost. This spellcaster is now considered to have a stored \'extra action\' that they may use in a future turn. This action can only be used during the spellcaster\'s activation and can give the spellcaster three actions in one activation.'
        },
        {
            id: 108,
            name: 'Time Walk',
            school: 'Chronomancer',
            base_cast: 14,
            category: 'Self Only',
            description: 'Wizard only. The wizard will activate again in the Apprentice phase and the Soldier phase. This is in addition to the figures that can normally activate in those phases. The wizard may not activate any additional soldiers or be part of a group activation in these phases. The wizard may perform one action in each of these two phases and may take any action - they are not limited to movement. If the wizard moved at all in a previous activation during the turn, any additional move actions are at half rate. If a wizard casts this spell in consecutive turns, they immediately suffer 8 points of damage.'
        },
        {
            id: 201,
            name: 'Call Storm',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Area Effect',
            description: 'All bow and crossbow attacks are made with -1 Shoot for the rest of the game. This spell may be cast multiple times (and by multiple spellcasters), with each additional casting increasing the penalty by a further -1, up to a maximum of -5.'
        },
        {
            id: 202,
            name: 'Destructive Sphere',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Area Effect',
            description: 'Every figure within 3” of the spellcaster (but not counting the spellcaster) suffers a +5 elemental magic attack.'
        },
        {
            id: 203,
            name: 'Elemental Ball',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The spellcaster selects an enemy figure within 16” and line of sight and hurls a ball of destructive elemental energy at it. The target and every figure within 1” and line of sight of the target immediately suffers a +5 elemental magic shooting attack. Roll this shooting attack separately for each figure. Treat the target figure as the origin of the attack for the purposes of determining cover or intervening terrain for all other figures suffering the attack. This spell may not target an enemy figure that is even partially obscured by another figure.'
        },
        {
            id: 204,
            name: 'Elemental Bolt',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The spellcaster makes a +7 elemental magic shooting attack against a target figure within 16” and line of sight.'
        },
        {
            id: 205,
            name: 'Elemental Hammer',
            school: 'Elementalist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'This spell is cast upon a weapon. The next time the figure wielding this weapon wins a round of combat and does at least 1 point of damage, this weapon inflicts an additional 5 points of elemental magic damage. If cast on a normal weapon, which is then used against a creature that is Immune to Normal Weapons, this weapon will only deal the 5 points of elemental magic damage. If cast on a bow or crossbow the spell only applies to the next attack.'
        },
        {
            id: 206,
            name: 'Elemental Shield',
            school: 'Elementalist',
            base_cast: 10,
            category: 'Self Only',
            description: 'The spellcaster forms a floating shield that absorbs the next 3 points of damage the spellcaster would normally suffer in combat or from a shooting attack. Once 3 points have been absorbed the spell is cancelled. A spellcaster may only have one Elemental Shield active at any time.'
        },
        {
            id: 207,
            name: 'Scattershot',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Area Effect',
            description: 'The spellcaster makes a +0 elemental magic shooting attack against every enemy figure (either from an opposing warband or uncontrolled creature) within 12” and line of sight. This may include enemy figures in combat, although the normal rules for shooting into combat are followed in this case.'
        },
        {
            id: 208,
            name: 'Wall',
            school: 'Elementalist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'This spell creates a 6”-long, 3”-high wall, part of which must be within 10” and line of sight of the spellcaster. This wall can be climbed as normal. At the end of each turn, after the turn in which the spell was cast, roll a die, on a 1–4 the wall vanishes.'
        },
        {
            id: 301,
            name: 'Animate Construct',
            school: 'Enchanter',
            base_cast: 8,
            category: 'Out of Game (B)',
            description: 'It is assumed that the spellcaster has built a construct prior to using this spell to animate it. If the spell is successfully cast, the construct immediately becomes a member of the warband, taking the place of a soldier. A spellcaster may declare that he is attempting to animate a construct of any size (Small, Medium or Large; see Chapter 6: Bestiary), but the larger the construct, the harder it is to animate, so the following modifiers are applied to his roll to cast the spell: Small -0, Medium -3, Large -6.'
        },
        {
            id: 302,
            name: 'Control Construct',
            school: 'Enchanter',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'If successfully cast, the target construct must make an immediate Will roll versus the casting roll. If the roll fails, the spellcaster gains control of the construct for the rest of the game. A spellcaster may only control one construct at a time.'
        },
        {
            id: 303,
            name: 'Embed Enchantment',
            school: 'Enchanter',
            base_cast: 14,
            category: 'Out of Game',
            description: 'This spell causes any one Enchant Armor or Enchant Weapon spell that is still active at the end of a game to become permanent, and the weapon or armor in question to become a magic weapon or armor. The newly created magic weapon or armor takes up an item slot as normal.'
        },
        {
            id: 304,
            name: 'Enchant Armor',
            school: 'Enchanter',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'This spell may only be cast on a figure wearing armor. The armor worn by the target now counts as magic armor and grants +1 Armor for the rest of the game. Multiple castings of this spell on the same target have no effect.'
        },
        {
            id: 305,
            name: 'Enchant Weapon',
            school: 'Enchanter',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'This spell targets a weapon of the spellcaster\'s choosing. If cast on a melee weapon, this weapon counts as a magic weapon with +1 Fight. Bows and crossbows count as magic weapons with +1 Shoot, but the attacks made with them do not count as magic attacks. This spell may be cast on a single arrow or crossbow bolt, in which case that ammunition gives +1 Shoot and its attack counts as magic, but for the next shooting attack only. This spell may only be cast once on each weapon. When using both a magic missile weapon and magic ammunition, the shooter may choose to apply the bonus of one or the other, but not both.'
        },
        {
            id: 306,
            name: 'Grenade',
            school: 'Enchanter',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The spellcaster takes an object, commonly a simple rock, imbues it with magic energy and throws it at their target, whereupon it explodes into hundreds of fragments. The spellcaster picks a target point within 14". Every figure, including allies, within 1.5" of that point immediately suffers a +3 magic shooting attack. Use the target point as the origin of the attack for working out line of sight and cover.'
        },
        {
            id: 307,
            name: 'Strength',
            school: 'Enchanter',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target receives +2 Fight for the rest of the game. Multiple Strength spells on the same target have no effect.'
        },
        {
            id: 308,
            name: 'Telekinesis',
            school: 'Enchanter',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The spellcaster may move any treasure token within 16" by up to 6" in any direction, so long as it remains in line of sight the entire time. If the treasure moves out of line of sight, it immediately falls straight to the ground. This spell has no effect on a treasure token that has any special requirements for how and when it can be picked up, nor on one being carried by a figure. This spell may not target the central treasure, until after that treasure has been picked up for the first time.'
        },
        {
            id: 401,
            name: 'Beauty',
            school: 'Illusionist',
            base_cast: 10,
            category: 'Self Only',
            description: 'This spell causes anyone who looks on the spellcaster to see a paragon of beauty. Any member of an opposing warband must make a Will Roll with a Target Number equal to the Casting Roll if they wish to do any of the following: move into combat with the spellcaster, make a shooting attack that could potentially hit the spellcaster (including shooting attacks generated by spells), or cast any spell that targets the spellcaster. Spellcasters may empower this Will Roll in the same way they would to resist a spell. A figure may only attempt such a Will Roll once per turn. This spell has no effect on creatures (anything found in Chapter Six: Bestiary, page 176) or war hounds.'
        },
        {
            id: 402,
            name: 'Blink',
            school: 'Illusionist',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'This spell may target any figure within 12". Move that figure 4" in a random direction. A figure may make a Will Roll with a Target Number equal to the Casting Roll in order to resist this spell. If successful, the figure does not move. Uncontrolled creatures will always attempt this Will Roll.'
        },
        {
            id: 403,
            name: 'Fool\'s Gold',
            school: 'Illusionist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'This spell may only be cast on a figure carrying a treasure token. That figure must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, the spellcaster may take the treasure token from the figure and move it up to 4" in any direction, provided the final spot is within line of sight of the spellcaster.'
        },
        {
            id: 404,
            name: 'Glow',
            school: 'Illusionist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'A brightly glowing light surrounds the target figure. For the rest of the game, all shooting attacks against this figure from any source are at +3. Multiple castings of Glow on the same target have no effect.'
        },
        {
            id: 405,
            name: 'Illusionary Soldier',
            school: 'Illusionist',
            base_cast: 12,
            category: 'Out of Game (B) OR Touch',
            description: 'An illusionary soldier becomes a temporary member of the warband for the next battle (if cast Out of Game) or until the end of the game (if cast during a battle). This soldier can be of any type found on the Soldier Tables (pages 30 and 31) except an apothecary. This soldier cannot pick up treasure, nor can it deal damage, but will otherwise count as a regular soldier for all other the purposes – it may engage in combat, albeit dealing no damage if it wins (it would still have the option to push back its opponent, however), lend support to other figures in combat, etc. If the illusionary soldier ever suffers damage of any type, it is removed. A warband may only have one illusionary soldier at any given time. The player must reveal which member of their warband is the illusionary soldier.'
        },
        {
            id: 406,
            name: 'Invisibility',
            school: 'Illusionist',
            base_cast: 12,
            category: 'Touch',
            description: 'The target figure becomes invisible. No figure may move into combat with the invisible figure, nor target it with any attack or spell (although it may still be affected by area effects, such as the blast radius of a Grenade spell). If the invisible figure moves into combat, casts a spell, or picks up a treasure token, the Invisibility spell is cancelled. This spell may be cast on a figure already carrying treasure, rendering both invisible. In this case, if the figure drops the treasure, the spell is cancelled.'
        },
        {
            id: 407,
            name: 'Teleport',
            school: 'Illusionist',
            base_cast: 10,
            category: 'Self Only',
            description: 'The spellcaster immediately moves to any location within line of sight, but may take no other actions this turn after casting this spell. This spell may not be used to enter combat or to move off the table.'
        },
        {
            id: 408,
            name: 'Transpose',
            school: 'Illusionist',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'This spell switches the position of two figures on the table. The two figures being transposed must both be within line of sight of the spellcaster and within 12" of one another. The spellcaster may cast Transpose to switch themselves with another figure. Members of opposing warbands are eligible targets for being transposed but may make a Will Roll with a Target Number equal to the Casting Roll to attempt to resist the spell. If successful, the spell is cancelled and no figures are moved. Friendly figures and uncontrolled creatures will not make such Will Rolls.'
        },
        {
            id: 501,
            name: 'Animate Skull',
            school: 'Necromancer',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'The spellcaster fills a skull with magic malice and throws it at an opponent. Place one animated skull (page 190) within 6" of the spellcaster. It can be placed directly into combat. This skull is an uncontrolled creature. The spellcaster may not cast this spell again until this creature is removed from the table, but may spend an action to cancel the spell, in which case the animated skull is immediately removed from the table.'
        },
        {
            id: 502,
            name: 'Bone Dart',
            school: 'Necromancer',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'This spell fires a small, sharp shard of bone. The spellcaster makes a +5 shooting attack against any figure within line of sight and 12". This does not count as a magic attack.'
        },
        {
            id: 503,
            name: 'Bone of the Earth',
            school: 'Necromancer',
            base_cast: 10,
            category: 'line of sight',
            description: 'A skeletal hand reaches out of the ground and grabs the target\'s ankle. The figure may not take any move actions until it escapes. Any form of magic movement, except the Leap spell, allows a figure to escape the hand; otherwise, the only way to escape is to fight the hand, which has Fight +0, Health 1. If the hand takes one point of damage, it vanishes, and the target is free. Other figures in base contact may attack the hand or give a support bonus. If the hand wins the fight, it does damage as normal. This spell may only be cast against a target that is standing on the ground. Large creatures are unaffected by this spell. The maximum range for this spell is 18".'
        },
        {
            id: 504,
            name: 'Control Undead',
            school: 'Necromancer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target undead creature must make an immediate Will Roll with a Target Number equal to the Casting Roll. If the roll fails, the undead creature becomes a temporary member of the spellcaster\'s warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one undead creature at a time.'
        },
        {
            id: 505,
            name: 'Raise Zombie',
            school: 'Necromancer',
            base_cast: 10,
            category: 'Out of Game OR Touch',
            description: 'The target undead creature must make an immediate Will Roll with a Target Number equal to the Casting Roll. If the roll fails, the undead creature becomes a temporary member of the spellcaster\'s warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one undead creature at a time.'
        },
        {
            id: 506,
            name: 'Spell Eater',
            school: 'Necromancer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'Casting this spell causes the spellcaster to immediately take 1 point of damage. When this spell is cast, it cancels the effects of a single casting of any one spell currently in play. This spell cannot unsummon a creature, but it can cancel the control of a creature.'
        },
        {
            id: 507,
            name: 'Steal Health',
            school: 'Necromancer',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target must make an immediate Will Roll with a Target Number equal to the Casting Roll. If failed, the target immediately loses 3 Health and the spellcaster regains 3 Health. The spellcaster gains 3 Health, even if the target had less Health than that remaining. This may not take the spellcaster above their starting Health. This spell has no effect on undead or constructs. A spellcaster may target a member of their own warband - if they do, however, the target immediately (and permanently) leaves the warband and is treated as an uncontrolled creature for the rest of the game.'
        },
        {
            id: 508,
            name: 'Strike Dead',
            school: 'Necromancer',
            base_cast: 18,
            category: 'Line of Sight',
            description: 'This spell targets a figure within 8". The target must make a Will Roll with a Target Number equal to the Casting Roll or be immediately reduced to 0 Health. All figures may empower their Will Roll to resist this spell, even non-spellcasters. The spellcaster immediately loses 1 Health upon attempting this spell (even if it is cast successfully), in addition to any loss incurred by failure or empowerment. This spell has no effect on undead or constructs.'
        },
        {
            id: 601,
            name: 'Absorb Knowledge',
            school: 'Sigilist',
            base_cast: 10,
            category: 'Out of Game (A)',
            description: 'Wizard only. This spell allows a wizard to absorb the knowledge from a written work without having to read it. A wizard immediately gains 40 experience points for casting this spell to represent the speed with which they can gain knowledge. This experience does not count against the maximum that can be earned in one game. This spell may only be cast after a game in which the wizard was not reduced to 0 Health.'
        },
        {
            id: 602,
            name: 'Bridge',
            school: 'Sigilist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The spellcaster uses the parchment of a long scroll to create a temporary bridge, ramp, or staircase. Place a bridge 6" long and 2" wide anywhere that is completely in the line of sight of the spellcaster. The bridge has no appreciable thickness and is essentially two-dimensional. The ends of this bridge do not have to be on the same horizontal plane, nor do the ends of the bridge need to be anchored on terrain, they may float in the air. Figures may move along this bridge at their normal movement rate, even when essentially climbing. Each spellcaster may only have one bridge in play at any time. Whenever the spellcaster activates, they may cancel this spell as a free action. Otherwise roll a die at the end of every turn: on a 1-2 the bridge vanishes. Figures on the bridge when it vanishes will fall to the ground.'
        },
        {
            id: 603,
            name: 'Draining Word',
            school: 'Sigilist',
            base_cast: 14,
            category: 'Area Effect',
            description: 'This spell draws a bright rune of power in the sky. The spellcaster may choose one spell for Draining Word to affect. All rolls to attempt to cast that particular spell are at -3 for the rest of the game. A spellcaster may only have one Draining Word spell in effect at a time. Only one Draining Word can be active for each specific target spell at one time.'
        },
        {
            id: 604,
            name: 'Explosive Rune',
            school: 'Sigilist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The spellcaster draws a bright, glowing rune of power on the ground or a wall anywhere within 4" and line of sight. A marker should be placed on the table to represent the rune. If any character or creature that was not part of the spellcaster\'s warband at the start of the game moves within 1" of the rune, it explodes, and every figure, friend or foe, within 2" suffers an immediate +5 magic attack. Note that if the rune is placed within 1" of a figure, it does not explode immediately - that figure must move to set it off. A spellcaster may have up to three such runes in play at any time. At the end of any turn, they may choose to cancel any or all their runes. If the spellcaster that placed a rune is no longer on the table, roll a die for each rune at the end of each turn: on an 11+ the rune vanishes.'
        },
        {
            id: 605,
            name: 'Furious Quill',
            school: 'Sigilist',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target is attacked by a sharp animated quill. Although the quill does no damage, it is highly irritating and extremely distracting. While under attack, the target suffers -1 Move, -2 Fight, -4 Shoot, and -2 to all Casting Rolls. Whenever the target is activated, it may make a Will Roll with a Target Number equal to the Casting Roll - if successful, the quill is caught and destroyed. Multiple castings of Furious Quill against the same target have no effect.'
        },
        {
            id: 606,
            name: 'Power Word',
            school: 'Sigilist',
            base_cast: 14,
            category: 'Area Effect',
            description: 'This spell draws a bright rune of power in the sky. The spellcaster may pick one spell for the Power Word to affect. All rolls to cast that particular spell are at +3 for every spellcaster for the rest of the game. A spellcaster may only have one Power Word spell in effect at a time. Only one Power Word can be active for each specific target spell at one time.'
        },
        {
            id: 607,
            name: 'Push',
            school: 'Sigilist',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'The target suffers an immediate +10 attack. Instead of taking damage from this attack, the target is moved 1" directly away from the spellcaster for every point of damage they would have taken. If this pushes the target into the edge of the table or a piece of terrain over 1/2" high, they stop immediately. Other figures do not stop (or get hit by) a pushed figure - they are assumed to step out of the way. If this spell is cast from beneath a figure it will push them up. If the target is pushed up or off a height, it suffers falling damage as normal. This spell can push a figure out of combat, and as it is not a shooting attack, the target is not randomized.'
        },
        {
            id: 608,
            name: 'Write Scoll',
            school: 'Sigilist',
            base_cast: 12,
            category: 'Out of Game (A)',
            description: 'This spell creates one scroll. The scroll must be of a spell that the spellcaster either knows or a spell for which they own the grimoire. The scroll may be sold, given to a figure, or stored in the wizard\'s vault.'
        },
        {
            id: 701,
            name: 'Awareness',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Out of Game (B)',
            description: 'If this spellcaster is on the table, its warband may add +2 to its Initiative Rolls for the purposes of determining the primary player only. This bonus stacks so, if both the wizard and the apprentice have cast this spell and are both on the table, the player may add +4 to their Initiative Rolls. The maximum possible bonus is +4. This spell counts as active on the spellcaster during the game and may be cancelled by anything that cancels spells.'
        },
        {
            id: 702,
            name: 'Combat Awareness',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Touch',
            description: 'This spell gives the target a magic insight into the moves their opponent will attempt in a fight. It grants the target +1 Fight and +1 Armor for the remainder of the game. Multiple castings of this spell on the same target have no effect.'
        },
        {
            id: 703,
            name: 'Mind Control',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target figure must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, the target temporarily joins the spellcaster\'s warband, activating as normal. After the figure activates each turn, it must make another Will Roll with a Target Number equal to the Casting Roll. If successful, the spell is cancelled and the figure returns to its normal allegiance. A spellcaster may only have one active Mind Control spell at a time. A figure under Mind Control cannot purposely take any action that causes it immediate damage but can be moved into combat and may attack an enemy figure. A figure under Mind Control is not allowed to move off the table. A spellcaster may cancel an active Mind Control at the end of any turn. This spell has no effect on spellcasters.'
        },
        {
            id: 704,
            name: 'Mind Lock',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target of this spell becomes immune to Mind Control and Suggestion spells for the rest of the game, and any current Mind Control spells on the figure are cancelled. The figure gains +2 Will for the rest of the game.'
        },
        {
            id: 705,
            name: 'Reveal Secret',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Out of Game (B)',
            description: 'This spell imparts knowledge on some lost treasure. Every successful casting of this spell before a game allows the player to make two rolls for a single treasure token (other than the central treasure, which is unaffected by this spell) after the game and choose which one to take.'
        },
        {
            id: 706,
            name: 'Suggestion',
            school: 'Soothsayer',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target of this spell immediately drops any treasure tokens it is carrying. The spellcaster may move the figure up to 3" in any direction provided this does not move the figure into combat or cause it any immediate damage (e.g. falling more than 3"). The target of this spell may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell has no effect.'
        },
        {
            id: 707,
            name: 'True Sight',
            school: 'Soothsayer',
            base_cast: 10,
            category: 'Self Only',
            description: 'The spellcaster, and all friendly figures within 6" of the spellcaster, can see invisible figures and are immune to the effects of the Beauty spell. Furthermore, if an invisible figure is within 6" of the spellcaster, the Invisibility spell is cancelled. If an Illusionary Soldier is within 6" of the spellcaster, it is immediately removed from the table.'
        },
        {
            id: 708,
            name: 'Wizard Eye',
            school: 'Soothsayer',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'This spell may be cast on any terrain feature within 12" that has a flat side, such as most ruins. Place a token on or next to the terrain feature to represent the Wizard Eye. For the rest of the game, the caster may choose to draw line of sight from the Wizard Eye instead of from the figure when casting spells. The Wizard Eye has 180-degree field of vision. A spellcaster may only maintain one Wizard Eye at a time. If the terrain piece on which the Wizard Eye is placed is damaged or destroyed (such as by a Crumble spell) the spell is cancelled. The spellcaster may cancel this spell at the end of any turn.'
        },
        {
            id: 801,
            name: 'Control Demon',
            school: 'Summoner',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target demon must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it becomes a temporary member of the spellcaster\'s warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one demon at a time.'
        },
        {
            id: 802,
            name: 'Imp',
            school: 'Summoner',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The spellcaster places an imp (page 184) on the table anywhere within the spellcaster\'s line of sight, but no closer than 3" to any other figure. The imp follows the normal rules for uncontrolled creatures and will activate in the next Creature phase. If the spellcaster casts this spell a second time, the first imp immediately vanishes.'
        },
        {
            id: 803,
            name: 'Leap',
            school: 'Summoner',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'This spell may only be cast on a member of the spellcaster\'s warband. Immediately move the target figure up to 10" in any direction, including vertically. This move must either be in a straight line or an arc. It cannot curve around corners. If this move leaves the figure above the ground, it immediately falls, taking damage as normal. If the target is carrying treasure, this move is reduced to 5". This move may not take a figure off the table or into combat. The target of the Leap spell may take no other actions this turn, though it may have taken actions previously.'
        },
        {
            id: 804,
            name: 'Plague of Insects',
            school: 'Summoner',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target figure is attacked by a cloud of stinging or biting insects that irritate and distract. The cloud of insects has a 1" radius centered on, and moving with, the target figure. It affects all figures, including the target figure, fully or partially within this radius. While being pestered by the insects, a figure has -4 Fight and -4 Shoot. The target figure must pass a Will roll versus the original casting roll at the start of his activation in order to beat off all the insects. Other figures within the radius may simply move away to escape. A figure may only ever be affected by one Plague of Insects, whether as a target or by virtue of being within the 1" radius.'
        },
        {
            id: 805,
            name: 'Planar Tear',
            school: 'Summoner',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The spellcaster creates a small tear in the fabric of the universe. This rift is painful to humans and creatures, but lethal to demons. The spellcaster selects a target point. All figures within 2" of that point must make a Will Roll with a Target Number equal to the Casting Roll or suffer 2 points of damage. Demons that fail the Will Roll take damage equal to the Casting Roll.'
        },
        {
            id: 806,
            name: 'Plane Walk',
            school: 'Summoner',
            base_cast: 10,
            category: 'Self Only',
            description: 'Although the spellcaster remains in the same physical location, they move briefly between planes of existence. For the rest of this turn, they can ignore all terrain when moving, thus walking through walls or across chasms. They may not be the target of any shooting attacks or spells. The spellcaster will never be considered in combat during the turn, nor can they be attacked by any figure. They may not, however, pick up treasure or in any way affect other figures or terrain on the table. If they are carrying treasure, they drop it. It is incredibly draining to move between planes of existence, so if a spellcaster attempts to cast this spell in a second consecutive turn, they suffer a -5 modifier to their Casting Roll, -10 if they attempt it three turns in a row, and -15 on the fourth turn and beyond.'
        },
        {
            id: 807,
            name: 'Possess',
            school: 'Summoner',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'This spell may only be cast on a permanent or temporary member of the spellcaster\'s own warband, except the wizard, apprentice, or demons. The target is possessed by a demon and gains +2 Fight, +1 Armor, and -2 Will and counts as a demon (i.e. it will be affected by Banish, Control Demon, Circle of Protection, etc.). This figure may not be part of a group activation. If removed from the game for any reason (such as being hit by a Banish spell), check for the character\'s survival as normal. A spellcaster may only have one Possess spell active at a time.'
        },
        {
            id: 808,
            name: 'Summon Demon',
            school: 'Summoner',
            base_cast: 12,
            category: 'Touch',
            description: 'Immediately place a demon on the table within 1" of the spellcaster. It may not be placed straight into combat. This demon is considered to be under the effects of a Control Demon spell by the same spellcaster, and thus this spell may not be cast if the spellcaster is already controlling a demon. The type of demon summoned depends on the amount by which the spellcaster succeeded on their Casting Roll: 0-5 imp, 6-12 minor demon, 13+ major demon. If a spellcaster rolls a 1 while attempting to cast this spell, they summon an uncontrolled demon and must place this demon in combat with the spellcaster. Roll a die to determine the type of demon 1-10 imp, 11-17 minor demon, 18+ major demon. A spellcaster cannot empower a roll of 1 when casting this spell but there is otherwise no limit on empowering this spell. It may be empowered above 18.'
        },
        {
            id: 901,
            name: 'Banish',
            school: 'Thaumaturge',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'All demons within line of sight of the spellcaster must pass an immediate Will Roll with a Target Number equal to the Casting Roll. If a demon fails the roll and its current Will is +4 or less, it is immediately reduced to 0 Health and removed from the table. If its current Will is +5 or higher, it suffers damage equal to three times the amount by which it failed the Will Roll.'
        },
        {
            id: 902,
            name: 'Blinding Light',
            school: 'Thaumaturge',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'The target must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it may not attack, shoot, or cast Line of Sight spells. Its Fight stat is reduced to +0 and its Move to 1. At the end of each turn, the figure may attempt another Will Roll with the same Target Number. If successful, the spell is cancelled.'
        },
        {
            id: 903,
            name: 'Circle of Protection',
            school: 'Thaumaturge',
            base_cast: 12,
            category: 'Touch',
            description: 'Creates a circle with a 3" diameter which no demon or undead creature can enter or pass through. If something forces them into contact with the circle, they stop at its edge. A spellcaster may only have one active circle of protection at a time, but they do not have to remain within it. The spellcaster may cancel this spell at the end of any turn. Otherwise, roll a die at the end of every turn: on a 1-3 the spell is cancelled.'
        },
        {
            id: 904,
            name: 'Destroy Undead',
            school: 'Thaumaturge',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target undead creature must make a Will Roll with a Target Number equal to the Casting Roll. If the undead creature fails the roll and its current Will is +2 or less, it is immediately reduced to 0 Health and is removed from the table. If its current Will is +3 or higher, it suffers damage equal to three times the amount by which it failed the Will Roll.'
        },
        {
            id: 905,
            name: 'Dispel',
            school: 'Thaumaturge',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'Immediately cancels the ongoing effect of any one casting of any one spell. It cannot unsummon a creature, but it can cancel the control of a creature that is a temporary member of a warband.'
        },
        {
            id: 906,
            name: 'Heal',
            school: 'Thaumaturge',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'This spell restores up to 5 points of lost Health to a target figure within 6". This spell cannot take a model above its starting Health. This spell has no effect on undead or constructs.'
        },
        {
            id: 907,
            name: 'Miraculous Cure',
            school: 'Thaumaturge',
            base_cast: 16,
            category: 'Out of Game (A)',
            description: 'Wizard only. This spell may be used in several different ways. A successful casting of this spell will remove all permanent injuries from one figure. For example, a wizard suffering from Lost Fingers regrows all their missing digits, regardless of how many times they have suffered that particular injury. Or, it may be cast on a Badly Wounded figure - if successful, the soldier is healed and may participate in the next game with no penalty. Finally, it may be used to attempt to bring a figure back from the dead. The figure must have died in the game just played, and using the spell in this fashion incurs a -4 penalty to the Casting Roll. If successful, the figure is restored to life, and may participate in the next game with no penalty. If Miraculous Cure is cast using a scroll, it cannot be used to resurrect the dead.'
        },
        {
            id: 908,
            name: 'Shield',
            school: 'Thaumaturge',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'The target receives +2 Armor for the rest of the game. The maximum armor rule (see, p.36) still applies. Multiple castings of Shield on the same target have no effect.'
        },
        {
            id: 1001,
            name: 'Animal Companion',
            school: 'Witch',
            base_cast: 10,
            category: 'Out of Game (B)',
            description: 'The spellcaster summons an animal companion of their choice from the following options to become a permanent member of their warband: bear (page 179), ice toad (page 180), snow leopard (page 182), or wolf (page 182). All Animal Companions count as standard soldiers. Animal companions are more strong-willed than wild examples of their species and receive a permanent +3 Will. A spellcaster may only have one animal companion at any time.'
        },
        {
            id: 1002,
            name: 'Brew Potion',
            school: 'Witch',
            base_cast: 12,
            category: 'Out of Game (B)',
            description: 'The spellcaster creates one Lesser Potion of their choice (page 86) that may be sold, stored in the wizard\'s vault, or given to a member of the warband. A wizard (and only a wizard) may use this spell to create a Greater Potion (page 87). First, they must declare what potion they are attempting to brew and pay the listed ingredients cost. The wizard should then roll to cast Brew Potion with a -4 to the Casting Roll. If successful, the potion is created and can be immediately assigned to a figure in the warband, sold, or stored in the wizard\'s vault. If unsuccessful, the potion is not created and the money spent on ingredients is lost.'
        },
        {
            id: 1003,
            name: 'Control Animal',
            school: 'Witch',
            base_cast: 12,
            category: 'Line of Sight',
            description: 'The target animal must make an immediate Will Roll with a Target Number equal to the Casting Roll. If the roll fails, the animal becomes a temporary member of the spellcaster\'s warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one animal at a time.'
        },
        {
            id: 1004,
            name: 'Curse',
            school: 'Witch',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'The target suffers -2 to all die rolls. At the end of each turn, the target may make a Will Roll with the Target Number equal to the Casting Roll (at -2, of course). If successful, this spell is cancelled. Curse cannot be cast on a figure already suffering the effects of a Curse spell.'
        },
        {
            id: 1005,
            name: 'Familiar',
            school: 'Witch',
            base_cast: 10,
            category: 'Out of Game (B)',
            description: 'The spellcaster gains a familiar, which can take the form of any small creature. It is not depicted on the table, unless the player wants to include it on the spellcaster figure. A spellcaster with a familiar gains +2 Health (write as a split stat). If the spellcaster is ever reduced to 1 Health or less, the familiar is destroyed. At the start of the next game, the spellcaster reverts to their normal Health, unless another Familiar spell is successfully cast'
        },
        {
            id: 1006,
            name: 'Fog',
            school: 'Witch',
            base_cast: 8,
            category: 'Line of Sight',
            description: 'Place a line of fog, 6" long, 3" high, and 1" thick anywhere on the table as long as some part of it is within line of sight of the spellcaster and all of it is within 24". Figures can move through the fog with no penalty, but line of sight may not be drawn through it. At the start of each new turn, roll a die. On a result of 1-4 the fog dissipates and is removed from the table.'
        },
        {
            id: 1007,
            name: 'Mud',
            school: 'Witch',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'All ground within 3" of a target point becomes rough ground.'
        },
        {
            id: 1008,
            name: 'Poison Dart',
            school: 'Witch',
            base_cast: 10,
            category: 'Line of Sight',
            description: 'Make an immediate plus +3 poisoned shooting attack against the target figure. This is a non-magic attack.'
        },
    ],
    schoolsOfMagic: [
        {
            id: 0,
            name: 'All',
            description: 'All schools'
        },
        {
            id: 1,
            name: 'Chronomancer',
            nicknames: ['Timerider', 'Chronomage', 'Timekeeper'],
            aligned: [2,5,7],
            neutral: [4,6,8,9,10],
            opposed: [3]
        },
        {
            id: 2,
            name: 'Elementalist',
            nicknames: ['Fire Starter', 'Water Weaver', 'Wind Breaker', 'Earth Mover'],
            aligned: [1,3,8],
            neutral: [5,6,7,9,10],
            opposed: [4]
        },
        {
            id: 3,
            name: 'Enchanter',
            nicknames: ['Transmuter', 'Imbuer', 'Mesmerizer'],
            aligned: [2,6,10],
            neutral: [4,5,7,8,9],
            opposed: [1]
        },
        {
            id: 4,
            name: 'Illusionist',
            nicknames: ['Conjuror', 'Prestidigitator', 'Magician'],
            aligned: [6,7,9],
            neutral: [1,3,5,8,10],
            opposed: [2]
        },
        {
            id: 5,
            name: 'Necromancer',
            nicknames: ['Death Mage', 'Soul Reaper', 'Dead Lover'],
            aligned: [1,8,10],
            neutral: [2,3,4,6,7],
            opposed: [9]
        },
        {
            id: 6,
            name: 'Sigilist',
            nicknames: ['Rune Reader', 'Scribe', 'Sigil Maker'],
            aligned: [3,4,9],
            neutral: [1,2,5,7,10],
            opposed: [8]
        },
        {
            id: 7,
            name: 'Soothsayer',
            nicknames: ['Seer', 'Fortune Teller', 'Prognosticator'],
            aligned: [1,4,9],
            neutral: [2,3,5,6,8],
            opposed: [10]
        },
        {
            id: 8,
            name: 'Summoner',
            nicknames: ['Diabolist', 'Demonologist', 'Sorcerer'],
            aligned: [2,5,10],
            neutral: [1,3,4,7,9],
            opposed: [6]
        },
        {
            id: 9,
            name: 'Thaumaturge',
            nicknames: ['Invoker', 'Wonder Worker', 'Diviner'],
            aligned: [4,6,7],
            neutral: [1,2,3,8,10],
            opposed: [5]
        },
        {
            id: 10,
            name: 'Witch',
            nicknames: ['Warlock', 'Hedge Wizard', 'Witch Doctor'],
            aligned: [3,5,8],
            neutral: [1,2,4,6,9],
            opposed: [7]
        }
    ],
    soldiers: [
        {
            id: 1,
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Thug',
                move: 6,
                fight: 2,
                shoot: 0,
                armor: 10,
                will: -1,
                health: 10,
                cost: 0,
                notes: 'Hand Weapon',
            },
        },
        {
            id: 2,
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Thief',
                move: 7,
                fight: 1,
                shoot: 0,
                armor: 10,
                will: 0,
                health: 10,
                cost: 0,
                notes: 'Dagger',
            },
        },
        {
            id: 3,
            
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Warhound',
                move: 8,
                fight: 1,
                shoot: 0,
                armor: 10,
                will: -2,
                health: 8,
                cost: 10,
                notes: 'Animal, Cannot carry treasure or items',
            },
        },
        {
            id: 4,
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Infantryman',
                move: 6,
                fight: 3,
                shoot: 0,
                armor: 11,
                will: 0,
                health: 10,
                cost: 50,
                notes: 'Two-Handed Weapon, Light Armor',
            },
        },
        {
            id: 5,
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Man-at-Arms',
                move: 6,
                fight: 3,
                shoot: 0,
                armor: 12,
                will: 1,
                health: 12,
                cost: 75,
                notes: 'Hand Weapon, Shield, Light Armor',
            },
        },
        {
            id: 6,
            type: 'Standard',
            source: 'Core Rulebook',
            stats: {
                class: 'Apothecary',
                move: 6,
                fight: 1,
                shoot: 0,
                armor: 10,
                will: 3,
                health: 12,
                cost: 75,
                notes: 'Staff, Healing Potion',
            },
        },
        {
            id: 7,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Archer',
                move: 6,
                fight: 1,
                shoot: 2,
                armor: 11,
                will: 0,
                health: 10,
                cost: 75,
                notes: 'Bow, Quiver, Dagger, Light Armor',
            },
        },
        {
            id: 8,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Crossbowman',
                move: 6,
                fight: 1,
                shoot: 2,
                armor: 11,
                will: 0,
                health: 10,
                cost: 75,
                notes: 'Crossbow, Quiver, Dagger, Light Armor',
            },
        },
        {
            id: 9,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Treasure Hunter',
                move: 7,
                fight: 3,
                shoot: 0,
                armor: 11,
                will: 2,
                health: 12,
                cost: 100,
                notes: 'Hand Weapon, Dagger, Light Armor',
            },
        },
        {
            id: 10,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Tracker',
                move: 7,
                fight: 1,
                shoot: 2,
                armor: 11,
                will: 1,
                health: 12,
                cost: 100,
                notes: 'Staff, Bow, Quiver, Light Armor',
            },
        },
        {
            id: 11,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Knight',
                move: 5,
                fight: 4,
                shoot: 0,
                armor: 13,
                will: 1,
                health: 12,
                cost: 125,
                notes: 'Hand Weapon, Dagger, Shield, Heavy Armor',
            },
        },
        {
            id: 12,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Templar',
                move: 5,
                fight: 4,
                shoot: 0,
                armor: 12,
                will: 1,
                health: 12,
                cost: 125,
                notes: 'Two-Handed Weapon, Heavy Armor',
            },
        },
        {
            id: 13,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Ranger',
                move: 7,
                fight: 2,
                shoot: 2,
                armor: 11,
                will: 2,
                health: 12,
                cost: 125,
                notes: 'Bow, Quiver, Hand Weapon, Light Armor',
            },
        },
        {
            id: 14,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Barbarian',
                move: 6,
                fight: 4,
                shoot: 0,
                armor: 10,
                will: 3,
                health: 14,
                cost: 125,
                notes: 'Two-Handed Weapon, Dagger',
            },
        },
        {
            id: 15,
            type: 'Specialist',
            source: 'Core Rulebook',
            stats: {
                class: 'Marksman',
                move: 5,
                fight: 2,
                shoot: 2,
                armor: 12,
                will: 1,
                health: 12,
                cost: 125,
                notes: 'Crossbow, Quiver, Hand Weapon, Heavy Armor',
            },
        },
    ],
    statuses: {
        0: 'Dead',
        1: 'Active',
        2: 'Badly Injured',
        7: 'Hired',
        8: 'For Hire',
        9: 'Vacant',
    },
    templates: {
        wizard: {
            id: null,
            name: 'Timmy',
            stats: {
                classId: 0,
                level: 0,
                health: 14,
                currentHealth: 14,
                move: 6,
                fight: 2,
                shoot: 0,
                armor: 10,
                will: 4,
                cost: 0,
                status: 1,
                itemSlots: [0, 0, 0, 0, 0],
                statMods: [],
            },
            gold: 400,
            apprentice: {
                name: '',
                class: 'Apprentice',
                status: 9,
                armor: 10,
                itemSlots: [0, 0, 0, 0],
                statMods: [],
                cost: 100,
            },
            primarySpellIds: [],
            alignedSpellIds: [],
            neutralSpellIds: [],
            opposedSpellIds: [],
            spellModifiers: {},
            soldiers: [],
            soldiersLost: 0,
            xpGained: 0,
            xpSpent: 0,
            vault: [],
            base: 'none'
        },
        soldier: {
            id: null,
            type: 'Standard',
            source: 'base',
            stats: {
                class: 'Man-at-Arms',
                move: 6,
                fight: 3,
                shoot: 0,
                armor: 12,
                will: 1,
                health: 12,
                cost: 75,
                notes: 'Hand Weapon, Shield, Light Armor',
            },
        }
    },
    nameGenerator: {
        wizard: [
            'Merida',
            'Gandofino',
            'Splendiferous',
            'Saruman',
            'Gargamel',
            'Morgana',
            'Mystique',
            'Rasputin',
            'Gwydion',
            'Edwin',
            'Glorfindel',
            'Cerberus',
            'Sebastian',
        ],
        apprentice: [
            'Tim',
            'Sam',
            'Ben',
            'Jake',
            'Matt',
            'Max',
            'Alex',
            'Jeff',
            'Ella',
            'Zoe',
            'Luke',
            'Sara',
            'Dave',
            'Nate',
            'Adam',
            'Steve',
            'Joe',
            'Pete',
            'Mike',
            'Keith',
            'Toby',
            'Mark',
            'Jefferson'
        ],
        soldier: [
            'Brutus',
            'Rex',
            'Tank',
            'Blade',
            'Sarge',
            'Ranger',
            'Bruiser',
            'Viper',
            'Scout',
            'Shank',
            'Grunt',
            'Thor',
            'Bob',
            'Frank',
            'Samantha',
            'Charlie',
            'Hank',
            'Bart',
            'Matthew',
            'Dennis',
            'Timothy',
            'Michael',
            'Jeffrey',
            'George',
            'Thomas',
            'Henry',
            'Joseph',
            'Edward',
        ],
        animal: [
            'Sandy',
            'Daisy',
            'Coco',
            'Pika',
            'Jub-Jub',
            'Dogmeat',
            'Dogbert',
            'Scooby',
            'Snoopy',
        ],
    },
}

