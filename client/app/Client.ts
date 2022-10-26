import Container from '../../core/source/Container.js';
import DefaultContainerConfigure from '../../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import ClientContainerConfigure from './ClientContainerConfigure.js';
import CoreContainerConfigure from '../../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import ClientRender from '../public/React/ClientRender.js';
import debug from 'debug';
import _ from 'lodash';
import {DebugNamespaceID} from '../../core/types/enums/DebugNamespaceID.js';

export default class Client {
    async run() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);
        // (new PlayerContainerConfigure()).configure(container);

        debug(DebugNamespaceID.Log)('Создание клиенте завершено (index.js).');

        // let itemStorageFactory = container.get<ItemStorageFactory>('player.itemStorageFactory');
        //
        // let itemStorage = itemStorageFactory.create();
        // // console.log(itemStorage);
        //
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.Wood, 20),
        // );
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.Wood, 20),
        // );
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>(ContainerKey.ItemStackFactory).createByItemAlias(ItemID.OneHandedSword_01, 1),
        // );
        // debugItemStorage(itemStorage);

        // let gameConsole = container.get<GameConsole>('gameConsole');

        // await gameConsole.getCommand('new_game').run();
        // await gameConsole.getCommand('create_start_player_objects').run();
        // debugPlayerEnv(container);

        let clientRender = new ClientRender(container);
        container.set<ClientRender>('client.clientRender', clientRender);

        clientRender.buildPreGameUI();
    }
}