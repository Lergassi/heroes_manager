import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {unsigned} from '../../types/main.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStorageControllerInterface from '../Interfaces/ItemStorageControllerInterface.js';

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

        // this
        //     .container
        //     .get<MainItemStorageListComponent>(ContainerID.MainItemStorageList)
        //     .create(size, this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory));
        //todo: Надо придумать алгоритм, чтобы объекты не создавались заранее. Метод add предполагает, что объект может быть создан и создан.
        this
            .container
            .get<ItemStorageControllerInterface>(ContainerID.ItemStorageController)
            .addItemStorage(this.container.get<ItemStorageFactory>(ContainerID.ItemStorageFactory).create(size));
    }
}