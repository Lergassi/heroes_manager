import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemPackInterface from '../Interfaces/ItemPackInterface.js';
import {DEFAULT_STACK_SIZE} from '../consts.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {assertIsGreaterThanOrEqual, assertIsNumber, assertNotEmpty, assertNotNil} from '../../source/assert.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import EntityManagerInterface from '../Interfaces/EntityManagerInterface.js';
import Item from '../Entities/Item.js';
import {EntityID} from '../../types/enums/EntityID.js';
import debug from 'debug';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import ItemStorageComponent from '../Components/ItemStorageComponent.js';
import MainItemStorageListComponent from '../Components/MainItemStorageListComponent.js';
import {parseInt} from 'lodash';
import ItemStorageInterface from '../Interfaces/ItemStorageInterface.js';
import ItemDatabase from '../../source/ItemDatabase.js';
import ItemStackBlankInterface from '../Interfaces/ItemStackBlankInterface.js';

export default class CreateItemKitCommand extends Command {
    //todo: Для ID вместо сущности использовать отдельный класс или фабрику.
    private readonly _kits: {[key: string]: ItemStackBlankInterface[]} = {
        // start_items: [
        //     {item: ItemID.Wood, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.IronOre, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.Herb_1, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
        //     {item: ItemID.MagicResources_01, count: 2},
        // ],
        start_resources: [
            {item: ItemID.Wood, count: DEFAULT_STACK_SIZE},
            {item: ItemID.IronOre, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.CopperOre, count: DEFAULT_STACK_SIZE},
            {item: ItemID.Herb01, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_2, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_3, count: DEFAULT_STACK_SIZE},
            {item: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.BoarMeat, count: DEFAULT_STACK_SIZE},
            {item: ItemID.MagicResources01, count: 2},
        ],
        start_materials: [
            {item: ItemID.IronIngot, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.CopperBar, count: DEFAULT_STACK_SIZE},
            {item: ItemID.Leather01, count: DEFAULT_STACK_SIZE},
            {item: ItemID.MagicMaterial01, count: 1},
        ],
        start_plate_armor: [
            {item: ItemID.PlateHelmet01, count: 1},
            {item: ItemID.PlateShoulders01, count: 1},
            {item: ItemID.PlateBreastplate01, count: 1},
            {item: ItemID.PlateBracer01, count: 1},
            {item: ItemID.PlateGloves01, count: 1},
            {item: ItemID.PlateBelt01, count: 1},
            {item: ItemID.PlatePants01, count: 1},
            {item: ItemID.PlateBoots01, count: 1},
        ],
        start_leather_armor: [
            {item: ItemID.LeatherHelmet01, count: 1},
            {item: ItemID.LeatherShoulders01, count: 1},
            {item: ItemID.LeatherBreastplate01, count: 1},
            {item: ItemID.LeatherBracer01, count: 1},
            {item: ItemID.LeatherGloves01, count: 1},
            {item: ItemID.LeatherBelt01, count: 1},
            {item: ItemID.LeatherPants01, count: 1},
            {item: ItemID.LeatherBoots01, count: 1},
        ],
        start_cloth_armor: [
            {item: ItemID.ClothHelmet01, count: 1},
            {item: ItemID.ClothShoulders_01, count: 1},
            {item: ItemID.ClothBreastplate01, count: 1},
            {item: ItemID.ClothBracer01, count: 1},
            {item: ItemID.ClothGloves01, count: 1},
            {item: ItemID.ClothBelt01, count: 1},
            {item: ItemID.ClothPants01, count: 1},
            {item: ItemID.ClothBoots01, count: 1},
        ],
        start_jewelry: [
            {item: ItemID.Ring01, count: 1},
            {item: ItemID.Ring01, count: 1},
            {item: ItemID.Amulet01, count: 1},
            {item: ItemID.Trinket01, count: 1},    //Пока тут.
        ],
        start_weapons: [
            {item: ItemID.OneHandedSword01, count: 2},
            {item: ItemID.TwoHandedSword01, count: 1},
            {item: ItemID.OneHandedAxe01, count: 2},
            {item: ItemID.TwoHandedAxe01, count: 1},
            {item: ItemID.Dagger01, count: 2},
            {item: ItemID.Staff01, count: 1},
            {item: ItemID.Wand01, count: 2},
            {item: ItemID.Revolver01, count: 2},
        ],
        //Будет несколько щитов.
        start_shields: [
            {item: ItemID.Shield01, count: 1},
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
            this.container.get<ItemStorageInterface>(ServiceID.ItemStorageController).addItem(this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(this._kits[name][i].item), this._kits[name][i].count * multiplier);
        }
    }
}