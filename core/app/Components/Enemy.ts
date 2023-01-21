import Component from '../../source/Component.js';
import EnemyEntity from '../Entities/EnemyEntity.js';
import {unsigned} from '../../types/main.js';
import {EnemyID} from '../../types/enums/EnemyID.js';

//Остальные данные пока не нужны.
export interface EnemyComponentRender {
    updateType?(name: string): void;
}

export default class Enemy {
    private readonly _enemyEntity: EnemyEntity;

    constructor(
        enemyEntity: EnemyEntity,
    ) {
        this._enemyEntity = enemyEntity;
    }

    renderByRequest(ui: EnemyComponentRender): void {
        ui.updateType(this._enemyEntity.id);
    }
}