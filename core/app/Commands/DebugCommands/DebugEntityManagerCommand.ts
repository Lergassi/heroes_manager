import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';

export default class DebugEntityManagerCommand extends Command {
    get name(): string {
        return CommandID.debug_entity_manager;
    }

    configure() {
        super.configure();
        this.addArgument('entity', '', false);
    }

    async execute(input: Input) {
        console.log(this.container.get<EntityManagerInterface>(ServiceID.EntityManager));
    }
}