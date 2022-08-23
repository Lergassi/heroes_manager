import Controller from '../../../source/Controller.js';
// import {debugEntity, debugRepositoryManager, meta} from '../../../../core/debug/debug_functions.js';

export default class DebugDevController extends Controller {
    entities(req, res) {
        // let entityManager = this.container.get<RepositoryManager>('core.entityManager');
        // debugRepositoryManager(entityManager);
        //
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html');
        // res.end('ok');
    }

    entity(req, res) {
        // let classname: string = _.trim(req.getParams['classname']);
        // if (!classname.length) {
        //     throw new AppError('classname не может быть пустым.');
        // }
        //
        // let detailDebugFunction = meta.hasOwnProperty(classname) ? meta[classname]['detailDebugFunction'] : debugEntity;
        // this.container.get<RepositoryManager>('core.entityManager').getRepository(classname)['_items'].forEach(detailDebugFunction);
        //
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html');
        // res.end('ok');
    }

    debugContainer(req, res) {
        // for (const serviceKey in this.container['_services']) {
        //     debug('debug')('%O', sprintf('%s: ', serviceKey));
        // }
        //
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html');
        // res.end('ok');
    }
}