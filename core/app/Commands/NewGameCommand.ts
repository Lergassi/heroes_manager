import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import PlayerFactory from '../Factories/PlayerFactory.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import WalletFactory from '../Factories/WalletFactory.js';
import EntityManager from '../../source/EntityManager.js';
import Currency from '../Entities/Currency.js';
import ItemStorageFactory from '../Factories/ItemStorageFactory.js';
import ItemStackPattern from '../RuntimeObjects/ItemStackPattern.js';
import UUIDGenerator from '../../source/UUIDGenerator.js';
import Item from '../Entities/Item.js';
import ItemStorageManager from '../Services/ItemStorageManager.js';
import HeroClass from '../Entities/HeroClass.js';
import HeroFactory from '../Factories/HeroFactory.js';
import {debugPlayerEnv} from '../../debug/debug_functions.js';
import CoreContainerConfigure from '../CoreContainerConfigure.js';
import PlayerContainerConfigure from '../PlayerContainerConfigure.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import ReactDOM from 'react-dom/client';
import ClientRender from '../../../client/public/React/ClientRender.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import LocationFactory from '../Factories/LocationFactory.js';
import ExperienceComponent from '../Components/ExperienceComponent.js';
import {ContainerKey} from '../consts.js';

export default class NewGameCommand extends Command {
    private readonly _scenarios = {
        basic: 'create_start_player_objects',
    };

    get name(): string {
        return 'new_game';
    }

    configure() {
        super.configure();
        this.addArgument('scenario', '', false, null);
        // this.addArgument('scenario', '', false, 'basic');
    }

    async execute(input: Input) {
        let scenario = input.getArgument('scenario');
        if (scenario !== null && !this._scenarios.hasOwnProperty(scenario)) {
            throw new AppError(sprintf('Сценарий %s не найден.', scenario));
        }
        // (new CoreContainerConfigure()).configure(this.container);
        (new PlayerContainerConfigure()).configure(this.container);

        await this.container.get<GameConsole>('gameConsole').getCommand('create_player_env').run();
        if (scenario) {
            await this.container.get<GameConsole>('gameConsole').getCommand(this._scenarios[scenario]).run();
        }

        this.container.get<ClientRender>('client.clientRender').buildGameUI();
    }
}