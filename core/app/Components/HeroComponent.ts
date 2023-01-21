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
}

/**
 * todo: Убрать. Получается, что это класс только для хранения HeroClass.
 * @deprecated Заменить на имя и heroClass в контейнере.
 */
export default class HeroComponent {
    private readonly _name: string;
    private readonly _heroClass: HeroClass;

    private _callbacks;

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
        this._name = name;
        this._heroClass = heroClass;

        this._callbacks = [];
    }

    view(logger) {
        debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
            heroClassName: this._heroClass.id,
        });
    }

    render(callback: (heroClassName: string) => void) {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: (heroClassName: string) => void) {
        _.pull(this._callbacks, callback)
    }

    updateUI() {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._heroClass.name);   //todo: Возможно тут должен быть только ID, а другие компоненты сами разберуться как получить остальные данные.
        }
    }

    renderByRequest(ui: HeroComponentRender): void {
        ui.updateHeroClassName?.(this._heroClass.id);
        ui.updateHeroRoleName?.(this._heroClass.heroRole.id);
    }
}