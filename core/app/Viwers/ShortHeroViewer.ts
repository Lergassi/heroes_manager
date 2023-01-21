import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import HeroComponent from '../Components/HeroComponent.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import Experience from '../Components/Experience.js';
import CharacterStateController from '../Components/CharacterStateController.js';
import {EquipSlotID} from '../../types/enums/EquipSlotID.js';
import EquipSlotInterface from '../Interfaces/EquipSlotInterface.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';
import HealthPoints from '../Components/HealthPoints.js';
import AttackControllerInterface from '../Interfaces/AttackControllerInterface.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {sprintf} from 'sprintf-js';

export default class ShortHeroViewer {
    view(hero: GameObject) {
        // let row: string[] = [
        //     String(hero.ID),
        // ];
        //
        // // debug(DebugNamespaceID.Info)('Hero, id: ' + hero.ID);
        // hero.get<HeroComponent>(ComponentID.Hero).view((data) => {
        //     row.push(data.heroClass);
        // });
        //
        // // hero.get<Experience>(ComponentID.Experience).view((data) => {
        // //     row.push(sprintf('%s/%s', data.level, data.maxLevel));
        // // });
        //
        // /*
        //     Strength
        //     Agility
        //     Intelligence
        //     st ag in
        //     stagin
        //     str agi int
        //     strAgiInt
        //  */
        // let strAgiInt = [];
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Strength).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Agility).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // hero.get<CharacterAttributeInterface>(CharacterAttributeID.Intelligence).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // row.push(_.join(strAgiInt, '/'));
        //
        // hero.get<HealthPoints>(ComponentID.HealthPoints).view((data) => {
        //     row.push(sprintf('%s/%s', data.currentHealthPoints, data.maxHealthPoints));
        // });
        // hero.get<AttackControllerInterface>(ComponentID.AttackController).view((data) => {
        //     row.push(sprintf('%s-%s', data.value.left, data.value.right));
        // });
        // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, row);
    }
}