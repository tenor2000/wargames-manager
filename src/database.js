const referenceData = {
    myWizards: [
        {
            id: 1,
            name: 'Ivan the Illusionator',
            stats: {
                classId: 4,
                level: 8,
                health: 14,
                currentHealth: 14,
                move: 6,
                fight: 2,
                shoot: 2,
                armor: 10,
                will: 4,
                cost: 0
            },
            gold: 400,
            apprentice: 'Jim',
            primarySpellIds: [401, 402, 403],
            alignedSpellIds: [601, 701, 901],
            neutralSpellIds: [101, 301],
            opposedSpellIds: [],
            spellModifiers: {
                401: -1
            },
            soldiers: [1,2,3,4,5,6],
            soldierItems: [],
            soldiersLost: 0,
            xpGained: 0,
            xpSpent: 0,
        },
        {
            id: 2,
            name: 'David the Enchanter',
            stats: {
                classId: 3,
                level: 8,
                health: 14,
                currentHealth: 14,
                move: 6,
                fight: 2,
                shoot: 2,
                armor: 10,
                will: 4,
                cost: 0
            },
            gold: 400,
            apprentice: 'Ted',
            primarySpellIds: ['Fool\'s Gold', 'Illusionary Soldier', 'Transpose'],
            alignedSpellIds: ['Push', 'Heal', 'Wizard Eye'],
            neutralSpellIds: ['Raise Zombie', 'Leap'],
            opposedSpellIds: ['Fireball', 'Firestorm', 'Fire Wall'],
            spellModifiers: {
     
            },
            soldiersLost: 0,
            xpGained: 400,
            xpSpent: 200,
        },
        {
            id: 3,
            name: 'Homer the Idiot',
            stats: {
                classId: 9,
                level: 8,
                health: 14,
                currentHealth: 14,
                move: 6,
                fight: 2,
                shoot: 2,
                armor: 10,
                will: 4,
                cost: 0
            },
            gold: 400,
            apprentice: 'Ned',
            primarySpellIds: [401, 402, 403],
            alignedSpellIds: ['Push', 'Heal', 'Wizard Eye'],
            neutralSpellIds: ['Raise Zombie', 'Leap'],
            opposedSpellIds: ['Fireball', 'Firestorm', 'Fire Wall'],
            spellModifiers: {
                401: -1
            },
            soldiersLost: 0,
            xpGained: 0,
            xpSpent: 0,
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
            description: 'The spellcaster selects and attacks a target\'s weapon, causing it to decay and fall apart, rendering it useless for the rest of the game. This spell has no effect on magic weapons (even those only temporarily enchanted). This spell has no effect on creatures (unless they are specifically identified as being equipped with a weapon from the General Arms and Armor List)..'
        },
        {
            id: 103,
            name: 'Fast Act',
            school: 'Chronomancer',
            base_cast: 8,
            category: 'line of sight',
            description: 'The target figure will act first next turn, in a special phase before either player\'s wizard phase. If this spell is cast multiple times in the same turn, all figures so affected will act in this special phase, starting with the last figure to have had Fast Act cast upon it, and concluding with the first.'
        },

        {
            id: 104,
            name: 'Fleet Feet',
            school: 'Chronomancer',
            base_cast: 10,
            category: 'line of sight',
            description: 'Target receives +2 Move for the rest of the game. Multiple castings of Fleet Feet on the same target have no effect.'
        },
        {
            id: 201,
            name: 'Call Storm',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Area Effect',
            description: 'This spell can only target inanimate structures such as buildings and walls. The spellcaster rapidly speeds up the passing of time in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.'
        },
        {
            id: 202,
            name: 'Destructive Sphere',
            school: 'Elementalist',
            base_cast: 12,
            category: 'Area Effect',
            description: 'Every figure within 3" of the spellcaster suffers a +5 attack.'
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
            category: 'line of sight',
            description: 'This spell may target any figure within 12". Move that figure 4" in a random direction. A figure may make a Will Roll with a Target Number equal to the Casting Roll in order to resist this spell. If successful, the figure does not move. Uncontrolled creatures will always attempt this Will Roll.'
        },
        {
            id: 403,
            name: 'Fool\'s Gold',
            school: 'Illusionist',
            base_cast: 10,
            category: 'line of sight',
            description: 'This spell may only be cast on a figure carrying a treasure token. That figure must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, the spellcaster may take the treasure token from the figure and move it up to 4" in any direction, provided the final spot is within line of sight of the spellcaster.'
        },
        {
            id: 502,
            name: 'Bone Dart',
            school: 'Necromancer',
            base_cast: 8,
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
    ],
    schoolTypes: [
        {
            id: 0,
            name: 'All',
            description: 'All schools'
        },
        {
            id: 1,
            name: 'Chronomancer',
            aligned: [2,5,7],
            neutral: [4,6,8,9,10],
            opposed: [3]
        },
        {
            id: 2,
            name: 'Elementalist',
            aligned: [1,3,8],
            neutral: [5,6,7,9,10],
            opposed: [4]
        },
        {
            id: 3,
            name: 'Enchanter',
            aligned: [2,6,10],
            neutral: [4,5,7,8,9],
            opposed: [1]
        },
        {
            id: 4,
            name: 'Illusionist',
            aligned: [6,7,9],
            neutral: [1,3,5,8,10],
            opposed: [2]
        },
        {
            id: 5,
            name: 'Necromancer',
            aligned: [1,8,10],
            neutral: [2,3,4,6,7],
            opposed: [9]
        },
        {
            id: 6,
            name: 'Sigilist',
            aligned: [3,4,9],
            neutral: [1,2,5,7,10],
            opposed: [8]
        },
        {
            id: 7,
            name: 'Soothsayer',
            aligned: [1,4,9],
            neutral: [2,3,5,6,8],
            opposed: [10]
        },
        {
            id: 8,
            name: 'Summoner',
            aligned: [2,5,10],
            neutral: [1,3,4,7,9],
            opposed: [6]
        },
        {
            id: 9,
            name: 'Thaumaturge',
            aligned: [4,6,7],
            neutral: [1,2,3,8,10],
            opposed: [5]
        },
        {
            id: 10,
            name: 'Witch',
            aligned: [3,5,8],
            neutral: [1,2,4,6,9],
            opposed: [7]
        }
    ],
    soldiers: [
        {
            id: 1,
            type: 'Standard',
            source: 'base',
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
            source: 'base',
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
            source: 'base',
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
            source: 'base',
            stats: {
                class: 'Infantryman',
                move: 6,
                fight: 3,
                shoot: 0,
                armor: 11,
                will: 0,
                health: 10,
                cost: 50,
                notes: 'Two-Handed Weapon, Leather Armor',
            },
        },
        {
            id: 5,
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
                notes: 'Hand Weapon, Shield, Leather Armor',
            },
        },
        {
            id: 6,
            type: 'Standard',
            source: 'base',
            stats: {
                class: 'Apothecary',
                move: 6,
                fight: 1,
                shoot: 0,
                armor: 10,
                will: 3,
                health: 12,
                cost: 75,
                notes: 'Staff, starts each game carrying a healing potion',
            },
        },
        {
            id: 7,
            type: 'Specialist',
            source: 'base',
            stats: {
                class: 'Archer',
                move: 6,
                fight: 1,
                shoot: 2,
                armor: 11,
                will: 0,
                health: 10,
                cost: 75,
                notes: 'Bow, Dagger, Leather Armor',
            },
        },
    ]
}

export default referenceData