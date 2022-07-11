import Container from '../source/Container.js';
import AbstractContainerConfigure from '../source/AbstractContainerConfigure.js';
import AutoIncrementIdGenerator from '../source/AutoIncrementIdGenerator.js';
import RepositoryManagerFileLoader from './Services/RepositoryManagerFileLoader.js';
import path from 'path';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: Container): Container {
        // container.set('dataObjectIdGenerator', new AutoIncrementIdGenerator(1));      //todo: save
        container.set('realtimeObjectIdGenerator', new AutoIncrementIdGenerator(1));  //todo: save
        container.set('repositoryManager', (container) => {
            //todo: Только для сервера. На клиенте загрузка будет не из файла.
            return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
        });

        return container;
    }
}