import _ from 'lodash';
import debug from 'debug';
import AbstractSandboxController from './AbstractSandboxController.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {EntityID} from '../../core/types/enums/EntityID.js';

export default class EntityManagerSandboxController extends AbstractSandboxController {
    run(): void {
        this._devMapEntityManager();
    }

    private _devMapEntityManager() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);
        em.map(EntityID.Item, (entity) => {
            console.log(entity);
        });
    }
}