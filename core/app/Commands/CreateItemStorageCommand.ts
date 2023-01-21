import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import ItemStorageController from '../Components/ItemStorageController.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import ItemStorageFactoryInterface from '../Factories/ItemStorageFactoryInterface.js';
import {unsigned} from '../../types/main.js';
import {DEFAULT_ITEM_STORAGE_SIZE} from '../consts.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStorageControllerInterface from '../Interfaces/ItemStorageControllerInterface.js';

export default class CreateItemStorageCommand extends Command {
    get name(): string {
        return CommandID.create_item_storage;
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
            .get<ItemStorageController>(ServiceID.ItemStorageController)
            .addItemStorage(this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(size));
    }
}