import Component from '../../source/Component.js';
import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';

export enum HeroState {
    Free = 'Free',
    Busy = 'Busy',  //В локации или подземелье и тд.
}

export default class HeroComponent extends Component {
    private _name: string;
    private readonly _heroClass: HeroClass;
    private _state: HeroState;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get heroClass(): HeroClass {
        return this._heroClass;
    }

    get state(): HeroState {
        return this._state;
    }

    constructor(id: number, gameObject: GameObject, name: string, heroClass: HeroClass) {
        super(id, gameObject);
        this._name = name;
        this._heroClass = heroClass;
        this._state = HeroState.Free;
    }
}