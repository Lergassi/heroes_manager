import Container from '../../core/source/Container.js';

export default abstract class Controller {
    private readonly _container: Container;

    get container(): Container {
        return this._container;
    }

    constructor(container: Container) {
        this._container = container;
    }

    response(req, res, content: string) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    }
}