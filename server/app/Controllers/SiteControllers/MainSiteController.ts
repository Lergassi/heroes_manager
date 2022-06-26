import Controller from '../../../source/Controller.js';

export default class MainSiteController extends Controller {
    homepage(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('homepage');
    }

    about(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('about');
    }

    help(req, res) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('help');
    }
}