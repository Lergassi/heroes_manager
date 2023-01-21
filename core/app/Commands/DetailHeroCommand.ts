import _ from 'lodash';
import debug from 'debug';
import DetailHeroRC from '../../../client/public/Components/DetailHeroRC.js';
import {assertNotNil} from '../../source/assert.js';
import Command from '../../source/GameConsole/Command.js';
import Input from '../../source/GameConsole/Input.js';
import GameObjectStorage from '../../source/GameObjectStorage.js';
import {CommandID} from '../../types/enums/CommandID.js';
import {ServiceID} from '../../types/enums/ServiceID.js';
import MainHeroList from '../Components/MainHeroList.js';

export default class DetailHeroCommand extends Command {
    get name(): string {
        return CommandID.ui_detail_hero;
    }

    configure() {
        super.configure();
        this.addArgument('hero_id', '', true);
    }

    async execute(input: Input) {
        let heroID = parseInt(input.getArgument('hero_id'), 10);

        let hero = this.container.get<GameObjectStorage>(ServiceID.GameObjectStorage).getOneByID(heroID);

        assertNotNil(hero);

        this.container.get<DetailHeroRC>(ServiceID.UI_DetailHero).updateHero(hero);
        this.container.get<DetailHeroRC>(ServiceID.UI_DetailHero).show();
    }
}