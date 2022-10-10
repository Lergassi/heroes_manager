import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import {unsigned} from '../types.js';

export default class CharacterGroupComponent extends Component {
    private _characters: GameObject[];
    private _size: unsigned;
}