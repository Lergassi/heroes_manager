import _ from 'lodash';
import Enemy from '../../core/app/Components/Enemy.js';
import Location from '../../core/app/Components/Location.js';
import MainLocationList from '../../core/app/Components/MainLocationList.js';
import EnemyFactory from '../../core/app/Factories/EnemyFactory.js';
import LocationFactory from '../../core/app/Factories/LocationFactory.js';
import LocationConfiguratorByDB from '../../core/app/Services/LocationConfiguratorByDB.js';
import {database} from '../../core/data/ts/database.js';
import {ComponentID} from '../../core/types/enums/ComponentID.js';
import {LocationTypeID} from '../../core/types/enums/LocationTypeID.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class LocationSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted();
        // this._devDefaultScenario();
        // this._devGenerateEnemies();
        // this._createLocationsCommand();
        // this._devConfigureLocation();
    }

    private _getStarted() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        let maxLocations = 100;
        let mainLocationList = new MainLocationList(maxLocations);

        let startLocationLevel = 1;
        for (let level = startLocationLevel; level <= maxLocations; level++) {
            mainLocationList.add(locationFactory.create(LocationTypeID.Forrest, level));
        }
        // let location = ;
        console.log(mainLocationList);

        // let locationFactory: any;
        //
        // locationFactory.create(LocationTypeID.Forrest, 1);
        // locationFactory.create(LocationTypeID.Forrest, 2);
        // locationFactory.create(LocationTypeID.Forrest, 42);
        // //...
        // //или builder или настройка локации после создания
        // locationFactory.create(LocationTypeID.Forrest, 
        //     1,
        //     'Desert',
        //     [
        //         {'Wood': 12},
        //         {'IronOre': 12},
        //     ],
        //     [
        //         {enemy: 'Boar', level: 1},
        //         {enemy: 'Wolf', level: 1},
        //     ],
        // );
    }

    private _devGenerateEnemies() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);
        console.log(locationFactory.create(LocationTypeID.Forrest, 1));
    }

    private _devDefaultScenario() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        // let maxLocationLevel = 100;
        let maxLocationLevel = 35;
        let mainLocationList = new MainLocationList();

        let locationsForLevel = [5, 10];
        let startLocationLevel = 1;
        for (let level = startLocationLevel; level <= maxLocationLevel; level++) {
            _.map(_.range(locationsForLevel[0], _.random(locationsForLevel[0], locationsForLevel[1]) + 1), () => {
                mainLocationList.add(locationFactory.create(LocationTypeID.Forrest, level));
            });
        }

        console.log(mainLocationList);
    }

    private _createLocationsCommand() {

    }

    private _devConfigureLocation() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);
        let enemyFactory = this.container.get<EnemyFactory>(ServiceID.EnemyFactory);

        let locationLevel = 1;
        let locationGO = locationFactory.create(LocationTypeID.Forrest, locationLevel);
        let location = locationGO.get<Location>(ComponentID.Location);
        // console.log(location);

        // let enemyLevel = 1;
        // let enemyLevel = locationLevel;
        // database.locations.enemies.find(LocationTypeID.Forrest, (enemyTypeID) => {
        //     location.addEnemy(enemyFactory.create(enemyTypeID, enemyLevel));
        // });

        let locationConfigurator = new LocationConfiguratorByDB(enemyFactory);
        locationConfigurator.configure(location);

        console.log(location);
    }
}