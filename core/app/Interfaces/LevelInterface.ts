export interface LevelInterfaceRender {
    updateLevel(value: number): void;
}

export default interface LevelInterface {
    get level(): number;
    renderByRequest(ui: LevelInterfaceRender): void;
}