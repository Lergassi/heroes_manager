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

export default class NewGameCommand extends Command {
    private readonly _scenarios = {
        basic: CommandID.create_start_player_objects,
    };

    get name(): string {
        return CommandID.new_game;
    }

    configure() {
        super.configure();
        this.addArgument('scenario', '', false, null);
    }

    async execute(input: Input) {
        let scenario = input.getArgument('scenario');
        if (scenario !== null && !this._scenarios.hasOwnProperty(scenario)) {
            throw new AppError(sprintf('Сценарий %s не найден.', scenario));
        }
        (new PlayerContainerConfigure()).configure(this.container);

        await this.container.get<GameConsole>(ServiceID.GameConsole).getCommand(CommandID.create_player_env).run();
        if (scenario) {
            await this.container.get<GameConsole>(ServiceID.GameConsole).getCommand(this._scenarios[scenario]).run();
        }

        let gameUI = this.container.get<GameUI>(ServiceID.UI_Game);
        assertNotNil(gameUI);

        gameUI.buildGameUI();
    }
}