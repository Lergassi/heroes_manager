import ContainerInterface from '../core/source/ContainerInterface.js';
import Container from '../core/source/Container.js';
import CoreContainerConfigure from '../core/app/CoreContainerConfigure.js';
import ServerContainerConfigure from '../server/app/ServerContainerConfigure.js';
import ClientContainerConfigure from '../client/app/ClientContainerConfigure.js';
// import {Metadata} from '../core/config/metadata.js';

export default class ServerAndCoreSandbox {
    private readonly _container: ContainerInterface;

    get container(): ContainerInterface {
        return this._container;
    }

    constructor() {
        this._container = new Container();
        this.configureServerContainer();
        this.configureCoreContainer();
    }

    configureCoreContainer() {
        (new CoreContainerConfigure()).configure(this.container);
    }

    configureServerContainer() {
        (new ServerContainerConfigure()).configure(this.container);
    }

    configureClientContainer() {
        (new ClientContainerConfigure()).configure(this.container);
    }

    main() {

    }
}