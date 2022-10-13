import Component from '../../source/Component.js';
import EnemyType from '../Entities/EnemyType.js';
import {EnemyTypeID, unsigned} from '../types.js';

export default class EnemyComponent extends Component {
    private readonly _enemyType: EnemyType;
    // private readonly _enemyTypeID: EnemyTypeID;
    private readonly _level: unsigned;

    constructor(options: {
        enemyType: EnemyType,
        // enemyTypeID: EnemyTypeID,
        level: unsigned,
    }) {
        super();
        this._enemyType = options.enemyType;
        // this._enemyTypeID = options.enemyTypeID;
        this._level = options.level;
    }
}