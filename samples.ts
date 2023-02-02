import {EquipSlotID} from './core/types/enums/EquipSlotID.js';
import {ItemCategoryID} from './core/types/enums/ItemCategoryID.js';

// export let fullEquipSlots = {
//     map: (equipSlotID, item) => {
//
//     },
// };

// export let fullWarriorEquip = {
//     [ItemCategoryID.Helmets]: {ratio: 0.5, count: 1},
//     [ItemCategoryID.ShoulderPads]: {ratio: 0.3, count: 1},
//     [ItemCategoryID.Breastplates]: {ratio: 1, count: 1},
//     [ItemCategoryID.Bracelets]: {ratio: 0.2, count: 1},
//     [ItemCategoryID.Gloves]: {ratio: 0.3, count: 1},
//     [ItemCategoryID.Belts]: {ratio: 0.2, count: 1},
//     [ItemCategoryID.Pants]: {ratio: 0.6, count: 1},
//     [ItemCategoryID.Boots]: {ratio: 0.4, count: 1},
//
//     [ItemCategoryID.Amulets]: {ratio: 0.6, count: 1},
//     [ItemCategoryID.Rings]: {ratio: 0.3, count: 2},
//
//     [ItemCategoryID.OneHandedSwords]: {ratio: 2, count: 2},
// };

let allEquipSlotIDs = [
    EquipSlotID.Head,
    EquipSlotID.Shoulders,
    EquipSlotID.Chest,
    EquipSlotID.Wrist,
    EquipSlotID.Hands,
    EquipSlotID.Waist,
    EquipSlotID.Legs,
    EquipSlotID.Foots,
    EquipSlotID.Neck,
    EquipSlotID.Finger01,
    EquipSlotID.Finger02,
    EquipSlotID.Trinket,
    EquipSlotID.RightHand,
    EquipSlotID.LeftHand,
];

let armorEquipSlotIDs = [
    EquipSlotID.Head,
    EquipSlotID.Shoulders,
    EquipSlotID.Chest,
    EquipSlotID.Wrist,
    EquipSlotID.Hands,
    EquipSlotID.Waist,
    EquipSlotID.Legs,
    EquipSlotID.Foots,
];

let jewelsEquipSlotIDs = [
    EquipSlotID.Neck,
    EquipSlotID.Finger01,
    EquipSlotID.Finger02,
];

let weaponsEquipSlotIDs = [
    EquipSlotID.RightHand,
    EquipSlotID.LeftHand,
];

let supportEquipSlotIDs = [
    EquipSlotID.Trinket,
];