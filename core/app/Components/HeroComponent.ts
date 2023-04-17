import {assertNotNil} from '../../source/assert.js';
import Component from '../../source/Component.js';
import HeroClass from '../Entities/HeroClass.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import _ from 'lodash';

export interface HeroComponentRender {
    updateHeroClassName?(value: string): void;
    updateHeroRoleName?(value: string): void;
    updateHeroClassId?(id: string): void;
}

/**
 * todo: Убрать. Получается, что это класс только для хранения HeroClass.
 * @deprecated Заменить на имя и heroClass в контейнере.
 */
export default class HeroComponent {
    private readonly _name: string;
    private readonly _heroClass: HeroClass;

    get name(): string {
        return this._name;
    }

    /**
     * @deprecated
     */
    get heroClass(): HeroClass {
        return this._heroClass;
    }

    constructor(
        name: string,
        heroClass: HeroClass,
    ) {
        assertNotNil(heroClass);

        this._name = name;
        this._heroClass = heroClass;
    }

    renderByRequest(ui: HeroComponentRender): void {
        ui.updateHeroClassId?.(this._heroClass.id);
        ui.updateHeroClassName?.(this._heroClass.id);
        ui.updateHeroRoleName?.(this._heroClass.heroRole.id);
    }
}