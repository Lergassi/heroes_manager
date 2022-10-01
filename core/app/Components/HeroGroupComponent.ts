import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/AppError.js';
import _ from 'lodash';
import HeroComponent, {HeroState} from './HeroComponent.js';
import {sprintf} from 'sprintf-js';

//todo: В будущем универсальный слот с _container: Container<T>. Слот может быть без логики или с изменением статуса занимаемого объекта.
export class HeroSlot {
    private _hero: GameObject;

    constructor() {
        this._hero = null;
    }

    place(hero: GameObject): void {
        this._hero = hero;
        this._hero.getComponent<HeroComponent>('heroComponent').take(); //todo: Или отдельно в виде декоратора.
    }

    clear(): void {
        this._hero.getComponent<HeroComponent>('heroComponent').release();
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

export default class HeroGroupComponent extends Component {
    private readonly _heroes: {[position: string]: HeroSlot};
    private readonly _size: number;
    private _isBlock: boolean;
    private _stateOwner;

    get heroesCount(): number {
        let count = 0;
        for (const position in this._heroes) {
            // if (!this._isFree(Number(position))) {
            if (this._heroes[position].isBusy()) {
                ++count;
            }
        }

        return count;
    }

    get partOfMaxHeroesCount(): number {
        return this.heroesCount / this._size;
    }

    constructor(
        size: number,
    ) {
        super();
        this._size = size;
        this._isBlock = false;

        let position = 0;
        this._heroes = {};
        while (position < this._size) {
            this._heroes[position] = new HeroSlot();
            ++position;
        }

        // this._stateOwner = null;
    }

    // setHero(position: number, hero: GameObject): void {
    // setHero(heroSlot: number | HeroSlot, hero: GameObject): void {
    _setHero(heroSlot: HeroSlot, hero: GameObject): void {
        // if (typeof heroSlot === 'number') {
        //     heroSlot = this._getHeroSlotByPosition(heroSlot);
        // }
        //
        // // if (!this._hasPosition(heroSlot)) {
        // if (!heroSlot) {
        //     return;
        // }
        if (hero.get<HeroComponent>('heroComponent').isBusy()) {
            throw new AppError('Герой занят.');
        }

        this._canEditGroup();

        // if (this._heroes[heroSlot] === hero) {
        // if (this._heroes[heroSlot].contains(hero)) {
        if (heroSlot.contains(hero)) {
            return;
        }

        //todo: Переделать. Заменить героя - отдельная логика.
        if (this._hasHero(hero)) {
            // this.removeHero(hero);
            return;
        }
        // else if (!hero.get<HeroComponent>('heroComponent').isFree()) {
        //     throw new AppError(sprintf('Герой %s (%s) занят.', hero.get<HeroComponent>('heroComponent').heroClass.name, hero.name));
        // }

        // if (!this._isFree(heroSlot)) {
        // if (this._heroes[heroSlot].isBusy()) {
        if (heroSlot.isBusy()) {
            // this.clearPosition(heroSlot);
            heroSlot.clear();
        }

        // this._heroes[heroSlot] = hero;
        // this._heroes[heroSlot].place(hero);
        heroSlot.place(hero);
        // hero.get<HeroComponent>('heroComponent').place({});
        // hero.get<HeroComponent>('heroComponent').take();
        // hero.get<HeroComponent>('heroComponent').place(this);
    }

    addHero(hero: GameObject): void {
        this._canEditGroup();

        if (this._hasHero(hero)) {
            return;
        }

        let heroSlot = this._getFirstFreeHeroSlot();
        if (heroSlot) {
            // this.setHero(position, hero);
            // this._heroes[heroSlot]
            // heroSlot.place(hero);
            this._setHero(heroSlot, hero);
        } else {
            throw new AppError('Группа полная.');
        }
    }

    _clearPosition(position: number): void {
        this._canEditGroup();

        if (!this._hasPosition(position)) {
            return;
        }

        let heroSlot = this._heroes[position];
        // this._heroes[position] = null;
        heroSlot.clear();
        // heroSlot.get<HeroComponent>('heroComponent').release(this);
    }

    //@comment Могут ли понадобиться слоты вне класса?
    removeHero(hero: GameObject) {
        let heroSlot = this._getHeroSlot(hero);
        if (heroSlot) {
            heroSlot.clear();
        }
        // this.clearPosition(this._getHeroPosition(hero));
    }

    // _getFirstFreePosition(): number | undefined {
    _getFirstFreeHeroSlot(): HeroSlot {
        for (const position in this._heroes) {
            if (this._heroes[position].isFree()) {
                return this._heroes[position];
            }
        }

        return undefined;
    }

    _hasHero(hero: GameObject): boolean {
        // return _.includes(this._heroes, hero);
        // return _.false;
        return !_.isNil(this._getHeroSlot(hero));
    }

    // _isFree(position: number): boolean {
    //     return !this._heroes[position];
    // }

    _canEditGroup(): void {
        if (this._isBlock) {
            throw new AppError('Группа заблокирована.');
        }
    }

    _getHeroPosition(hero: GameObject): number {
        // return Number(_.findKey(this._heroes, hero));
        return 0;
    }

    private _hasPosition(position: number): boolean {
        return this._heroes.hasOwnProperty(position);
    }

    //todo: Тут тоже интерфейс со статусом/placement. Группа не управляется напрямую. Ей управляет локация или подземелье. Если изменить группу в обход локации игра сломается. Если группа управляется без владельца, а игроком, то владельцем будет объект игрока.
    // block() {
    block(stateOwner?): void {
        // if (this._isBlock || this._stateOwner) {
        if (this._isBlock) {
            return;
        }
        // this._placement = new Placement();
        // this._placement.place(target);
        // this._stateOwner = stateOwner;  //tate(stateOwner);
        this._isBlock = true;
    }

    // unblock() {
    unblock(stateOwner?) {
        // this._isBlock = false;
        // if (this._stateOwner !== stateOwner) {
        //     throw AppError.stateOwnerNotAuthorized();
        // }

        // this._stateOwner = null;    //release(stateOwner);
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
}