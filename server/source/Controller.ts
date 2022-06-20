import Container from '../../core/source/Container.js';

export default abstract class Controller {
    private _container: Container;

    constructor(container: Container) {
        this._container = container;
    }

    rawResponse(req, res, content: string): void {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    }
}