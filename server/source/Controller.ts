import ContainerInterface from '../../core/source/ContainerInterface.js';

export interface ControllerResponseOptions {
    statusCode?: number | undefined;
    contentType?: string | undefined;
}

let controllerResponseDefaultOptions: ControllerResponseOptions = {
    statusCode: 200,
    contentType: 'text/html',
};

export default abstract class Controller {
    private readonly _container: ContainerInterface;

    get container(): ContainerInterface {
        return this._container;
    }

    constructor(container: ContainerInterface) {
        this._container = container;
    }

    response(req, res, content: string, options: ControllerResponseOptions = {}) {
        res.statusCode = options.statusCode || controllerResponseDefaultOptions.statusCode;
        res.setHeader('Content-Type', options.contentType || controllerResponseDefaultOptions.contentType);
        res.end(content);
    }
}