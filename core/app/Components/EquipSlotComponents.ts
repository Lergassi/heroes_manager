import Component from '../../source/Component.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import EquipSlot from '../Entities/EquipSlot.js';
import AppError from '../../source/AppError.js';
import {sprintf} from 'sprintf-js';

/**
 * Отработка варианта контейнера.
 */
export default class EquipSlotComponents extends Component {
    private _equipSlotComponents: {[key: string]: EquipSlotComponent};

    set(key: string, equipSlotComponent: EquipSlotComponent): void {
        this._equipSlotComponents[key] = equipSlotComponent;
    }

    get(key: string) {
        if (!this.has(key)) {
            throw new AppError(sprintf('Слот экипировки "%s" не найден.', key));
        }

        return this._equipSlotComponents[key]
    }

    has(key: string): boolean {
        return this._equipSlotComponents.hasOwnProperty(key)
    }
}