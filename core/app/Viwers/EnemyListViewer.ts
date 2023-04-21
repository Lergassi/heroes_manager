import GameObject from '../../source/GameObject.js';
import ShortEnemyViewer from './ShortEnemyViewer.js';

export default class EnemyListViewer {
    view(enemies: GameObject[]) {
        let shorEnemyViewer = new ShortEnemyViewer();
        for (let i = 0; i < enemies.length; i++) {
            if (!enemies[i]) continue;

            shorEnemyViewer.view(enemies[i]);
        }
    }
}