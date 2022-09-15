import Container from '../../core/source/Container.js';
import DefaultContainerConfigure from '../../core/app/DefaultContainerConfigure.js';
import ClientContainerConfigure from './ClientContainerConfigure.js';
import CoreContainerConfigure from '../../core/app/CoreContainerConfigure.js';
import ClientRender from '../public/React/ClientRender.js';
import debug from 'debug';
import _ from 'lodash';

export default class Client {
    async run() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);
        // (new PlayerContainerConfigure()).configure(container);

        let debugNamespaces = [
            'debug',
            'debug:*',
            'log',
            'log:*',
        ];
        debug.enable(_.join(debugNamespaces, ','));

        debug('log')('Создание клиенте завершено (index.js).');

        // let itemStorageFactory = container.get<ItemStorageFactory>('player.itemStorageFactory');
        //
        // let itemStorage = itemStorageFactory.create();
        // // console.log(itemStorage);
        //
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>('player.itemStackFactory').createByItemAlias('wood', 20),
        // );
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>('player.itemStackFactory').createByItemAlias('wood', 20),
        // );
        // itemStorage.getComponentByName<ItemStorageComponent>(ItemStorageComponent.name).addItemStack(
        //     container.get<ItemStackFactory>('player.itemStackFactory').createByItemAlias('one_handed_sword_01', 1),
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