import _ from 'lodash';
import debug from 'debug';
import DetailLocationRC from '../../../client/public/RC/DetailLocationRC.js';
import {assertNotNil} from '../../source/assert.js';
import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';

export default class DetailLocationCommand extends Command {
    get name(): string {
        return CommandID.ui_detail_location;
    }

    configure() {
        super.configure();
        this.addArgument('location_id', '', true);
    }

    async execute(input: Input) {
        let locationID = parseInt(input.getArgument('location_id'), 10);

        let location = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(locationID);
        assertNotNil(location);

        this.container.get<DetailLocationRC>(ServiceID.UI_DetailLocation).updateLocation(location);
        this.container.get<DetailLocationRC>(ServiceID.UI_DetailLocation).show();
    }
}