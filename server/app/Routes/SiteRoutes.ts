import RouteRegistration from '../../source/RouteRegistration.js';
import Router from '../../source/Router.js';

export default class SiteRoutes extends RouteRegistration {
    register(router: Router): Router {
        router.get('/', 'SiteControllers/MainSiteController:homepage');
        router.get('/about', 'SiteControllers/MainSiteController:about');
        router.get('/help', 'SiteControllers/MainSiteController:help');
        router.get('/game_console/execute', 'SiteControllers/GameConsoleSiteController:execute');

        return router;
    }
}