import Route from './Route.js';
import {HttpMethod} from './Http.js';
import {sprintf} from 'sprintf-js';
import AppError from '../../core/source/AppError.js';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import RouterGroup from './RouterGroup.js';
import debug from 'debug';
import ContainerInterface from '../../core/source/ContainerInterface.js';

export default class Router {
    private readonly _container: ContainerInterface;
    private readonly _controllersDir: string;
    private readonly _routes: Array<Route>;
    private readonly _controllers: Object;
    private readonly _controllerClasses: {};

    //todo: Убрать controllersDir и сделать абсолютный путь при указании target.
    //todo: И выделить загрузку модуля в отдельный механизм. Вместе с save/load.
    constructor(container: ContainerInterface, controllersDir: string) {
        this._routes = [];
        this._controllersDir = controllersDir;
        this._container = container;
        this._controllerClasses = {};
        this._controllers = {};
    }

    map(httpMethods: Array<HttpMethod>, pattern: string, target: string | ((req, res) => void)): void {
        if (typeof target === 'string') {
            let parsedTarget = _.split(target, ':');
            if (parsedTarget.length !== 2) {
                throw new AppError('target указан неверно. Формат target: controllerName:method');
            }

            let controllerName = parsedTarget[0];
            let methodName = parsedTarget[1];

            let controllerPath = path.join(this._controllersDir, controllerName + '.js');
            if (!this._controllerClasses[controllerName]) {
                if (!fs.existsSync(controllerPath)) {
                    throw new AppError(sprintf('Контроллер %s не найден.', controllerPath));
                }

                import(controllerPath)
                    .then(module => {
                        //todo: Будет загружено после запуска сервера. Учитывать это и сделать механизм запуска после выполнения всех async функций. Найдена ошибка: если слишком рано выполнить http запрос, то роут может быть еще не задан.
                        this._controllerClasses[controllerName] = module.default;

                        if (!this._controllers[controllerName]) {
                            //todo: Надо чтото другое придумать, чтобы не передавать container в конструкторе Router.
                            this._controllers[controllerName] = new this._controllerClasses[controllerName](this._container);
                        }

                        if (!this._controllers[controllerName][methodName]) {
                            throw new AppError(sprintf('Метод %s не найден в контроллере %s', methodName, controllerPath));
                        }

                        this._routes.push(new Route(httpMethods, pattern, this._controllers[controllerName][methodName].bind(this._controllers[controllerName])));
                    })
                ;//end import
            }
        } else if (typeof target === 'function') {
            this._routes.push(new Route(httpMethods, pattern, target));
        }//end else
    }

    get(pattern: string, target: string | ((req, res) => void)): void {
        this.map([HttpMethod.GET], pattern, target);
    }

    post(pattern: string, target: string | ((req, res) => void)): void {
        this.map([HttpMethod.POST], pattern, target);
    }

    //todo: Переделать, чтобы path был уже задан выше.
    async run(req, res) {
        let url = req.url;
        let urlParsed = url.split('?');

        //todo: Убрать в другое место.
        debug('http')(sprintf('%s: %s', req.method, urlParsed[0]));

        let route = this._getRoute(req.method, urlParsed[0]);
        await route.run(req, res);
    }

    private _getRoute(method: HttpMethod, pattern: string) {
        for (let i = 0; i < this._routes.length; i++) {
            if (this._routes[i].equal(method, pattern)) {
                return this._routes[i];
            }
        }

        throw new AppError(sprintf('Route %s: %s не найден.', method, pattern));
    }

    prefix(value: string, callback: (group: RouterGroup) => void): void {
        callback(new RouterGroup(this, {
            prefix: value,
        }));
    }

    debug() {
        debug('debug')('routes.length', this._routes.length);
        for (let i = 0; i < this._routes.length; i++) {
            this._routes[i].debug();
        }
    }
}