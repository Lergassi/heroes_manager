import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import _ from 'lodash';
import HeroComponent, {HeroState} from './HeroComponent.js';
import AppError from '../../source/AppError.js';

export default class HeroListComponent extends Component {
    private readonly _heroes: GameObject[];

    get heroes(): GameObject[] {
        return this._heroes;
    }

    constructor(id: number, gameObject: GameObject) {
        super(id, gameObject);
        this._heroes = [];
    }

    addHero(hero: GameObject): void {
        if (!_.includes(this._heroes, hero)) {
            this._heroes.push(hero);
        }

        this.update();
    }

    removeHero(hero: GameObject): void {
        if (hero.get<HeroComponent>('heroComponent').state !== HeroState.Free) {
            throw new AppError('Нельзя удалить героя пока он занят.');
        }

        _.pull(this._heroes, hero);

        this.update();
    }
}