import GameObject from '../../source/GameObject.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';
import CharacterAttributeInterface from '../Decorators/CharacterAttributeInterface.js';

export default class CharacterAttributeManager {
    private readonly _character: GameObject;

    constructor(character: GameObject) {
        this._character = character;
    }

    increase(characterAttributeID: CharacterAttributeID, value: number): number {
        return this._character.get<CharacterAttributeInterface>(characterAttributeID)?.increase(value) ?? 0;
    }

    decrease(characterAttributeID: CharacterAttributeID, value: number): number {
        return this._character.get<CharacterAttributeInterface>(characterAttributeID)?.decrease(value) ?? 0;
    }
}