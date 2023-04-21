import GameObject from '../../source/GameObject.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import DebugApp from '../Services/DebugApp.js';

export default class ShortEnemyViewer {
    view(enemy: GameObject) {
        let row: string[] = [
            String(enemy.ID),
        ];

        // enemy.get<HeroComponent>(ComponentID.Hero).view((data) => {
        //     row.push(data.heroClass);
        // });
        //
        // enemy.get<ExperienceComponent>(ComponentID.Experience).view((data) => {
        //     row.push(sprintf('%s/%s', data.level, data.maxLevel));
        // });
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
        // enemy.get<CharacterAttributeInterface>(CharacterAttributeID.Strength).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // enemy.get<CharacterAttributeInterface>(CharacterAttributeID.Agility).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // enemy.get<CharacterAttributeInterface>(CharacterAttributeID.Intelligence).view((data) => {
        //     strAgiInt.push(data.value);
        // });
        // row.push(_.join(strAgiInt, '/'));
        //
        // enemy.get<HealthPointsComponent>(ComponentID.HealthPoints).view((data) => {
        //     row.push(sprintf('%s/%s', data.currentHealthPoints, data.maxHealthPoints));
        // });
        // enemy.get<AttackControllerInterface>(ComponentID.AttackController).view((data) => {
        //     row.push(sprintf('%s-%s', data.value.left, data.value.right));
        // });
        DebugApp.debug(DebugNamespaceID.Info)(DebugFormatterID.Json, row);
    }
}