import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender
} from '../Decorators/CharacterAttributeInterface.js';
import {assertIsPositive, assertNotNil} from '../../source/assert.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import DebugApp from '../Services/DebugApp.js';

export default class CharacterAttribute implements CharacterAttributeInterface {
    private readonly _ID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    private _value: number;

    get value(): number {
        return this._value;
    }

    //todo: Пока так. Если будет не удобно - убрать.
    //todo: Переделать. Не получиться отслеживать изменение значений при экипировки, баффов и при других изменениях значений. Нужно изменять само значение.
    /**
     * @deprecated Есть только одно значение. Изменено на возвращение базового значения.
     */
    get finalValue(): number {
        return this._value;
    }

    constructor(
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        value: number,   //todo: Убрать в декоратор.
    ) {
        assertNotNil(characterAttributeID);
        assertIsPositive(value);

        this._ID = characterAttributeID;
        this._value = value;
    }

    //todo: Не удобно. Не понятно в каком случае настройки нужно делать после создания объекта.
    //todo: Не удобно указывать значения в числах. Приходиться вспоминать какой сейчас множитель и считать сколько надо указать значений.
    increase(value: number): number {
        assertIsPositive(value);

        this._value += value;

        return value;
    }

    //todo: Или один метод принимающий в том числе отрицательные значения.
    decrease(value: number): number {
        assertIsPositive(value);

        let _value = this._value - value;
        let removedValue;
        if (_value >= 0) {
            this._value = _value;
            removedValue = _value;
        } else {
            removedValue = this._value;
            this._value = 0;
        }

        return removedValue;
    }

    renderByRequest(ui: CharacterAttributeInterfaceRender): void {
        ui.updateCharacterAttributeFinalValue?.(this._ID, this.value);
    }

    debug(): void {
        DebugApp.debug(DebugNamespaceID.Debug)(DebugFormatterID.Json, {
            ID: this._ID,
            value: this.value,
        });
    }
}