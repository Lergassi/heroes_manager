import Command from '../../../core/source/GameConsole/Command.js';
import Input from '../../../core/source/GameConsole/Input.js';
import Security from '../../source/Security.js';
import fs from 'fs';
import AppError from '../../../core/source/Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import Serializer from '../../../core/source/Serializer.js';
import GameObjectStorage from '../../../core/source/GameObjectStorage.js';
import PlayerDBObjectRepository from '../Repositories/PlayerDBObjectRepository.js';
import PlayerDBObject from '../DBObjects/PlayerDBObject.js';
import _ from 'lodash';
import PlayerContainerConfigure from '../../../core/app/Services/ContainerConfigures/PlayerContainerConfigure.js';
import PathResolver from '../../source/PathResolver.js';
import JsonSerializer from '../../../core/source/JsonSerializer.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';

export default class LoadPlayerEnvironmentCommand extends Command {
    get name(): string {
        return 'load_player_env';
    }

    configure() {
        super.configure();
        this.addArgument('name', '', true);
    }

    async execute(input: Input) {
        this.container.get<Security>('server.security').assertIsUserLoaded();
        this.container.get<Security>('server.security').assertIsPlayerAlreadyLoaded();

        let name: string = _.trim(input.getArgument('name'));

        let playerDBObject = await this.container.get<PlayerDBObjectRepository<PlayerDBObject>>('server.playerDBObjectRepository').loadOneByName(this.container.get<Security>('server.security').user, name);
        this.container.get<Security>('server.security').loginPlayer(<PlayerDBObject>playerDBObject);

        let saveFilePath = this.container.get<PathResolver>('server.pathResolver').resolve(
            'server/data/saves',
            this.container.get<Security>('server.security').user.id.toString(),
            this.container.get<Security>('server.security').player.id.toString(),
            'save.json',
        );
        //todo: Все проверки делать заранее, чтобы не делать откат действий на подобии loginPlayer().
        if (!fs.existsSync(saveFilePath)) {
            throw new AppError(sprintf('Файл сохранений игрока id:%s не найден.', name));
        }

        let serializer = this.container.get<Serializer>('core.serializer');
        let jsonSerializer = this.container.get<JsonSerializer>('core.jsonSerializer');

        //todo: Проверка входных данных.
        let stringData = fs.readFileSync(saveFilePath);
        let objectData = jsonSerializer.parse(stringData.toString());

        // (new PlayerContainerConfigure()).configure(new SaveInjectContainerDecorator(serializer, this.container, objectData['data']['services']));
        //todo: Пока сохранений данных нет - будет создаваться стартовый контейнер.
        (new PlayerContainerConfigure()).configure(this.container);

        let gameObjectStorage = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage);
        for (let i = 0; i < objectData['data']['gameObjects'].length; i++) {
            gameObjectStorage.add(serializer.unserialize(objectData['data']['gameObjects'][i]));
        }

        serializer.finish();

        DebugApp.debug(DebugNamespaceID.Info)(sprintf('Окружение игрока загружено, %s(%s) загружено.', playerDBObject['_id'], playerDBObject['_name']));
    }
}