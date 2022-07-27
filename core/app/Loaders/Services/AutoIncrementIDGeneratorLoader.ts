import ContainerInterface from '../../../source/ContainerInterface.js';
import AutoIncrementIDGenerator from '../../../source/AutoIncrementIDGenerator.js';

export default class AutoIncrementIDGeneratorLoader {
    load(data: object, container: ContainerInterface) {
        const autoIncrementIDGenerator = Object.create(AutoIncrementIDGenerator.prototype);

        autoIncrementIDGenerator['_currentId'] = <number>data['_currentId'];

        return autoIncrementIDGenerator;
    }
}