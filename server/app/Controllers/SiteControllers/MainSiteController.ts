import Controller from '../../../source/Controller.js';

export default class MainSiteController extends Controller {
    homepage(req, res) {
        this.rawResponse(req, res, 'this is homepage');
    }
}