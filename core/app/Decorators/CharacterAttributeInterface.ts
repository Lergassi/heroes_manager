import {unsigned} from '../../types/main.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

export type CharacterAttributeRenderCallback = (ID: CharacterAttributeID, value: number) => void;

export interface CharacterAttributeInterfaceRender {
    updateCharacterAttributeFinalValue(ID: CharacterAttributeID, value: number): void;
}

export default interface CharacterAttributeInterface {
    get baseValue(): number;
    get finalValue(): number;
    /**
     * Значение, которое есть у игрока всегда без экипировки и усилений.
     * @param value
     */
    increaseBaseValue(value: unsigned): void;   //todo: Возможно стоит оставить только value(), а increaseBaseValue только там где хранится атрибут.
    view(callback: (data: {
        ID: string,
        baseValue: number,
        value: number,
    }) => void);
    render(callback: CharacterAttributeRenderCallback): void;
    removeRender(callback: CharacterAttributeRenderCallback): void;
    updateUI(): void;
    renderByRequest(ui: CharacterAttributeInterfaceRender): void;
}