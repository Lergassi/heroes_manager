import {v4} from 'uuid';

// export default class UUIDGenerator implements IDGeneratorInterface {
export default class UUIDGenerator {
    generateID(): string {
        return v4();
    }
}