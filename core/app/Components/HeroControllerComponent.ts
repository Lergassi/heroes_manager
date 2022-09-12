import Component from '../../source/Component.js';
import GameObject from '../../source/GameObject.js';
import EquipSlot from '../Entities/EquipSlot.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';

export default class HeroControllerComponent extends Component {
    constructor(id: number, gameObject: GameObject) {
        super(id, gameObject);
    }
}