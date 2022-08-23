export interface PathResolversOptions {
    coreResolver: string;
    serverResolver: string;
    serverDataDir: string;
    coreDataDir: string;
}

export default class PathResolvers {
    // private readonly _projectDir: string;
    //
    // private readonly _coreDir: string;
    // private readonly _serverDir: string;
    //
    // private readonly _coreDataDir: string;
    // private readonly _serverDataDir: string;
    //
    // get projectDir(): string {
    //     return this._projectDir;
    // }
    //
    // get coreDir(): string {
    //     return this._coreDir;
    // }
    //
    // get serverDir(): string {
    //     return this._serverDir;
    // }
    //
    // get coreDataDir(): string {
    //     return this._coreDataDir;
    // }
    //
    // get serverDataDir(): string {
    //     return this._serverDataDir;
    // }
    //
    // constructor(resolvers = {}) {
    //     this._projectDir = this._resolve(projectDir);
    //
    //     this._coreDir = this._resolve(projectDir, options.coreDir);
    //     this._serverDir = this._resolve(projectDir, options.serverDir);
    //
    //     this._coreDataDir = this._resolve(this._coreDir, options.coreDataDir);
    //     this._serverDataDir = this._resolve(this._serverDir, options.serverDataDir);
    // }
    //
    // private _resolve(...pathSegments: string[]): string {
    //     let target = path.resolve(...pathSegments);
    //     if (!fs.existsSync(target)) {
    //         throw AppError.pathNotExists(target);
    //     }
    //
    //     return target;
    // }
    //
    // resolveProjectTarget(target: string) {
    //
    // }
    //
    // resolveCoreTarget(target: string) {
    //
    // }
    //
    // resolveServerTarget(target: string) {
    //
    // }
}