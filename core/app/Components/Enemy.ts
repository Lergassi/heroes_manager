import EnemyEntity from '../Entities/EnemyEntity.js';

export interface EnemyComponentRender {
    updateType?(name: string): void;
}

/**
 * @deprecated Просто хранение данных не нужно.
 */
export default class Enemy {
    private readonly _enemyEntity: EnemyEntity;

    constructor(
        enemyEntity: EnemyEntity,
    ) {
        this._enemyEntity = enemyEntity;
    }

    renderByRequest(ui: EnemyComponentRender): void {
        ui.updateType?.(this._enemyEntity.id);
    }
}