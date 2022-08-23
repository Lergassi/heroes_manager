import path from 'path';

export default class PathResolver {
    private readonly _root: string;

    constructor(root: string) {
        this._root = root;
    }

    resolve(...targets: string[]): string {
        return path.resolve(this._root, ...targets);
    }
}