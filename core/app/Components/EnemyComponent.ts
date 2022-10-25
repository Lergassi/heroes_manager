import Component from '../../source/Component.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import {unsigned} from '../types.js';
import {EnemyID} from '../../types/enums/EnemyID.js';

export default class EnemyComponent extends Component {
    private readonly _enemyEntity: EnemyEntity;
    private readonly _level: unsigned;

    constructor(
        enemyEntity: EnemyEntity,
        level: unsigned,
    ) {
        super();
        this._enemyEntity = enemyEntity;
        this._level = level;
    }
}