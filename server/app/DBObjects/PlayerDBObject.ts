import UserDBObject from './UserDBObject.js';

export enum PlayerState {
    Active = 'Active',
    Deleted = 'Deleted',            //Может быть восстановлен игроков в течении определенного времени после удаления. После переходит в статус FullDeleted.
    FullDeleted = 'FullDeleted',    //Никто не имеет доступа к данному игроку. Только администраторы.
}

export default class PlayerDBObject {
    private readonly _id: string;
    private readonly _createdAt: Date;
    private _name: string;
    private _state: PlayerState;
    private readonly _userDBObject: UserDBObject;

    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get name(): string {
        return this._name;
    }

    get state(): PlayerState {
        return this._state;
    }

    get userDBObject(): UserDBObject {
        return this._userDBObject;
    }

    constructor(
        id: string,
        createdAt: Date,
        name: string,
        state: PlayerState,
        userDBObject: UserDBObject,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._name = name;
        this._state = state;
        this._userDBObject = userDBObject;
    }
}