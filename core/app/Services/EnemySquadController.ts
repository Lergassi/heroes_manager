import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import {EnemyTypeID} from '../../types/enums/EnemyTypeID.js';
import CharacterFightGroup from '../Components/CharacterFightGroup.js';
import EnemyFactory from '../Factories/EnemyFactory.js';

export default class EnemySquadController {
    private readonly _enemyFactory: EnemyFactory;
    private readonly _squad: {enemyTypeID: EnemyTypeID, level: number, count: number, enemy: GameObject}[];
    private readonly _fightGroup: CharacterFightGroup;

    /**
     * @deprecated dev
     */
    get fightGroup(): CharacterFightGroup {
        return this._fightGroup;
    }

    constructor(enemyFactory: EnemyFactory) {
        this._enemyFactory = enemyFactory;
        this._squad = [];
        this._fightGroup = new CharacterFightGroup();
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

    attackTo(characterFightGroup: CharacterFightGroup, afterTargetDiedCallback?): void {

    }

    damage(): void {
        // this._fightGroup.
    }
}