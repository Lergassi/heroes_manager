import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import PlayerContainerConfigure from '../PlayerContainerConfigure.js';
import GameConsole from '../../source/GameConsole/GameConsole.js';
import ClientRender from '../../../client/public/React/ClientRender.js';
import AppError from '../../source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import {CommandNameID} from '../../types/enums/CommandNameID.js';

export default class NewGameCommand extends Command {
    private readonly _scenarios = {
        basic: CommandNameID.create_player_start_objects,
    };

    get name(): string {
        return CommandNameID.new_game;
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
        // (new CoreContainerConfigure()).configure(this.container);
        (new PlayerContainerConfigure()).configure(this.container);

        // await this.container.get<GameConsole>('gameConsole').getCommand(CommandNameID.create_player_env).run();
        await this.container.get<GameConsole>('gameConsole').getCommand(CommandNameID.create_player_env).run();
        if (scenario) {
            await this.container.get<GameConsole>('gameConsole').getCommand(this._scenarios[scenario]).run();
        }

        this.container.get<ClientRender>('client.clientRender').buildGameUI();
    }
}