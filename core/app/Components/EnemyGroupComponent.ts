import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';

export default class EnemyGroupComponent extends Component {
    private readonly _enemies: GameObject[];

    constructor(enemies: GameObject[]) {
        super();
        this._enemies = enemies;
    }
}