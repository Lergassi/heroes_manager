import Component from '../../source/Component.js';
import EquipSlotComponent from './EquipSlotComponent.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';

/**
 * Отработка варианта контейнера.
 */
export default class EquipSlotComponents extends Component {
    private _equipSlotComponents: {[key: string]: EquipSlotComponent};

    set(name: string, equipSlotComponent: EquipSlotComponent): EquipSlotComponent {
        if (this._equipSlotComponents.hasOwnProperty(name)) {
            throw new AppError('Слот экипировки уже установлен.');
        }

        this._equipSlotComponents[name] = equipSlotComponent;
        this.gameObject.addComponent(equipSlotComponent);

        return equipSlotComponent;
    }

    get(key: string): EquipSlotComponent {
        if (!this.has(key)) {
            throw new AppError(sprintf('Слот экипировки "%s" не найден.', key));
        }

        return this._equipSlotComponents[key];
    }

    has(key: string): boolean {
        return this._equipSlotComponents.hasOwnProperty(key)
    }
}