import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../../types/main.js';
import {assert, assertIsPositive} from '../../source/assert.js';
import TakeComponent from './TakeComponent.js';
import EventSystem from '../../source/EventSystem.js';
import HeroGroupInterface from '../Interfaces/HeroGroupInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import HealthPoints from './HealthPoints.js';
import HeroListViewer from '../Viwers/HeroListViewer.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';

//todo: В будущем универсальный слот с _container: Container<T>. Слот может быть без логики или с изменением статуса занимаемого объекта.
//todo: Убрать слоты.
// export class HeroSlot {
//     private _hero: GameObject;
//
//     get hero(): GameObject {
//         return this._hero;
//     }
//
//     constructor() {
//         this._hero = null;
//     }
//
//     place(hero: GameObject): void {
//         this._hero = hero;
//     }
//
//     clear(): void {
//         this._hero = null;
//     }
//
//     isFree(): boolean {
//         return _.isNil(this._hero);
//     }
//
//     isBusy(): boolean {
//         return !this.isFree();
//     }
//
//     contains(hero: GameObject): boolean {
//         return this.isBusy() && this._hero === hero;
//     }
// }

export enum HeroGroupComponentEventCode {
    AddHero = 'HeroGroupComponent.AddHero',
    RemoveHero = 'HeroGroupComponent.RemoveHero',
}

//todo: Группа героев и слоты под герои - разные компоненты. Группа должна быть только группой, а слоты - только для UI. Тоже надо разделить. Иначе классов плодиться много бесполезных и логика усложняется.
export default class HeroGroup implements HeroGroupInterface {
    // private readonly _heroesArray: GameObject[];
    // private readonly _heroes: {[position: string]: HeroSlot};
    private readonly _heroes: GameObject[];
    private readonly _size: number;
    // private _isBlock: boolean;

    // get heroesCount(): number {
    //     let count = 0;
    //     for (const position in this._heroes) {
    //         if (this._heroes[position].isBusy()) {
    //             ++count;
    //         }
    //     }
    //
    //     return count;
    // }

    get size(): number {
        return this._size;
    }

    get length(): number {
        // return this._heroesArray.length;
        return this._heroes.length;
    }

    // get lengthOf() {
    //     return this._size === 0 ? 0 : this._heroesArray.length / this._size;
    // }

    constructor(
        size: unsigned,
    ) {
        assertIsPositive(size);

        this._size = size;
        // this._isBlock = false;

        let position = 0;
        // this._heroes = {};
        this._heroes = [];
        while (position < this._size) {
            // this._heroes[position] = new HeroSlot();
            this._heroes.push(undefined);
            ++position;
        }
        // this._heroesArray = [];
    }

    // _setHero(heroSlot: HeroSlot, hero: GameObject): void {
    //     if (hero.get<TakeComponent>(TakeComponent.name) && !hero.get<TakeComponent>(TakeComponent.name)?.isFree()) {
    //         throw new AppError('Герой занят.');
    //     }
    //
    //     this._canEditGroup();
    //
    //     if (heroSlot.contains(hero)) {
    //         return;
    //     }
    //
    //     //todo: Переделать. Заменить героя - отдельная логика.
    //     if (this._hasHero(hero)) {
    //         return;
    //     }
    //
    //     if (heroSlot.isBusy()) {
    //         heroSlot.clear();
    //     }
    //
    //     heroSlot.place(hero);
    //     hero.getComponent<TakeComponent>(TakeComponent.name)?.take<HeroGroup>(
    //         this,
    //     );
    //     if (!_.includes(this._heroesArray, hero)) {
    //         this._heroesArray.push(hero);
    //     }
    //     EventSystem.event(HeroGroupComponentEventCode.AddHero, this);
    // }

    addHero(hero: GameObject): void {
        // this._canEditGroup();
        assert(hero instanceof GameObject);

        if (this._hasHero(hero)) {
            // throw new AppError('Герой уже в группе.');
            debug(DebugNamespaceID.Throw)('Герой уже в группе.');
        }

        let heroSlot = this._getFirstFreeHeroSlot();
        if (_.isNil(heroSlot)) {
            throw new AppError('Группа полная.');
        }

        // this._setHero(heroSlot, hero);
        this._heroes[heroSlot] = hero;
        // console.log('this._update', this._update);
        // for (let i = 0; i < this._update.length; i++) {
        //     this._update[i](i, this._heroes[i]?.ID);
        // }
    }

    _clearPosition(position: number): void {
        // this._canEditGroup();

        // if (!this._hasPosition(position)) {
        //     return;
        // }

        this._heroes[position] = undefined;
        // let heroSlot = this._heroes[position];
        // this._heroes[position] = null;
        // heroSlot.clear();
        // heroSlot.get<HeroComponent>(HeroComponent.name).release(this);
    }

    removeHero(hero: GameObject): void {
        assert(hero instanceof GameObject);

        let position = this._getHeroSlot(hero);
        if (!position) {
            // throw new AppError('Герой не найден в группе.');
            debug(DebugNamespaceID.Throw)('Герой не найден в группе.');
            return;
        }

        // position.clear();
        hero.getComponent<TakeComponent>(TakeComponent.name)?.release<HeroGroup>(
            this,
        );
        // _.pull(this._heroesArray, hero);
        _.pullAt(this._heroes, position);
        EventSystem.event(HeroGroupComponentEventCode.RemoveHero, this);
    }

    _getFirstFreeHeroSlot(): number {
        for (let i = 0; i < this._heroes.length; i++) {
            if (!this._heroes[i]) return i;
        }

        return undefined;
    }

    _hasHero(hero: GameObject): boolean {
        return !_.isNil(this._getHeroSlot(hero));
    }

    _canEditGroup(): void {
        // if (this._isBlock) {
        //     throw new AppError('Группа заблокирована.');
        // }
    }

    private _hasPosition(position: number): boolean {
        // return this._heroes.hasOwnProperty(position);
        return this._heroes.hasOwnProperty(position);
    }

    //todo: Тут тоже интерфейс со статусом/placement. Группа не управляется напрямую. Ей управляет локация или подземелье. Если изменить группу в обход локации игра сломается. Если группа управляется без владельца, а игроком, то владельцем будет объект игрока.
    // block() {
    block(stateOwner?): void {
        // if (this._isBlock) {
        //     return;
        // }
        //
        // this._isBlock = true;
    }

    unblock(stateOwner?) {
        // this._isBlock = false;
    }

    // _update = [];
    // render(callback: (index, ID) => void) {
    //     this._update.push(callback);
    //     console.log('Функция добавлена.', this._update);
    //     for (let i = 0; i < this._heroes.length; i++) {
    //         callback(i, this._heroes[i]?.ID);
    //     }
    // }

    _getHeroSlotByPosition(position: number) {
        return this._heroes[position.toString()];
    }

    _getHeroSlot(hero: GameObject): number {
        assert(hero instanceof GameObject);

        for (let i = 0; i < this._heroes.length; i++) {
            if (this._heroes[i] === hero) return i;
        }

        return undefined;
    }

    //todo: @move Пока тут.
    // isLifeHeroesCount(): number {
    //     return _.sum(_.map(this._heroesArray, (hero) => {
    //         return Number(!hero.get<HealthPointsComponent>(ComponentID.HealthPoints).isDead());
    //     }));
    // }

    // view(callback: (data: any) => void) {
    //     let heroes: GameObject[] = [];
    //     for (const heroKey in this._heroes) {
    //         if (this._heroes[heroKey].hero) {
    //             heroes.push(this._heroes[heroKey].hero);
    //         }
    //     }
    //
    //     // let heroListViewer = new HeroListViewer();
    //     // heroListViewer.view(heroes);
    //
    //     callback({
    //         characters: heroes,
    //     });
    // }

    map(callback: (hero: GameObject) => void) {
        // this._heroes.map((value, index, array) => {
        //
        // });
        _.map(this._heroes, (hero) => {
            callback(hero);
        });
    }
}