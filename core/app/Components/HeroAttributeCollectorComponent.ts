import ItemAttributeCollectorComponent from './ItemAttributeCollectorComponent.js';
import {assert} from '../../source/assert.js';
import CharacterAttributeComponent from './CharacterAttributeComponent.js';
import {CharacterAttributeID} from '../../types/enums/CharacterAttributeID.js';

//todo: Возможно стоит атрибуты оставить в "сыром" виде, а конечное значение получать другим способом.
export default class HeroAttributeCollectorComponent {
    // private readonly _itemAttributeCollectorComponent: ItemAttributeCollectorComponent;
    private readonly _characterAttributeComponents: Partial<{[ID in CharacterAttributeID]: CharacterAttributeComponent}>;

    constructor() {
        // assert(options.itemAttributeCollectorComponent instanceof ItemAttributeCollectorComponent);

        // this._itemAttributeCollectorComponent = options.itemAttributeCollectorComponent;
        this._characterAttributeComponents = {};
    }

    addCharacterAttributeComponent(options: {
        ID: CharacterAttributeID,
        characterAttributeComponent: CharacterAttributeComponent,
    }) {
        if (!this._characterAttributeComponents.hasOwnProperty(options.ID)) {
            this._characterAttributeComponents[options.ID] = options.characterAttributeComponent;
        }
    }

    finalValue(ID: CharacterAttributeID) {
        // return this._characterAttributeComponents[ID]?.finalValue() || 0;
    }
}