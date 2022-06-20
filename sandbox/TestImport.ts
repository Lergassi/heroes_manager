import {TestImportInterface} from "./TestImportInterface.js";

export default class TestImport implements TestImportInterface {
    exp(value: number) {
        return value * value;
    }
}