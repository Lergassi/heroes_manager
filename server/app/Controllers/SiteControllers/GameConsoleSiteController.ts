import Controller from '../../../source/Controller.js';
import _ from 'lodash';
import debug from 'debug';
import GameConsole from '../../../../core/source/GameConsole/GameConsole.js';
import {DebugNamespaceID} from '../../../../core/types/enums/DebugNamespaceID.js';
import {ContainerID} from '../../../../core/types/enums/ContainerID.js';

export default class GameConsoleSiteController extends Controller {
    async execute(req, res) {
        let params = req.getParams;
        if (!params.command) {
            this.response(req, res, JSON.stringify({
                error: 'Параметр "command" не может быть пустым.',
            }), {
                contentType: 'application/json',
            });

            return;
        }

        let commandQuery = _.trim(params['command']);
        if (!commandQuery) {
            this.response(req, res, JSON.stringify({
                error: 'Команда не может быть пустой.',
            }), {
                contentType: 'application/json',
            });

            return;
        }

        let gameConsole = this.container.get<GameConsole>(ContainerID.GameConsole);
        try {
            // let commandParams = gameConsole.parse(commandQuery);
            // let command = gameConsole.getCommand(commandParams.name);
            // debug('info')('GameConsole command:', chalk.yellow(commandParams.name));
            // await command.run(commandParams.arguments);
            await gameConsole.runByQuery(commandQuery);

            this.response(req, res, JSON.stringify({
                data: 'ok',
            }), {
                contentType: 'application/json',
            });
        } catch (e) {
            debug(DebugNamespaceID.Error)(e);
            this.response(req, res, JSON.stringify({
                error: e.message,
            }), {
                contentType: 'application/json',
            });
        }
    }
}