import GameObject from '../core/source/GameObject.js';
import LevelRange from '../core/app/Components/ExperienceComponent.js';
import PlayerComponent from '../core/app/Components/PlayerComponent.js';
import {sprintf} from 'sprintf-js';
import _ from 'lodash';
import ExperienceComponent from '../core/app/Components/ExperienceComponent.js';
import EventSystem from '../core/source/EventSystem.js';

namespace GameObjectGetStarted {
    // gameObjectGetStartedTest();

    function gameObjectGetStartedTest() {
        let id = 1;

        //todo: Перенести в тесты. Назвать примерно FirstTests, GetStartedTests и тд.
        let hero = new GameObject(id++);
        hero.addTags('#tag1');
        hero.addTags(['#tag2', '#tag3']);

        let tagsExpect = ['#tag1', '#tag2', '#tag3'];
        console.log(hero['_tags'].length === 3, sprintf('tags.length === 3'));
        console.log(_.every(hero['_tags'], Boolean), sprintf('tags includes %s', _.join(tagsExpect, ', ')));

        let levelComponent = new ExperienceComponent(1, 100);
        // let levelComponent = ;
        let levelComponentID = levelComponent['_id'];
        hero.addComponent(levelComponent);

        console.log(hero.findComponentByName(LevelRange.name) instanceof LevelRange, 'findComponentByName: findComponentByName(LevelComponent.name) instanceOf LevelComponent');
        console.log(!(hero.findComponentByName(PlayerComponent.name) instanceof LevelRange), 'findComponentByName: findComponentByName(PlayerComponent.name) instanceOf PlayerComponent');

        console.log(hero.findComponentsByName(LevelRange.name).length === 1, 'findComponentsByName: findComponentsByName(LevelComponent.name).length === 1');
        console.log(hero.findComponentsByName(PlayerComponent.name).length === 0, 'findComponentsByName: findComponentsByName(PlayerComponent.name).length === 0');

        console.log(hero.getComponentByID(levelComponentID)['_id'] === levelComponentID, 'getComponentByID: getComponentByID(levelComponentID)["_id"] === levelComponentID');
        try {
            hero.getComponentByID(42);
        } catch (e) {
            console.log(true, 'getComponentByID: Исключение сработало. ' + e.message);
            console.log(e.message == sprintf('Component с id=%s не найден.', 42), sprintf('getComponentByID: "%s" === "%s"', e.message, e.message));
        }

        console.log(hero.getComponentByName(LevelRange.name)['_id'] === levelComponentID, 'getComponentByName: getComponentByName(levelComponentID)["_id"] === levelComponentID');
        try {
            hero.getComponentByName(PlayerComponent.name);
        } catch (e) {
            console.log(true, 'getComponentByName: Исключение сработало. ' + e.message);
            console.log(e.message == sprintf('Component с name %s не найден.', PlayerComponent.name), sprintf('getComponentByName: "%s" === "%s"', e.message, e.message));
        }
    }
}