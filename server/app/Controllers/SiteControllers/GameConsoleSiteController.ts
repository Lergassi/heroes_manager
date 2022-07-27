import Controller from '../../../source/Controller.js';
import _ from 'lodash';
import debug from 'debug';
import chalk from 'chalk';
import GameConsole from '../../../../core/source/GameConsole/GameConsole.js';
import AppError from '../../../../core/source/AppError.js';

export default class GameConsoleSiteController extends Controller {
    async execute(req, res) {
        let params = req.getParams;
        if (!params.command) {
            this.response(req, res, JSON.stringify({
                error: 'Параметр "command" не может быть пустым.',
            }));

            return;
        }

        let commandQuery = _.trim(params['command']);
        if (!commandQuery) {
            this.response(req, res, JSON.stringify({
                error: 'Команда не может быть пустым.',
            }));

            return;
        }

        let commandQuerySplitted = _.split(commandQuery, ' ');
        let commandName = commandQuerySplitted[0];
        let commandArguments = _.slice(commandQuerySplitted, 1);

        let gameConsole: GameConsole = this.container.get<GameConsole>('server.gameConsole');
        try {
            await gameConsole.run(commandName, commandArguments);

            this.response(req, res, JSON.stringify({
                data: 'ok',
            }));
        } catch (e) {
            debug('error')(e);
            this.response(req, res, JSON.stringify({
                error: e.message,
            }));
        }
    }
}