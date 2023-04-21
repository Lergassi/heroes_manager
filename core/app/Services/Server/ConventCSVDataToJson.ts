import ConventItems from './ConventItems.js';
import ConventItemCategories from './ConventItemCategories.js';

export default class ConventCSVDataToJson {
    run() {
        let conventItemCategories = new ConventItemCategories();
        let conventItems = new ConventItems();

        conventItemCategories.run();
        conventItems.run();
    }
}