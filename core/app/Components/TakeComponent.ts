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

    take<T>(owner?: T): void {
        if (this._state !== TakeComponentState.Free) {
            throw new AppError('Объект уже занят.');
        }

        this._state = TakeComponentState.Busy;
        this._owner = owner;
    }

    release<T>(owner?: T): void {
        //todo: Или ничего не должно происходить? Просто return;?
        if (this._state !== TakeComponentState.Busy) {
            throw new AppError('Объект не занят.');
        }

        if (this._owner && !owner) {
            throw new AppError('Владелец указанный при занятии объекта указан не верно.');
        }

        this._state = TakeComponentState.Free;
        this._owner = null;
    }

    isFree(): boolean {
        return this._state === TakeComponentState.Free;
    }
}