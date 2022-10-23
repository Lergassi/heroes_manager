import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {unsigned} from '../types.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {ContainerKey} from '../../types/enums/ContainerKey.js';

export default class CreateItemStorageCommand extends Command {
    get name(): string {
        return CommandNameID.create_item_storage;
    }

    configure() {
        super.configure();
        this.addArgument('size', '', false, DEFAULT_ITEM_STORAGE_SIZE);
    }

    async execute(input: Input) {
        let size: unsigned = parseInt(input.getArgument('size'), 10);

        this.container.get<MainItemStorageListComponent>(ContainerKey.MainItemStorageList).create(size, this.container.get<ItemStorageFactoryInterface>(ContainerKey.ItemStorageFactory));
    }
}