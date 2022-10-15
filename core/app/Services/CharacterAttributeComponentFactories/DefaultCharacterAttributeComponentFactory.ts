import {unsigned} from '../../types.js';
import ItemCharacterAttributeCollector from '../../Components/ItemCharacterAttributeCollector.js';
import CharacterAttribute from '../../Components/CharacterAttribute.js';
import _ from 'lodash';
import {CharacterAttributeID} from '../../../types/enums/CharacterAttributeID.js';

export default class DefaultCharacterAttributeComponentFactory {
    // private _default = {
    //     mainMultiplier: 2,  //todo: Как указывать подобные данные? Внутри без доступа из вне или передавать снаружи?
    // };
    //
    // create(options: {
    //     ID: CharacterAttributeID;
    //     level: unsigned;
    //     isMain?: {
    //         is: boolean;
    //         mainMultiplier?: unsigned;
    //     };
    //     itemAttributeCollectorComponent: ItemAttributeCollectorComponent;
    // }): CharacterAttributeComponent {
    //     return new CharacterAttributeComponent({
    //         characterAttributeID: options.ID,
    //         baseValue: _.random(6, 9) * options.level * (options.isMain?.is ? (options.isMain.mainMultiplier ?? this._default.mainMultiplier) : 1),
    //         itemAttributeCollectorComponent: options.itemAttributeCollectorComponent,
    //     });
    // }
}