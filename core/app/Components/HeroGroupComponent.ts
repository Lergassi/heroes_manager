import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import AppError from '../../source/AppError.js';
import _ from 'lodash';
import HeroComponent, {HeroState} from './HeroComponent.js';
import {sprintf} from 'sprintf-js';

type HeroGroupList = {[position: number]: GameObject};
interface HeroGroupComponentProps {
    // isBlock?: boolean;
}

type HeroGroupComponentFactoryMethod = {

}

export default class HeroGroupComponent extends Component {
    private readonly _heroes: HeroGroupList;
    private readonly _size: number;
    private _isBlock: boolean;
    private _stateOwner;

    // get size(): number {
    //     return this._size;
    // }

    get heroesCount(): number {
        let count = 0;
        for (const position in this._heroes) {
            if (!this._isFree(Number(position))) {
                ++count;
            }
        }

        return count;
    }

    get partOfMaxHeroesCount(): number {
        return this.heroesCount / this._size;
    }

    constructor(
        id: number,
        size: number,
    ) {
        super(id);
        this._size = size;
        this._isBlock = false;

        let position = 0;
        this._heroes = {};
        while (position < this._size) {
            this._heroes[position] = null;
            ++position;
        }

        this._stateOwner = null;
    }

    setHero(position: number, hero: GameObject): void {
        if (!this._hasPosition(position)) {
            return;
        }

        this._canEditGroup();

        if (this._heroes[position] === hero) {
            return;
        }

        //todo: Переделать. Заменить героя - отдельная логика.
        if (this._hasHero(hero)) {
            this.removeHero(hero);
        } else if (!hero.get<HeroComponent>('heroComponent').isFree()) {
            throw new AppError(sprintf('Герой %s (%s) занят.', hero.get<HeroComponent>('heroComponent').heroClass.name, hero.name));
        }

        if (!this._isFree(position)) {
            this.clearPosition(position);
        }

        this._heroes[position] = hero;
        // hero.get<HeroComponent>('heroComponent').place({});
        hero.get<HeroComponent>('heroComponent').take(this);
        // hero.get<HeroComponent>('heroComponent').place(this);
    }

    addHero(hero: GameObject): void {
        this._canEditGroup();

        if (this._hasHero(hero)) {
            return;
        }

        let position = this._getFirstFreePosition();
        if (position !== undefined) {
            this.setHero(position, hero)
        }
    }

    clearPosition(position: number): void {
        this._canEditGroup();

        if (!this._hasPosition(position)) {
            return;
        }

        let hero = this._heroes[position];
        this._heroes[position] = null;
        hero.get<HeroComponent>('heroComponent').release(this);
    }

    removeHero(hero: GameObject) {
        this.clearPosition(this._getHeroPosition(hero));
    }

    _getFirstFreePosition(): number | undefined {
        for (const position in this._heroes) {
            if (!this._heroes[position]) {
                return Number(position);
            }
        }

        throw undefined;
    }

    _hasHero(hero: GameObject) {
        return _.includes(this._heroes, hero);
    }

    _isFree(position: number): boolean {
        return !this._heroes[position];
    }

    _canEditGroup(): void {
        if (this._isBlock) {
            throw new AppError('Группа заблокирована.');
        }
    }

    _getHeroPosition(hero: GameObject): number {
        return Number(_.findKey(this._heroes, hero));
    }

    private _hasPosition(position: number): boolean {
        return this._heroes.hasOwnProperty(position);
    }

    //todo: Тут тоже интерфейс со статусом/placement. Группа не управляется напрямую. Ей управляет локация или подземелье. Если изменить группу в обход локации игра сломается. Если группа управляется без владельца, а игроком, то владельцем будет объект игрока.
    // block() {
    block(stateOwner): void {
        if (this._isBlock || this._stateOwner) {
            return;
        }
        // this._placement = new Placement();
        // this._placement.place(target);
        this._stateOwner = stateOwner;  //tate(stateOwner);
        this._isBlock = true;
    }

    // unblock() {
    unblock(stateOwner) {
        // this._isBlock = false;
        if (this._stateOwner !== stateOwner) {
            throw AppError.stateOwnerNotAuthorized();
        }

        this._stateOwner = null;    //release(stateOwner);
        this._isBlock = false;
    }
}