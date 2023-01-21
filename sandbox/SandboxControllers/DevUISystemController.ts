import AbstractSandboxController from './AbstractSandboxController.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import ItemStorageFactory from '../../core/app/Factories/ItemStorageFactory.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import ItemStorageV2 from '../../core/app/Components/ItemStorageV2.js';
import Viewer from '../../core/source/Viewer.js';
import ItemDatabase from '../../core/source/ItemDatabase.js';
import {ItemID} from '../../core/types/enums/ItemID.js';
import WalletFactory from '../../core/app/Factories/WalletFactory.js';
import {CurrencyID} from '../../core/types/enums/CurrencyID.js';
import Wallet from '../../core/app/Components/Wallet.js';
import HeroFactory from '../../core/app/Factories/HeroFactory.js';
import {HeroClassID} from '../../core/types/enums/HeroClassID.js';
import HeroComponent from '../../core/app/Components/HeroComponent.js';
import Experience from '../../core/app/Components/Experience.js';
import DetailHeroViewer from '../../core/app/Viwers/DetailHeroViewer.js';
import HeroListViewer from '../../core/app/Viwers/HeroListViewer.js';
import ShortHeroViewer from '../../core/app/Viwers/ShortHeroViewer.js';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';
import debug from 'debug';
import _ from 'lodash';
import LocationFactory from '../../core/app/Factories/LocationFactory.js';
import DetailLocationViewer from '../../core/app/Viwers/DetailLocationViewer.js';
import Location from '../../core/app/Components/Location.js';

export default class DevUISystemController extends AbstractSandboxController {
    run() {
        // this._main();
        // this._itemStorage();
        // this._wallet();
        // this._hero();
        // this._heroes();
        this._location();
    }

    private _itemStorage() {
        let viewer = new Viewer();

        let itemStorage = this.container.get<ItemStorageFactory>(ServiceID.ItemStorageFactory).create(20);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorage).addItem(this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorage).addItem(this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.Wood), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorage).addItem(this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.IronOre), 12);
        itemStorage.get<ItemStorageV2>(ComponentID.ItemStorage).addItem(this.container.get<ItemDatabase>(ServiceID.ItemDatabase).get(ItemID.OneHandedSword01), 2);
        // console.log(itemStorage);

        // itemStorage.get<ItemStorageV2>(ComponentID.ItemStorageComponent).view(viewer);
        // itemStorage.get<ItemStorageV2>(ComponentID.ItemStorage).view2((rows) => {
        //     console.log(rows);
        // });
        // console.log(viewer);
        // console.log(viewer);
    }

    private _wallet() {
        let wallet = this.container.get<WalletFactory>(ServiceID.WalletFactory).create(100);
        wallet.get<Wallet>(ComponentID.Wallet).add(12);
        wallet.get<Wallet>(ComponentID.Wallet).add(12);
        wallet.get<Wallet>(ComponentID.Wallet).add(12);
        console.log(wallet);

        // wallet.get<Wallet>(ComponentID.Wallet).view((value: number) => {
        //     console.log(value);
        // });
    }

    private _hero() {
        let hero = this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1);
        // console.log(hero);
        // hero.view((data) => {
        //     console.log('data', data);
        // });

        let heroViewer = new DetailHeroViewer();
        heroViewer.view(hero);
        debug(DebugNamespaceID.Info)('-'.repeat(64));
    }

    private _heroes() {
        let heroes = [
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
            this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1),
        ];

        let heroShortViewer = new ShortHeroViewer();
        for (let i = 0; i < heroes.length; i++) {
            heroShortViewer.view(heroes[i]);
        }
    }

    private _location() {
        let location = this.container.get<LocationFactory>(ServiceID.LocationFactory).create(1);

        location.get<Location>(ComponentID.Location).addHero(this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1));
        location.get<Location>(ComponentID.Location).addHero(this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1));
        location.get<Location>(ComponentID.Location).addHero(this.container.get<HeroFactory>(ServiceID.HeroFactory).create(HeroClassID.Warrior, 1));
        // console.log(location);

        let locationViewer = new DetailLocationViewer();
        locationViewer.view(location);
    }
}