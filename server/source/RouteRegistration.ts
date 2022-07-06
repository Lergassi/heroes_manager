import Router from './Router.js';

export default abstract class RouteRegistration {
    abstract register(router: Router): Router;
}