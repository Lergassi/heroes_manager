import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import RepositoryManager from '../../source/RepositoryManager.js';
import Security from '../../../server/source/Security.js';
import AutoIncrementIDGenerator from '../../source/AutoIncrementIDGenerator.js';

export default class AddItemCommand extends Command {
    get name(): string {
        return 'add_item';
    }

    configure() {
        super.configure();
        this.addArgument('item_alias', '', true);
        this.addArgument('count', '', false, 1);
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsPlayerLoaded();

        let alias: string = input.getArgument('item_alias');
        let count: number = parseInt(input.getArgument('count'));

        const item: Item = this.container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name).getOneByAlias(alias);
        this.container.get<ItemStorageManager>('player.itemStorageManager').addItem(
            new ItemStackPattern(
                this.container.get<AutoIncrementIDGenerator>('player.realtimeObjectIdGenerator'),
                item,
                count,
            ),
        );
    }
}