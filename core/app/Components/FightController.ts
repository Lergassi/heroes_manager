import _ from 'lodash';
import debug from 'debug';
import {RewardOptions} from '../Interfaces/FightControllerInterface.js';
import FightGroupController from './FightGroupController.js';

export default class FightController {
    private readonly _heroFightGroupController: FightGroupController;
    private readonly _enemyFightGroupController: FightGroupController;

    constructor(heroFightGroupController: FightGroupController, enemyFightGroupController: FightGroupController) {
        this._heroFightGroupController = heroFightGroupController;
        this._enemyFightGroupController = enemyFightGroupController;
    }

    fight(rewardOptions?: RewardOptions): void {
        this._heroFightGroupController.attack(this._enemyFightGroupController, rewardOptions);
        this._enemyFightGroupController.attack(this._heroFightGroupController);
    }
}