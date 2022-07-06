import RouteRegistration from '../../source/RouteRegistration.js';
import Router from '../../source/Router.js';

export default class AdminRoutes extends RouteRegistration {
    register(router: Router): Router {
        router.get('/admin', 'AdminControllers/MainAdminController:homepage');

        return router;
    }
}