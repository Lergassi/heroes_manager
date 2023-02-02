import _ from 'lodash';
import debug from 'debug';

export default class Balance {
    private _config = {
        
    };

    attackPowerByCharacterAttribute(characterAttribute: number, ratio: number): number {
        return _.round(characterAttribute * ratio);
    }
}