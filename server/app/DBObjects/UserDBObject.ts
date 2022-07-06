export enum UserDBObjectState {
    ACTIVE = 'ACTIVE',
    BANNED = 'BANNED',
}

export default class UserDBObject {
    private _id: string;
    private _createdAt: Date;
    private _email: string;
    private _salt: string;
    private _passwordHash: string;
    private _state: UserDBObjectState;
    private _isVerified: boolean;

    static create(
        id: string,
        createdAt: Date,
        email: string,
        salt: string,
        passwordHash: string,
        state: UserDBObjectState,
        isVerified: boolean,
    ) {
        let user = new UserDBObject();

        user._id = id;
        user._createdAt = createdAt;
        user._email = email;
        user._salt = salt;
        user._passwordHash = passwordHash;
        user._state = state;
        user._isVerified = isVerified;

        return user;
    }
}