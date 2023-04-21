export default class Icon {
    private readonly _id: string;

    get id(): string {
        return this._id;
    }

    constructor(id: string) {
        this._id = id;

        //todo: Проверка наличия иконки.
    }

    // render(target: any) {
    //     target.setIconClass('icon_' + this._id);
    // }
    //todo:
    // generateCssSelector() {}
}