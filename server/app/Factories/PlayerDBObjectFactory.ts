import PlayerDBObject, {PlayerState} from '../DBObjects/PlayerDBObject.js';
import UserDBObject from '../DBObjects/UserDBObject.js';
import {v4} from 'uuid';

export default class PlayerDBObjectFactory {
    create(name: string, userDBOObject: UserDBObject) {
        return new PlayerDBObject(
            v4(),
            new Date(),
            name,
            PlayerState.Active,
            userDBOObject,
        );
    }
}