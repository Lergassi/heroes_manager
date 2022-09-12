import {v4} from 'uuid';
import IDGeneratorInterface from './IDGeneratorInterface.js';

export default class UUIDGenerator implements IDGeneratorInterface {
// export default class UUIDGenerator {
    generateID() {
        return v4();
    }
}