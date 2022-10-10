import AppError from '../../core/source/Errors/AppError.js';
import ContainerInterface from '../../core/source/ContainerInterface.js';
import UserDBObject from '../app/DBObjects/UserDBObject.js';
import PlayerDBObject from '../app/DBObjects/PlayerDBObject.js';

export default class Security {
    private readonly _container: ContainerInterface;

    private _userDBObject: UserDBObject;
    private _playerDBObject: PlayerDBObject;

    get user(): UserDBObject {
        return this._userDBObject;
    }

    get player(): PlayerDBObject {
        return this._playerDBObject;
    }

    constructor(container: ContainerInterface) {
        this._container = container;
    }

    loginUser(userDBObject: UserDBObject) {
        this.assertIsUserAlreadyLoaded();
        this._userDBObject = userDBObject;
    }

    logoutUser() {
        this.logoutPlayer();
        this._userDBObject = undefined;
    }

    loginPlayer(playerDBObject: PlayerDBObject) {
        this.assertIsPlayerAlreadyLoaded();
        this._playerDBObject = playerDBObject;
    }

    logoutPlayer() {
        this._playerDBObject = undefined;
    }

    exit() {
        this.logoutPlayer();
        this.logoutUser();
    }

    //todo: Только это не безопасность, а проверка технически загружены данные или нет. Данные нужно загружать один раз, "проверять" нормально ли загрузилось. Каждый раз проверять не надо.
    isUserLoaded(): boolean {
        // return this._container.has('server.userDBObject');
        return this._userDBObject !== undefined;
    }

    isPlayerLoaded(): boolean {
        // return this._container.has('server.playerDBObject');
        return this._playerDBObject !== undefined;
    }

    assertIsUserLoaded() {
        if (!this.isUserLoaded()) {
            throw AppError.userNotLoaded();
        }
    }

    assertIsPlayerLoaded() {
        if (!this.isPlayerLoaded()) {
            throw AppError.playerNotLoaded();
        }
    }

    assertIsUserAlreadyLoaded() {
        if (this.isUserLoaded()) {
            throw AppError.userAlreadyLoaded();
        }
    }

    assertIsPlayerAlreadyLoaded() {
        if (this.isPlayerLoaded()) {
            throw AppError.playerAlreadyLoaded();
        }
    }
}