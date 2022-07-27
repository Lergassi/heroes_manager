import Container from '../source/Container.js';
import AbstractContainerConfigure from '../source/AbstractContainerConfigure.js';
import AutoIncrementIDGenerator from '../source/AutoIncrementIDGenerator.js';
import RepositoryManagerFileLoader from './Services/RepositoryManagerFileLoader.js';
import path from 'path';
import UserFactory from './Factories/UserFactory.js';
import PlayerFactory from './Factories/PlayerFactory.js';
import WalletFactory from './Factories/WalletFactory.js';
import GameObjectStorage from '../source/GameObjectStorage.js';
import HeroFactory from './Factories/HeroFactory.js';
import config from '../config/main.js';
import ItemStorageFactory from './Factories/ItemStorageFactory.js';
import GameConsole from '../source/GameConsole/GameConsole.js';
import HelpCommand from '../../server/app/Commands/HelpCommand.js';
import ListCommand from '../../server/app/Commands/ListCommand.js';
import ItemStorageManager from './Services/ItemStorageManager.js';
import AddItemCommand from './Commands/AddItemCommand.js';
import CreateHeroCommand from './Commands/CreateHeroCommand.js';
import CreateItemStorageCommand from './Commands/CreateItemStorageCommand.js';
import EquipCommand from './Commands/EquipCommand.js';
import RemoveEquipCommand from './Commands/RemoveEquipCommand.js';
import ContainerInterface from '../source/ContainerInterface.js';
import ItemStackFactory from './Factories/ItemStackFactory.js';
import Item from './Entities/Item.js';
import RepositoryManager from '../source/RepositoryManager.js';
import EquipManager from './Services/EquipManager.js';
import Serializer, {SerializeType} from '../source/Serializer.js';
import GameObject from '../source/GameObject.js';
import ItemStorageComponent from './Components/ItemStorageComponent.js';
import ItemStorageSlotComponent from './Components/ItemStorageSlotComponent.js';
import ItemStackSlot from './RuntimeObjects/ItemStackSlot.js';
import ItemStack from './RuntimeObjects/ItemStack.js';
import WalletComponent from './Components/WalletComponent.js';
import HeroComponent from './Components/HeroComponent.js';
import LevelComponent from './Components/LevelComponent.js';
import EquipSlotComponent from './Components/EquipSlotComponent.js';
import CharacterAttributeComponent from './Components/CharacterAttributeComponent.js';
import HealthPointsComponent from './Components/HealthPointsComponent.js';
import MagicPointsComponent from './Components/MagicPointsComponent.js';
import AttackPowerComponent from './Components/AttackPowerComponent.js';
import PlayerComponent from './Components/PlayerComponent.js';
import {debugContainer} from '../debug/debug_functions.js';

export default class ContainerConfigure extends AbstractContainerConfigure {
    configure(container: ContainerInterface): ContainerInterface {
        container.set<object>('core.config', config);
        //save_inject
        container.set<AutoIncrementIDGenerator>('realtimeObjectIdGenerator', (container: ContainerInterface) => {
            return new AutoIncrementIDGenerator(1);
        });
        //Тут не save_inject, а просто загрузка данных из файла. На сервере из файла, на клиенте через import и webpack
        container.set<RepositoryManager>('core.repositoryManager', (container) => {
            //todo: Только для сервера. На клиенте загрузка будет не из файла.
            return (new RepositoryManagerFileLoader()).load(path.resolve(process.env.PROJECT_DIR, 'core/data/entities.json'), container);
        });
        //Данные пока загружаются отдельно.
        container.set<GameObjectStorage>('core.gameObjectStorage', (container) => {
            return new GameObjectStorage();
        });
        container.set<UserFactory>('core.userFactory', (container) => {
            return new UserFactory(container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'));
        });
        container.set<PlayerFactory>('core.playerFactory', (container) => {
            return new PlayerFactory(container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'), {
                maxLevel: 100,
            });
        });
        container.set<WalletFactory>('core.walletFactory', (container) => {
            return new WalletFactory(container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'));
        });
        container.set<HeroFactory>('core.heroFactory', (container) => {
            return new HeroFactory(
                container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
                container.get<RepositoryManager>('core.repositoryManager'),
                container.get<object>('core.config'),
            );
        });
        container.set<ItemStackFactory>('core.itemStackFactory', (container) => {
            return new ItemStackFactory(
                container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
                container.get<RepositoryManager>('core.repositoryManager').getRepository<Item>(Item.name),
            );
        });
        container.set<ItemStorageFactory>('core.itemStorageFactory', (container) => {
            return new ItemStorageFactory(
                container.get<AutoIncrementIDGenerator>('realtimeObjectIdGenerator'),
            );
        });
        container.set<ItemStorageManager>('core.itemStorageManager', (container) => {
            return new ItemStorageManager(container.get<GameObjectStorage>('core.gameObjectStorage'));
        });
        container.set<EquipManager>('core.equipManager', (container) => {
            return new EquipManager();
        });

        this._gameConsoleConfigure(container);

        return container;
    }

    unconfigure(container) {
        let serviceNames = [
            'core.config',
            'realtimeObjectIdGenerator',
            'core.repositoryManager',
            'core.gameObjectStorage',
            'core.userFactory',
            'core.playerFactory',
            'core.walletFactory',
            'core.heroFactory',
            'core.itemStackFactory',
            'core.itemStorageFactory',
            'core.itemStorageManager',
            'core.equipManager',
        ];
    }

    private _gameConsoleConfigure(container: ContainerInterface) {
        let gameConsole: GameConsole = container.get<GameConsole>('gameConsole');

        gameConsole.register(new HelpCommand(container));
        gameConsole.register(new ListCommand(container));

        gameConsole.register(new AddItemCommand(container));
        gameConsole.register(new CreateHeroCommand(container));
        gameConsole.register(new CreateItemStorageCommand(container));
        gameConsole.register(new EquipCommand(container));
        gameConsole.register(new RemoveEquipCommand(container));
    }
}