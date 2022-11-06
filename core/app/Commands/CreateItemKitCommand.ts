import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import {ItemID} from '../../types/enums/ItemID.js';
import ItemPackInterface from '../Interfaces/ItemPackInterface.js';
import {DEFAULT_STACK_SIZE} from '../consts.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {assertIsGreaterThanOrEqual, assertIsNumber, assertNotEmpty, assertNotNil} from '../../source/assert.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import {ContainerID} from '../../types/enums/ContainerID.js';
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

export default class CreateItemKitCommand extends Command {
    private readonly _kits: {[key: string]: ItemPackInterface[]} = {
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
            {item: ItemID.Herb_1, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_2, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.Herb_3, count: DEFAULT_STACK_SIZE},
            {item: ItemID.BoarSkin, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.BoarMeat, count: DEFAULT_STACK_SIZE},
            {item: ItemID.MagicResources_01, count: 2},
        ],
        start_materials: [
            {item: ItemID.IronBar, count: DEFAULT_STACK_SIZE},
            // {item: ItemID.CopperBar, count: DEFAULT_STACK_SIZE},
            {item: ItemID.Leather_01, count: DEFAULT_STACK_SIZE},
            {item: ItemID.MagicMaterial_01, count: 1},
        ],
        start_plate_armor: [
            {item: ItemID.PlateHelmet_01, count: 1},
            {item: ItemID.PlateShoulders_01, count: 1},
            {item: ItemID.PlateBreastplate_01, count: 1},
            {item: ItemID.PlateBracer_01, count: 1},
            {item: ItemID.PlateGloves_01, count: 1},
            {item: ItemID.PlateBelt_01, count: 1},
            {item: ItemID.PlatePants_01, count: 1},
            {item: ItemID.PlateBoots_01, count: 1},
        ],
        start_leather_armor: [
            {item: ItemID.LeatherHelmet_01, count: 1},
            {item: ItemID.LeatherShoulders_01, count: 1},
            {item: ItemID.LeatherBreastplate_01, count: 1},
            {item: ItemID.LeatherBracer_01, count: 1},
            {item: ItemID.LeatherGloves_01, count: 1},
            {item: ItemID.LeatherBelt_01, count: 1},
            {item: ItemID.LeatherPants_01, count: 1},
            {item: ItemID.LeatherBoots_01, count: 1},
        ],
        start_cloth_armor: [
            {item: ItemID.ClothHelmet_01, count: 1},
            {item: ItemID.ClothShoulders_01, count: 1},
            {item: ItemID.ClothBreastplate_01, count: 1},
            {item: ItemID.ClothBracer_01, count: 1},
            {item: ItemID.ClothGloves_01, count: 1},
            {item: ItemID.ClothBelt_01, count: 1},
            {item: ItemID.ClothPants_01, count: 1},
            {item: ItemID.ClothBoots_01, count: 1},
        ],
        start_jewelry: [
            {item: ItemID.Ring_01, count: 1},
            {item: ItemID.Ring_01, count: 1},
            {item: ItemID.Amulet_01, count: 1},
            {item: ItemID.Trinket_01, count: 1},    //Пока тут.
        ],
        start_weapons: [
            {item: ItemID.OneHandedSword_01, count: 2},
            {item: ItemID.TwoHandedSword_01, count: 1},
            {item: ItemID.OneHandedAxe_01, count: 2},
            {item: ItemID.TwoHandedAxe_01, count: 1},
            {item: ItemID.Dagger_01, count: 2},
            {item: ItemID.Staff_01, count: 1},
            {item: ItemID.Wand_01, count: 2},
            {item: ItemID.Revolver_01, count: 2},
        ],
        //Будет несколько щитов.
        start_shields: [
            {item: ItemID.Shield_01, count: 1},
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
            this.container.get<ItemStorageInterface>(ContainerID.ItemStorageController).addItem(
                this.container.get<ItemDatabase>(ContainerID.ItemDatabase).get(this._kits[name][i].item),
                this._kits[name][i].count * multiplier,
            );
        }
    }
}