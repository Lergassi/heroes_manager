export enum PlayerState {
    ACTIVE= 'ACTIVE',
    DELETED = 'DELETED',
    FULL_DELETED = 'FULL_DELETED',  //Никто не имеет доступа к данному игроку. Только администраторы.
}

export default class PlayerDBObject {
    private _id: string;
    private _createdAt: Date;
    private _state: PlayerState;

    constructor(
        id: string,
        createdAt: Date,
        state: PlayerState,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._state = state;
    }
}