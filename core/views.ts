import GameObject from './source/GameObject.js';
import debug from 'debug';
import {DebugNamespaceID} from './types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from './types/enums/DebugFormatterID.js';
import HeroComponent from './app/Components/HeroComponent.js';
import {ComponentID} from './types/enums/ComponentID.js';
import Experience from './app/Components/Experience.js';
import HeroActivityStateController from './app/Components/HeroActivityStateController.js';
import {EquipSlotID} from './types/enums/EquipSlotID.js';
import {CharacterAttributeID} from './types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from './app/Decorators/CharacterAttributeInterface.js';
import HealthPoints from './app/Components/HealthPoints.js';
import AttackControllerInterface from './app/Interfaces/AttackControllerInterface.js';
import EquipSlotInterface from './app/Interfaces/EquipSlotInterface.js';

export function detailHeroView(hero: GameObject) {
    // let defaultViewer = new DefaultViewer();
    // let defaultViewer = (data) => {
    //     debug(DebugNamespaceID.Info)(DebugFormatterID.Json, data);
    // };
    //
    // debug(DebugNamespaceID.Info)('######## Detail hero ########');
    // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
    //     ID: hero.ID,
    // });
    // hero.get<HeroComponent>(ComponentID.Hero).view(debug);
    // hero.get<Experience>(ComponentID.Experience).view(debug);
    // hero.get<CharacterStateController>(ComponentID.StateController).view(debug);
    //
    // let equipSlotIDs = [
    //     EquipSlotID.Head,
    //     EquipSlotID.Shoulders,
    //     EquipSlotID.Chest,
    //     EquipSlotID.Wrist,
    //     EquipSlotID.Hands,
    //     EquipSlotID.Waist,
    //     EquipSlotID.Legs,
    //     EquipSlotID.Foots,
    //     EquipSlotID.Neck,
    //     EquipSlotID.Finger01,
    //     EquipSlotID.Finger02,
    //     EquipSlotID.Trinket,
    //     EquipSlotID.RightHand,
    //     EquipSlotID.LeftHand,
    // ];
    //
    // debug(DebugNamespaceID.Info)('######## Equip ########');
    // for (let i = 0; i < equipSlotIDs.length; i++) {
    //     // debug(DebugNamespaceID.Info)(equipSlotIDs[i]);
    //     hero.get<EquipSlotInterface>(equipSlotIDs[i]).view(debug);
    // }

    // let characterAttributeIDs = [
    //     CharacterAttributeID.Strength,
    //     CharacterAttributeID.Agility,
    //     CharacterAttributeID.Intelligence,
    //     CharacterAttributeID.MaxHealthPoints,
    //     CharacterAttributeID.MaxMagicPoints,
    //     CharacterAttributeID.AttackPower,
    //     CharacterAttributeID.Protection,
    // ];
    //
    // debug(DebugNamespaceID.Info)('######## Character attributes ########');
    // for (let i = 0; i < characterAttributeIDs.length; i++) {
    //     hero.get<CharacterAttributeInterface>(characterAttributeIDs[i]).view(defaultViewer);
    // }
    //
    // hero.get<HealthPoints>(ComponentID.HealthPoints).view(defaultViewer);
    // hero.get<AttackControllerInterface>(ComponentID.AttackController).view(defaultViewer);
}