import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import ShorHeroViewer from './ShorHeroViewer.js';
import ShorEnemyViewer from './ShorEnemyViewer.js';

export default class EnemyListViewer {
    view(enemies: GameObject[]) {
        let shorEnemyViewer = new ShorEnemyViewer();
        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i]) continue;

            shorEnemyViewer.view(enemies[i]);
        }
    }
}