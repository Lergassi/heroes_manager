import AppError from '../../source/Errors/AppError.js';
import _ from 'lodash';
import debug from 'debug';

enum TakeComponentState {
    Free = 'Free',
    Busy = 'Busy',
}

export default class TakeComponent {
    private _state: TakeComponentState;
    private _owner;

    constructor() {
        this._state = TakeComponentState.Free;
        this._owner = null;
    }

    take<T>(options?: {
        owner?: T,
    }): void {
        if (this._state !== TakeComponentState.Free) {
            throw new AppError('Объект уже занят.');
        }

        this._state = TakeComponentState.Busy;
        this._owner = options.owner;
        // debug('log')('Объект заняли.');
    }

    release<T>(options: {
        owner?: T,
    } = {}): void {
        //todo: Или ничего не должно происходить? Просто return;?
        if (this._state !== TakeComponentState.Busy) {
            throw new AppError('Объект не занят.');
        }

        if (this._owner && !options.owner) {
            throw new AppError('Владелец объекта не указан.');
        }

        this._state = TakeComponentState.Free;
        this._owner = null;
        // debug('log')('Объект освободили.');
    }

    isFree(): boolean {
        return this._state === TakeComponentState.Free;
    }
}