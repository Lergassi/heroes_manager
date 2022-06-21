import Bottle from 'bottlejs';

export default abstract class Controller {
    private readonly _bottle: Bottle;

    get bottle(): Bottle {
        return this._bottle;
    }

    constructor(bottle: Bottle) {
        this._bottle = bottle;
    }

    response(req, res, content: string) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    }
}