import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import EntityManager from '../../../source/EntityManager.js';
import {debugEntityManager, debugRepository} from '../../../debug/debug_functions.js';
import {CommandID} from '../../../types/enums/CommandID.js';
import EntityManagerInterface from '../../Interfaces/EntityManagerInterface.js';
import {ContainerID} from '../../../types/enums/ContainerID.js';

export default class DebugEntityManagerCommand extends Command {
    get name(): string {
        return CommandID.debug_entity_manager;
    }

    configure() {
        super.configure();
        this.addArgument('entity', '', false);
    }

    async execute(input: Input) {
        console.log(this.container.get<EntityManagerInterface>(ContainerID.EntityManager));
    }
}