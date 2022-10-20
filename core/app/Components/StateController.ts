import AppError from '../../source/Errors/AppError.js';

export enum ObjectStateCode {
    Free = 'Free',
}

/**
 * @tmp
 * todo: Логика может быть как у TakeComponent с аналогом владельца.
 */
export default class StateController {
    private _code: string;
    private _message: string;

    constructor() {
        this.state(ObjectStateCode.Free);
    }

    state(code: string, message?: string): void {
        if (this._code && this._code !== ObjectStateCode.Free) {
            throw new AppError('Статус персонажа уже установлен.');
        }

        this._code = code;
        this._message = message || 'Объект не может выполнить данное действие.';
    }

    removeState(): void {
        this._code = ObjectStateCode.Free;
        this._message = '';
    }

    assertAnyAction(): void {
        if (this._code !== ObjectStateCode.Free) {
            throw new AppError(this._message);
        }
    }
}