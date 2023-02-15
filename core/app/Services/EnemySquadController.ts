import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import _CharacterFightGroup from '../Components/FightLegacy/_CharacterFightGroup.js';
import EnemyFactory from '../Factories/EnemyFactory.js';

export default class EnemySquadController {
    private readonly _enemyFactory: EnemyFactory;
    private readonly _squad: {enemyTypeID: EnemyTypeID, level: number, count: number, enemy: GameObject}[];
    private readonly _fightGroup: _CharacterFightGroup;

    /**
     * @deprecated dev
     */
    get fightGroup(): _CharacterFightGroup {
        return this._fightGroup;
    }

    constructor(enemyFactory: EnemyFactory) {
        this._enemyFactory = enemyFactory;
        this._squad = [];
        this._fightGroup = new _CharacterFightGroup();
    }

    createSquad(enemyTypeID: EnemyTypeID, level: number, count: number): void {
        this._squad.push({
            enemyTypeID: enemyTypeID,
            level: level,
            count: count,
            enemy: this._enemyFactory.create(enemyTypeID, level),
        });
        this._fightGroup.addCharacter(this._squad[this._squad.length - 1].enemy);
    }

    attackTo(characterFightGroup: _CharacterFightGroup, afterTargetDiedCallback?): void {

    }

    damage(): void {
        // this._fightGroup.
    }
}