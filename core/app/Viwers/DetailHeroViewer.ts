import GameObject from '../../source/GameObject.js';

export default class DetailHeroViewer {
    view(hero: GameObject) {
        // let defaultViewer = new DefaultViewer();
        // let defaultViewer = (data) => {
        //     debug(DebugNamespaceID.Info)(DebugFormatterID.Json, data);
        // };
        //
        // debug(DebugNamespaceID.Info)('######## Detail hero ########');
        // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
        //     OD: hero.ID,
        // });
        // hero.get<HeroComponent>(ComponentID.Hero).view(defaultViewer);
        // hero.get<Experience>(ComponentID.Experience).view(defaultViewer);
        // hero.get<CharacterStateController>(ComponentID.StateController).view(defaultViewer);
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
        //     EquipSlotID.Finger_1,
        //     EquipSlotID.Finger_2,
        //     EquipSlotID.Trinket,
        //     EquipSlotID.RightHand,
        //     EquipSlotID.LeftHand,
        // ];
        //
        // debug(DebugNamespaceID.Info)('######## Equip ########');
        // // for (let i = 0; i < equipSlotIDs.length; i++) {
        // //     hero.get<EquipSlotInterface>(equipSlotIDs[i]).view((data) => {
        // //         debug(DebugNamespaceID.Info)(DebugFormatterID.Json, _.merge({
        // //             ID: equipSlotIDs[i],
        // //         }, data));
        // //     });
        // // }
        //
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
}