import _ from 'lodash';
import debug from 'debug';
import MainLocationList from '../../core/app/Components/MainLocationList.js';
import LocationFactory from '../../core/app/Factories/LocationFactory.js';
import {ServiceID} from '../../core/types/enums/ServiceID.js';
import AbstractSandboxController from './AbstractSandboxController.js';

export default class GenerateLocationSandboxController extends AbstractSandboxController {
    run(): void {
        // this._getStarted();
        this._devDefaultScenario();
        // this._devGenerateEnemies();
        // this._createLocationsCommand();
    }

    private _getStarted() {
        let locationFactory = this.container.get<LocationFactory>(ServiceID.LocationFactory);

        let maxLocations = 100;
        let mainLocationList = new MainLocationList(maxLocations);

        let startLocationLevel = 1;
        for (let level = startLocationLevel; level <= maxLocations; level++) {
            mainLocationList.add(locationFactory.create(level));
        }
        // let location = ;
        console.log(mainLocationList);

        // let locationFactory: any;
        //
        // locationFactory.create(1);
        // locationFactory.create(2);
        // locationFactory.create(42);
        // //...
        // //или builder или настройка локации после создания
        // locationFactory.create(
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
        console.log(locationFactory.create(1));
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
                mainLocationList.add(locationFactory.create(level));
            });
        }

        console.log(mainLocationList);
    }

    private _createLocationsCommand() {

    }
}