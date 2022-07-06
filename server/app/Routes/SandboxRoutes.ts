import RouteRegistration from '../../source/RouteRegistration.js';
import Router from '../../source/Router.js';

export default class SandboxRoutes extends RouteRegistration {
    register(router: Router): Router {
        return router;
    }
}