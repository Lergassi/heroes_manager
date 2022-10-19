import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import EventSystem from '../../source/EventSystem.js';
import EnemyFactory, {EnemyFactoryCreateOptions} from '../Factories/EnemyFactory.js';
import {unsigned} from '../types.js';
import AppError from '../../source/Errors/AppError.js';
import {assert} from '../../source/assert.js';

export enum EnemyGroupComponentEventCode {
    CreateEnemy = 'EnemyGroupComponent.CreateEnemy',
    AddEnemy = 'EnemyGroupComponent.AddEnemy',
    RemoveEnemy = 'EnemyGroupComponent.RemoveEnemy',
    DeleteEnemy = 'EnemyGroupComponent.DeleteEnemy',
}

//Без слотов.
export default class EnemyGroupComponent extends Component {
    private readonly _size: unsigned;
    private readonly _enemies: GameObject[];

    constructor(options: {
        size: unsigned;
    }) {
        super();
        this._size = options.size;
        this._enemies = [];
    }

    createEnemy(options: EnemyFactoryCreateOptions & {
        enemyFactory: EnemyFactory,
    }): GameObject {
        assert(options.enemyFactory instanceof EnemyFactory)
        assert((this._enemies.length + 1) <= this._size, 'Группа врагов полная. Нельзя добавить нового врага в группу.')

        let enemy = options.enemyFactory.create(
            options.enemyTypeID,
            options.level,
        );
        this._enemies.push(enemy);

        EventSystem.event(EnemyGroupComponentEventCode.CreateEnemy, this);

        return enemy;
    }

    deleteEnemy(enemy: GameObject): void {
        if (_.includes(this._enemies, enemy)) {
            _.pull(this._enemies, enemy);
            EventSystem.event(EnemyGroupComponentEventCode.RemoveEnemy, this);
        }
    }
}