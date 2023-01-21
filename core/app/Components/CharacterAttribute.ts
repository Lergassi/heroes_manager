import Component from '../../source/Component.js';
import {unsigned} from '../../types/main.js';
import ItemCharacterAttributeCollector from './ItemCharacterAttributeCollector.js';
import CharacterAttributeCollector from './CharacterAttributeCollector.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface, {
    CharacterAttributeInterfaceRender,
    CharacterAttributeRenderCallback
} from '../Decorators/CharacterAttributeInterface.js';
import {assert, assertIsNumber, assertNotNil, assertIsPositive} from '../../source/assert.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import _ from 'lodash';

export type CharacterAttributeCallbacks = {
    updateValue: (value: number) => void,
};

/**
 * Все значения атрибутов в игре представлены в виде одного значения. Далее уже они используюся для вычисления других значений, например сила атаки это число, которое по своей логике преобразуется в диапазон.
 */
export default class CharacterAttribute implements CharacterAttributeInterface {
    private readonly _ID: CharacterAttributeID;    //todo: Убрать. Сделать с доступом по индексу. Во всех подобных местах.
    private _baseValue: number;
    private readonly _itemCharacterAttributeCollector: ItemCharacterAttributeCollector;

    private readonly _callbacks;

    get baseValue(): number {
        return this._baseValue;
    }

    //todo: Пока так. Если будет не удобно - убрать.
    //todo: Переделать. Не получиться отслеживать изменение значений при экипировки, баффов и при других изменениях значений. Нужно изменять само значение.
    get finalValue(): number {
        return this._baseValue +
            this._itemCharacterAttributeCollector.value(this._ID)
            ;
    }

    constructor(
        characterAttributeID: CharacterAttributeID, //todo: Или string? Или сущность? Или убрать? Но тогда collector не будет работать. В декоратор.
        itemCharacterAttributeCollector: ItemCharacterAttributeCollector,   //todo: Убрать в декоратор.
        baseValue: number,   //todo: Убрать в декоратор.
    ) {
        assertNotNil(characterAttributeID);
        assertNotNil(itemCharacterAttributeCollector);
        assertIsNumber(baseValue);

        this._ID = characterAttributeID;
        this._itemCharacterAttributeCollector = itemCharacterAttributeCollector;
        this._baseValue = baseValue;

        this._callbacks = [];
    }

    //todo: Не удобно. Не понятно в каком случае настройки нужно делать после создания объекта.
    //todo: Не удобно указывать значения в числах. Приходиться вспоминать какой сейчас множитель и считать сколько надо указать значений.
    increaseBaseValue(value: unsigned): void {
        assertIsPositive(value);

        this._baseValue += value;
        this.updateUI();
    }

    view(callback: (data: {
        ID: string,
        baseValue: number,
        value: number,
    }) => void) {
        // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
        //     ID: this._ID,
        //     baseValue: this._baseValue,
        //     get finalValue(): this.value(),
        // });
        callback({
            ID: this._ID,
            baseValue: this._baseValue,
            value: this.finalValue,
        });
    }

    render(callback: CharacterAttributeRenderCallback): void {
        if (!_.includes(this._callbacks, callback)) {
            this._callbacks.push(callback);
        }
        this.updateUI();
    }

    removeRender(callback: CharacterAttributeRenderCallback): void {
        _.pull(this._callbacks, callback);
    }

    updateUI(): void {
        for (let i = 0; i < this._callbacks.length; i++) {
            this._callbacks[i](this._ID, this.finalValue);
        }
    }

    renderByRequest(ui: CharacterAttributeInterfaceRender): void {
        ui.updateCharacterAttributeFinalValue(this._ID, this.finalValue);
    }
}