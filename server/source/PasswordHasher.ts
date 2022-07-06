import crypto from 'crypto';

export default class PasswordHasher {
    salt(): string {
        return crypto.randomBytes(16).toString('hex');
    }

    hash(password: string, salt: string): string {
        if (password === undefined || password.length === 0) {
            throw new Error('password не может быть пустым.');
        }

        if (salt === undefined || salt.length === 0) {
            throw new Error('salt не может быть пустым.');
        }

        return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    }

    verify(password: string, salt: string, hash: string): boolean {
        if (hash === undefined || hash.length === 0) {
            throw new Error('hash не может быть пустым.');
        }

        return this.hash(password, salt) === hash;
    }
}