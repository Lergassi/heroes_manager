import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import RepositoryManager from '../../../source/RepositoryManager.js';
import {debugRepository, debugRepositoryManager} from '../../../debug/debug_functions.js';
import Security from '../../../../server/source/Security.js';

export default class DebugEntitiesCommand extends Command {
    get name(): string {
        return 'debug_entities';
    }

    configure() {
        super.configure();
        this.addArgument('entity', '', false);
    }

    async execute(input: Input) {
        let entityName = input.getArgument('entity');
        if (entityName) {
            debugRepository(this.container.get<RepositoryManager>('core.repositoryManager').getRepository(entityName));
        } else {
            debugRepositoryManager(this.container.get<RepositoryManager>('core.repositoryManager'));
        }
    }
}