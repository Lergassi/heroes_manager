import RouteRegistration from '../../source/RouteRegistration.js';
import Router from '../../source/Router.js';

export default class DevRoutes extends RouteRegistration {
    register(router: Router): Router {
        router.prefix('/debug',(group) => {
            group.get('/router', (req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end('/debug/router');
                router.debug();
            });
        });

        return router;
    }
}