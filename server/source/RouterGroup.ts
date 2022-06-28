import Router from './Router.js';
import {HttpMethod} from './Http.js';

export default class RouterGroup {
    private readonly _router: Router;
    private readonly _prefix: string;

    constructor(router: Router, params?: {
        prefix?: string;
    }) {
        this._router = router;
        this._prefix = params.prefix || '';
    }

    map(httpMethods: Array<HttpMethod>, pattern: string, target: string | ((req, res) => void)): void {
        this._router.map(httpMethods, this._prefix + pattern, target);
    }

    get(pattern: string, target: string | ((req, res) => void)): void {
        this._router.map([HttpMethod.GET], this._prefix + pattern, target);
    }

    post(pattern: string, target: string | ((req, res) => void)): void {
        this._router.map([HttpMethod.POST], this._prefix + pattern, target);
    }

    prefix(value: string, callback: (group: RouterGroup) => void): void {
        callback(new RouterGroup(this._router, {
            prefix: this._prefix + value,
        }));
    }
}