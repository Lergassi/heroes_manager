import {assertNotNil} from '../../source/assert.js';
import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import PlayerContainerConfigure from '../Services/ContainerConfigures/PlayerContainerConfigure.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import GameUI from '../../../client/public/GameUI.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import _ from 'lodash';

export default class NewGameCommand extends Command {
    private readonly _scenarios = {
        default: CommandID.create_default_start_player_objects,
        empty: undefined,   //С проверкой по условию.
        basic: CommandID.create_basic_start_player_objects,
    };

    get name(): string {
        return CommandID.new_game;
    }

    configure() {
        super.configure();
        this.addArgument('scenario', '', false, null);
    }

    async execute(input: Input) {
        let scenarioName = input.getArgument('scenario') || 'default';
        if (!this._scenarios.hasOwnProperty(scenarioName)) {
            throw new AppError(sprintf('Сценарий %s не найден.', scenarioName));
        }

        (new PlayerContainerConfigure()).configure(this.container);

        await this.container.get<GameConsole>(ServiceID.GameConsole).run(CommandID.create_player_env);

        let scenario = this._scenarios[scenarioName];
        if (scenario) {
            await this.container.get<GameConsole>(ServiceID.GameConsole).run(scenario);
        }

        //Если делать проверки, то везде, а не в одном месте.
        // let gameUI = this.container.get<GameUI>(ServiceID.UI_Game);
        // assertNotNil(gameUI);

        this.container.get<GameUI>(ServiceID.UI_ClientBuilder).buildGameUI();
    }
}