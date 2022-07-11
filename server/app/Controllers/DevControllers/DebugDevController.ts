import Controller from '../../../source/Controller.js';
import {debugEntity, debugRepositoryManager, meta} from '../../../../core/debug/debug_functions.js';
import _ from 'lodash';
import AppError from '../../../../core/source/AppError.js';

export default class DebugDevController extends Controller {
    entities(req, res) {
        let repositoryManager = this.container.get('repositoryManager');
        debugRepositoryManager(repositoryManager);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('ok');
    }

    entity(req, res) {
        let classname: string = _.trim(req.getParams['classname']);
        if (!classname.length) {
            throw new AppError('classname не может быть пустым.');
        }

        let detailDebugFunction = meta.hasOwnProperty(classname) ? meta[classname]['detailDebugFunction'] : debugEntity;
        this.container.get('repositoryManager').getRepository(classname)['_items'].forEach(detailDebugFunction);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('ok');
    }
}