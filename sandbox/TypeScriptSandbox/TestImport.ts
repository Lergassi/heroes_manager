import {TestImportInterface} from "./TestImportInterface";

export default class TestImport implements TestImportInterface {
    exp(value: number) {
        return value * value;
    }
}