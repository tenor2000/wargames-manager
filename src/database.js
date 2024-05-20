export const referenceData = {
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
            category: 'Area of Effect',
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
    ],
    templates: {
        wizard: {
            id: null,
            name: 'A man with no name',
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
                cost: 0
            },
            gold: 400,
            apprentice: null,
            primarySpellIds: [],
            alignedSpellIds: [],
            neutralSpellIds: [],
            opposedSpellIds: [],
            spellModifiers: {},
            soldiers: {

            },
            soldierItems: [],
            soldiersLost: 0,
            xpGained: 0,
            xpSpent: 0,
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
                notes: 'Hand Weapon, Shield, Leather Armor',
            },
        }
    },
}

// Eventually will be server side database
// This is just for local testing
// userData from useAuth()
export const userInfoData = {
    myWizards: [
        {
            id: 1,
            name: 'Ivan the Illusionator',
            stats: {
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
                status: 'active',
                itemSlots: ['dagger', 'none', 'none', 'none', 'none'],
                statMods: [],
            },
            gold: 400,
            apprentice: {
                name: "Jim",
                class: 'Apprentice',
                status: 'active',
                armor: 10,
                itemSlots: ['one-handed weapon', 'none', 'none', 'none'],
                statMods: [],
                cost: 100,
            },
            primarySpellIds: [401, 402, 403],
            alignedSpellIds: [601, 701, 901],
            neutralSpellIds: [101, 301],
            opposedSpellIds: [],
            spellModifiers: {
                401: -1,
                402: 1,
            },
            soldiers: {
                'Julius': {status: 'active', classId: 1, itemSlots: ['none']},
                'Adam': {status: 'Dead', classId: 1, itemSlots: ['none']},
                'Roger': {status: 'active', classId: 2, itemSlots: ['none']},
                'Todd': {status: 'Badly Injured', classId: 2, itemSlots: ['none']},
                'Jeff': {status: 'active', classId: 4, itemSlots: ['none']},
                'Hank': {status: 'active', classId: 7, itemSlots: ['none']},
                'George': {status: 'active', classId: 5, itemSlots: ['none']},
                'Clyde': {status: 'active', classId: 6, itemSlots: ['none']},
            },
            soldiersLost: 0,
            xpGained: 0,
            xpSpent: 0,
            base: 'none',
        },
        {
            id: 2,
            name: 'David the Enchanter',
            stats: {
                
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
                status: 'active',
                itemSlots: ['dagger', 'none', 'none', 'none', 'none'],
                statMods: [],
            },
            gold: 400,
            apprentice: {
                name: "Ted",
                class: 'Apprentice',
                status: 'active',
                armor: 10,
                itemSlots: ['dagger', 'none', 'none', 'none'],
                statMods: [],
                cost: 100,
            },
            primarySpellIds: [301, 302, 303],
            alignedSpellIds: [1001, 601, 201],
            neutralSpellIds: [501, 901],
            opposedSpellIds: [],
            spellModifiers: {
                301: -1
            },
            soldiers: {
                'Fred': {status: 'active', classId: 1, itemSlots: ['none']},
                'Sally': {status: 'Dead', classId: 1, itemSlots: ['none']},
                'Jimmy': {status: 'active', classId: 2, itemSlots: ['none']},
                'Ned': {status: 'Badly Injured', classId: 2, itemSlots: ['none']},
                'Sue': {status: 'active', classId: 3, itemSlots: ['none']},
                'Bill': {status: 'active', classId: 4, itemSlots: ['none']},
                'Joe': {status: 'active', classId: 7, itemSlots: ['none']},
                'Jack': {status: 'active', classId: 6, itemSlots: ['none']},
            },
            soldiersLost: 0,
            xpGained: 400,
            xpSpent: 200,
            base: 'none'
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
    myRecord: {
        wins: 0,
        losses: 0,

    },
    myPreferences: {
        theme: 'light',
    }
}