import _ from 'lodash';
import debug from 'debug';
import GameObject from '../../source/GameObject.js';
import {DebugNamespaceID} from '../../types/enums/DebugNamespaceID.js';
import {DebugFormatterID} from '../../types/enums/DebugFormatterID.js';
import Location from '../Components/Location.js';
import {ComponentID} from '../../types/enums/ComponentID.js';
import HeroListViewer from './HeroListViewer.js';
import EnemyListViewer from './EnemyListViewer.js';

export default class DetailLocationViewer {
    view(location: GameObject) {
        // console.log(location);
        // debug(DebugNamespaceID.Info)('######## Location ########');
        // debug(DebugNamespaceID.Info)(DebugFormatterID.Json, {
        //     ID: location.ID,
        // });
        //
        // let heroListViewer = new HeroListViewer();
        // let enemyListViewer = new EnemyListViewer();
        // location.get<Location>(ComponentID.Location).view((data) => {
        //     heroListViewer.view(data.heroGroupComponent);
        //     enemyListViewer.view(data.enemyGroupComponent);
        // });
    }
}