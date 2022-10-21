import Component from '../../source/Component.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import {unsigned} from '../types.js';
import {EnemyID} from '../../types/enums/EnemyID.js';

export default class EnemyComponent extends Component {
    private readonly _enemyType: EnemyEntity;
    // private readonly _enemyTypeID: EnemyTypeID;
    private readonly _level: unsigned;

    constructor(options: {
        enemyType: EnemyEntity,
        // enemyTypeID: EnemyTypeID,
        level: unsigned,
    }) {
        super();
        this._enemyType = options.enemyType;
        // this._enemyTypeID = options.enemyTypeID;
        this._level = options.level;
    }
}