import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import EntityManager from '../../source/EntityManager.js';
import IDGeneratorInterface from '../../source/IDGeneratorInterface.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';
import {ContainerKey} from '../consts.js';

export default class AddItemCommand extends Command {
    get name(): string {
        return 'item.create';
    }

    configure() {
        super.configure();
        this.addArgument('item_alias', '', true);
        this.addArgument('count', '', true);
    }

    async execute(input: Input) {
        let alias: string = input.getArgument('item_alias');
        let count: number = parseInt(input.getArgument('count'), 10);

        // let item = this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(alias);
        // this.container.get<ItemStorageManager>('player.itemStorageManager').addItem(
        //     new ItemStackPattern(
        //         this.container.get<IDGeneratorInterface>('player.realtimeObjectIdGenerator'),
        //         item,
        //         count,
        //     ),
        // );

        // let item = this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(alias);
        this
            .container
            .get<ItemStorageManager>(ContainerKey.ItemStorageManager).createItemStack({
                item: this.container.get<EntityManager>('core.entityManager').getRepository<Item>(Item.name).getOneByAlias(alias),
                count: count,
                itemStackFactory: this.container.get<ItemStackFactory>('player.itemStackFactory'),
            });
    }
}