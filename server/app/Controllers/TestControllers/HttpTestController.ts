import Controller from '../../../source/Controller.js';

export default class HttpTestController extends Controller {
    getParams(req, res) {
        console.log(req.getParams);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('ok');
    }
}