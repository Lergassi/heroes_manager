export default class Controller {
    constructor() {

    }

    rawResponse(req, res, content: string): void {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    }
}