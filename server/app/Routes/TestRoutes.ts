import RouteRegistration from '../../source/RouteRegistration.js';
import Router from '../../source/Router.js';

export default class TestRoutes extends RouteRegistration {
    register(router: Router): Router {
        router.prefix('/test',(group) => {
            group.get('/route_prefix', (req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end('this is /test/router_prefix');
            });
            group.get('/router/callback', (req, res) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end('this is test router.map with callback');
            });
            group.get('/get_params', 'TestControllers/HttpTestController:getParams');
        });

        return router;
    }
}