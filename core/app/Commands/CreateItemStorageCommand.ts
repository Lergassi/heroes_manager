import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {DEFAULT_STACK_SIZE} from '../RuntimeObjects/ItemStack.js';
import BasicItemStorageFactory from '../Factories/BasicItemStorageFactory.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import ItemStorageListComponent from '../Components/ItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';

export default class CreateItemStorageCommand extends Command {
    get name(): string {
        return 'create_item_storage';
    }

    configure() {
        super.configure();
        this.addArgument('size', '', false, DEFAULT_STACK_SIZE);
    }

    async execute(input: Input) {
        let size: number = parseInt(input.getArgument('size'));

        this.container.get<ItemStorageFactoryInterface>('player.playerItemStorageFactory').create(size);
    }
}