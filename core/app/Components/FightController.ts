import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
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
        this._heroFightGroupController.attackTo(this._enemyFightGroupController, rewardOptions);
        this._enemyFightGroupController.attackTo(this._heroFightGroupController);
    }
}