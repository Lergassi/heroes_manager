import GameObject from '../../source/GameObject.js';
import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import {unsigned} from '../../types/main.js';
import {assert, assertIsPositive} from '../../source/assert.js';
import TakeComponent from './TakeComponent.js';
import EventSystem from '../../source/EventSystem.js';
import HeroGroupInterface from '../Interfaces/HeroGroupInterface.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import HealthPointsComponent from './HealthPointsComponent.js';

//todo: В будущем универсальный слот с _container: Container<T>. Слот может быть без логики или с изменением статуса занимаемого объекта.
//todo: Убрать слоты.
export class HeroSlot {
    private _hero: GameObject;

    constructor() {
        this._hero = null;
    }

    place(hero: GameObject): void {
        this._hero = hero;
    }

    clear(): void {
        this._hero = null;
    }

    isFree(): boolean {
        return _.isNil(this._hero);
    }

    isBusy(): boolean {
        return !this.isFree();
    }

    contains(hero: GameObject): boolean {
        return this.isBusy() && this._hero === hero;
    }
}

export enum HeroGroupComponentEventCode {
    AddHero = 'HeroGroupComponent.AddHero',
    RemoveHero = 'HeroGroupComponent.RemoveHero',
}

//todo: Группа героев и слоты под герои - разные компоненты. Группа должна быть только группой, а слоты - только для UI. Тоже надо разделить. Иначе классов плодиться много бесполезных и логика усложняется.
export default class HeroGroupComponent implements HeroGroupInterface {
    private readonly _heroesArray: GameObject[];
    private readonly _heroes: {[position: string]: HeroSlot};
    private readonly _size: number;
    private _isBlock: boolean;

    get heroesCount(): number {
        let count = 0;
        for (const position in this._heroes) {
            if (this._heroes[position].isBusy()) {
                ++count;
            }
        }

        return count;
    }

    get size(): number {
        return this._size;
    }

    get length(): number {
        return this._heroesArray.length;
    }

    get lengthOf() {
        return this._size === 0 ? 0 : this._heroesArray.length / this._size;
    }

    // get partOfMaxHeroesCount(): number {
    //     // return this.heroesCount / this._size;
    //     return this._heroesArray.length / this._size;
    // }

    constructor(
        size: unsigned,
    ) {
        assertIsPositive(size);

        this._size = size;
        this._isBlock = false;

        let position = 0;
        this._heroes = {};
        while (position < this._size) {
            this._heroes[position] = new HeroSlot();
            ++position;
        }
        this._heroesArray = [];
    }

    _setHero(heroSlot: HeroSlot, hero: GameObject): void {
        if (hero.get<TakeComponent>(TakeComponent.name) && !hero.get<TakeComponent>(TakeComponent.name)?.isFree()) {
            throw new AppError('Герой занят.');
        }

        this._canEditGroup();

        if (heroSlot.contains(hero)) {
            return;
        }

        //todo: Переделать. Заменить героя - отдельная логика.
        if (this._hasHero(hero)) {
            return;
        }

        if (heroSlot.isBusy()) {
            heroSlot.clear();
        }

        heroSlot.place(hero);
        hero.getComponent<TakeComponent>(TakeComponent.name)?.take<HeroGroupComponent>(
            this,
        );
        if (!_.includes(this._heroesArray, hero)) {
            this._heroesArray.push(hero);
        }
        EventSystem.event(HeroGroupComponentEventCode.AddHero, this);
    }

    addHero(hero: GameObject): void {
        this._canEditGroup();

        if (this._hasHero(hero)) {
            throw new AppError('Герой уже в группе.');
        }

        let heroSlot = this._getFirstFreeHeroSlot();
        if (!heroSlot) {
            throw new AppError('Группа полная.');
        }

        this._setHero(heroSlot, hero);
    }

    _clearPosition(position: number): void {
        this._canEditGroup();

        if (!this._hasPosition(position)) {
            return;
        }

        let heroSlot = this._heroes[position];
        // this._heroes[position] = null;
        heroSlot.clear();
        // heroSlot.get<HeroComponent>(HeroComponent.name).release(this);
    }

    removeHero(hero: GameObject): void {
        assert(hero instanceof GameObject);

        let heroSlot = this._getHeroSlot(hero);
        if (!heroSlot) {
            throw new AppError('Герой не найден в группе.');
        }

        heroSlot.clear();
        hero.getComponent<TakeComponent>(TakeComponent.name)?.release<HeroGroupComponent>(
            this,
        );
        _.pull(this._heroesArray, hero);
        EventSystem.event(HeroGroupComponentEventCode.RemoveHero, this);
    }

    _getFirstFreeHeroSlot(): HeroSlot {
        for (const position in this._heroes) {
            if (this._heroes[position].isFree()) {
                return this._heroes[position];
            }
        }

        return undefined;
    }

    _hasHero(hero: GameObject): boolean {
        return !_.isNil(this._getHeroSlot(hero));
    }

    _canEditGroup(): void {
        if (this._isBlock) {
            throw new AppError('Группа заблокирована.');
        }
    }

    private _hasPosition(position: number): boolean {
        return this._heroes.hasOwnProperty(position);
    }

    //todo: Тут тоже интерфейс со статусом/placement. Группа не управляется напрямую. Ей управляет локация или подземелье. Если изменить группу в обход локации игра сломается. Если группа управляется без владельца, а игроком, то владельцем будет объект игрока.
    // block() {
    block(stateOwner?): void {
        if (this._isBlock) {
            return;
        }

        this._isBlock = true;
    }

    unblock(stateOwner?) {
        this._isBlock = false;
    }

    render(callback: (values: Readonly<{
        heroes: {[position: string]: HeroSlot},
    }>) => void) {
        callback({
            heroes: this._heroes,
        });
    }

    _getHeroSlotByPosition(position: number) {
        return this._heroes[position.toString()];
    }

    _getHeroSlot(hero: GameObject): HeroSlot {
        for (const heroesKey in this._heroes) {
            if (this._heroes[heroesKey].contains(hero)) {
                return this._heroes[heroesKey];
            }
        }

        return undefined;
    }

    //todo: @move Пока тут.
    isLifeHeroesCount(): number {
        return _.sum(_.map(this._heroesArray, (hero) => {
            return Number(!hero.get<HealthPointsComponent>(HealthPointsComponent.name).isDead());
        }));
    }
}