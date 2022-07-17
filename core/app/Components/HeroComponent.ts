import Component from '../../source/Component.js';
import HeroClass from '../Entities/HeroClass.js';
import GameObject from '../../source/GameObject.js';

export default class HeroComponent extends Component {
    private _name: string;
    private readonly _heroClass;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get heroClass() {
        return this._heroClass;
    }

    constructor(id: number, gameObject: GameObject, name: string, heroClass: HeroClass) {
        super(id, gameObject);
        this._name = name;
        this._heroClass = heroClass;
    }
}