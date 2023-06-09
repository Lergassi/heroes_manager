import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {debugGameObjectStorage} from '../../../debug/debug_functions.js';
import GameObjectStorage from '../../../source/GameObjectStorage.js';
import {ServiceID} from '../../../types/enums/ServiceID.js';

export default class DebugGameObjectStorageCommand extends Command {
    get name(): string {
        return 'debug_game_object_storage';
    }

    async execute(input: Input) {
        debugGameObjectStorage(this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage));
    }
}