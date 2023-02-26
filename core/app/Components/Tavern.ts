import _ from 'lodash';
import debug from 'debug';
import {sprintf} from 'sprintf-js';
import {TavernRCInterface, TavernRenderInterface, UI_TavernHero} from '../../../client/public/RComponents/TavernRC.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {HeroClassID} from '../../types/enums/HeroClassID.js';
import HeroClass from '../Entities/HeroClass.js';
import MainHeroList from './MainHeroList.js';

export default class Tavern implements TavernRenderInterface {
    private readonly _heroes: {[ID in HeroClassID]?: {heroClassID: HeroClassID, count: number}};

    constructor() {
        this._heroes = {};
    }

    add(ID: HeroClassID, count: number): number {
        this.has(ID) ?
            this._heroes[ID].count += count :
            this._heroes[ID] = {heroClassID: ID, count: count}
        ;

        return count;
    }

    remove(ID: HeroClassID, count: number): number {
        if (!this.has(ID)) return 0;

        if (this._heroes[ID].count >= count) {
            this._heroes[ID].count -= count;
        } else {
            count = this._heroes[ID].count;
            this._heroes[ID].count = 0;
        }

        return count;
    }

    removeAll(): void {
        let heroesKey: HeroClassID;
        for (heroesKey in this._heroes) {
            this._heroes[heroesKey].count = 0;
        }
    }

    hire(ID: HeroClassID, mainHeroList: MainHeroList): boolean {
        if (!this.has(ID)) {
            debug(DebugNamespaceID.Throw)(sprintf('Герой %s не доступен в таверне.', ID));
            return false;
        }

        if (mainHeroList.createHero(ID, 1)) {
            this._heroes[ID].count--;
            debug(DebugNamespaceID.Log)(sprintf('Герой %s нанят.', ID));
        }

        return true;
    }

    has(heroClassID: HeroClassID): boolean {
        return this._heroes.hasOwnProperty(heroClassID) && this._heroes[heroClassID].count > 0;
    }

    renderByRequest(UI: TavernRCInterface): void {
        if (!UI.updateHero) return;

        let heroes: UI_TavernHero[] = [];

        let key: HeroClassID;
        for (key in this._heroes) {
            if (!this._heroes[key].count) continue;

            heroes.push({heroClassID: this._heroes[key].heroClassID, count: this._heroes[key].count});
        }

        UI.updateHero(heroes);
    }
}