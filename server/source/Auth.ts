import UserDBObject from '../app/DBObjects/UserDBObject.js';
import PlayerDBObject from '../app/DBObjects/PlayerDBObject.js';

export default class Auth {
    private _userDBObject: UserDBObject;
    private _playerDBObject: PlayerDBObject;

    get user(): UserDBObject {
        return this._userDBObject;
    }

    get player(): PlayerDBObject {
        return this._playerDBObject;
    }

    loginUser(userDBObject) {

    }

    logoutUser() {

    }

    loginPlayer(playerDBObject) {

    }

    logoutPlayer() {
        this._playerDBObject = undefined;
    }

    exit() {
        this.logoutPlayer();
        this.logoutUser();
    }
}