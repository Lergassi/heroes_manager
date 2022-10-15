import CharacterAttributeData from '../app/Entities/CharacterAttributeData.js';

export class CharacterAttributeIncrease {
    private readonly _characterAttribute: CharacterAttributeData;
    private readonly _value: number;

    get characterAttribute(): CharacterAttributeData {
        return this._characterAttribute;
    }

    get value(): number {
        return this._value;
    }

    constructor(characterAttribute: CharacterAttributeData, value: number) {
        this._characterAttribute = characterAttribute;
        this._value = value;
    }
}

// export class AttackPowerIncrease {
//     // private readonly _characterAttribute: CharacterAttribute;
//     private readonly _value: number;
//
//     // get characterAttribute(): CharacterAttribute {
//     //     return this._characterAttribute;
//     // }
//
//     get value(): number {
//         return this._value;
//     }
//
//     constructor(characterAttribute: CharacterAttribute, value: number) {
//         this._characterAttribute = characterAttribute;
//         this._value = value;
//     }
// }

export default class IncreaseList {
    _increase: {[alias: string]: CharacterAttributeIncrease};

    constructor(increase: {[alias: string]: CharacterAttributeIncrease}) {
        this._increase = increase;
        //todo: Нужна проверка, чтобы не было повторяющихся значений. done: За уникальность отвечают ключи объекта.
    }

    get(characterAttribute: string | CharacterAttributeData): CharacterAttributeIncrease {
        for (const increaseKey in this._increase) {
            if (
                typeof characterAttribute === 'string' && this._increase[increaseKey].characterAttribute['_id'] === characterAttribute ||   //todo: Доступ.
                characterAttribute instanceof CharacterAttributeData && this._increase[increaseKey].characterAttribute === characterAttribute
            ) {
                return this._increase[increaseKey];
            }
        }
        // for (let i = 0; i < this._increase.length; i++) {
        //     if (
        //         typeof characterAttribute === 'string' && this._increase[i].characterAttribute.alias === characterAttribute ||
        //         characterAttribute instanceof CharacterAttribute && this._increase[i].characterAttribute === characterAttribute
        //     ) {
        //         return this._increase[i];
        //     }
        // }

        return null;
    }
}