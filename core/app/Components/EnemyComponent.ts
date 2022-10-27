import Component from '../../source/Component.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import {unsigned} from '../../types/main.js';
import {EnemyID} from '../../types/enums/EnemyID.js';

export default class EnemyComponent {
    private readonly _enemyEntity: EnemyEntity;
    private readonly _level: unsigned;

    constructor(
        enemyEntity: EnemyEntity,
        level: unsigned,
    ) {
        this._enemyEntity = enemyEntity;
        this._level = level;
    }
}