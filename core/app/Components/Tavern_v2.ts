import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {TavernRCInterface, TavernRenderInterface, UI_TavernHero} from '../../../client/public/RC/TavernRC.js';
import {
    TavernRCInterface_v2,
    TavernRenderInterface_v2,
    UI_TavernHero_v2
} from '../../../client/public/RC/TavernRC_v2.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import HeroClass from '../Entities/HeroClass.js';
import WalletInterface from '../Interfaces/WalletInterface.js';
import MainHeroList from './MainHeroList.js';

export default class Tavern_v2 implements TavernRenderInterface_v2 {
    private readonly _heroes: {heroClassID: HeroClassID, level: number, cost: number}[];

    constructor() {
        this._heroes = [];
    }

    add(ID: HeroClassID, level: number, cost: number): number {
        this._heroes.push({
            heroClassID: ID,
            level: level,
            cost: cost,
        });

        return 1;
    }

    remove(index: number): number {
        if (!this.has(index)) return 0;

        _.pullAt(this._heroes, index);

        return 1;
    }

    removeAll(): void {
        _.pullAll(this._heroes);
    }

    hire(index: number, mainHeroList: MainHeroList, wallet: WalletInterface): boolean {
        if (!this.has(index)) {
            debug(DebugNamespaceID.Throw)(sprintf('Герой "%s" не доступен в таверне.', index));
            return false;
        }

        if (wallet.value < this._heroes[index].cost) {
            debug(DebugNamespaceID.Throw)(sprintf('Не достаточно денег.'));
            return false;
        }

        if (
            wallet.remove(this._heroes[index].cost) === this._heroes[index].cost &&
            mainHeroList.createHero(this._heroes[index].heroClassID, this._heroes[index].level) //todo: проверка на возможность создания героя.
        ) {
            debug(DebugNamespaceID.Log)(sprintf('Герой "%s" нанят.', this._heroes[index].heroClassID));
            _.pullAt(this._heroes, index);
        }

        return true;
    }

    has(index: number): boolean {
        return !_.isNil(this._heroes[index]);
    }

    renderByRequest(UI: TavernRCInterface_v2): void {
        if (!UI.updateHero) return;

        let heroes: UI_TavernHero_v2[] = [];
        for (let i = 0; i < this._heroes.length; i++) {
            heroes.push({
                heroClassID: this._heroes[i].heroClassID,
                level: this._heroes[i].level,
                cost: this._heroes[i].cost,
            });
        }

        UI.updateHero(heroes);
    }
}