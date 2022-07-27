export enum UserDBObjectState {
    Active = 'Active',
    Banned = 'Banned',
}

export default class UserDBObject {
    private readonly _id: string;
    private readonly _createdAt: Date;
    private _email: string;
    private _salt: string;
    private _passwordHash: string;
    private _state: UserDBObjectState;
    private _isVerified: boolean;

    get id(): string {
        return this._id;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get email(): string {
        return this._email;
    }

    get salt(): string {
        return this._salt;
    }

    get passwordHash(): string {
        return this._passwordHash;
    }

    get state(): UserDBObjectState {
        return this._state;
    }

    get isVerified(): boolean {
        return this._isVerified;
    }

    constructor(
        id: string,
        createdAt: Date,
        email: string,
        salt: string,
        passwordHash: string,
        state: UserDBObjectState,
        isVerified: boolean,
    ) {
        this._id = id;
        this._createdAt = createdAt;
        this._email = email;
        this._salt = salt;
        this._passwordHash = passwordHash;
        this._state = state;
        this._isVerified = isVerified;
    }
}