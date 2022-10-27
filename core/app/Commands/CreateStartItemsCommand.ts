import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';
import {ItemID} from '../../types/enums/ItemID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
import Item from '../Entities/Item.js';
import {EntityID} from '../../types/enums/EntityID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {sprintf} from 'sprintf-js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import ItemStackFactory from '../Factories/ItemStackFactory.js';

export default class CreateStartItemsCommand extends Command {
    get name(): string {
        return CommandNameID.create_start_player_items;
    }

    async execute(input: Input) {
        let items = [
            {
                itemID: ItemID.Wood,
                count: 20,
            },
            {
                itemID: ItemID.IronOre,
                count: 20,
            },
            {
                itemID: ItemID.IronBar,
                count: 20,
            },
            {
                itemID: ItemID.OneHandedSword_01,
                count: 1,
            },
            {
                itemID: ItemID.OneHandedSword_01,
                count: 1,
            },
            {
                itemID: ItemID.PlateHelmet_01,
                count: 1,
            },
            {
                itemID: ItemID.PlateBoots_01,
                count: 1,
            },
            {
                itemID: ItemID.Shield_01,
                count: 1,
            },
        ];

        for (let i = 0; i < items.length; i++) {
            //todo: Отдельный класс для подобной логики.
            let item = this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Item>(EntityID.Item, items[i].itemID);
            if (!item) {
                debug(DebugNamespaceID.Warring)(sprintf('Предмет ID(%s) начального набора предметов не найден и не будет добавлен в сумки.', items[i].itemID));
                continue;
            }

            this.container.get<ItemStorageManager>(ContainerID.ItemStorageManager).addItemStack(
                this.container.get<ItemStackFactory>(ContainerID.ItemStackFactory).create(item, items[i].count),
            );
        }
    }
}