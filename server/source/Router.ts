import {IncomingMessage, ServerResponse} from 'http';
import Route from './Route.js';
import {Method} from './Http.js';
import querystring from 'querystring';
import {sprintf, vsprintf} from 'sprintf-js';
import AppError from '../../core/source/AppError.js';
import url from 'url';

export default class Router {
    private readonly _routes: Array<Route>;

    constructor() {
        this._routes = [];
    }

    map(methods: Array<Method>, pattern: string, callback: (req, res) => void): void {
        this._routes.push(new Route(methods, pattern, callback));
    }

    get(patter: string, callback: (req: IncomingMessage, res: ServerResponse) => void) {
        this.map([Method.GET], patter, callback);
    }

    post(patter: string, callback: (req: IncomingMessage, res: ServerResponse) => void) {
        this.map([Method.POST], patter, callback);
    }

    //todo: Переделать, чтобы path был уже задан выше.
    run(req, res) {
        let url = req.url;
        let urlParsed = url.split('?');

        //todo: Убрать в другое место.
        console.log('LOG', sprintf('%s: %s', req.method, urlParsed[0]));

        let route = this._getRoute(req.method, urlParsed[0]);
        route.run(req, res);
    }

    private _getRoute(method: Method, pattern: string) {
        for (let i = 0; i < this._routes.length; i++) {
            if (this._routes[i].equal(method, pattern)) {
                return this._routes[i];
            }
        }

        throw new AppError(sprintf('Route %s: %s не найден.', method, pattern));
    }
}