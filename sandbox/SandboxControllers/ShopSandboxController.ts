import AbstractSandboxController from './AbstractSandboxController.js';
import Wallet from '../../core/app/Components/Wallet.js';
import EntityManagerInterface from '../../core/app/Interfaces/EntityManagerInterface.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import {EntityID} from '../../core/types/enums/EntityID.js';
import Shop from '../../core/app/Components/Shop.js';
import Bag from '../../core/app/Components/Bag.js';
import Item from '../../core/app/Entities/Item.js';
import Fence from '../../core/app/Components/Fence.js';
import {ItemID} from '../../core/types/enums/ItemID.js';

export default class ShopSandboxController extends AbstractSandboxController {
    run(): void {
        // this._shop();
        // this._fence();
        this._debug();
    }

    private _shop() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let wallet = new Wallet(1000);
        // let wallet = new WalletComponent(21);
        console.log(wallet.value);

        // let itemStorage = new InfinityItemStorage();
        let itemStorage = new Bag(5, em);

        // console.log(wallet.remove(10));
        // console.log(wallet.remove(10));
        // console.log(wallet.remove(10));
        // console.log(wallet.remove(1001));
        // console.log(wallet.value);

        // let shop = new Shop();
        let shop = this.container.get<Shop>(ServiceID.Shop);
        // em.map<Item>(EntityID.Item, (item) => {
        //     shop.addPosition(item, item.getProperty('defaultBuyPrice'));
        // });

        shop.buy(1, 49, wallet, itemStorage);
        shop.buy(1, 49, wallet, itemStorage);
        shop.buy(1, 2, wallet, itemStorage);
        console.log(wallet);
        console.log(itemStorage);
    }

    private _fence() {
        let em = this.container.get<EntityManagerInterface>(ServiceID.EntityManager);

        let wallet = new Wallet();

        // let fence = new Fence();
        let fence = this.container.get<Fence>(ServiceID.Fence);
        // fence.config(em.get<Item>(EntityID.Item, ItemID.Wood), em.get<Item>(EntityID.Item, ItemID.Wood).sellPrice);
        // fence.config(em.get<Item>(EntityID.Item, ItemID.IronOre), em.get<Item>(EntityID.Item, ItemID.IronOre).sellPrice);
        // fence.config(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), em.get<Item>(EntityID.Item, ItemID.OneHandedSword01).sellPrice);
        em.map<Item>(EntityID.Item, (item) => {
            fence.config(item, item.getProperty('defaultSellPrice'));
        });
        console.log(fence);

        let itemStorage = new Bag(5, em);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 9);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.Wood), 10);
        itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 10);
        // itemStorage.addItem(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 10);
        console.log(itemStorage);

        // fence.sell(em.get<Item>(EntityID.Item, ItemID.Wood), 10, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.IronOre), 10, wallet, itemStorage);
        fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 5, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 1, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 1, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 1, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 1, wallet, itemStorage);
        // fence.sell(em.get<Item>(EntityID.Item, ItemID.OneHandedSword01), 1, wallet, itemStorage);
        console.log(itemStorage);
    }

    private _debug() {
        let shop = this.container.get<Shop>(ServiceID.Shop);
        let fence = this.container.get<Fence>(ServiceID.Fence);
        console.log(shop);
        console.log(fence);
    }
}