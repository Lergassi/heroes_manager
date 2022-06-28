import Controller from '../../../source/Controller.js';

export default class MainAdminController extends Controller {
    homepage(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('admin homepage');
    }
}