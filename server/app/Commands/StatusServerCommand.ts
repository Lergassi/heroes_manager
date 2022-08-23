import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';

export default class StatusServerCommand extends Command {
    get name(): string {
        return 'server.status'; //todo: Пространства не должно быть в команде если команда универсльная. Команду можно зарегистировать для разных клиента и/или сервера.
    }

    async execute(input: Input) {

    }
}