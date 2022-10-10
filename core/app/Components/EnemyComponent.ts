import Component from '../../source/Component.js';
import EnemyType from '../Entities/EnemyType.js';
import {unsigned} from '../types.js';

export default class EnemyComponent extends Component {
    private readonly _enemy: EnemyType;
    private readonly _level: unsigned;

    get enemy(): EnemyType {
        return this._enemy;
    }

    get level(): unsigned {
        return this._level;
    }

    constructor(options: {
        enemyType: EnemyType,
        level: unsigned,
    }) {
        super();
        this._enemy = options.enemyType;
        this._level = options.level;
    }
}