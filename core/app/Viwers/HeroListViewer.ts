import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import ShorHeroViewer from './ShorHeroViewer.js';

export default class HeroListViewer {
    view(heroes: GameObject[]) {
        let shortHeroListViewer = new ShorHeroViewer();
        for (let i = 0; i < heroes.length; i++) {
            if (!heroes[i]) continue;

            shortHeroListViewer.view(heroes[i]);
        }
    }
}