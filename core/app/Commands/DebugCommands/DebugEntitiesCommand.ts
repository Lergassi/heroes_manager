import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import EntityManager from '../../../source/EntityManager.js';
import {debugEntityManager, debugRepository} from '../../../debug/debug_functions.js';

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
            debugRepository(this.container.get<EntityManager>('core.entityManager').getRepository(entityName));
        } else {
            debugEntityManager(this.container.get<EntityManager>('core.entityManager'));
        }
    }
}