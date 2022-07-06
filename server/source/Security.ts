import AppError from '../../core/source/AppError.js';
import Container from '../../core/source/Container.js';

export default class Security {
    private readonly _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    //todo: Только это не безопасность, а проверка технически загружены данные или нет. Данные нужно загружать один раз, "проверять" нормально ли загрузилось. Каждый раз проверять не надо.
    isUserLoaded(): boolean {
        return this._container.has('userGameObject');
    }

    isPlayerLoaded(): boolean {
        return this._container.has('playerGameObject');
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