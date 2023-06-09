import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ItemID} from '../../types/enums/ItemID.js';
import {DEFAULT_STACK_SIZE} from '../consts.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {assertIsGreaterThanOrEqual, assertNotEmpty, assertNotNil} from '../../source/assert.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import {parseInt} from 'lodash';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ItemStackBlankInterface from '../Interfaces/ItemStackBlankInterface.js';

export default class CreateItemKitCommand extends Command {
    //todo: Для ID вместо сущности использовать отдельный класс или фабрику.
    private readonly _kits: { [key: string]: ItemStackBlankInterface[] } = {
        // start_items: [
        //     {item: ItemID.Wood, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.IronOre, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.Herb_1, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.MagicResources_01, count: 2},
        // ],
        start_resources: [
            {itemID: ItemID.Wood, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.IronOre, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.CopperOre, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.Herb01, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_2, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_3, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.BoarMeat, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.MagicResource01, count: 2},
        ],
        start_materials: [
            {itemID: ItemID.IronIngot, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.CopperBar, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.Leather01, count: DEFAULT_STACK_SIZE},
            {itemID: ItemID.MagicMaterial01, count: 1},
        ],
        start_plate_armor: [
            {itemID: ItemID.PlateHelmet01, count: 1},
            {itemID: ItemID.PlateShoulders01, count: 1},
            {itemID: ItemID.PlateBreastplate01, count: 1},
            {itemID: ItemID.PlateBracer01, count: 1},
            {itemID: ItemID.PlateGloves01, count: 1},
            {itemID: ItemID.PlateBelt01, count: 1},
            {itemID: ItemID.PlatePants01, count: 1},
            {itemID: ItemID.PlateBoots01, count: 1},
        ],
        start_leather_armor: [
            {itemID: ItemID.LeatherHelmet01, count: 1},
            {itemID: ItemID.LeatherShoulders01, count: 1},
            {itemID: ItemID.LeatherBreastplate01, count: 1},
            {itemID: ItemID.LeatherBracer01, count: 1},
            {itemID: ItemID.LeatherGloves01, count: 1},
            {itemID: ItemID.LeatherBelt01, count: 1},
            {itemID: ItemID.LeatherPants01, count: 1},
            {itemID: ItemID.LeatherBoots01, count: 1},
        ],
        start_cloth_armor: [
            {itemID: ItemID.ClothHelmet01, count: 1},
            {itemID: ItemID.ClothShoulders_01, count: 1},
            {itemID: ItemID.ClothBreastplate01, count: 1},
            {itemID: ItemID.ClothBracer01, count: 1},
            {itemID: ItemID.ClothGloves01, count: 1},
            {itemID: ItemID.ClothBelt01, count: 1},
            {itemID: ItemID.ClothPants01, count: 1},
            {itemID: ItemID.ClothBoots01, count: 1},
        ],
        start_jewelry: [
            {itemID: ItemID.Ring01, count: 1},
            {itemID: ItemID.Ring01, count: 1},
            {itemID: ItemID.Amulet01, count: 1},
            // {itemID: ItemID.Trinket01, count: 1},    //Пока тут.
        ],
        start_weapons: [
            {itemID: ItemID.OneHandedSword01, count: 2},
            {itemID: ItemID.TwoHandedSword01, count: 1},
            {itemID: ItemID.OneHandedAxe01, count: 2},
            {itemID: ItemID.TwoHandedAxe01, count: 1},
            {itemID: ItemID.Dagger01, count: 2},
            {itemID: ItemID.Staff01, count: 1},
            {itemID: ItemID.Wand01, count: 2},
            {itemID: ItemID.Revolver01, count: 2},
        ],
        //Будет несколько щитов.
        start_shields: [
            {itemID: ItemID.Shield01, count: 1},
        ],
    };

    get name(): string {
        return CommandID.create_item_kit;
    }

    configure() {
        super.configure();
        this.addArgument('name', '', true);
        this.addArgument('multiplier', '', false, 1);
    }

    async execute(input: Input) {
        let name = input.getArgument('name');
        let multiplier = parseInt(input.getArgument('multiplier'), 10);

        assertNotEmpty(name);
        assertNotNil(this._kits[name], 'Набор предметов не найден.');
        assertIsGreaterThanOrEqual(multiplier, 1);

        for (let i = 0; i < this._kits[name].length; i++) {
            // ItemStorageComponent.addItemToItemStorages(
            //     this.container.get<MainItemStorageListComponent>(ContainerID.MainItemStorageList).itemStorages,
            //     this.container.get<EntityManagerInterface>(ContainerID.EntityManager).get<Item>(EntityID.Item, this._kits[name][i].item),
            //     this._kits[name][i].count * multiplier,
            // );
            this.container
                .get<ItemStorageInterface>(ServiceID.ItemStorageController)
                .addItem(
                    this._kits[name][i].itemID,
                    this._kits[name][i].count * multiplier
                );
        }
    }
}