import HeroGroupInterface from '../Interfaces/HeroGroupInterface.js';
import FightController from './FightController.js';
import _ from 'lodash';

export default class FightGroup {
    private readonly _fightController: FightController[];

    constructor() {
        this._fightController = [];
    }

    addFightController(fightController: FightController) {
        if (!_.includes(this._fightController, fightController)) {
            this._fightController.push(fightController);
        }
    }

    fight() {

    }
}